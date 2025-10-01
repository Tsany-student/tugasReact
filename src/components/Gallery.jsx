function Gallery() {
  const photos = [
    { src: "images/Di masjid.jpg", alt: "Foto 1" },
    { src: "images/Rame.jpg", alt: "Foto 2" },
    { src: "images/1 pondok.jpg", alt: "Foto 3" }, // foto tengah landscape
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-wide">
        Galeri Foto
      </h2>

      <div className="px-4 md:px-10 lg:px-20">
        {/* Grid atas */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="overflow-hidden rounded-2xl shadow-lg group bg-gray-800 p-2">
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg group bg-gray-800 p-2">
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* Foto tengah landscape full width */}
        <div className="w-full flex items-center justify-center">
          <div className="rounded-2xl shadow-2xl overflow-hidden group p-4 w-full">
            <img
              src={photos[2].src}
              alt={photos[2].alt}
              className="w-full h-150 object-cover transform group-hover:scale-105 transition duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
