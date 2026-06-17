const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const normalizar = (txt) => String(txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const precio = (v) => (v === null || v === undefined || v === "") ? "Por confirmar" : `S/ ${Number(v).toFixed(2)}`;

const estado = {
  categoria:"todos",
  busqueda:"",
  carrito:[]
};

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

function initMenu() {
  if (!$("#menuGrid")) return;
  renderCategorias();
  renderMenu();
  renderCarrito();

  $("#searchInput").addEventListener("input", e => { estado.busqueda = e.target.value; renderMenu(); });
  $("#clearFilters").addEventListener("click", () => {
    estado.categoria="todos";
    estado.busqueda="";
    $("#searchInput").value="";
    if ($("#generalNote")) $("#generalNote").value = "";
    if ($("#attentionDetail")) $("#attentionDetail").value = "";
    if ($("#serviceType")) $("#serviceType").value = "Atención en mesa";
    actualizarCampoAtencion();
    renderCategorias();
    renderMenu();
  });
  if ($("#serviceType")) {
    $("#serviceType").addEventListener("change", actualizarCampoAtencion);
    actualizarCampoAtencion();
  }
  $("#modalClose").addEventListener("click", cerrarModal);
  $("#dishModal").addEventListener("click", e => { if (e.target.id === "dishModal") cerrarModal(); });
}

function actualizarCampoAtencion(){
  const tipo = $("#serviceType") ? $("#serviceType").value : "Atención en mesa";
  const label = $("#attentionDetailLabel");
  const input = $("#attentionDetail");
  if (!label || !input) return;

  if (tipo === "Atención en mesa") {
    label.textContent = "Mesa / referencia";
    input.placeholder = "Ej. mesa 4, barra, mesa del fondo...";
  } else if (tipo === "Pedido anticipado / reserva") {
    label.textContent = "Personas y hora";
    input.placeholder = "Ej. reserva para 4 personas a la 1:30 p.m.";
  } else if (tipo === "Para llevar / recojo") {
    label.textContent = "Hora de recojo";
    input.placeholder = "Ej. paso a recoger 2:00 p.m.";
  } else {
    label.textContent = "Detalle de atención";
    input.placeholder = "Ej. mesa, reserva o recojo";
  }
}

function renderCategorias(){
  const cont = $("#categoryChips"); if(!cont) return;
  cont.innerHTML = CATEGORIAS.map(c => `<button class="chip ${estado.categoria===c.id?"active":""}" data-cat="${c.id}">${c.nombre}</button>`).join("");
  cont.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    estado.categoria=b.dataset.cat;
    renderCategorias();
    renderMenu();
  }));
}

function filtrar(){
  const q = normalizar(estado.busqueda);
  return PLATOS.filter(p => {
    const cat = estado.categoria === "todos" || p.categoria === estado.categoria;
    const text = normalizar(`${p.nombre} ${p.descripcion} ${p.etiquetas.join(" ")}`);
    const busq = !q || text.includes(q);
    return cat && busq;
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
    const cat = CATEGORIAS.find(c=>c.id===p.categoria)?.nombre || p.categoria;
    return `<article class="dish-card">
      <button class="dish-image" data-view="${p.id}"><img src="${p.imagen}" alt="${p.nombre}"></button>
      <div class="dish-body">
        <div class="dish-top"><span class="category-label">${cat}</span><strong class="price">${precio(p.precio)}</strong></div>
        <h3>${p.nombre}</h3><p>${p.descripcion}</p>
        <div class="tag-list">${p.etiquetas.map(t=>`<span>${t}</span>`).join("")}</div>
        <div class="dish-actions"><button class="btn secondary" data-view="${p.id}">Detalle</button><button class="btn" data-add="${p.id}">Agregar</button></div>
      </div>
    </article>`;
  }).join("");
  grid.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => agregar(b.dataset.add, "Normal", "")));
  grid.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => abrirModal(b.dataset.view)));
}

function agregar(id, picante="Normal", nota=""){
  const p = PLATOS.find(x => x.id === id);
  if (!p) return;

  const existente = estado.carrito.find(i => i.id === id && i.picante === picante && i.nota === nota);
  if (existente) existente.cantidad += 1;
  else estado.carrito.push({ lineId: Date.now() + Math.random(), id, cantidad:1, picante, nota });

  renderCarrito();
}

function cambiarCantidad(lineId, d){
  const item = estado.carrito.find(i => String(i.lineId) === String(lineId));
  if (!item) return;
  item.cantidad += d;
  if (item.cantidad <= 0) estado.carrito = estado.carrito.filter(i => String(i.lineId) !== String(lineId));
  renderCarrito();
}
window.cambiarCantidad = cambiarCantidad;

