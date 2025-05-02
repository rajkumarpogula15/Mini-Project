import { FaInstagram, FaFacebook, FaLinkedin, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contact Info */}
        <div className="flex justify-between mb-8">
          <div className="text-lg">
            <h4 className="font-semibold">Contact Us</h4>
            <p><FaPhoneAlt className="inline mr-2" />+1 (123) 456-7890</p>
            <p><FaEnvelope className="inline mr-2" />contact@eventpro.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul>
              <li><a href="/about" className="hover:text-green-400">About Us</a></li>
              <li><a href="/terms" className="hover:text-green-400">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-green-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 rounded-md text-gray-700" 
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-2">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center mb-8">
          <a href="https://instagram.com" className="mx-4 text-xl hover:text-green-400">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" className="mx-4 text-xl hover:text-green-400">
            <FaFacebook />
          </a>
          <a href="https://linkedin.com" className="mx-4 text-xl hover:text-green-400">
            <FaLinkedin />
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm">
          <p>© 2025 EventPro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
