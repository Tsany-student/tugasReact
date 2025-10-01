const year = new Date().getFullYear();

function Footer() {
  return (
    <footer role="contentinfo" className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm">© {year} Tsani. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
