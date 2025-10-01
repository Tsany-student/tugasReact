function Services() {
  const services = [
    {
      id: 1,
      title: "Web Development",
      desc: "Membangun website responsif dengan teknologi modern.",
      icon: "💻",
    },
    {
      id: 2,
      title: "UI/UX Design",
      desc: "Desain antarmuka yang menarik dan mudah digunakan.",
      icon: "🎨",
    },
    {
      id: 3,
      title: "Mobile App",
      desc: "Aplikasi mobile hybrid yang ringan dan cepat.",
      icon: "📱",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Layanan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow hover:scale-105 transition-transform duration-300"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{s.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {s.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
