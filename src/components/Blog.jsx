// function Blog() {
//   const posts = [
//     { title: "Tips Belajar JavaScript", date: "2024-01-15", desc: "Cara cepat memahami JS untuk pemula." },
//     { title: "React vs Vue", date: "2024-03-10", desc: "Perbandingan dua framework populer." },
//   ];

//   return (
//     <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center mb-12">Blog</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           {posts.map((p, i) => (
//             <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
//               <h3 className="text-xl font-bold mb-2">{p.title}</h3>
//               <span className="text-sm text-gray-500">{p.date}</span>
//               <p className="mt-2">{p.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// export default Blog;