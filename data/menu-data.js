// ======================================================
// DATOS EDITABLES - ENCANTO MARINO D'MIRIAM
// Para actualizar precios: cambia precio: null por precio: 20
// ======================================================

const RESTAURANTE = {
  nombre: "Cevichería Encanto Marino D'Miriam",
  telefonoWhatsapp: "51977430832",
  ubicacion: "Av. Alameda, Mercado Amarillo, puesto - Callao",
  googleMaps: "https://www.google.com/maps/search/?api=1&query=Mercado%20Amarillo%20Callao%20Av.%20Alameda",
  horario: "Horario por confirmar"
};

const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "ceviches", nombre: "Ceviches" },
  { id: "entradas", nombre: "Entradas" },
  { id: "arroces", nombre: "Arroces" },
  { id: "jaleas", nombre: "Fritos y jaleas" },
  { id: "sopas", nombre: "Caldos y sudados" },
  { id: "combos", nombre: "Combos marinos" }
];

const ALERGENOS = [];

const PLATOS = [
  { id:"ceviche-pescado", categoria:"ceviches", nombre:"Ceviche Clásico del Puerto", descripcion:"Pescado fresco marinado al momento con limón, cebolla y el toque bravo de la casa. Refrescante, jugoso y bien cevichero.", precio:null, imagen:"assets/fotos/ceviche-fresco.webp", alergenos:[], etiquetas:["Clásico","Fresco","Recomendado"], destacado:true },
  { id:"ceviche-especial", categoria:"ceviches", nombre:"Ceviche Encanto Marino", descripcion:"La versión especial de la casa: sabor fresco, punto exacto de limón y una presentación que provoca desde la primera mirada.", precio:null, imagen:"assets/fotos/ceviche-fresco.webp", alergenos:[], etiquetas:["Especial de la casa","Fresco"], destacado:false },
  { id:"ceviche-mixto", categoria:"ceviches", nombre:"Ceviche Mixto del Muelle", descripcion:"Pescado y mariscos en una mezcla marina potente, fresca y sabrosa. Ideal para quienes quieren probar un poco más del mar.", precio:null, imagen:"assets/fotos/combinado-marino.webp", alergenos:[], etiquetas:["Marino","Sabroso"], destacado:true },
  { id:"ronda-marina", categoria:"ceviches", nombre:"Ronda Marina Don Cangrejo", descripcion:"Una ronda generosa para compartir y disfrutar sin pensarlo mucho. Variedad marina, buen sabor y porción para quedar contento.", precio:null, imagen:"assets/fotos/triple-marino.webp", alergenos:[], etiquetas:["Para compartir","Don Cangrejo recomienda"], destacado:true },
  { id:"leche-tigre", categoria:"entradas", nombre:"Leche de Tigre Poder Marino", descripcion:"Concentrada, fresca y con carácter. Ese levantón marino perfecto para abrir el apetito con fuerza.", precio:null, imagen:"assets/fotos/ceviche-fresco.webp", alergenos:[], etiquetas:["Entrada","Potente"], destacado:false },
  { id:"leche-tigre-vip", categoria:"entradas", nombre:"Leche de Tigre VIP del Capitán", descripcion:"Más intensa, más servida y con el toque especial de la casa. Para los que quieren empezar con todo.", precio:null, imagen:"assets/fotos/combinado-marino.webp", alergenos:[], etiquetas:["VIP","Especial"], destacado:false },
  { id:"causa-atun", categoria:"entradas", nombre:"Causa Marina de Atún", descripcion:"Suave, fresca y bien acompañada. Una entrada clásica con sabor marino y presentación casera.", precio:null, imagen:"assets/fotos/ceviche-fresco.webp", alergenos:[], etiquetas:["Entrada","Suave"], destacado:false },
  { id:"duo-marino", categoria:"combos", nombre:"Dúo Marino del Callao", descripcion:"Dos sabores en un solo plato: frescura, crocante y sazón marina. Perfecto para quienes quieren variedad sin exagerar.", precio:null, imagen:"assets/fotos/duo-marino.webp", alergenos:[], etiquetas:["Combo","Popular","Buenazo"], destacado:true },
  { id:"triple-marino", categoria:"combos", nombre:"Trío Don Cangrejo", descripcion:"El más pedido de la casa: ceviche fresco, chicharrón crocante y arroz marino sabroso. Un plato contundente para quedar feliz.", precio:null, imagen:"assets/fotos/triple-marino.webp", alergenos:[], etiquetas:["El más pedido","Don Cangrejo recomienda","Contundente"], destacado:true },
  { id:"arroz-mariscos", categoria:"arroces", nombre:"Arroz Marino de la Casa", descripcion:"Arroz con mariscos bien sazonado, jugoso y con ese toque criollo-marino que provoca repetir.", precio:null, imagen:"assets/fotos/arroz-mariscos.webp", alergenos:[], etiquetas:["Caliente","Sabroso"], destacado:true },
  { id:"chaufa-mariscos", categoria:"arroces", nombre:"Chaufa Marino del Puerto", descripcion:"Salteado con sabor marino, verduras y sazón de casa. Una opción rendidora, caliente y llena de sabor.", precio:null, imagen:"assets/fotos/arroz-mariscos.webp", alergenos:[], etiquetas:["Chaufa","Rendidora"], destacado:false },
  { id:"chaufa-pescado", categoria:"arroces", nombre:"Chaufa de Pescado Don Cangrejo", descripcion:"Chaufa con pescado y sazón marina, servido para quienes quieren algo caliente, sabroso y diferente.", precio:null, imagen:"assets/fotos/duo-marino.webp", alergenos:[], etiquetas:["Chaufa","Don Cangrejo"], destacado:false },
  { id:"pescado-lo-macho", categoria:"arroces", nombre:"Pescado Bravo a lo Macho", descripcion:"Pescado bañado en salsa marina con carácter. Un plato sabroso, potente y bien servido.", precio:null, imagen:"assets/fotos/pescado-frito.webp", alergenos:[], etiquetas:["Especial","Sabor intenso"], destacado:false },
  { id:"chicharron-pota", categoria:"jaleas", nombre:"Chicharrón Crujiente de Pota", descripcion:"Pota doradita, crocante y sabrosa. Ideal para picar, compartir o acompañar con tu ceviche favorito.", precio:null, imagen:"assets/fotos/duo-marino.webp", alergenos:[], etiquetas:["Crocante","Para compartir"], destacado:false },
  { id:"chicharron-pescado", categoria:"jaleas", nombre:"Chicharrón Dorado de Pescado", descripcion:"Pescado frito al punto exacto: crocante por fuera, jugoso por dentro y con sabor marino de verdad.", precio:null, imagen:"assets/fotos/pescado-frito.webp", alergenos:[], etiquetas:["Dorado","Clásico"], destacado:false },
  { id:"jalea-mixta", categoria:"jaleas", nombre:"Jalea Marina Crocante", descripcion:"Una mezcla marina doradita y abundante, perfecta para compartir en mesa y acompañar con salsas de la casa.", precio:null, imagen:"assets/fotos/duo-marino.webp", alergenos:[], etiquetas:["Crocante","Para compartir"], destacado:true },
  { id:"jalea-especial", categoria:"jaleas", nombre:"Jalea Especial del Chef Cangrejo", descripcion:"Versión especial, más completa y sabrosa. Crocante, marina y lista para una mesa con hambre.", precio:null, imagen:"assets/fotos/triple-marino.webp", alergenos:[], etiquetas:["Especial","Chef Cangrejo"], destacado:false },
  { id:"pescado-frito", categoria:"jaleas", nombre:"Pescado Dorado del Puerto", descripcion:"Pescado frito con presentación casera, crocante y bien acompañado. Un clásico que nunca falla.", precio:null, imagen:"assets/fotos/pescado-frito.webp", alergenos:[], etiquetas:["Clásico","Dorado"], destacado:true },
  { id:"parihuela", categoria:"sopas", nombre:"Parihuela del Capitán", descripcion:"Caldo marino potente, caliente y lleno de sabor. Para quienes buscan una sopa con fuerza.", precio:null, imagen:"assets/fotos/sudado-pescado.webp", alergenos:[], etiquetas:["Potente","Caliente"], destacado:false },
  { id:"sudado-pescado", categoria:"sopas", nombre:"Sudado del Muelle", descripcion:"Pescado sudado en jugo criollo-marino, con aroma casero y sabor para disfrutar hasta la última cucharada.", precio:null, imagen:"assets/fotos/sudado-pescado.webp", alergenos:[], etiquetas:["Casero","Caliente"], destacado:true },
  { id:"chilcano-normal", categoria:"sopas", nombre:"Chilcano Levanta Puerto", descripcion:"Caldo ligero, sabroso y reconfortante. Perfecto para empezar suave o cerrar con algo caliente.", precio:null, imagen:"assets/fotos/sudado-pescado.webp", alergenos:[], etiquetas:["Caldo","Ligero"], destacado:false },
  { id:"chilcano-especial", categoria:"sopas", nombre:"Chilcano Especial Don Cangrejo", descripcion:"Más servido, más sabroso y con el toque de la casa. Un caldo marino para levantar el ánimo.", precio:null, imagen:"assets/fotos/sudado-pescado.webp", alergenos:[], etiquetas:["Especial","Don Cangrejo"], destacado:false }
];
