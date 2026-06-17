const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const normalizar = (txt) => String(txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const precio = (v) => (v === null || v === undefined || v === "") ? "Por confirmar" : `S/ ${Number(v).toFixed(2)}`;
const nombreAlergeno = (id) => ALERGENOS.find(a => a.id === id)?.nombre || id;

const estado = { categoria:"todos", busqueda:"", alergenos:new Set(), ocultarRiesgo:false, carrito:{} };

function limpiarCacheVieja() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
  }
  if ("caches" in window) {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
  }
}

function initCommon() {
  limpiarCacheVieja();
  const year = $("#year"); if (year) year.textContent = new Date().getFullYear();
  $$(".js-maps").forEach(a => a.href = RESTAURANTE.googleMaps);
  $$(".js-whatsapp").forEach(a => {
    const msg = `Hola, quiero consultar la carta de ${RESTAURANTE.nombre}`;
    a.href = `https://wa.me/${RESTAURANTE.telefonoWhatsapp}?text=${encodeURIComponent(msg)}`;
  });
}

function initHome() {
  const cont = $("#homeDestacados"); if (!cont) return;
  cont.innerHTML = PLATOS.filter(p => p.destacado).slice(0,6).map(p => `
    <article class="dish-mini">
      <img src="${p.imagen}" alt="${p.nombre}">
      <div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="price">${precio(p.precio)}</span>
      </div>
    </article>`).join("");
}

function tieneRiesgo(p){ return p.alergenos.some(a => estado.alergenos.has(a)); }

function initMenu() {
  if (!$("#menuGrid")) return;
  renderCategorias(); renderAlergenos(); renderMenu(); renderCarrito();

  $("#searchInput").addEventListener("input", e => { estado.busqueda = e.target.value; renderMenu(); });
  $("#toggleRiesgo").addEventListener("change", e => { estado.ocultarRiesgo = e.target.checked; renderMenu(); });
  $("#clearFilters").addEventListener("click", () => {
    estado.categoria="todos"; estado.busqueda=""; estado.alergenos.clear(); estado.ocultarRiesgo=false;
    $("#searchInput").value=""; $("#toggleRiesgo").checked=false;
    renderCategorias(); renderAlergenos(); renderMenu();
  });
  $("#modalClose").addEventListener("click", cerrarModal);
  $("#dishModal").addEventListener("click", e => { if (e.target.id === "dishModal") cerrarModal(); });
}

function renderCategorias(){
  const cont = $("#categoryChips"); if(!cont) return;
  cont.innerHTML = CATEGORIAS.map(c => `<button class="chip ${estado.categoria===c.id?"active":""}" data-cat="${c.id}">${c.nombre}</button>`).join("");
  cont.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { estado.categoria=b.dataset.cat; renderCategorias(); renderMenu(); }));
}

function renderAlergenos(){
  const cont = $("#allergyFilters"); if(!cont) return;
  cont.innerHTML = ALERGENOS.map(a => `<label class="check-pill"><input type="checkbox" value="${a.id}" ${estado.alergenos.has(a.id)?"checked":""}> ${a.nombre}</label>`).join("");
  cont.querySelectorAll("input").forEach(i => i.addEventListener("change", () => { i.checked ? estado.alergenos.add(i.value) : estado.alergenos.delete(i.value); renderMenu(); }));
}

function filtrar(){
  const q = normalizar(estado.busqueda);
  return PLATOS.filter(p => {
    const cat = estado.categoria === "todos" || p.categoria === estado.categoria;
    const text = normalizar(`${p.nombre} ${p.descripcion} ${p.etiquetas.join(" ")} ${p.alergenos.join(" ")}`);
    const busq = !q || text.includes(q);
    const riesgo = estado.ocultarRiesgo ? !tieneRiesgo(p) : true;
    return cat && busq && riesgo;
  });
}

