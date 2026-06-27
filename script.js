const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function numeroWhatsappSeguro(){
  const raw = String((typeof RESTAURANTE !== "undefined" && (RESTAURANTE.telefonoWhatsapp || RESTAURANTE.whatsapp)) || "51998101944").replace(/\D/g, "");
  if (raw.endsWith("998101944")) return "51998101944";
  return raw.startsWith("51") ? raw : `51${raw}`;
}


const normalizar = (txt) => String(txt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const precio = (v) => {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  return `S/ ${Number.isInteger(n) ? n.toFixed(0) : n.toFixed(2)}`;
};

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
    a.href = `https://wa.me/${numeroWhatsappSeguro()}?text=${encodeURIComponent(msg)}`;
  });
  renderRecomendadosUI();
}

function obtenerRecomendadosConfig(){
  const cfg = Array.isArray(RESTAURANTE.recomendadosDestacados) ? RESTAURANTE.recomendadosDestacados : [];
  if (cfg.length) return cfg;
  return (RESTAURANTE.recomendados || []).map(label => ({label, id: null}));
}

function obtenerPlatosRecomendados(){
  return obtenerRecomendadosConfig()
    .map(r => ({...r, plato: r.id ? PLATOS.find(p => p.id === r.id) : null}))
    .filter(r => r.label || r.plato);
}

function renderRecomendadosUI(){
  const pillContainers = $$("[data-recomendados-pill]");
  const tiktokLinks = $$(".js-tiktok");
  const recs = obtenerPlatosRecomendados();

  pillContainers.forEach(cont => {
    cont.innerHTML = recs.map(r => {
      const p = r.plato;
      const label = r.label || p?.nombre || "Recomendado";
      const price = p?.precio != null ? `<small>${precio(p.precio)}</small>` : "";
      return `<span class="reco-pill">⭐ <span>${label}</span>${price}</span>`;
    }).join("");
  });

  tiktokLinks.forEach(a => {
    const href = RESTAURANTE.tiktok || '#';
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    const handle = RESTAURANTE.tiktokHandle || '@encantomarino';
    const handleEl = a.querySelector('.tiktok-handle');
    if (handleEl) handleEl.textContent = handle;
  });
}

