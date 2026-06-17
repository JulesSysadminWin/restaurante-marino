// ======================================================
// DATOS EDITABLES - ENCANTO MARINO D'MIRIAM
// Para actualizar precios en el futuro, cambia solo "precio".
// Ejemplo: precio: 20
// Si aún no hay precio final, deja: precio: null
// ======================================================

const RESTAURANTE = {
  nombre: "Cevichería Encanto Marino D'Miriam",
  subtitulo: "Sabor marino, fresco y de casa en el Callao",
  telefonoWhatsapp: "51977430832",
  ubicacion: "Av. Alameda, Mercado Amarillo, puesto - Callao",
  googleMaps: "https://www.google.com/maps/search/?api=1&query=Mercado%20Amarillo%20Callao%20Av.%20Alameda",
  horario: "Horario por confirmar",
  mensajePrecios: "Carta en actualización. Los precios finales deben confirmarse con el local."
};

const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "ceviches", nombre: "Ceviches" },
  { id: "entradas", nombre: "Entradas y piqueos" },
  { id: "arroces", nombre: "Arroces" },
  { id: "jaleas", nombre: "Chicharrones y jaleas" },
  { id: "sopas", nombre: "Sopas y sudados" },
  { id: "combos", nombre: "Combos" }
];

const ALERGENOS = [
  { id: "pescado", nombre: "Pescado" },
  { id: "mariscos", nombre: "Mariscos" },
  { id: "huevo", nombre: "Huevo" },
  { id: "gluten", nombre: "Gluten/frituras" },
  { id: "lacteos", nombre: "Lácteos" },
  { id: "picante", nombre: "Picante" }
];

