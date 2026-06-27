// ======================================================
// DATOS EDITABLES - ENCANTO MARINO D'MIRIAM
// Versión con nombres reales de carta y fotos actuales.
// Para actualizar precios: cambia precio: null por precio: 20
// ======================================================

const RESTAURANTE = {
  "nombre": "Cevichería Encanto Marino D'Miriam",
  "telefonoWhatsapp": "51977430832",
  "ubicacion": "Av. Alameda, Mercado Amarillo, puesto - Callao",
  "googleMaps": "https://www.google.com/maps/search/?api=1&query=Mercado%20Amarillo%20Callao%20Av.%20Alameda",
  "horario": "Consultar horario por WhatsApp"
};

const CATEGORIAS = [
  {
    "id": "todos",
    "nombre": "Todos"
  },
  {
    "id": "entradas",
    "nombre": "Entradas"
  },
  {
    "id": "ceviches",
    "nombre": "Ceviches"
  },
  {
    "id": "duos",
    "nombre": "Dúos marinos"
  },
  {
    "id": "triples",
    "nombre": "Triples marinos"
  },
  {
    "id": "ronda",
    "nombre": "Ronda marina"
  },
  {
    "id": "arroces",
    "nombre": "Arroces"
  },
  {
    "id": "chicharrones",
    "nombre": "Chicharrones y jaleas"
  },
  {
    "id": "sopas",
    "nombre": "Sopas y caldos"
  },
  {
    "id": "extras",
    "nombre": "Extras"
  },
  {
    "id": "bebidas",
    "nombre": "Bebidas"
  }
];

const ALERGENOS = [];

