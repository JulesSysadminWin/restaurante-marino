# Cevichería Encanto Marino D'Miriam

Versión v6 ajustada a la operación real del local.

## Cambios

- Se quitó delivery.
- Se mantienen solo 3 tipos de atención:
  - Atención en mesa
  - Pedido anticipado / reserva
  - Para llevar / recojo
- Para atención en mesa: el cliente consulta en el local y paga normalmente al final.
- Para pedido anticipado / reserva: se solicita cantidad de personas y hora; el local confirma total y datos de Yape/Plin para separar mesa e ir preparando la comida.
- Para recojo: el cliente pide, paga y pasa a recoger.
- Se mantiene personalización por plato:
  - Normal
  - Sin picante
  - Poco picante
  - Bien picante
  - Consultar
- Se mantiene observación por plato y observación general.

## Actualizar precios

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
