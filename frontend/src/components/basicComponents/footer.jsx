import React from "react";
import Link from "next/link";
import {
  Github, // Corrected import name
  Linkedin,
  Twitter,
  Mail,
  Globe,
} from "lucide-react"; // Make sure this import is correct
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">MetaHive</h3>
          <p className="footer-tagline">
            Collaborative Platform for Software Engineers
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Quick Links</h4>
          <div className="footer-links">
            <Link href="/" className="footer-link">
              Home
            </Link>
            <Link href="/about" className="footer-link">
              About
            </Link>
            <Link href="/dashboard" className="footer-link">
              Dashboard
            </Link>
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Legal</h4>
          <div className="footer-links">
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">Connect</h4>
          <div className="social-icons">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Github size={20} /> {/* Changed from GitHub to Github */}
            </a>
            <a
              href="https://linkedin.com/in/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <Twitter size={20} />
            </a>
            <a href="mailto:contact@metahive.com" className="social-icon">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © {currentYear} MetaHive. All Rights Reserved.
        </div>
        <div className="footer-credits">
          <Globe size={16} />
          <span>Powered by Innovation</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
