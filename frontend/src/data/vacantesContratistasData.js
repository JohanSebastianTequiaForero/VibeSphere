// 🎶 VibeSphere - Vacantes publicadas por contratistas

const vacantesContratistasData = [
  {
    id: 1,
    titulo: "Cantante para evento corporativo",
    empresa: "Eventos Épicos S.A.S",
    descripcion:
      "Buscamos un cantante versátil con repertorio pop y baladas en inglés y español para evento empresarial. Se requiere experiencia mínima de 2 años en presentaciones en vivo.",
    imagen: "/img/evento-corporativo.jpg",
    ubicacion: "Bogotá, Colombia",
    salario: "$800.000 por presentación",
    estado: "Abierta",
    postulados: [
      {
        id: 1,
        nombre: "Laura Torres",
        experiencia: "3 años en shows acústicos y festivales",
        contacto: "laura.torres@gmail.com",
        estado: "Pendiente",
      },
      {
        id: 2,
        nombre: "Carlos Medina",
        experiencia: "Cantante pop con trayectoria en bandas locales",
        contacto: "carlosm.music@hotmail.com",
        estado: "Revisado",
      },
    ],
  },
  {
    id: 2,
    titulo: "Guitarrista para grabación de estudio",
    empresa: "Estudio Sonar Music",
    descripcion:
      "Se requiere guitarrista profesional para sesión de grabación de música indie. Duración del proyecto: 2 semanas. Se valorará conocimiento en mezcla y efectos.",
    imagen: "/img/estudio-musica.jpg",
    ubicacion: "Medellín, Colombia",
    salario: "$1.200.000 por proyecto",
    estado: "Abierta",
    postulados: [
      {
        id: 1,
        nombre: "Andrés Rojas",
        experiencia: "5 años grabando en estudios independientes",
        contacto: "andresrojas@musicmail.com",
        estado: "Pendiente",
      },
    ],
  },
  {
    id: 3,
    titulo: "DJ para boda privada",
    empresa: "Momentos Únicos",
    descripcion:
      "Se busca DJ con experiencia en eventos sociales y repertorio variado. Se proporciona equipo de sonido. Evento en Cali el 12 de diciembre.",
    imagen: "/img/dj-boda.jpg",
    ubicacion: "Cali, Colombia",
    salario: "$1.000.000 por evento",
    estado: "Cerrada",
    postulados: [
      {
        id: 1,
        nombre: "Valentina Morales",
        experiencia: "DJ profesional con 4 años en eventos de boda",
        contacto: "vale.djbeats@gmail.com",
        estado: "Contratada",
      },
    ],
  },
];

export default vacantesContratistasData;