const PLATOS = [
  {
    "id": "ceviche-pescado",
    "categoria": "ceviches",
    "nombre": "Ceviche de pescado",
    "descripcion": "Pescado fresco con limón al punto, cebolla, choclo y acompañamiento clásico. Un ceviche directo, sabroso y con golpe chalaco.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Fresco",
      "Clásico"
    ],
    "destacado": true,
    "imagen": "assets/fotos/ceviche-pescado.webp"
  },
  {
    "id": "ceviche-mixto",
    "categoria": "ceviches",
    "nombre": "Ceviche Mixto",
    "descripcion": "Pescado y mariscos en una mezcla fresca, jugosa y bien sazonada. Para los que quieren más sabor de mar en un solo plato.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Mixto",
      "Marino"
    ],
    "destacado": true,
    "imagen": "assets/fotos/ceviche-mixto.webp"
  },
  {
    "id": "ceviche-conchas-negras",
    "categoria": "ceviches",
    "nombre": "Ceviche de conchas negras",
    "descripcion": "Ceviche intenso, con carácter y sabor profundo. Una opción brava para quienes disfrutan sabores marinos más fuertes.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Intenso",
      "Especial"
    ],
    "destacado": false,
    "imagen": "assets/fotos/ceviche-conchas-negras.webp"
  },
  {
    "id": "duo-marino-jalea-chaufa",
    "categoria": "duos",
    "nombre": "Dúo Marino",
    "descripcion": "Jalea mixta crocante acompañada de chaufa de mariscos. Una dupla contundente, sabrosa y bien servida.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Jalea mixta + chaufa",
      "Crocante"
    ],
    "destacado": true,
    "imagen": "assets/fotos/duo-marino-jalea-mixta-chaufa-mariscos.webp"
  },
  {
    "id": "duo-marino-ceviche-arroz",
    "categoria": "duos",
    "nombre": "Dúo Marino",
    "descripcion": "Ceviche fresco acompañado de arroz con mariscos. Frescura y sazón caliente en una combinación que nunca falla.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Ceviche + arroz",
      "Popular"
    ],
    "destacado": true,
    "imagen": "assets/fotos/duo-marino-ceviche-arroz-mariscos.webp"
  },
  {
    "id": "duo-causa-atun-chaufa",
    "categoria": "duos",
    "nombre": "Dúo de causa",
    "descripcion": "Causa de atún suave y fresca con chaufa de mariscos sabroso. Una mezcla diferente, rendidora y con buen toque de casa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Causa + chaufa"
    ],
    "destacado": false,
    "imagen": "assets/fotos/duo-causa-atun-chaufa-mariscos.webp"
  },
  {
    "id": "triple-marino",
    "categoria": "triples",
    "nombre": "Triple marino",
    "descripcion": "Ceviche, chicharrón de pota y chaufa de mariscos. El plato completo para quienes quieren frescura, crocante y sabor en una sola vuelta.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Ceviche + chicharrón + chaufa",
      "Contundente"
    ],
    "destacado": true,
    "imagen": "assets/fotos/triple-marino-ceviche-chicharron-pota-chaufa-mariscos.webp"
  },
  {
    "id": "triple-con-causa",
    "categoria": "triples",
    "nombre": "Triple con causa",
    "descripcion": "Ceviche, causa y arroz con mariscos en una combinación bien servida. Fresco, cremoso y marino de principio a fin.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Ceviche + causa + arroz"
    ],
    "destacado": true,
    "imagen": "assets/fotos/triple-con-causa-ceviche-causa-arroz-mariscos.webp"
  },
  {
    "id": "triple-acevichado",
    "categoria": "triples",
    "nombre": "Triple acevichado",
    "descripcion": "Causa acevichada, chicharrón de pota y arroz con mariscos. Un triple con fuerza, textura y harto sabor.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Acevichado",
      "Especial"
    ],
    "destacado": false,
    "imagen": "assets/fotos/triple-acevichado-causa-chicharron-pota-arroz-mariscos.webp"
  },
  {
    "id": "pescado-frito",
    "categoria": "chicharrones",
    "nombre": "Pescado frito",
    "descripcion": "Cabrilla o cachema frita al punto, doradita y servida con guarnición de casa. Sencillo, sabroso y bien cumplidor.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Cabrilla o cachema",
      "Dorado"
    ],
    "destacado": true,
    "imagen": "assets/fotos/pescado-frito-cabrilla-cachema.webp"
  },
  {
    "id": "chicharron-pescado",
    "categoria": "chicharrones",
    "nombre": "Chicharrón de pescado",
    "descripcion": "Pescado crocante por fuera y jugoso por dentro. Ideal para compartir o acompañar con su toque de limón y salsa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Crocante",
      "Pescado"
    ],
    "destacado": false,
    "imagen": "assets/fotos/chicharron-pescado.webp"
  },
  {
    "id": "chicharron-pota",
    "categoria": "chicharrones",
    "nombre": "Chicharrón de pota",
    "descripcion": "Pota doradita, crocante y bien servida. Un clásico para los que buscan algo sabroso y contundente.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Crocante",
      "Pota"
    ],
    "destacado": true,
    "imagen": "assets/fotos/chicharron-pota.webp"
  },
  {
    "id": "sudado-pescado",
    "categoria": "sopas",
    "nombre": "Sudado de pescado",
    "descripcion": "Cabrilla o cachema en jugo criollo, con cebolla, tomate y sabor casero. Calientito, potente y con ese juguito que levanta.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Cabrilla o cachema",
      "Caliente"
    ],
    "destacado": true,
    "imagen": "assets/fotos/sudado-pescado-cabrilla-cachema.webp"
  },
  {
    "id": "parihuela-pescado",
    "categoria": "sopas",
    "nombre": "Parihuela de pescado",
    "descripcion": "Cabrilla o cachema en una sopa marina intensa, bien concentrada y con sabor de puerto. Para comer con calma y cuchara.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Cabrilla o cachema",
      "Potente"
    ],
    "destacado": false,
    "imagen": "assets/fotos/parihuela-pescado-cabrilla-cachema.webp"
  },
  {
    "id": "sopa-salvaje",
    "categoria": "entradas",
    "nombre": "Sopa salvaje",
    "descripcion": "Entrada caliente con sabor marino y carácter de casa. Perfecta para abrir el apetito con algo bien reconfortante.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Caliente",
      "Marino"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/sopa-salvaje.png"
  },
  {
    "id": "chilcano",
    "categoria": "entradas",
    "nombre": "Chilcano",
    "descripcion": "Caldito marino ligero, sabroso y preciso para empezar suave o acompañar la mesa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Ligero",
      "Caliente"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/chilcano.png"
  },
  {
    "id": "causa-atun",
    "categoria": "entradas",
    "nombre": "Causa de atún",
    "descripcion": "Causa suave y fresca con atún, servida al estilo de la casa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Fresca",
      "Con atún"
    ],
    "destacado": false,
    "imagen": "assets/fotos/duo-causa-atun-chaufa-mariscos.webp"
  },
  {
    "id": "causa-acevichada",
    "categoria": "entradas",
    "nombre": "Causa acevichada",
    "descripcion": "Causa con toque acevichado, fresca y con ese punto de limón que provoca.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Acevichada",
      "Fresca"
    ],
    "destacado": false,
    "imagen": "assets/fotos/triple-acevichado-causa-chicharron-pota-arroz-mariscos.webp"
  },
  {
    "id": "leche-tigre",
    "categoria": "entradas",
    "nombre": "Leche de tigre",
    "descripcion": "Concentrada, fresca y con carácter. Un golpe marino para prender el apetito.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Bien fría",
      "Potente"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/leche-tigre.png"
  },
  {
    "id": "leche-tigre-vip",
    "categoria": "entradas",
    "nombre": "Leche de tigre VIP",
    "descripcion": "Versión más servida y especial, con pescado y mariscos. Para empezar con todo.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Pescado y mariscos",
      "Especial"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/leche-tigre.png"
  },
  {
    "id": "ceviche-pescado-langostino",
    "categoria": "ceviches",
    "nombre": "Ceviche de pescado con langostino",
    "descripcion": "Ceviche fresco con langostino, limón al punto y sabor marino bien marcado.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Fresco",
      "Langostino"
    ],
    "destacado": false,
    "imagen": "assets/fotos/ceviche-mixto.webp"
  },
  {
    "id": "tiradito-pescado",
    "categoria": "ceviches",
    "nombre": "Tiradito de pescado",
    "descripcion": "Láminas de pescado con salsa fresca y sabor directo. Ligero, limpio y sabroso.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Láminas de pescado",
      "Fresco"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/tiradito-pescado.png"
  },
  {
    "id": "ceviche-chicharron-pota",
    "categoria": "chicharrones",
    "nombre": "Ceviche con chicharrón de pota",
    "descripcion": "Ceviche fresco con pota crocante. La mezcla de limón y fritura que siempre provoca.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Crocante",
      "Fresco"
    ],
    "destacado": false,
    "imagen": "assets/fotos/triple-marino-ceviche-chicharron-pota-chaufa-mariscos.webp"
  },
  {
    "id": "ceviche-chicharron-pescado",
    "categoria": "chicharrones",
    "nombre": "Ceviche con chicharrón de pescado",
    "descripcion": "Ceviche fresco acompañado de pescado crocante. Buena dupla para los que quieren fresco y frito.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Pescado crocante",
      "Fresco"
    ],
    "destacado": false,
    "imagen": "assets/fotos/chicharron-pescado.webp"
  },
  {
    "id": "ceviche-mixto-chicharron-pota",
    "categoria": "chicharrones",
    "nombre": "Ceviche mixto con chicharrón de pota",
    "descripcion": "Ceviche mixto con pota doradita. Una combinación marina con fuerza y textura.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Mixto",
      "Crocante"
    ],
    "destacado": false,
    "imagen": "assets/fotos/triple-acevichado-causa-chicharron-pota-arroz-mariscos.webp"
  },
  {
    "id": "ceviche-mixto-chicharron-pescado",
    "categoria": "chicharrones",
    "nombre": "Ceviche mixto con chicharrón de pescado",
    "descripcion": "Ceviche mixto acompañado de pescado crocante. Completo, sabroso y bien servido.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Mixto",
      "Pescado crocante"
    ],
    "destacado": false,
    "imagen": "assets/fotos/triple-marino.webp"
  },
  {
    "id": "ronda-marina",
    "categoria": "ronda",
    "nombre": "Ronda Marina",
    "descripcion": "Combinación grande de la casa para compartir. Ideal para probar varios sabores marinos en una sola ronda.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Surtido",
      "Contundente"
    ],
    "destacado": false,
    "imagen": "assets/fotos/triple-marino.webp"
  },
  {
    "id": "arroz-mariscos",
    "categoria": "arroces",
    "nombre": "Arroz con mariscos",
    "descripcion": "Arroz marino jugoso y bien sazonado, con sabor de casa y estilo chalaco.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Mariscos",
      "Bien servido"
    ],
    "destacado": false,
    "imagen": "assets/fotos/arroz-mariscos.webp"
  },
  {
    "id": "arroz-chaufa-mariscos",
    "categoria": "arroces",
    "nombre": "Arroz chaufa con mariscos",
    "descripcion": "Chaufa marino salteado, sabroso y rendidor. Una opción caliente que cae bien en cualquier mesa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      
    ],
    "destacado": false
  },
  {
    "id": "arroz-chaufa-langostino",
    "categoria": "arroces",
    "nombre": "Arroz chaufa con langostino",
    "descripcion": "Chaufa con langostino y sazón marina. Caliente, sabroso y bien servido.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      
    ],
    "destacado": false
  },
  {
    "id": "arroz-chaufa-pescado",
    "categoria": "arroces",
    "nombre": "Arroz chaufa con pescado",
    "descripcion": "Chaufa con pescado y toque de casa. Simple, sabroso y rendidor.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      
    ],
    "destacado": false
  },
  {
    "id": "pescado-a-lo-macho",
    "categoria": "arroces",
    "nombre": "Pescado a lo macho",
    "descripcion": "Pescado con salsa marina de carácter. Potente, sabroso y con buen golpe de sabor.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      
    ],
    "destacado": false
  },
  {
    "id": "jalea-mixta",
    "categoria": "chicharrones",
    "nombre": "Jalea mixta",
    "descripcion": "Fritura marina crocante y abundante, ideal para compartir con la mesa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Crocante",
      "Mixta"
    ],
    "destacado": false,
    "imagen": "assets/fotos/duo-marino.webp"
  },
  {
    "id": "jalea-especial",
    "categoria": "chicharrones",
    "nombre": "Jalea especial",
    "descripcion": "Jalea más completa, crocante y bien servida. Para los que vienen con hambre.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Especial",
      "Crocante"
    ],
    "destacado": false,
    "imagen": "assets/fotos/duo-marino-jalea-mixta-chaufa-mariscos.webp"
  },
  {
    "id": "filete-frito",
    "categoria": "chicharrones",
    "nombre": "Filete frito",
    "descripcion": "Filete dorado al punto, servido con acompañamiento de casa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Filete",
      "Crocante"
    ],
    "destacado": false,
    "imagen": "assets/fotos/pescado-frito.webp"
  },
  {
    "id": "parihuela-filete",
    "categoria": "sopas",
    "nombre": "Parihuela de pescado en filete",
    "descripcion": "Parihuela caliente con pescado en filete, concentrada y con sabor marino.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Filete",
      "Potente"
    ],
    "destacado": false,
    "imagen": "assets/fotos/parihuela-pescado-cabrilla-cachema.webp"
  },
  {
    "id": "sudado-filete",
    "categoria": "sopas",
    "nombre": "Sudado de pescado en filete",
    "descripcion": "Sudado en filete con jugo criollo y sabor casero.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Filete",
      "Casero"
    ],
    "destacado": false,
    "imagen": "assets/fotos/sudado-pescado-cabrilla-cachema.webp"
  },
  {
    "id": "chupe-pescado",
    "categoria": "sopas",
    "nombre": "Chupe de pescado",
    "descripcion": "Chupe cremoso y caliente con pescado, ideal para quienes buscan algo más contundente.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Cremoso",
      "Pescado"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/sopa-salvaje.png"
  },
  {
    "id": "chupe-langostinos",
    "categoria": "sopas",
    "nombre": "Chupe con langostinos",
    "descripcion": "Chupe con langostinos, sabor intenso y toque casero.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Cremoso",
      "Langostinos"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/sopa-salvaje.png"
  },
  {
    "id": "chupe-mixto",
    "categoria": "sopas",
    "nombre": "Chupe mixto",
    "descripcion": "Chupe marino mixto, bien servido y con sabor de casa.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Cremoso",
      "Mixto"
    ],
    "destacado": false,
    "imagen": "assets/fotos/parihuela-pescado-cabrilla-cachema.webp"
  },
  {
    "id": "lomo-saltado",
    "categoria": "extras",
    "nombre": "Lomo saltado",
    "descripcion": "Salteado criollo con papas y arroz. Una opción clásica para quien quiere salir del mar por un momento.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Clásico peruano",
      "Salteado"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/lomo-saltado.png"
  },
  {
    "id": "pollo-frito-papas",
    "categoria": "extras",
    "nombre": "Pollo frito con papas fritas",
    "descripcion": "Pollo dorado con papas, simple y cumplidor para todos los gustos.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Crocante",
      "Con papas"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/pollo-frito-papas.png"
  },
  {
    "id": "tallarin-saltado",
    "categoria": "extras",
    "nombre": "Tallarín saltado",
    "descripcion": "Tallarín salteado con sazón de casa, caliente y rendidor.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      "Salteado",
      "Con verduras"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/tallarin-saltado.png"
  },
  {
    "id": "porciones",
    "categoria": "extras",
    "nombre": "Guarniciones",
    "descripcion": "Porciones de arroz, yuca frita, cancha o camote para completar tu pedido.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      
    ],
    "destacado": false
  },
  {
    "id": "bebidas",
    "categoria": "bebidas",
    "nombre": "Bebidas",
    "descripcion": "Consulta disponibilidad de chicha morada, maracuyá, agua, gaseosas y cerveza.",
    "precio": null,
    "alergenos": [],
    "etiquetas": [
      
    ],
    "destacado": false
  }
];
