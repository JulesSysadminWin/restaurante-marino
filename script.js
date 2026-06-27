const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const normalizar = (txt) => String(txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const precio = (v) => (v === null || v === undefined || v === "") ? "" : `S/ ${Number(v).toFixed(2)}`;

const estado = {
  categoria:"todos",
  busqueda:"",
  carrito:[],
  flujoActual:null,
  form:{
    clientName:"",
    reservationMode:"Solo reservar mesa",
    peopleCount:"",
    arrivalTime:"",
    pickupTime:"",
    flowNote:""
  }
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
  cont.innerHTML = PLATOS.filter(p => p.destacado).slice(0,6).map(p => {
    const img = p.imagen || "assets/placeholder-plato.svg";
    const precioHtml = precio(p.precio) ? `<span class="price">${precio(p.precio)}</span>` : ``;
    return `<article class="dish-mini ${p.imagen ? "" : "sin-foto"}">
      <img src="${img}" alt="${p.nombre}">
      <div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        ${precioHtml}
      </div>
    </article>`;
  }).join("");
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
    renderCategorias();
    renderMenu();
  });

  $("[data-open-flow='reserva']").addEventListener("click", () => abrirFlujo("reserva"));
  $("[data-open-flow='recojo']").addEventListener("click", () => abrirFlujo("recojo"));

  $("#modalClose").addEventListener("click", cerrarModalPlato);
  $("#dishModal").addEventListener("click", e => { if (e.target.id === "dishModal") cerrarModalPlato(); });

  $("#flowClose").addEventListener("click", cerrarFlujo);
  $("#flowModal").addEventListener("click", e => { if (e.target.id === "flowModal") cerrarFlujo(); });
  $("#addMoreDishes").addEventListener("click", () => {
    guardarFormularioFlujo();
    cerrarFlujo();
    document.querySelector(".toolbar")?.scrollIntoView({behavior:"smooth", block:"start"});
  });
  $("#flowSend").addEventListener("click", enviarFlujoWhatsApp);

  ["clientName","reservationMode","peopleCount","arrivalTime","pickupTime","flowNote"].forEach(id => {
    const el = $("#" + id);
    if (el) el.addEventListener("input", guardarFormularioFlujo);
    if (el) el.addEventListener("change", guardarFormularioFlujo);
  });
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
    const text = normalizar(`${p.nombre} ${p.descripcion} ${(p.etiquetas || []).join(" ")}`);
    const busq = !q || text.includes(q);
    return cat && busq;
  }).sort((a,b)=>{
    const imgA = a.imagen ? 1 : 0;
    const imgB = b.imagen ? 1 : 0;
    if(imgA !== imgB) return imgB - imgA;
    const catA = CATEGORIAS.findIndex(c=>c.id===a.categoria);
    const catB = CATEGORIAS.findIndex(c=>c.id===b.categoria);
    if(catA !== catB) return catA - catB;
    return a.nombre.localeCompare(b.nombre, 'es');
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
    const img = p.imagen || "";
    const sinFoto = !img;
    const etiquetas = (p.etiquetas || []).filter(Boolean).map(t=>`<span>${t}</span>`).join("");
    const precioHtml = precio(p.precio) ? `<strong class="price">${precio(p.precio)}</strong>` : ``;
    const mediaHtml = img ? `<button class="dish-image" data-view="${p.id}"><img src="${img}" alt="${p.nombre}"></button>` : ``;
    return `<article class="dish-card ${sinFoto ? "sin-foto text-only" : ""}">
      ${mediaHtml}
      <div class="dish-body">
        <div class="dish-top"><span class="category-label">${cat}</span>${precioHtml}</div>
        <h3>${p.nombre}</h3><p>${p.descripcion}</p>
        <div class="tag-list">${etiquetas}</div>
        <div class="dish-actions"><button class="btn secondary" data-view="${p.id}">Detalle</button><button class="btn" data-add="${p.id}">Agregar</button></div>
      </div>
    </article>`;
  }).join("");
  grid.querySelectorAll("[data-add]").forEach(b => b.addEventListener("click", () => agregar(b.dataset.add, "Normal", "")));
  grid.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => abrirModalPlato(b.dataset.view)));
}

