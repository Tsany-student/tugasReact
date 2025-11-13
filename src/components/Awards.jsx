import React from "react";
import foto1 from "../assets/images/Pt 2.png";
import foto2 from "../assets/images/ASIKK.PNG";
import foto3 from "../assets/images/JS DASAR.png";
import foto4 from "../assets/images/Sertif Javascript Intermediate.png";

function Awards() {
  return (
    <section id="awards" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          Penghargaan
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition duration-300">
            <img
              src={foto1}
              alt="React Dasar"
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              React Dasar
            </h3>
            <p className="text-sm text-gray-500">2022</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Penghargaan desain antarmuka terbaik.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition duration-300">
            <img
              src={foto2}
              alt="Dicoding"
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dicoding
            </h3>
            <p className="text-sm text-gray-500">2023</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Developer dengan performa luar biasa.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition duration-300">
            <img
              src={foto3}
              alt="Frontend Mastery"
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Frontend Mastery
            </h3>
            <p className="text-sm text-gray-500">2024</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Sertifikat keahlian pengembangan antarmuka web.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-purple-500/30 transition duration-300">
            <img
              src={foto4}
              alt="Backend Specialist"
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Backend Specialist
            </h3>
            <p className="text-sm text-gray-500">2025</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Penghargaan untuk spesialis backend yang handal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
