// ======================================================
// DATOS EDITABLES - ENCANTO MARINO D'MIRIAM
// Versión v21: precios cargados desde carta y efecto de cangrejo.
// Imagen solo cuando coincide con el plato o combinación indicada.
// Para actualizar precios: cambia precio: null por precio: 20
// ======================================================

const RESTAURANTE = {
  "nombre": "Encanto Marino D'Miriam",
  "telefonoWhatsapp": "51998101944",
  "whatsapp": "51998101944",
  "ubicacion": "Av. Alameda, Mercado Amarillo, puesto 126 (Gambetta Baja) - Callao",
  "googleMaps": "https://www.google.com/maps/search/?api=1&query=Mercado%20Amarillo%20puesto%20126%20Gambetta%20Baja%20Callao",
  "horario": "9:30 a. m. a 4:00 p. m.",
  "metodosPago": "Yape, tarjeta y efectivo",
  "servicios": "Atención en mesas, reserva previa y recojo coordinado por WhatsApp",
  "recomendados": ["Sopa salvaje", "Dúos marinos", "Causa acevichada"]
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
    "id": "combinados",
    "nombre": "Combinados"
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
    "id": "leche-tigre",
    "categoria": "entradas",
    "nombre": "Leche de tigre",
    "descripcion": "Concentrada, fresca y con carácter. Un golpe marino para prender el apetito.",
    "precio": 12,
    "alergenos": [],
    "etiquetas": [
      "Potente",
      "Fría"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/leche-tigre.png"
  },
  {
    "id": "leche-tigre-vip",
    "categoria": "entradas",
    "nombre": "Leche de tigre VIP",
    "descripcion": "Leche de tigre VIP con pescado y mariscos. Más servida, más intensa y bien marina.",
    "precio": 14,
    "alergenos": [],
    "etiquetas": [
      "VIP",
      "Pescado y mariscos"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/leche-tigre.png"
  },
  {
    "id": "sopa-salvaje",
    "categoria": "entradas",
    "nombre": "Sopa salvaje",
    "descripcion": "Entrada caliente de la casa, reconfortante y con sabor marino para abrir el apetito.",
    "precio": 8,
    "alergenos": [],
    "etiquetas": [
      "Caliente",
      "Recomendado"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/sopa-salvaje.png"
  },
  {
    "id": "causa-acevichada",
    "categoria": "entradas",
    "nombre": "Causa acevichada",
    "descripcion": "Causa con toque acevichado, fresca y con punto de limón. Una de las recomendadas de la casa.",
    "precio": 15,
    "alergenos": [],
    "etiquetas": [
      "Acevichada",
      "Recomendada"
    ],
    "destacado": false
  },
  {
    "id": "causa-atun",
    "categoria": "entradas",
    "nombre": "Causa de atún",
    "descripcion": "Causa suave y fresca con atún, servida al estilo de la casa.",
    "precio": 7,
    "alergenos": [],
    "etiquetas": [
      "Fresca",
      "Atún"
    ],
    "destacado": false
  },
  {
    "id": "ceviche-conchas-negras",
    "categoria": "ceviches",
    "nombre": "Ceviche de conchas negras",
    "descripcion": "Ceviche intenso, con carácter y sabor profundo. Una opción brava para quienes disfrutan sabores marinos más fuertes.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Intenso",
      "Especial"
    ],
    "destacado": false,
    "imagen": "assets/fotos/ceviche-conchas-negras.webp"
  },
  {
    "id": "ceviche-pescado",
    "categoria": "ceviches",
    "nombre": "Ceviche de pescado",
    "descripcion": "Pescado fresco con limón al punto, cebolla, choclo y acompañamiento clásico. Un ceviche directo, sabroso y con golpe chalaco.",
    "precio": 20,
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
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Mixto",
      "Marino"
    ],
    "destacado": true,
    "imagen": "assets/fotos/ceviche-mixto.webp"
  },
  {
    "id": "tiradito-pescado",
    "categoria": "ceviches",
    "nombre": "Tiradito de pescado",
    "descripcion": "Láminas de pescado con salsa fresca y sabor directo. Ligero, limpio y sabroso.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Láminas de pescado",
      "Fresco"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/tiradito-pescado.png"
  },
  {
    "id": "ceviche-pescado-langostino",
    "categoria": "ceviches",
    "nombre": "Ceviche de pescado con langostino",
    "descripcion": "Ceviche de pescado con langostino, limón al punto y sabor marino bien marcado.",
    "precio": 23,
    "alergenos": [],
    "etiquetas": [
      "Fresco",
      "Langostino"
    ],
    "destacado": false
  },
  {
    "id": "ceviche-chicharron-pescado",
    "categoria": "combinados",
    "nombre": "Ceviche con chicharrón de pescado",
    "descripcion": "Ceviche fresco acompañado de chicharrón de pescado crocante.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Pescado crocante",
      "Fresco"
    ],
    "destacado": false
  },
  {
    "id": "ceviche-chicharron-pota",
    "categoria": "combinados",
    "nombre": "Ceviche con chicharrón de pota",
    "descripcion": "Ceviche fresco acompañado de chicharrón de pota crocante.",
    "precio": 18,
    "alergenos": [],
    "etiquetas": [
      "Crocante",
      "Fresco"
    ],
    "destacado": false
  },
  {
    "id": "ceviche-mixto-chicharron-pescado",
    "categoria": "combinados",
    "nombre": "Ceviche mixto con chicharrón de pescado",
    "descripcion": "Ceviche mixto acompañado de chicharrón de pescado crocante.",
    "precio": 24,
    "alergenos": [],
    "etiquetas": [
      "Mixto",
      "Pescado crocante"
    ],
    "destacado": false
  },
  {
    "id": "ceviche-mixto-chicharron-pota",
    "categoria": "combinados",
    "nombre": "Ceviche mixto con chicharrón de pota",
    "descripcion": "Ceviche mixto acompañado de chicharrón de pota doradito.",
    "precio": 24,
    "alergenos": [],
    "etiquetas": [
      "Mixto",
      "Crocante"
    ],
    "destacado": false
  },
  {
    "id": "duo-causa-atun-chaufa",
    "categoria": "duos",
    "nombre": "Dúo marino: causa + chaufa de mariscos",
    "descripcion": "Causa de atún acompañada de chaufa de mariscos. Un dúo rendidor, fresco y sabroso.",
    "precio": 24,
    "alergenos": [],
    "etiquetas": [
      "Causa",
      "Chaufa"
    ],
    "destacado": false,
    "imagen": "assets/fotos/duo-causa-atun-chaufa-mariscos.webp"
  },
  {
    "id": "duo-marino-ceviche-arroz",
    "categoria": "duos",
    "nombre": "Dúo marino: ceviche + arroz con mariscos",
    "descripcion": "Ceviche fresco acompañado de arroz con mariscos. Frescura y sazón caliente en una combinación que nunca falla.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Ceviche",
      "Arroz con mariscos"
    ],
    "destacado": true,
    "imagen": "assets/fotos/duo-marino-ceviche-arroz-mariscos.webp"
  },
  {
    "id": "duo-marino-jalea-chaufa",
    "categoria": "duos",
    "nombre": "Dúo marino: jalea mixta + chaufa de mariscos",
    "descripcion": "Jalea mixta crocante acompañada de chaufa de mariscos. Una dupla contundente, sabrosa y bien servida.",
    "precio": 25,
    "alergenos": [],
    "etiquetas": [
      "Jalea",
      "Chaufa"
    ],
    "destacado": true,
    "imagen": "assets/fotos/duo-marino-jalea-mixta-chaufa-mariscos.webp"
  },
  {
    "id": "duo-causa-arroz",
    "categoria": "duos",
    "nombre": "Dúo marino: causa + arroz con mariscos",
    "descripcion": "Causa de la casa con arroz con mariscos. Cremoso, caliente y sabroso.",
    "precio": 24,
    "alergenos": [],
    "etiquetas": [
      "Causa",
      "Arroz"
    ],
    "destacado": false
  },
  {
    "id": "duo-ceviche-chaufa-cecina",
    "categoria": "duos",
    "nombre": "Dúo marino: ceviche + chaufa de cecina",
    "descripcion": "Ceviche fresco acompañado de chaufa de cecina. Un cruce marino y selvático con buen sabor.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Ceviche",
      "Cecina"
    ],
    "destacado": false
  },
  {
    "id": "duo-marino-ceviche-chaufa",
    "categoria": "duos",
    "nombre": "Dúo marino: ceviche + chaufa de mariscos",
    "descripcion": "Ceviche fresco acompañado de chaufa de mariscos. Una combinación marina, rendidora y bien servida.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Ceviche",
      "Chaufa"
    ],
    "destacado": false
  },
  {
    "id": "duo-marino-ceviche-jalea",
    "categoria": "duos",
    "nombre": "Dúo marino: ceviche + jalea mixta",
    "descripcion": "Ceviche fresco con jalea mixta crocante. Frío y caliente en un solo plato.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Ceviche",
      "Jalea"
    ],
    "destacado": false
  },
  {
    "id": "duo-jalea-arroz",
    "categoria": "duos",
    "nombre": "Dúo marino: jalea mixta + arroz con mariscos",
    "descripcion": "Jalea mixta crocante acompañada de arroz con mariscos. Contundente y sabroso.",
    "precio": 25,
    "alergenos": [],
    "etiquetas": [
      "Jalea",
      "Arroz"
    ],
    "destacado": false
  },
  {
    "id": "duo-sopa-arroz",
    "categoria": "duos",
    "nombre": "Dúo marino: sopa salvaje + arroz con mariscos",
    "descripcion": "Sopa salvaje acompañada de arroz con mariscos. Calor, sazón y sabor marino.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Sopa salvaje",
      "Arroz"
    ],
    "destacado": false
  },
  {
    "id": "duo-sopa-chaufa",
    "categoria": "duos",
    "nombre": "Dúo marino: sopa salvaje + chaufa de mariscos",
    "descripcion": "Sopa salvaje con chaufa de mariscos. Bien servido y con sabor de casa.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Sopa salvaje",
      "Chaufa"
    ],
    "destacado": false
  },
  {
    "id": "duo-sopa-jalea",
    "categoria": "duos",
    "nombre": "Dúo marino: sopa salvaje + jalea mixta",
    "descripcion": "Sopa salvaje caliente con jalea mixta crocante. Un dúo con fuerza para quedar satisfecho.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Sopa salvaje",
      "Jalea"
    ],
    "destacado": false
  },
  {
    "id": "triple-con-causa",
    "categoria": "triples",
    "nombre": "Triple Causa",
    "descripcion": "Ceviche, causa y arroz con mariscos o chaufa. Fresco, cremoso y marino de principio a fin.",
    "precio": 28,
    "alergenos": [],
    "etiquetas": [
      "Ceviche",
      "Causa",
      "Arroz o chaufa"
    ],
    "destacado": true,
    "imagen": "assets/fotos/triple-con-causa-ceviche-causa-arroz-mariscos.webp"
  },
  {
    "id": "triple-acevichado",
    "categoria": "triples",
    "nombre": "Triple Causa Acevichada",
    "descripcion": "Causa acevichada, chicharrón de pota y arroz con mariscos o chaufa. Un triple con fuerza, textura y harto sabor.",
    "precio": 30,
    "alergenos": [],
    "etiquetas": [
      "Causa acevichada",
      "Chicharrón de pota"
    ],
    "destacado": false,
    "imagen": "assets/fotos/triple-acevichado-causa-chicharron-pota-arroz-mariscos.webp"
  },
  {
    "id": "triple-marino",
    "categoria": "triples",
    "nombre": "Triple Marino 1",
    "descripcion": "Ceviche, chicharrón de pota y arroz con mariscos o chaufa. El plato completo para quienes quieren frescura, crocante y sabor.",
    "precio": 27,
    "alergenos": [],
    "etiquetas": [
      "Ceviche",
      "Chicharrón de pota",
      "Arroz o chaufa"
    ],
    "destacado": true,
    "imagen": "assets/fotos/triple-marino-ceviche-chicharron-pota-chaufa-mariscos.webp"
  },
  {
    "id": "triple-sopa-salvaje",
    "categoria": "triples",
    "nombre": "Triple con Sopa Salvaje",
    "descripcion": "Sopa salvaje con ceviche, arroz con mariscos o chaufa, causa y chicharrón de pota. Una opción completa y contundente.",
    "precio": 27,
    "alergenos": [],
    "etiquetas": [
      "Sopa salvaje",
      "Completo"
    ],
    "destacado": false
  },
  {
    "id": "triple-marino-pescado",
    "categoria": "triples",
    "nombre": "Triple Marino 2",
    "descripcion": "Ceviche, chicharrón de pescado y arroz con mariscos o chaufa. Más contundente, crocante y bien marino.",
    "precio": 30,
    "alergenos": [],
    "etiquetas": [
      "Ceviche",
      "Chicharrón de pescado",
      "Arroz o chaufa"
    ],
    "destacado": false
  },
  {
    "id": "ronda-marina",
    "categoria": "ronda",
    "nombre": "Ronda Marina",
    "descripcion": "Ronda marina completa con ceviche, causa, chicharrón de pescado, arroz con mariscos y chaufa de mariscos. Ideal para compartir.",
    "precio": 48,
    "alergenos": [],
    "etiquetas": [
      "Para compartir",
      "Completa"
    ],
    "destacado": false
  },
  {
    "id": "arroz-mariscos",
    "categoria": "arroces",
    "nombre": "Arroz con mariscos",
    "descripcion": "Arroz marino jugoso y bien sazonado, con sabor de casa y estilo chalaco.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Mariscos",
      "Bien servido"
    ],
    "destacado": false,
    "imagen": "assets/fotos/arroz-mariscos.webp"
  },
  {
    "id": "arroz-chaufa-langostino",
    "categoria": "arroces",
    "nombre": "Arroz chaufa con langostino",
    "descripcion": "Arroz chaufa con langostino, caliente y con sazón marina.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Chaufa",
      "Langostino"
    ],
    "destacado": false
  },
  {
    "id": "arroz-chaufa-mariscos",
    "categoria": "arroces",
    "nombre": "Arroz chaufa con mariscos",
    "descripcion": "Arroz chaufa con mariscos, salteado, sabroso y rendidor.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Chaufa",
      "Mariscos"
    ],
    "destacado": false
  },
  {
    "id": "arroz-chaufa-pescado",
    "categoria": "arroces",
    "nombre": "Arroz chaufa con pescado",
    "descripcion": "Arroz chaufa con pescado, simple, sabroso y rendidor.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Chaufa",
      "Pescado"
    ],
    "destacado": false
  },
  {
    "id": "arroz-mariscos-leche-tigre",
    "categoria": "arroces",
    "nombre": "Arroz con mariscos + leche de tigre",
    "descripcion": "Arroz con mariscos acompañado de leche de tigre. Sabor caliente con golpe fresco.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Arroz",
      "Leche de tigre"
    ],
    "destacado": false
  },
  {
    "id": "chaufa-cecina",
    "categoria": "arroces",
    "nombre": "Chaufa de cecina",
    "descripcion": "Chaufa con cecina, salteado al estilo de la casa.",
    "precio": 15,
    "alergenos": [],
    "etiquetas": [
      "Cecina",
      "Selvático"
    ],
    "destacado": false
  },
  {
    "id": "chaufa-selvatico",
    "categoria": "arroces",
    "nombre": "Chaufa selvático",
    "descripcion": "Chaufa con cecina y chorizo. Sabroso, contundente y diferente.",
    "precio": 16,
    "alergenos": [],
    "etiquetas": [
      "Cecina",
      "Chorizo"
    ],
    "destacado": false
  },
  {
    "id": "pescado-a-lo-macho",
    "categoria": "arroces",
    "nombre": "Pescado a lo macho",
    "descripcion": "Pescado bañado en salsa marina de carácter, potente y bien servido.",
    "precio": 25,
    "alergenos": [],
    "etiquetas": [
      "Salsa marina",
      "Potente"
    ],
    "destacado": false
  },
  {
    "id": "chicharron-pescado",
    "categoria": "chicharrones",
    "nombre": "Chicharrón de pescado",
    "descripcion": "Pescado crocante por fuera y jugoso por dentro. Ideal para compartir o acompañar con limón y salsa.",
    "precio": 25,
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
    "descripcion": "Pota doradita, crocante y bien servida. Precio base según carta.",
    "precio": 10,
    "alergenos": [],
    "etiquetas": [
      "Pota",
      "Crocante"
    ],
    "destacado": false,
    "imagen": "assets/fotos/chicharron-pota.webp"
  },
  {
    "id": "pescado-frito",
    "categoria": "chicharrones",
    "nombre": "Pescado frito - cabrilla o cachema",
    "descripcion": "Cabrilla o cachema frita al punto, doradita y servida con guarnición de casa.",
    "precio": 24,
    "alergenos": [],
    "etiquetas": [
      "Cabrilla o cachema",
      "Dorado"
    ],
    "destacado": false,
    "imagen": "assets/fotos/pescado-frito-cabrilla-cachema.webp"
  },
  {
    "id": "chicharron-pota-grande",
    "categoria": "chicharrones",
    "nombre": "Chicharrón de pota grande",
    "descripcion": "Pota doradita y crocante en porción grande.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Pota",
      "Grande"
    ],
    "destacado": false
  },
  {
    "id": "chicharron-pota-mediano",
    "categoria": "chicharrones",
    "nombre": "Chicharrón de pota mediano",
    "descripcion": "Pota doradita y crocante en porción mediana.",
    "precio": 15,
    "alergenos": [],
    "etiquetas": [
      "Pota",
      "Mediano"
    ],
    "destacado": false
  },
  {
    "id": "filete-frito",
    "categoria": "chicharrones",
    "nombre": "Filete frito",
    "descripcion": "Filete de pescado frito al punto, doradito y con acompañamiento de casa.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Filete",
      "Crocante"
    ],
    "destacado": false
  },
  {
    "id": "jalea-encanto-marino",
    "categoria": "chicharrones",
    "nombre": "Jalea El Encanto Marino",
    "descripcion": "Jalea especial de la casa, más contundente y con buena variedad marina.",
    "precio": 37,
    "alergenos": [],
    "etiquetas": [
      "Especial",
      "Casa"
    ],
    "destacado": false
  },
  {
    "id": "jalea-especial",
    "categoria": "chicharrones",
    "nombre": "Jalea especial con mariscos",
    "descripcion": "Jalea especial con mariscos, crocante y bien servida.",
    "precio": 25,
    "alergenos": [],
    "etiquetas": [
      "Especial",
      "Crocante"
    ],
    "destacado": false
  },
  {
    "id": "jalea-mixta",
    "categoria": "chicharrones",
    "nombre": "Jalea mixta",
    "descripcion": "Jalea mixta crocante y abundante, ideal para compartir con la mesa.",
    "precio": 23,
    "alergenos": [],
    "etiquetas": [
      "Crocante",
      "Mixta"
    ],
    "destacado": false
  },
  {
    "id": "pescado-frito-doncella",
    "categoria": "chicharrones",
    "nombre": "Pescado frito - doncella",
    "descripcion": "Doncella frita al punto, doradita y servida con guarnición de casa.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Doncella",
      "Dorado"
    ],
    "destacado": false
  },
  {
    "id": "chilcano",
    "categoria": "sopas",
    "nombre": "Chilcano de pescado",
    "descripcion": "Caldito marino ligero y sabroso para empezar suave o acompañar la mesa.",
    "precio": 6,
    "alergenos": [],
    "etiquetas": [
      "Caldo",
      "Pescado"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/chilcano.png"
  },
  {
    "id": "parihuela-pescado",
    "categoria": "sopas",
    "nombre": "Parihuela - pescado entero",
    "descripcion": "Parihuela caliente con pescado entero, concentrada y con sabor marino.",
    "precio": 30,
    "alergenos": [],
    "etiquetas": [
      "Pescado entero",
      "Potente"
    ],
    "destacado": false,
    "imagen": "assets/fotos/parihuela-pescado-cabrilla-cachema.webp"
  },
  {
    "id": "sudado-pescado",
    "categoria": "sopas",
    "nombre": "Sudado - pescado entero",
    "descripcion": "Pescado entero en jugo criollo, con cebolla, tomate y sabor casero.",
    "precio": 24,
    "alergenos": [],
    "etiquetas": [
      "Pescado entero",
      "Caliente"
    ],
    "destacado": false,
    "imagen": "assets/fotos/sudado-pescado-cabrilla-cachema.webp"
  },
  {
    "id": "chilcano-acevichado",
    "categoria": "sopas",
    "nombre": "Chilcano acevichado",
    "descripcion": "Chilcano con toque acevichado, sabroso y reconfortante.",
    "precio": 10,
    "alergenos": [],
    "etiquetas": [
      "Acevichado",
      "Caldo"
    ],
    "destacado": false
  },
  {
    "id": "chilcano-especial",
    "categoria": "sopas",
    "nombre": "Chilcano especial",
    "descripcion": "Chilcano más servido, caliente y con sabor marino de casa.",
    "precio": 10,
    "alergenos": [],
    "etiquetas": [
      "Especial",
      "Caldo"
    ],
    "destacado": false
  },
  {
    "id": "chupe-langostinos",
    "categoria": "sopas",
    "nombre": "Chupe con langostinos",
    "descripcion": "Chupe cremoso con langostinos y sabor de casa.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Cremoso",
      "Langostinos"
    ],
    "destacado": false
  },
  {
    "id": "chupe-pescado",
    "categoria": "sopas",
    "nombre": "Chupe de pescado",
    "descripcion": "Chupe cremoso y caliente con pescado.",
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Cremoso",
      "Pescado"
    ],
    "destacado": false
  },
  {
    "id": "chupe-mixto",
    "categoria": "sopas",
    "nombre": "Chupe mixto",
    "descripcion": "Chupe mixto con pescado y langostino, bien servido y con sabor de casa.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Cremoso",
      "Mixto"
    ],
    "destacado": false
  },
  {
    "id": "parihuela-filete",
    "categoria": "sopas",
    "nombre": "Parihuela - pescado en filete",
    "descripcion": "Parihuela caliente con pescado en filete, concentrada y con sabor marino.",
    "precio": 30,
    "alergenos": [],
    "etiquetas": [
      "Filete",
      "Potente"
    ],
    "destacado": false
  },
  {
    "id": "sudado-filete",
    "categoria": "sopas",
    "nombre": "Sudado - pescado en filete",
    "descripcion": "Sudado de pescado en filete con jugo criollo y sabor casero.",
    "precio": 22,
    "alergenos": [],
    "etiquetas": [
      "Filete",
      "Casero"
    ],
    "destacado": false
  },
  {
    "id": "lomo-saltado",
    "categoria": "extras",
    "nombre": "Lomo saltado - pollo o carne",
    "descripcion": "Salteado criollo con papas y arroz. Puede ser de pollo o carne.",
    "precio": 20,
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
    "descripcion": "Pollo dorado con papas fritas, simple y cumplidor para todos los gustos.",
    "precio": 20,
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
    "precio": 20,
    "alergenos": [],
    "etiquetas": [
      "Salteado",
      "Con verduras"
    ],
    "destacado": false,
    "imagen": "assets/fotos/generadas/tallarin-saltado.png"
  },
  {
    "id": "porcion-arroz",
    "categoria": "extras",
    "nombre": "Porción de arroz",
    "descripcion": "Porción adicional de arroz para completar el pedido.",
    "precio": 3.5,
    "alergenos": [],
    "etiquetas": [
      "Guarnición"
    ],
    "destacado": false
  },
  {
    "id": "porcion-camote",
    "categoria": "extras",
    "nombre": "Porción de camote",
    "descripcion": "Porción de camote para acompañar.",
    "precio": 3,
    "alergenos": [],
    "etiquetas": [
      "Guarnición"
    ],
    "destacado": false
  },
  {
    "id": "porcion-cancha",
    "categoria": "extras",
    "nombre": "Porción de cancha",
    "descripcion": "Porción de cancha para acompañar.",
    "precio": 3,
    "alergenos": [],
    "etiquetas": [
      "Guarnición"
    ],
    "destacado": false
  },
  {
    "id": "porcion-yuca-frita",
    "categoria": "extras",
    "nombre": "Porción de yuca frita",
    "descripcion": "Porción de yuca frita doradita.",
    "precio": 5,
    "alergenos": [],
    "etiquetas": [
      "Guarnición"
    ],
    "destacado": false
  },
  {
    "id": "agua-mineral",
    "categoria": "bebidas",
    "nombre": "Agua mineral",
    "descripcion": "Agua mineral para acompañar el consumo.",
    "precio": 1.5,
    "alergenos": [],
    "etiquetas": [
      "Bebida"
    ],
    "destacado": false
  },
  {
    "id": "cerveza-cusquena-trigo",
    "categoria": "bebidas",
    "nombre": "Cerveza Cusqueña o Trigo",
    "descripcion": "Cerveza Cusqueña o de trigo según disponibilidad.",
    "precio": 9,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "Cerveza"
    ],
    "destacado": false
  },
  {
    "id": "cerveza-pilsen",
    "categoria": "bebidas",
    "nombre": "Cerveza Pilsen",
    "descripcion": "Cerveza Pilsen según disponibilidad.",
    "precio": 8,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "Cerveza"
    ],
    "destacado": false
  },
  {
    "id": "chicha-jora-1l",
    "categoria": "bebidas",
    "nombre": "Chicha de jora 1 litro",
    "descripcion": "Chicha de jora para compartir.",
    "precio": 13,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1 litro"
    ],
    "destacado": false
  },
  {
    "id": "chicha-jora-medio",
    "categoria": "bebidas",
    "nombre": "Chicha de jora 1/2 litro",
    "descripcion": "Chicha de jora en presentación de medio litro.",
    "precio": 6.5,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1/2 litro"
    ],
    "destacado": false
  },
  {
    "id": "chicha-morada-1l",
    "categoria": "bebidas",
    "nombre": "Chicha morada 1 litro",
    "descripcion": "Chicha morada para compartir.",
    "precio": 10,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1 litro"
    ],
    "destacado": false
  },
  {
    "id": "chicha-morada-medio",
    "categoria": "bebidas",
    "nombre": "Chicha morada 1/2 litro",
    "descripcion": "Chicha morada en presentación de medio litro.",
    "precio": 5,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1/2 litro"
    ],
    "destacado": false
  },
  {
    "id": "gaseosa-1l",
    "categoria": "bebidas",
    "nombre": "Gaseosa de 1 litro",
    "descripcion": "Gaseosa de 1 litro según disponibilidad.",
    "precio": 7,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1 litro"
    ],
    "destacado": false
  },
  {
    "id": "gaseosa-1-5l",
    "categoria": "bebidas",
    "nombre": "Gaseosa de 1 litro y medio",
    "descripcion": "Gaseosa de 1 litro y medio según disponibilidad.",
    "precio": 8.5,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1.5 litros"
    ],
    "destacado": false
  },
  {
    "id": "gaseosa-gordita-jumbo",
    "categoria": "bebidas",
    "nombre": "Gaseosa gordita o jumbo",
    "descripcion": "Gaseosa gordita o jumbo según disponibilidad.",
    "precio": 5,
    "alergenos": [],
    "etiquetas": [
      "Bebida"
    ],
    "destacado": false
  },
  {
    "id": "gaseosa-personal",
    "categoria": "bebidas",
    "nombre": "Gaseosa personal",
    "descripcion": "Gaseosa personal para acompañar el pedido.",
    "precio": 2.5,
    "alergenos": [],
    "etiquetas": [
      "Bebida"
    ],
    "destacado": false
  },
  {
    "id": "maracuya-1l",
    "categoria": "bebidas",
    "nombre": "Maracuyá 1 litro",
    "descripcion": "Bebida fresca de maracuyá para compartir.",
    "precio": 10,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1 litro"
    ],
    "destacado": false
  },
  {
    "id": "maracuya-medio",
    "categoria": "bebidas",
    "nombre": "Maracuyá 1/2 litro",
    "descripcion": "Bebida fresca de maracuyá en presentación de medio litro.",
    "precio": 5,
    "alergenos": [],
    "etiquetas": [
      "Bebida",
      "1/2 litro"
    ],
    "destacado": false
  }
];