function agregar(id, picante="Normal", nota=""){
  const p = PLATOS.find(x => x.id === id);
  if (!p) return;

  const existente = estado.carrito.find(i => i.id === id && i.picante === picante && i.nota === nota);
  if (existente) existente.cantidad += 1;
  else estado.carrito.push({ lineId: Date.now() + Math.random(), id, cantidad:1, picante, nota });

  renderCarrito();
  renderFlowOrderList();
  animateAddFish();
}

function cambiarCantidad(lineId, d){
  const item = estado.carrito.find(i => String(i.lineId) === String(lineId));
  if (!item) return;
  item.cantidad += d;
  if (item.cantidad <= 0) estado.carrito = estado.carrito.filter(i => String(i.lineId) !== String(lineId));
  renderCarrito();
  renderFlowOrderList();
}
window.cambiarCantidad = cambiarCantidad;

function renderCarrito(){
  const bar = $("#cartBar"); if(!bar) return;
  const totalItems = estado.carrito.reduce((a,i)=>a+i.cantidad,0);
  if(!totalItems){ bar.classList.remove("show"); bar.innerHTML=""; return; }

  const allPrices = estado.carrito.every(i => PLATOS.find(p=>p.id===i.id)?.precio != null);
  const total = estado.carrito.reduce((a,i)=>a+(Number(PLATOS.find(p=>p.id===i.id)?.precio||0)*i.cantidad),0);

  bar.classList.add("show");
  bar.innerHTML = `<div class="cart-summary"><strong>${totalItems} item${totalItems===1?"":"s"} seleccionado${totalItems===1?"":"s"}</strong><span>${allPrices ? `Total aprox.: S/ ${total.toFixed(2)}` : "Total a consultar"}</span></div>
  <div class="cart-items">${estado.carrito.map(item => itemHTML(item)).join("")}</div>
  <div class="cart-actions">
    <button class="btn secondary" id="cartReserva">Reserva / anticipado</button>
    <button class="btn" id="cartRecojo">Para recojo</button>
    <button class="btn secondary" id="clearCart">Limpiar</button>
  </div>`;

  $("#cartReserva").addEventListener("click",()=>abrirFlujo("reserva"));
  $("#cartRecojo").addEventListener("click",()=>abrirFlujo("recojo"));
  $("#clearCart").addEventListener("click",()=>{estado.carrito=[];renderCarrito();renderFlowOrderList();});
}

function itemHTML(item){
  const p = PLATOS.find(x=>x.id===item.id);
  if(!p) return "";
  const extras = [item.picante && item.picante !== "Normal" ? `Ají: ${item.picante}` : "", item.nota ? `Obs: ${item.nota}` : ""].filter(Boolean).join(" | ");
  return `<div class="cart-item">
    <span>${item.cantidad}x ${p.nombre}${extras ? `<small>${extras}</small>` : ""}</span>
    <div><button onclick="cambiarCantidad('${item.lineId}',-1)">−</button> <button onclick="cambiarCantidad('${item.lineId}',1)">+</button></div>
  </div>`;
}

function abrirModalPlato(id){
  const p=PLATOS.find(x=>x.id===id); if(!p) return;
  const esBebida = p.categoria === "bebidas";
  const modalImg = $("#modalImage");
  const modalGrid = $("#dishModal .modal-grid");
  if (p.imagen) {
    modalImg.src=p.imagen;
    modalImg.alt=p.nombre;
    modalGrid?.classList.remove("hidden-media");
  } else {
    modalImg.removeAttribute("src");
    modalImg.alt="";
    modalGrid?.classList.add("hidden-media");
  }

  $("#modalTitle").textContent=p.nombre;
  $("#modalPrice").textContent=precio(p.precio) || "";
  $("#modalPrice").style.display = precio(p.precio) ? "inline-block" : "none";
  $("#modalDesc").textContent=p.descripcion;
  $("#modalTags").innerHTML=(p.etiquetas || []).filter(Boolean).map(t=>`<span>${t}</span>`).join("");

  const personaliza = $("#dishModal .personaliza");
  const drinkOptions = $("#drinkOptions");
  const notice = $("#dishModal .notice");
  if (esBebida) {
    personaliza.style.display = "none";
    if (drinkOptions) drinkOptions.style.display = "grid";
    const modalDrink = $("#modalDrink");
    if(modalDrink){
      const normalizado = normalizar(p.nombre);
      const encontrados = Array.from(modalDrink.options).find(o => normalizar(o.value) === normalizado);
      modalDrink.value = encontrados ? encontrados.value : "Chicha morada";
    }
    notice.textContent = "Consulta disponibilidad con el local.";
  } else {
    personaliza.style.display = "grid";
    if (drinkOptions) drinkOptions.style.display = "none";
    notice.textContent = "Confirmar disponibilidad y precio final con el local.";
    $("#modalSpice").value = "Normal";
    $("#modalNote").value = "";
  }

  $("#modalAdd").onclick=()=>{
    if (esBebida) {
      const seleccion = $("#modalDrink")?.value || p.nombre;
      const bebidaId = PLATOS.find(x => x.categoria === "bebidas" && normalizar(x.nombre) === normalizar(seleccion))?.id || id;
      agregar(bebidaId, "", "");
    } else agregar(id, $("#modalSpice").value, $("#modalNote").value.trim());
    cerrarModalPlato();
  };
  $("#dishModal").classList.add("show"); document.body.style.overflow="hidden";
}
function cerrarModalPlato(){ $("#dishModal").classList.remove("show"); document.body.style.overflow=""; }

