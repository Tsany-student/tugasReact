function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Proyek Terbaru</h2>
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Project 1 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition-transform duration-300">
            <img
              src="./public/images/MR ELEKTRONIK.PNG"
              alt="Website Toko Online"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Website Toko Online</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Web</p>
          </div>

          {/* Project 2 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition-transform duration-300">
            <img
              src="./public/images/1 ini baru kece.PNG"
              alt="Aplikasi Mobile Task"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Aplikasi Mobile Task</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mobile</p>
          </div>

          {/* Project 3 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition-transform duration-300">
            <img
              src="./public/images/Slicinggg.PNG"
              alt="UI Dashboard"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">UI Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">UI</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Projects;
