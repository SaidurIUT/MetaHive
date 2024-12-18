// src/components/basicComponents/navbar.jsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../config/authContext";
import "./navbar.css";
import { Home, User, Settings, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout, getCurrentUserName, login } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-wrapper">
        {/* Logo */}
        <div className="navbar-logo">
          <Link href="/" className="logo-text">
            MetaHive
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link href="/" className="nav-link">
            <Home size={20} />
            <span>Home</span>
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="nav-link">
                <User size={20} />
                <span>Dashboard</span>
              </Link>
              <Link href="/settings" className="nav-link">
                <Settings size={20} />
                <span>Settings</span>
              </Link>
              <button onClick={logout} className="nav-link logout-btn">
                <LogOut size={20} />
                <span>Logout</span>
              </button>

              {/* User Display */}
              <div className="user-display">
                Welcome, {getCurrentUserName()}
              </div>
            </>
          ) : (
            <button onClick={login} className="login-btn">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