function renderMenu(){
  const grid = $("#menuGrid"); if(!grid) return;
  const platos = filtrar();
  $("#resultCount").textContent = `${platos.length} plato${platos.length===1?"":"s"}`;
  if(!platos.length){
    grid.innerHTML = `<div class="empty-state"><h3>No encontramos platos</h3><p>Prueba limpiando filtros o búsqueda.</p></div>`;
    return;
  }
  grid.innerHTML = platos.map(p => {
    const riesgo = tieneRiesgo(p);
    const cat = CATEGORIAS.find(c=>c.id===p.categoria)?.nombre || p.categoria;
    return `<article class="dish-card ${riesgo?"risk":""}">
      <button class="dish-image" data-view="${p.id}"><img src="${p.imagen}" alt="${p.nombre}"></button>
      <div class="dish-body">
        <div class="dish-top"><span class="category-label">${cat}</span><strong class="price">${precio(p.precio)}</strong></div>
        <h3>${p.nombre}</h3><p>${p.descripcion}</p>
        <div class="tag-list">${p.etiquetas.map(t=>`<span>${t}</span>`).join("")}</div>
        <div class="allergen-list">${p.alergenos.map(a=>`<small>${nombreAlergeno(a)}</small>`).join("")}</div>
        ${riesgo ? `<div class="risk-msg">⚠️ Revisa este plato por tus alergias seleccionadas.</div>` : ""}
        <div class="dish-actions"><button class="btn secondary" data-view="${p.id}">Detalle</button><button class="btn" data-add="${p.id}">Agregar</button></div>
      </div>
    </article>`;
  }).join("");
  grid.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => agregar(b.dataset.add)));
  grid.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => abrirModal(b.dataset.view)));
}

function agregar(id){ estado.carrito[id]=(estado.carrito[id]||0)+1; renderCarrito(); }
function cambiarCantidad(id, d){ estado.carrito[id]=(estado.carrito[id]||0)+d; if(estado.carrito[id]<=0) delete estado.carrito[id]; renderCarrito(); }
window.cambiarCantidad = cambiarCantidad;

function renderCarrito(){
  const bar = $("#cartBar"); if(!bar) return;
  const ids = Object.keys(estado.carrito);
  const totalItems = ids.reduce((a,id)=>a+estado.carrito[id],0);
  if(!totalItems){ bar.classList.remove("show"); bar.innerHTML=""; return; }
  const allPrices = ids.every(id => PLATOS.find(p=>p.id===id)?.precio != null);
  const total = ids.reduce((a,id)=>a+(Number(PLATOS.find(p=>p.id===id)?.precio||0)*estado.carrito[id]),0);
  bar.classList.add("show");
  bar.innerHTML = `<div class="cart-summary"><strong>${totalItems} item${totalItems===1?"":"s"}</strong><span>${allPrices ? `Total aprox.: S/ ${total.toFixed(2)}` : "Total: por confirmar"}</span></div>
  <div class="cart-items">${ids.map(id => {
    const p=PLATOS.find(x=>x.id===id);
    return `<div class="cart-item"><span>${estado.carrito[id]}x ${p.nombre}</span><div><button onclick="cambiarCantidad('${id}',-1)">−</button> <button onclick="cambiarCantidad('${id}',1)">+</button></div></div>`;
  }).join("")}</div>
  <div class="cart-actions"><button id="clearCart" class="btn secondary">Limpiar</button><button id="sendOrder" class="btn whatsapp">Enviar por WhatsApp</button></div>`;
  $("#clearCart").addEventListener("click",()=>{estado.carrito={};renderCarrito();});
  $("#sendOrder").addEventListener("click",enviarWhatsApp);
}

function enviarWhatsApp(){
  const ids=Object.keys(estado.carrito); if(!ids.length) return;
  const lineas = ids.map(id => {
    const p=PLATOS.find(x=>x.id===id);
    return `- ${estado.carrito[id]} x ${p.nombre} (${precio(p.precio)})`;
  });
  const msg = [`Hola, quiero consultar este pedido de ${RESTAURANTE.nombre}:`,"",...lineas,"","¿Me confirman disponibilidad y precio final?"].join("\n");
  window.open(`https://wa.me/${RESTAURANTE.telefonoWhatsapp}?text=${encodeURIComponent(msg)}`,"_blank");
}

function abrirModal(id){
  const p=PLATOS.find(x=>x.id===id); if(!p) return;
  $("#modalImage").src=p.imagen; $("#modalImage").alt=p.nombre;
  $("#modalTitle").textContent=p.nombre; $("#modalPrice").textContent=precio(p.precio); $("#modalDesc").textContent=p.descripcion;
  $("#modalTags").innerHTML=p.etiquetas.map(t=>`<span>${t}</span>`).join("");
  $("#modalAllergens").innerHTML=p.alergenos.map(a=>`<small>${nombreAlergeno(a)}</small>`).join("");
  $("#modalAdd").onclick=()=>{agregar(id);cerrarModal();};
  $("#dishModal").classList.add("show"); document.body.style.overflow="hidden";
}
function cerrarModal(){ $("#dishModal").classList.remove("show"); document.body.style.overflow=""; }

document.addEventListener("DOMContentLoaded",()=>{initCommon();initHome();initMenu();});
