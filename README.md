# Cevichería Encanto Marino D'Miriam

Web profesional para carta digital, QR e interacción por WhatsApp.

## Funciones

- Diseño mobile-first para clientes que escanean QR en el local.
- Carta interactiva con buscador.
- Filtros por categoría.
- Filtro por alergias/restricciones.
- Modal de detalle por plato.
- Carrito de pedido referencial.
- Envío de pedido por WhatsApp.
- QR imprimible.
- Fotos reales optimizadas en WebP.
- Estructura preparada para solo actualizar precios en el futuro.

## Para actualizar precios

Editar el archivo:

```text
data/menu-data.js
```

Buscar el plato y cambiar:

```js
precio: null
```

por:

```js
precio: 20
```

Luego subir cambios:

```powershell
git status
git add .
git commit -m "Actualizar precios de carta"
git push
```

## Rutas principales

- Inicio: `index.html`
- Carta digital: `menu.html`
- QR para imprimir: `qr-imprimir.html`
- Datos editables: `data/menu-data.js`
- Estilos: `styles.css`
- Interactividad: `script.js`
