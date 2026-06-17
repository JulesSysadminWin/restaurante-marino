// ======================================================
// INTERACTIVIDAD DE LA CARTA DIGITAL
// ======================================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const normalizar = (texto) =>
  String(texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const formatoPrecio = (precio) => {
  if (precio === null || precio === undefined || precio === "") return "Por confirmar";
  return `S/ ${Number(precio).toFixed(2)}`;
};

const estado = {
  categoria: "todos",
  busqueda: "",
  alergenos: new Set(),
  ocultarRiesgo: false,
  carrito: {}
};

function initCommon() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const maps = $$(".js-maps");
  maps.forEach(a => a.href = RESTAURANTE.googleMaps);

  const wppLinks = $$(".js-whatsapp");
  wppLinks.forEach(a => {
    const msg = "Hola, quiero consultar la carta de " + RESTAURANTE.nombre;
    a.href = `https://wa.me/${RESTAURANTE.telefonoWhatsapp}?text=${encodeURIComponent(msg)}`;
  });

  const qrUrl = $("#qrUrl");
  if (qrUrl) qrUrl.textContent = "julessysadminwin.github.io/restaurante-marino/menu.html";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

function initHome() {
  const destacados = $("#homeDestacados");
  if (!destacados) return;

  destacados.innerHTML = PLATOS.filter(p => p.destacado).slice(0, 6).map(p => `
    <article class="dish-mini">
      <img src="${p.imagen}" alt="${p.nombre}">
      <div>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span>${formatoPrecio(p.precio)}</span>
      </div>
    </article>
  `).join("");
}

function initMenu() {
  const grid = $("#menuGrid");
  if (!grid) return;

  renderCategorias();
  renderAlergenos();
  renderMenu();
  renderCarrito();

  $("#searchInput").addEventListener("input", (e) => {
    estado.busqueda = e.target.value;
    renderMenu();
  });

  $("#toggleRiesgo").addEventListener("change", (e) => {
    estado.ocultarRiesgo = e.target.checked;
    renderMenu();
  });

  $("#clearFilters").addEventListener("click", () => {
    estado.categoria = "todos";
    estado.busqueda = "";
    estado.alergenos.clear();
    estado.ocultarRiesgo = false;
    $("#searchInput").value = "";
    $("#toggleRiesgo").checked = false;
    renderCategorias();
    renderAlergenos();
    renderMenu();
  });

  $("#sendOrder").addEventListener("click", enviarWhatsApp);
  $("#clearCart").addEventListener("click", () => {
    estado.carrito = {};
    renderCarrito();
  });

  $("#modalClose").addEventListener("click", cerrarModal);
  $("#dishModal").addEventListener("click", (e) => {
    if (e.target.id === "dishModal") cerrarModal();
  });
}

function renderCategorias() {
  const cont = $("#categoryChips");
  cont.innerHTML = CATEGORIAS.map(cat => `
    <button class="chip ${estado.categoria === cat.id ? "active" : ""}" data-cat="${cat.id}">
      ${cat.nombre}
    </button>
  `).join("");

  cont.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      estado.categoria = btn.dataset.cat;
      renderCategorias();
      renderMenu();
    });
  });
}

function renderAlergenos() {
  const cont = $("#allergyFilters");
  cont.innerHTML = ALERGENOS.map(a => `
    <label class="check-pill">
      <input type="checkbox" value="${a.id}" ${estado.alergenos.has(a.id) ? "checked" : ""}>
      <span>${a.nombre}</span>
    </label>
  `).join("");

  cont.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", () => {
      if (input.checked) estado.alergenos.add(input.value);
      else estado.alergenos.delete(input.value);
      renderMenu();
    });
  });
}

function platoTieneRiesgo(plato) {
  return plato.alergenos.some(a => estado.alergenos.has(a));
}

function filtrarPlatos() {
  const q = normalizar(estado.busqueda);
  return PLATOS.filter(p => {
    const matchCategoria = estado.categoria === "todos" || p.categoria === estado.categoria;
    const texto = normalizar(`${p.nombre} ${p.descripcion} ${p.etiquetas.join(" ")} ${p.alergenos.join(" ")}`);
    const matchBusqueda = !q || texto.includes(q);
    const riesgo = platoTieneRiesgo(p);
    const matchAlergia = estado.ocultarRiesgo ? !riesgo : true;
    return matchCategoria && matchBusqueda && matchAlergia;
  });
}

