import VacanteCard from "../components/VacanteCard";

export default function VacantesArtistas() {
  const vacantes = [
    {
      titulo: "Festival Sonidos del Alma",
      ubicacion: "Medellín, Colombia",
      tipo: "Evento en vivo",
      duracion: "2 días (12 y 13 de diciembre de 2025)",
      pago: "$1.000.000 COP por presentación",
      fecha: "Aplicar antes del 20 de noviembre de 2025",
      descripcion:
        "El Festival Sonidos del Alma busca artistas emergentes con propuestas originales de los géneros pop, indie o alternativo. El evento reunirá talentos de todo el país para presentar arte innovador y nuevas fusiones musicales.",
      disponibilidad:
        "Debe tener disponibilidad para ensayos presenciales en Medellín.",
      contacto: "festivalsonidosalma@eventmusic.co",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 p-10 space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        🎤 Vacantes para Artistas
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vacantes.map((v, i) => (
          <VacanteCard key={i} vacante={v} />
        ))}
      </div>
    </div>
  );
}