function renderCarrito(){
  const bar = $("#cartBar"); if(!bar) return;
  const totalItems = estado.carrito.reduce((a,i)=>a+i.cantidad,0);
  if(!totalItems){ bar.classList.remove("show"); bar.innerHTML=""; return; }

  const allPrices = estado.carrito.every(i => PLATOS.find(p=>p.id===i.id)?.precio != null);
  const total = estado.carrito.reduce((a,i)=>a+(Number(PLATOS.find(p=>p.id===i.id)?.precio||0)*i.cantidad),0);

  bar.classList.add("show");
  bar.innerHTML = `<div class="cart-summary"><strong>${totalItems} item${totalItems===1?"":"s"}</strong><span>${allPrices ? `Total aprox.: S/ ${total.toFixed(2)}` : "Total: por confirmar"}</span></div>
  <div class="cart-items">${estado.carrito.map(item => {
    const p = PLATOS.find(x=>x.id===item.id);
    const extras = [item.picante && item.picante !== "Normal" ? `Picante: ${item.picante}` : "", item.nota ? `Obs: ${item.nota}` : ""].filter(Boolean).join(" | ");
    return `<div class="cart-item">
      <span>${item.cantidad}x ${p.nombre}${extras ? `<small>${extras}</small>` : ""}</span>
      <div><button onclick="cambiarCantidad('${item.lineId}',-1)">−</button> <button onclick="cambiarCantidad('${item.lineId}',1)">+</button></div>
    </div>`;
  }).join("")}</div>
  <div class="cart-actions"><button id="clearCart" class="btn secondary">Limpiar</button><button id="sendOrder" class="btn whatsapp">Enviar por WhatsApp</button></div>`;
  $("#clearCart").addEventListener("click",()=>{estado.carrito=[];renderCarrito();});
  $("#sendOrder").addEventListener("click",enviarWhatsApp);
}

function enviarWhatsApp(){
  if(!estado.carrito.length) return;

  const tipo = $("#serviceType") ? $("#serviceType").value : "Atención en mesa";
  const detalle = $("#attentionDetail") ? $("#attentionDetail").value.trim() : "";
  const notaGeneral = $("#generalNote") ? $("#generalNote").value.trim() : "";

  const lineas = estado.carrito.map(item => {
    const p = PLATOS.find(x=>x.id===item.id);
    const extras = [
      item.picante ? `Picante: ${item.picante}` : "",
      item.nota ? `Obs: ${item.nota}` : ""
    ].filter(Boolean).join(" | ");
    return `- ${item.cantidad} x ${p.nombre} (${precio(p.precio)})${extras ? " | " + extras : ""}`;
  });

  let cierre = "Por favor confirmar disponibilidad y precio final.";

  if (tipo === "Atención en mesa") {
    cierre = "Pedido para atención en mesa. Por favor confirmar disponibilidad. El pago normalmente se realiza al final de la atención en el local.";
  } else if (tipo === "Pedido anticipado / reserva") {
    cierre = "Pedido anticipado / reserva. Por favor confirmar disponibilidad, total final y datos de Yape/Plin para separar la mesa e ir preparando la comida.";
  } else if (tipo === "Para llevar / recojo") {
    cierre = "Pedido para llevar / recojo. Por favor confirmar disponibilidad, total final, hora de recojo y datos de Yape/Plin para dejarlo preparado.";
  }

  const msg = [
    `Hola, quiero consultar este pedido de ${RESTAURANTE.nombre}:`,
    "",
    `Tipo de atención: ${tipo}`,
    detalle ? `Detalle: ${detalle}` : "",
    notaGeneral ? `Observación general: ${notaGeneral}` : "",
    "",
    "Pedido:",
    ...lineas,
    "",
    cierre
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/${RESTAURANTE.telefonoWhatsapp}?text=${encodeURIComponent(msg)}`,"_blank");
}

function abrirModal(id){
  const p=PLATOS.find(x=>x.id===id); if(!p) return;
  $("#modalImage").src=p.imagen; $("#modalImage").alt=p.nombre;
  $("#modalTitle").textContent=p.nombre; $("#modalPrice").textContent=precio(p.precio); $("#modalDesc").textContent=p.descripcion;
  $("#modalTags").innerHTML=p.etiquetas.map(t=>`<span>${t}</span>`).join("");
  if ($("#modalSpice")) $("#modalSpice").value = "Normal";
  if ($("#modalNote")) $("#modalNote").value = "";
  $("#modalAdd").onclick=()=>{
    const picante = $("#modalSpice") ? $("#modalSpice").value : "Normal";
    const nota = $("#modalNote") ? $("#modalNote").value.trim() : "";
    agregar(id, picante, nota);
    cerrarModal();
  };
  $("#dishModal").classList.add("show"); document.body.style.overflow="hidden";
}
function cerrarModal(){ $("#dishModal").classList.remove("show"); document.body.style.overflow=""; }

document.addEventListener("DOMContentLoaded",()=>{initCommon();initHome();initMenu();});