const PLATOS = [
  {
    id: "ceviche-pescado",
    categoria: "ceviches",
    nombre: "Ceviche de pescado",
    descripcion: "Pescado fresco, limón, cebolla y acompañamientos marinos.",
    precio: null,
    imagen: "assets/fotos/ceviche-fresco.webp",
    alergenos: ["pescado", "picante"],
    etiquetas: ["Fresco", "Recomendado"],
    destacado: true
  },
  {
    id: "ceviche-especial",
    categoria: "ceviches",
    nombre: "Ceviche especial",
    descripcion: "Ceviche con combinación marina de la casa.",
    precio: null,
    imagen: "assets/fotos/ceviche-fresco.webp",
    alergenos: ["pescado", "mariscos", "picante"],
    etiquetas: ["Especial"],
    destacado: false
  },
  {
    id: "ceviche-mixto",
    categoria: "ceviches",
    nombre: "Ceviche mixto",
    descripcion: "Pescado y mariscos en preparación fresca.",
    precio: null,
    imagen: "assets/fotos/combinado-marino.webp",
    alergenos: ["pescado", "mariscos", "picante"],
    etiquetas: ["Marino"],
    destacado: true
  },
  {
    id: "ceviche-chicharron-pota",
    categoria: "ceviches",
    nombre: "Ceviche con chicharrón de pota",
    descripcion: "Ceviche acompañado con chicharrón crocante de pota.",
    precio: null,
    imagen: "assets/fotos/duo-marino.webp",
    alergenos: ["pescado", "mariscos", "gluten", "picante"],
    etiquetas: ["Combinado"],
    destacado: false
  },
  {
    id: "ronda-marina",
    categoria: "ceviches",
    nombre: "Ronda marina",
    descripcion: "Combinación marina para compartir.",
    precio: null,
    imagen: "assets/fotos/triple-marino.webp",
    alergenos: ["pescado", "mariscos", "gluten", "huevo", "picante"],
    etiquetas: ["Para compartir"],
    destacado: true
  },
  {
    id: "leche-tigre",
    categoria: "entradas",
    nombre: "Leche de tigre",
    descripcion: "Entrada marina concentrada, fresca y potente.",
    precio: null,
    imagen: "assets/fotos/ceviche-fresco.webp",
    alergenos: ["pescado", "picante"],
    etiquetas: ["Entrada"],
    destacado: false
  },
  {
    id: "leche-tigre-vip",
    categoria: "entradas",
    nombre: "Leche de tigre VIP",
    descripcion: "Versión especial con pescados y mariscos.",
    precio: null,
    imagen: "assets/fotos/combinado-marino.webp",
    alergenos: ["pescado", "mariscos", "picante"],
    etiquetas: ["VIP"],
    destacado: false
  },
  {
    id: "causa-atun",
    categoria: "entradas",
    nombre: "Causa de atún",
    descripcion: "Causa fría con atún y acompañamiento de casa.",
    precio: null,
    imagen: "assets/fotos/ceviche-fresco.webp",
    alergenos: ["pescado", "huevo"],
    etiquetas: ["Entrada"],
    destacado: false
  },
  {
    id: "duo-marino",
    categoria: "combos",
    nombre: "Dúo marino",
    descripcion: "Combinación de ceviche y arroz con mariscos o jalea mixta.",
    precio: null,
    imagen: "assets/fotos/duo-marino.webp",
    alergenos: ["pescado", "mariscos", "gluten", "huevo", "picante"],
    etiquetas: ["Combo", "Popular"],
    destacado: true
  },
  {
    id: "triple-marino",
    categoria: "combos",
    nombre: "Triple marino",
    descripcion: "Combinación de ceviche, chicharrón y arroz marino.",
    precio: null,
    imagen: "assets/fotos/triple-marino.webp",
    alergenos: ["pescado", "mariscos", "gluten", "huevo", "picante"],
    etiquetas: ["Combo"],
    destacado: true
  },
  {
    id: "arroz-mariscos",
    categoria: "arroces",
    nombre: "Arroz con mariscos",
    descripcion: "Arroz marino con sabor criollo y mariscos.",
    precio: null,
    imagen: "assets/fotos/arroz-mariscos.webp",
    alergenos: ["mariscos"],
    etiquetas: ["Caliente"],
    destacado: true
  },
  {
    id: "chaufa-mariscos",
    categoria: "arroces",
    nombre: "Arroz chaufa con mariscos",
    descripcion: "Chaufa con toque marino y verduras.",
    precio: null,
    imagen: "assets/fotos/arroz-mariscos.webp",
    alergenos: ["mariscos", "huevo"],
    etiquetas: ["Chaufa"],
    destacado: false
  },
  {
    id: "chaufa-pescado",
    categoria: "arroces",
    nombre: "Arroz chaufa de pescado",
    descripcion: "Chaufa con pescado y sazón de casa.",
    precio: null,
    imagen: "assets/fotos/duo-marino.webp",
    alergenos: ["pescado", "huevo"],
    etiquetas: ["Chaufa"],
    destacado: false
  },
  {
    id: "pescado-lo-macho",
    categoria: "arroces",
    nombre: "Pescado a lo macho",
    descripcion: "Pescado con salsa marina.",
    precio: null,
    imagen: "assets/fotos/pescado-frito.webp",
    alergenos: ["pescado", "mariscos", "lacteos"],
    etiquetas: ["Especial"],
    destacado: false
  },
  {
    id: "chicharron-pota",
    categoria: "jaleas",
    nombre: "Chicharrón de pota",
    descripcion: "Pota crocante, ideal para compartir.",
    precio: null,
    imagen: "assets/fotos/duo-marino.webp",
    alergenos: ["mariscos", "gluten"],
    etiquetas: ["Frito"],
    destacado: false
  },
  {
    id: "chicharron-pescado",
    categoria: "jaleas",
    nombre: "Chicharrón de pescado",
    descripcion: "Pescado crocante acompañado con guarnición.",
    precio: null,
    imagen: "assets/fotos/pescado-frito.webp",
    alergenos: ["pescado", "gluten"],
    etiquetas: ["Frito"],
    destacado: false
  },
  {
    id: "jalea-mixta",
    categoria: "jaleas",
    nombre: "Jalea mixta",
    descripcion: "Fritura marina crocante con acompañamientos.",
    precio: null,
    imagen: "assets/fotos/duo-marino.webp",
    alergenos: ["pescado", "mariscos", "gluten"],
    etiquetas: ["Crocante"],
    destacado: true
  },
  {
    id: "jalea-especial",
    categoria: "jaleas",
    nombre: "Jalea especial",
    descripcion: "Versión especial de jalea con combinación marina.",
    precio: null,
    imagen: "assets/fotos/triple-marino.webp",
    alergenos: ["pescado", "mariscos", "gluten"],
    etiquetas: ["Especial"],
    destacado: false
  },
  {
    id: "pescado-frito",
    categoria: "jaleas",
    nombre: "Pescado frito",
    descripcion: "Pescado entero frito con arroz, ensalada y acompañamientos.",
    precio: null,
    imagen: "assets/fotos/pescado-frito.webp",
    alergenos: ["pescado", "gluten"],
    etiquetas: ["Clásico"],
    destacado: true
  },
  {
    id: "parihuela",
    categoria: "sopas",
    nombre: "Parihuela de pescado",
    descripcion: "Sopa marina contundente.",
    precio: null,
    imagen: "assets/fotos/sudado-pescado.webp",
    alergenos: ["pescado", "mariscos", "picante"],
    etiquetas: ["Sopa"],
    destacado: false
  },
  {
    id: "sudado-pescado",
    categoria: "sopas",
    nombre: "Sudado de pescado",
    descripcion: "Pescado sudado con jugo marino, cebolla y tomate.",
    precio: null,
    imagen: "assets/fotos/sudado-pescado.webp",
    alergenos: ["pescado", "picante"],
    etiquetas: ["Caliente"],
    destacado: true
  },
  {
    id: "chilcano-normal",
    categoria: "sopas",
    nombre: "Chilcano normal",
    descripcion: "Caldo marino ligero.",
    precio: null,
    imagen: "assets/fotos/sudado-pescado.webp",
    alergenos: ["pescado"],
    etiquetas: ["Caldo"],
    destacado: false
  },
  {
    id: "chilcano-especial",
    categoria: "sopas",
    nombre: "Chilcano especial",
    descripcion: "Caldo marino especial de la casa.",
    precio: null,
    imagen: "assets/fotos/sudado-pescado.webp",
    alergenos: ["pescado", "mariscos"],
    etiquetas: ["Caldo"],
    destacado: false
  }
];
