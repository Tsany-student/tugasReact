 function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <img
            src="./public/images/Kece Kan.png"
            alt="About Me"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Tentang Saya</h2>
          <p className="text-lg leading-relaxed mb-4">
            Halo! Saya Tsani, seorang Frontend Developer & UI Designer yang
            fokus membangun website modern, interaktif, dan responsif.
          </p>
          <p className="text-lg leading-relaxed">
            Saya suka mengubah ide kreatif menjadi aplikasi nyata dengan desain
            yang menarik dan performa cepat.
          </p>
        </div>
      </div>
    </section>
  );
}
export default About;