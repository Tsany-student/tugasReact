import foto1 from "../assets/images/React Dasar.PNG";
import foto2 from "../assets/images/2 cuy.PNG";
import foto3 from "../assets/images/1 cuy.PNG";

function Certificates() {
  return (
    <section id="sertifikat" className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Sertifikat</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={foto1}
              alt="React Dasar"
              className="mx-auto mb-4 max-w-xs md:max-w-sm rounded-lg shadow"
            />
            <h3 className="text-2xl font-semibold mb-3">React Dasar</h3>
            <p className="text-gray-300 mb-4">
              Awali perjalanan coding kamu dengan React! Pelajari komponen, props, dan state.
            </p>
            <a
              href="https://skilvul.com/courses/react-dasar/"
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-semibold shadow"
            >
              Buka Materi
            </a>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={foto2}
              alt="JavaScript Dasar"
              className="mx-auto mb-4 max-w-xs md:max-w-sm rounded-lg shadow"
            />
            <h3 className="text-2xl font-semibold mb-3">JavaScript Dasar</h3>
            <p className="text-gray-300 mb-4">
              Pelajari dasar-dasar JavaScript, mulai dari variabel, function, hingga DOM.
            </p>
            <a
              href="https://skilvul.com/courses/javascript-dasar/"
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-semibold shadow"
            >
              Buka Materi
            </a>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={foto3}
              alt="JavaScript Intermediate"
              className="mx-auto mb-4 max-w-xs md:max-w-sm rounded-lg shadow"
            />
            <h3 className="text-2xl font-semibold mb-3">JavaScript Intermediate</h3>
            <p className="text-gray-300 mb-4">
              Tingkatkan skill JavaScript kamu dengan materi lanjutan seperti async, API, dan modul.
            </p>
            <a
              href="https://skilvul.com/courses/javascript-intermediate/"
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-semibold shadow"
            >
              Buka Materi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
