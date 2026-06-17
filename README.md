# Cevichería Encanto Marino D'Miriam

Versión v4 con carta interactiva, restricciones y pedido por WhatsApp.

## Cambios principales

- Se quitó el bloque "Mobile first".
- Las alergias/restricciones seleccionadas ahora viajan en el mensaje de WhatsApp.
- Cada plato puede agregarse con preferencia de picante:
  - Normal
  - Sin picante
  - Poco picante
  - Bien picante
  - Consultar
- Se agregó observación por plato.
- Se agregó observación general del pedido.
- Se mantiene QR solo para imprimir en `qr-imprimir.html`.

## Para actualizar precios

Editar:

```text
data/menu-data.js
```

Cambiar:

```js
precio: null
```

por:

```js
precio: 20
```