function renderMenu() {
  const grid = $("#menuGrid");
  const platos = filtrarPlatos();

  $("#resultCount").textContent = `${platos.length} plato${platos.length === 1 ? "" : "s"}`;

  if (!platos.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No encontramos platos con esos filtros</h3>
        <p>Prueba limpiando la búsqueda o desmarcando alergias.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = platos.map(p => {
    const riesgo = platoTieneRiesgo(p);
    const categoria = CATEGORIAS.find(c => c.id === p.categoria)?.nombre || p.categoria;
    return `
      <article class="dish-card ${riesgo ? "risk" : ""}">
        <button class="dish-image" data-view="${p.id}" aria-label="Ver detalle de ${p.nombre}">
          <img src="${p.imagen}" alt="${p.nombre}">
        </button>
        <div class="dish-body">
          <div class="dish-top">
            <span class="category-label">${categoria}</span>
            <strong class="price">${formatoPrecio(p.precio)}</strong>
          </div>
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <div class="tag-list">
            ${p.etiquetas.map(t => `<span>${t}</span>`).join("")}
          </div>
          <div class="allergen-list">
            ${p.alergenos.map(a => `<small>${nombreAlergeno(a)}</small>`).join("")}
          </div>
          ${riesgo ? `<div class="risk-msg">⚠️ Revisa este plato por tu selección de alergias.</div>` : ""}
          <div class="dish-actions">
            <button class="btn ghost" data-view="${p.id}">Detalle</button>
            <button class="btn" data-add="${p.id}">Agregar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => agregarAlCarrito(btn.dataset.add));
  });

  grid.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => abrirModal(btn.dataset.view));
  });
}

function nombreAlergeno(id) {
  return ALERGENOS.find(a => a.id === id)?.nombre || id;
}

function agregarAlCarrito(id) {
  estado.carrito[id] = (estado.carrito[id] || 0) + 1;
  renderCarrito();
}

function cambiarCantidad(id, delta) {
  estado.carrito[id] = (estado.carrito[id] || 0) + delta;
  if (estado.carrito[id] <= 0) delete estado.carrito[id];
  renderCarrito();
}

function renderCarrito() {
  const bar = $("#cartBar");
  if (!bar) return;

  const ids = Object.keys(estado.carrito);
  const cantidad = ids.reduce((acc, id) => acc + estado.carrito[id], 0);
  const conPrecio = ids.every(id => {
    const p = PLATOS.find(x => x.id === id);
    return p && p.precio !== null && p.precio !== undefined;
  });

  let total = 0;
  if (conPrecio) {
    total = ids.reduce((acc, id) => {
      const p = PLATOS.find(x => x.id === id);
      return acc + Number(p.precio) * estado.carrito[id];
    }, 0);
  }

  if (!cantidad) {
    bar.classList.remove("show");
    bar.innerHTML = "";
    return;
  }

  bar.classList.add("show");
  bar.innerHTML = `
    <div class="cart-summary">
      <strong>${cantidad} item${cantidad === 1 ? "" : "s"}</strong>
      <span>${conPrecio ? `Total aprox.: S/ ${total.toFixed(2)}` : "Total: por confirmar"}</span>
    </div>
    <div class="cart-items">
      ${ids.map(id => {
        const p = PLATOS.find(x => x.id === id);
        return `
          <div class="cart-item">
            <span>${estado.carrito[id]}x ${p.nombre}</span>
            <div>
              <button onclick="cambiarCantidad('${id}', -1)">−</button>
              <button onclick="cambiarCantidad('${id}', 1)">+</button>
            </div>
          </div>
        `;
      }).join("")}
    </div>
    <div class="cart-actions">
      <button id="clearCart" class="btn ghost">Limpiar</button>
      <button id="sendOrder" class="btn whatsapp">Enviar por WhatsApp</button>
    </div>
  `;

  $("#sendOrder").addEventListener("click", enviarWhatsApp);
  $("#clearCart").addEventListener("click", () => {
    estado.carrito = {};
    renderCarrito();
  });
}

function enviarWhatsApp() {
  const ids = Object.keys(estado.carrito);
  if (!ids.length) return;

  const lineas = ids.map(id => {
    const p = PLATOS.find(x => x.id === id);
    return `- ${estado.carrito[id]} x ${p.nombre} (${formatoPrecio(p.precio)})`;
  });

  const mensaje = [
    `Hola, quiero consultar este pedido de ${RESTAURANTE.nombre}:`,
    "",
    ...lineas,
    "",
    "¿Me confirman disponibilidad y precio final?"
  ].join("\n");

  window.open(`https://wa.me/${RESTAURANTE.telefonoWhatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

function abrirModal(id) {
  const p = PLATOS.find(x => x.id === id);
  if (!p) return;

  $("#modalImage").src = p.imagen;
  $("#modalImage").alt = p.nombre;
  $("#modalTitle").textContent = p.nombre;
  $("#modalDesc").textContent = p.descripcion;
  $("#modalPrice").textContent = formatoPrecio(p.precio);
  $("#modalTags").innerHTML = p.etiquetas.map(t => `<span>${t}</span>`).join("");
  $("#modalAllergens").innerHTML = p.alergenos.map(a => `<small>${nombreAlergeno(a)}</small>`).join("");
  $("#modalAdd").onclick = () => {
    agregarAlCarrito(id);
    cerrarModal();
  };

  $("#dishModal").classList.add("show");
  document.body.classList.add("modal-open");
}

function cerrarModal() {
  $("#dishModal").classList.remove("show");
  document.body.classList.remove("modal-open");
}

document.addEventListener("DOMContentLoaded", () => {
  initCommon();
  initHome();
  initMenu();
});
