function Testimonials() {
  const testi = [
    { text: "Tsani sangat profesional, proyek selesai tepat waktu.", name: "Andi, Jakarta" },
    { text: "UI menarik dan mudah digunakan, sangat puas!", name: "Siti, Bandung" },
    { text: "Website responsif dan modern.", name: "Rudi, Surabaya" },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Testimoni</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testi.map((t) => (
            <div
              key={t.name} 
              className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md"
            >
              <p className="mb-4 text-gray-700 dark:text-gray-200 italic">
                “{t.text}”
              </p>
              <p className="font-bold">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
