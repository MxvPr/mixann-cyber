import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold">Mixann</Link>
            <p className="mt-2">Votre plateforme ultime de partage et découverte artistique.</p>
          </div>
          <div className="w-1/2 md:w-1/4 lg:w-1/6 mb-6">
            <h3 className="uppercase font-semibold mb-2">Liens utiles</h3>
            <ul>
              <li><Link to="/about" className="hover:text-gray-300">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-300">Politique de confidentialité</Link></li>
            </ul>
          </div>
          <div className="w-1/2 md:w-1/4 lg:w-1/6">
            <h3 className="uppercase font-semibold mb-2">Suivez-nous</h3>
            <ul className="flex items-center space-x-4">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* SVG icon for Facebook */}
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* SVG icon for Twitter */}
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* SVG icon for Instagram */}
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center">© 2023 Mixann. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
