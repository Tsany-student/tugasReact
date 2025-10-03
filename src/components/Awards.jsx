import foto1 from "../../public/images/Pt 2.PNG";

function Awards() {
  return (
    <section id="awards" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Penghargaan</h2>
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
            <img 
              src="{foto1}" 
              alt="React Dasar" 
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain" 
            />
            <h3 className="text-xl font-semibold">React Dasar</h3>
            <p className="text-sm text-gray-500">2022</p>
            <p className="mt-2">Penghargaan desain antarmuka terbaik.</p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
            <img 
              src="./public/images/ASIKK.PNG" 
              alt="Dicoding" 
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain" 
            />
            <h3 className="text-xl font-semibold">Dicoding</h3>
            <p className="text-sm text-gray-500">2023</p>
            <p className="mt-2">Developer dengan performa luar biasa.</p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
            <img 
              src="./public/images/JS DASAR.png" 
              alt="Frontend Mastery" 
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain" 
            />
            <h3 className="text-xl font-semibold">Frontend Mastery</h3>
            <p className="text-sm text-gray-500">2024</p>
            <p className="mt-2">Sertifikat keahlian pengembangan antarmuka web.</p>
          </div>

          {/* Award 4 */}
          <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
            <img 
              src="./public/images/Sertif Javascript Intermediate.png" 
              alt="Backend Specialist" 
              className="mx-auto mb-4 w-full max-w-md rounded-lg shadow-lg object-contain" 
            />
            <h3 className="text-xl font-semibold">Backend Specialist</h3>
            <p className="text-sm text-gray-500">2025</p>
            <p className="mt-2">Penghargaan untuk spesialis backend yang handal.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Awards;
