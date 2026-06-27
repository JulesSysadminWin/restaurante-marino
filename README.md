# Cevichería Encanto Marino D'Miriam

Versión v11: carta real, logo oficial y fotos actuales.

## Cambios incluidos

- Se usa el logo oficial enviado.
- Se usan los nombres reales de la carta/fotos.
- Se cargaron 14 fotos reales de platos:
  - Dúo Marino (jalea mixta + chaufa de mariscos)
  - Triple marino
  - Triple con causa
  - Pescado frito
  - Chicharrón de pescado
  - Sudado de pescado
  - Dúo de causa
  - Ceviche de pescado
  - Parihuela de pescado
  - Triple acevichado
  - Dúo Marino (ceviche + arroz con mariscos)
  - Chicharrón de pota
  - Ceviche de conchas negras
  - Ceviche Mixto
- Las fotos se optimizaron a WebP y se recortaron para web.
- La foto de pescado frito se recortó para reducir el fondo con piso.
- Los demás platos de carta quedan sin imagen, con placeholder “Foto por actualizar”.
- Precios se mantienen en `null` para mostrarse como “Por confirmar`.
- Se mantienen reservas/pedido anticipado y recojo por WhatsApp.

## Archivo principal para editar platos/precios

```text
data/menu-data.js
```

## Para poner precio

Cambiar:

```js
precio: null
```

por:

```js
precio: 20
```
