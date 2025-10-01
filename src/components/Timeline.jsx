function Timeline() {
  const timeline = [
    { year: "2021", event: "Mulai belajar Frontend Development" },
    { year: "2022", event: "Membangun proyek freelance pertama" },
    { year: "2023", event: "Bergabung dengan tim startup" },
    { year: "2024", event: "Mengembangkan portofolio pribadi" },
  ];

  return (
    <section
      id="timeline"
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Timeline</h2>
        <div className="relative border-l border-gray-400 dark:border-gray-600">
          {timeline.map((t) => (
            <div key={t.year} className="relative mb-10 ml-6">

              {/* Tahun */}
              <time className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                {t.year}
              </time>

              {/* Event */}
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.event}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
