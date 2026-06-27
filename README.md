# Cevichería Encanto Marino D'Miriam

Versión v12: carta real limpia, sin Don Cangrejo.

## Cambios incluidos

- Se quitaron referencias visibles a Don Cangrejo / Chef Don Cangrejo.
- Se quitó el mensaje de pago al final para atención en mesa.
- Se mantiene el logo oficial.
- Se mantienen los nombres reales de la carta.
- Se mantienen las fotos reales ya cargadas.
- Los platos sin imagen exacta quedan en tarjeta de texto, sin foto para evitar confusión.
- Se mantiene la lógica:
  - Atención en mesa: el cliente revisa la carta y pide al personal.
  - Reserva / pedido anticipado: coordinación por WhatsApp.
  - Para llevar / recojo: coordinación por WhatsApp.
- No se atiende delivery desde esta carta.

## Archivo principal para editar platos/precios

```text
data/menu-data.js
```

Para poner precio:

```js
precio: null
```

por:

```js
precio: 20
```
