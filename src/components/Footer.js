export default function Footer() {
  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "Practice" },
    { href: "#", label: "About" },
  ];
  return (
    <footer className="items-center bg-gray-100 py-2 mt-12">
      <div className="">
        {/* for social media */}
        <h2 className="text-2xl font-bold text-gradient mt-6">Easy Grammar</h2>
      </div>
      <div className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Easy Grammar
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center justify-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:underline me-4 md:me-6">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