function guardarFormularioFlujo(){
  ["clientName","reservationMode","peopleCount","arrivalTime","pickupTime","flowNote"].forEach(id => {
    const el = $("#" + id);
    if(el) estado.form[id] = el.value;
  });
}

function cargarFormularioFlujo(){
  ["clientName","reservationMode","peopleCount","arrivalTime","pickupTime","flowNote"].forEach(id => {
    const el = $("#" + id);
    if(el) el.value = estado.form[id] || "";
  });
  if($("#reservationMode") && !$("#reservationMode").value) $("#reservationMode").value = "Solo reservar mesa";
}

function abrirFlujo(tipo){
  estado.flujoActual = tipo;
  cargarFormularioFlujo();

  const esReserva = tipo === "reserva";
  $("#flowIcon").textContent = esReserva ? "🪑" : "🥡";
  $("#flowTitle").textContent = esReserva ? "Reserva / pedido anticipado" : "Pedido para llevar / recojo";
  $("#flowDescription").textContent = esReserva
    ? "Completa los datos de reserva. Puedes solo reservar mesa o agregar platos para que los vayan preparando antes de tu llegada."
    : "Elige tus platos, indica hora de recojo y envía el pedido por WhatsApp para confirmar total y pago.";

  $("#reservationFields").style.display = esReserva ? "grid" : "none";
  $("#pickupFields").style.display = esReserva ? "none" : "grid";

  renderFlowOrderList();
  $("#flowModal").classList.add("show");
  document.body.style.overflow="hidden";
}

function cerrarFlujo(){
  guardarFormularioFlujo();
  $("#flowModal").classList.remove("show");
  document.body.style.overflow="";
}

function renderFlowOrderList(){
  const cont = $("#flowOrderList");
  const hint = $("#flowOrderHint");
  if(!cont || !hint) return;

  if(!estado.carrito.length){
    cont.innerHTML = "";
    hint.textContent = estado.flujoActual === "reserva"
      ? "Puedes enviar solo la reserva de mesa o agregar platos de la carta para pedido anticipado."
      : "Agrega platos de la carta para armar tu pedido de recojo.";
    return;
  }

  cont.innerHTML = estado.carrito.map(item => itemHTML(item)).join("");
  hint.textContent = "Puedes seguir agregando platos y volver para completar el envío.";
}

function pedidoLineas(){
  return estado.carrito.map(item => {
    const p = PLATOS.find(x=>x.id===item.id);
    const extras = [
      item.picante && item.picante !== "Normal" ? `Ají: ${item.picante}` : "",
      item.nota ? `Obs: ${item.nota}` : ""
    ].filter(Boolean).join(" | ");
    const precioLinea = precio(p.precio);
    const precioTexto = precioLinea ? ` (${precioLinea})` : "";
    return `- ${item.cantidad} x ${p.nombre}${precioTexto}${extras ? " | " + extras : ""}`;
  });
}