function initHome() {
  const cont = $("#homeDestacados"); if (!cont) return;
  const recPlatos = obtenerPlatosRecomendados().map(r => r.plato).filter(Boolean);
  const pool = [...recPlatos, ...PLATOS.filter(p => p.destacado && !recPlatos.some(r => r.id === p.id))].slice(0,6);
  cont.innerHTML = pool.map(p => {
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


function totalCarrito(){
  return estado.carrito.reduce((a,item)=>{
    const p = PLATOS.find(x=>x.id===item.id);
    return a + (Number(p?.precio || 0) * item.cantidad);
  }, 0);
}

function cantidadCarrito(){
  return estado.carrito.reduce((a,i)=>a+i.cantidad,0);
}

function recargoRecojo(){
  const recargo = Number(RESTAURANTE.recargoRecojoPorPlato || 0);
  return estado.flujoActual === "recojo" ? cantidadCarrito() * recargo : 0;
}

function totalConRecargoRecojo(){
  return totalCarrito() + recargoRecojo();
}

function carritoConPrecios(){
  return estado.carrito.length > 0 && estado.carrito.every(item => PLATOS.find(p=>p.id===item.id)?.precio != null);
}

function renderCarrito(){
  const bar = $("#cartBar"); if(!bar) return;
  const totalItems = cantidadCarrito();
  if(!totalItems){ bar.classList.remove("show"); bar.innerHTML=""; return; }

  const allPrices = carritoConPrecios();
  const total = totalCarrito();

  bar.classList.add("show");
  bar.innerHTML = `<div class="cart-summary"><strong>${totalItems} item${totalItems===1?"":"s"} seleccionado${totalItems===1?"":"s"}</strong><span>${allPrices ? `Total: ${precio(total).replace("S/ ", "S/ ")}` : "Total a consultar"}</span></div>
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
  const subtotal = p.precio != null ? precio(Number(p.precio) * item.cantidad) : "";
  return `<div class="cart-item">
    <span>${item.cantidad}x ${p.nombre}${extras ? `<small>${extras}</small>` : ""}</span>
    <strong class="cart-item-price">${subtotal}</strong>
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
    if (drinkOptions) drinkOptions.style.display = "none";
    notice.textContent = "Precio según carta. El local confirma disponibilidad al momento de pedir.";
  } else {
    personaliza.style.display = "grid";
    if (drinkOptions) drinkOptions.style.display = "none";
    notice.textContent = "Precio según carta. El local confirma disponibilidad al momento de pedir.";
    $("#modalSpice").value = "Normal";
    $("#modalNote").value = "";
  }

  const modalBackBtn = $("#modalBack");
  if(modalBackBtn) modalBackBtn.onclick = cerrarModalPlato;

  $("#modalAdd").onclick=()=>{
    if (esBebida) {
      agregar(id, "", "");
    } else {
      agregar(id, $("#modalSpice").value, $("#modalNote").value.trim());
    }
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
  if (estado.flujoActual === "recojo" && carritoConPrecios()) {
    const extra = recargoRecojo();
    hint.textContent = `Subtotal: ${precio(totalCarrito())}. Adicional para llevar: ${precio(extra)}. Total estimado: ${precio(totalConRecargoRecojo())}.`;
  } else {
    hint.textContent = "Puedes seguir agregando platos y volver para completar el envío.";
  }
}

function pedidoLineas(){
  return estado.carrito.map(item => {
    const p = PLATOS.find(x=>x.id===item.id);
    const extras = [
      item.picante && item.picante !== "Normal" ? `Ají: ${item.picante}` : "",
      item.nota ? `Obs: ${item.nota}` : ""
    ].filter(Boolean).join(" | ");
    const unit = p.precio != null ? precio(p.precio) : "";
    const subtotal = p.precio != null ? precio(Number(p.precio) * item.cantidad) : "";
    const precioTexto = unit ? ` (${unit} c/u | Subtotal: ${subtotal})` : "";
    return `- ${item.cantidad} x ${p.nombre}${precioTexto}${extras ? " | " + extras : ""}`;
  });
}

function enviarFlujoWhatsApp(){
  guardarFormularioFlujo();

  const f = estado.form;
  const lineas = pedidoLineas();
  const totalTexto = estado.carrito.length && carritoConPrecios()
    ? (estado.flujoActual === "recojo"
      ? `Subtotal platos: ${precio(totalCarrito())}\nAdicional para llevar: ${precio(recargoRecojo())} (${cantidadCarrito()} plato${cantidadCarrito()===1?"":"s"} x ${precio(RESTAURANTE.recargoRecojoPorPlato || 0)})\nTotal estimado: ${precio(totalConRecargoRecojo())}`
      : `Total estimado: ${precio(totalCarrito())}`)
    : "";
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
      totalTexto,
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
      totalTexto,
      "",
      "Entiendo que para dejar el pedido preparado se debe coordinar el pago al 100% por Yape, tarjeta o efectivo luego de que el local confirme disponibilidad y total. Para llevar/recojo se suma S/ 1 por plato pedido."
    ];
  }

  const texto = msg.filter(Boolean).join("\n");
  window.open(`https://wa.me/${numeroWhatsappSeguro()}?text=${encodeURIComponent(texto)}`,"_blank");
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

function createCrabMarkup(sizeClass = ""){
  return `
    <span class="crab-sticker ${sizeClass}" aria-hidden="true">
      <svg class="crab-sticker__svg" viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="crabShell" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ff9a77"/>
            <stop offset="58%" stop-color="#ff5f6d"/>
            <stop offset="100%" stop-color="#e13852"/>
          </linearGradient>
          <linearGradient id="crabClaw" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ff8a65"/>
            <stop offset="100%" stop-color="#ff4b5c"/>
          </linearGradient>
        </defs>
        <g class="crab-svg-bubbles" opacity=".9">
          <circle cx="38" cy="36" r="7" fill="#9eefff"/>
          <circle cx="25" cy="56" r="4" fill="#dfffff"/>
          <circle cx="183" cy="26" r="6" fill="#9eefff"/>
        </g>
        <g class="crab-svg-backlegs" stroke="#ff6f72" stroke-width="8" stroke-linecap="round">
          <path d="M65 114c-12 10-20 21-29 27"/>
          <path d="M82 121c-11 10-18 21-26 28"/>
          <path d="M138 121c11 10 18 21 26 28"/>
          <path d="M155 114c12 10 20 21 29 27"/>
        </g>
        <g class="crab-svg-arms" stroke="#ff6f72" stroke-width="9" stroke-linecap="round" fill="none">
          <path d="M63 74c-18-17-33-23-47-18"/>
          <path d="M157 74c18-17 33-23 47-18"/>
        </g>
        <g class="crab-svg-claws" fill="url(#crabClaw)">
          <path d="M16 51c-8 1-14 9-14 17 0 11 11 19 24 15 11-3 16-13 12-21-2-5-8-8-15-11l15-3-10-11-12 14z"/>
          <path d="M204 51c8 1 14 9 14 17 0 11-11 19-24 15-11-3-16-13-12-21 2-5 8-8 15-11l-15-3 10-11 12 14z"/>
        </g>
        <g class="crab-svg-main">
          <ellipse cx="110" cy="92" rx="57" ry="38" fill="url(#crabShell)"/>
          <ellipse cx="110" cy="98" rx="44" ry="24" fill="#ff7983" opacity=".65"/>
          <path d="M70 92c11 11 25 16 40 16s29-5 40-16" fill="#ffb6c3" opacity=".45"/>
          <path d="M83 54c0-15 12-27 27-27s27 12 27 27" fill="#ffd86c" opacity=".15"/>
        </g>
        <g class="crab-svg-eyestalks" stroke="#ff6f72" stroke-width="8" stroke-linecap="round">
          <path d="M92 57V35"/>
          <path d="M128 57V35"/>
        </g>
        <g class="crab-svg-eyes">
          <ellipse cx="92" cy="28" rx="15" ry="17" fill="#ffffff"/>
          <ellipse cx="128" cy="28" rx="15" ry="17" fill="#ffffff"/>
          <circle cx="96" cy="31" r="5" fill="#16334e"/>
          <circle cx="132" cy="31" r="5" fill="#16334e"/>
          <circle cx="98" cy="29" r="1.5" fill="#ffffff"/>
          <circle cx="134" cy="29" r="1.5" fill="#ffffff"/>
        </g>
        <g class="crab-svg-face">
          <ellipse cx="86" cy="97" rx="9" ry="6" fill="#ffbdd0"/>
          <ellipse cx="134" cy="97" rx="9" ry="6" fill="#ffbdd0"/>
          <path d="M92 109c8 9 28 9 36 0" fill="none" stroke="#8a1433" stroke-width="5" stroke-linecap="round"/>
          <path d="M97 110c2 5 8 8 13 8s11-3 13-8" fill="#8a1433" opacity=".15"/>
        </g>
        <g class="crab-svg-stars" fill="#ffd766">
          <path d="M177 60l3 6 7 1-5 4 1 7-6-4-6 4 1-7-5-4 7-1 3-6z"/>
          <path d="M43 80l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1 2-5z"/>
        </g>
      </svg>
    </span>`;
}

function createFishRipple(x,y){
  const wrap = document.createElement("div");
  wrap.className = "fish-click-effect";
  wrap.style.left = `${x}px`;
  wrap.style.top = `${y}px`;
  const fish = document.createElement("div");
  fish.className = "fish-click-effect__fish";
  fish.innerHTML = createCrabMarkup("cartoon-crab--click");
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
  setTimeout(()=>wrap.remove(), 1500);
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
  const crab = document.createElement("div");
  crab.className = "swim-fish-effect dancing-crab";
  crab.innerHTML = createCrabMarkup("cartoon-crab--dance");
  crab.style.top = `${34 + Math.random()*40}%`;

  for(let i=0;i<7;i++){
    const bubble = document.createElement("span");
    bubble.className = "crab-trail-bubble";
    bubble.style.setProperty("--i", i);
    bubble.style.setProperty("--bubble-y", `${-18 + Math.random()*36}px`);
    crab.appendChild(bubble);
  }

  document.body.appendChild(crab);
  setTimeout(()=>crab.remove(), 3600);
}

document.addEventListener("DOMContentLoaded",()=>{initCommon();initHome();initMenu();initQrPopup();initClickFx();initMoveFx();});

document.addEventListener("keydown", (ev) => {
  if(ev.key === "Escape") {
    if(document.getElementById("dishModal")?.classList.contains("show")) cerrarModalPlato();
    if(document.getElementById("flowModal")?.classList.contains("show")) cerrarFlujo();
  }
});
