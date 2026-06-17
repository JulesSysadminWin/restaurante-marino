# Cevichería Encanto Marino D'Miriam

Versión limpia y profesional de la web/carta digital.

## Qué corrige esta versión

- Se eliminó el QR visible dentro de la carta digital.
- El QR queda solo en `qr-imprimir.html`.
- Se corrigió el diseño responsive para celular.
- Se evitaron imágenes gigantes y desordenadas en móvil.
- Se mantiene buscador, filtros, alergias y pedido por WhatsApp.

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

Luego:

```powershell
git add .
git commit -m "Actualizar precios"
git push
```