function enviarFlujoWhatsApp(){
  guardarFormularioFlujo();

  const f = estado.form;
  const lineas = pedidoLineas();
  let msg = [];

  if(estado.flujoActual === "reserva"){
    msg = [
      `Hola, quiero consultar una reserva en ${RESTAURANTE.nombre}:`,
      "",
      f.clientName ? `Nombre: ${f.clientName}` : "",
      `Solicitud: ${f.reservationMode || "Solo reservar mesa"}`,
      f.peopleCount ? `Personas: ${f.peopleCount}` : "",
      f.arrivalTime ? `Hora aproximada de llegada: ${f.arrivalTime}` : "",
      f.flowNote ? `Observaciones: ${f.flowNote}` : "",
      "",
      lineas.length ? "Pedido anticipado:" : "Pedido anticipado: no agregado, solo reserva de mesa.",
      ...lineas,
      "",
      "Entiendo que para separar mesa y/o preparar platos anticipados se debe coordinar el pago al 100% por Yape, tarjeta o efectivo luego de que el local confirme disponibilidad y total."
    ];
  } else {
    if(!lineas.length){
      alert("Agrega al menos un plato para enviar pedido de recojo.");
      return;
    }
    msg = [
      `Hola, quiero consultar un pedido para llevar / recojo en ${RESTAURANTE.nombre}:`,
      "",
      f.clientName ? `Nombre: ${f.clientName}` : "",
      f.pickupTime ? `Hora aproximada de recojo: ${f.pickupTime}` : "",
      f.flowNote ? `Observaciones: ${f.flowNote}` : "",
      "",
      "Pedido:",
      ...lineas,
      "",
      "Entiendo que para dejar el pedido preparado se debe coordinar el pago al 100% por Yape, tarjeta o efectivo luego de que el local confirme disponibilidad y total."
    ];
  }

  const texto = msg.filter(Boolean).join("\n");
  window.open(`https://wa.me/${RESTAURANTE.telefonoWhatsapp}?text=${encodeURIComponent(texto)}`,"_blank");
}



function initQrPopup(){
  const trigger = document.querySelector("[data-open-qr]");
  const modal = document.getElementById("qrModal");
  const closeBtn = document.getElementById("closeQrModal");
  if(!trigger || !modal) return;
  const openQr = (ev)=>{
    if(ev) ev.preventDefault();
    modal.classList.add("show");
    document.body.style.overflow="hidden";
  };
  const closeQr = ()=>{
    modal.classList.remove("show");
    document.body.style.overflow="";
  };
  trigger.addEventListener("click", openQr);
  closeBtn && closeBtn.addEventListener("click", closeQr);
  modal.addEventListener("click", (ev)=>{ if(ev.target === modal) closeQr(); });
}

function createFishRipple(x,y){
  const wrap = document.createElement("div");
  wrap.className = "fish-click-effect";
  wrap.style.left = `${x}px`;
  wrap.style.top = `${y}px`;
  const fish = document.createElement("div");
  fish.className = "fish-click-effect__fish";
  fish.textContent = "🐟";
  wrap.appendChild(fish);
  for(let i=0;i<4;i++){
    const b = document.createElement("span");
    b.className = "fish-click-effect__bubble";
    b.style.setProperty("--bubble-x", `${(Math.random()*50)-25}px`);
    b.style.setProperty("--bubble-delay", `${i*0.08}s`);
    b.style.setProperty("--bubble-size", `${10 + Math.random()*10}px`);
    wrap.appendChild(b);
  }
  document.body.appendChild(wrap);
  setTimeout(()=>wrap.remove(), 1200);
}

function initClickFx(){
  document.addEventListener("pointerdown", (ev)=>{
    const interactive = ev.target.closest("button, a, .dish-card, .dish-mini, .gallery img, .flow-card, .card");
    if(!interactive) return;
    createFishRipple(ev.clientX, ev.clientY);
  }, {passive:true});
}

function createCursorBubble(x,y){
  const bubble = document.createElement("span");
  bubble.className = "cursor-bubble";
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.setProperty("--bubble-x", `${(Math.random()*20)-10}px`);
  document.body.appendChild(bubble);
  setTimeout(()=>bubble.remove(), 900);
}

function initMoveFx(){
  let last = 0;
  document.addEventListener("pointermove", (ev)=>{
    const now = Date.now();
    if(now - last < 180) return;
    last = now;
    createCursorBubble(ev.clientX, ev.clientY);
    if(Math.random() > 0.7) createFishRipple(ev.clientX, ev.clientY);
  }, {passive:true});
}

function animateAddFish(){
  const fish = document.createElement("div");
  fish.className = "swim-fish-effect";
  fish.textContent = "🐟";
  fish.style.top = `${40 + Math.random()*40}%`;
  document.body.appendChild(fish);
  setTimeout(()=>fish.remove(), 1800);
}

document.addEventListener("DOMContentLoaded",()=>{initCommon();initHome();initMenu();initQrPopup();initClickFx();initMoveFx();});
