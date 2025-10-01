function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
        <div className="space-y-4">
          <details className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <summary className="font-semibold cursor-pointer">Bagaimana cara menghubungi Tsani?</summary>
            <p className="mt-2 text-gray-700 dark:text-gray-200">Gunakan form kontak di bagian bawah ini.</p>
          </details>
          <details className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <summary className="font-semibold cursor-pointer">Apakah ada layanan freelance?</summary>
            <p className="mt-2 text-gray-700 dark:text-gray-200">Ya, proyek freelance diterima.</p>
          </details>
          <details className="bg-white dark:bg-gray-700 p-4 rounded shadow">
            <summary className="font-semibold cursor-pointer">Berapa lama proyek selesai?</summary>
            <p className="mt-2 text-gray-700 dark:text-gray-200">1–4 minggu tergantung kompleksitas.</p>
          </details>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
