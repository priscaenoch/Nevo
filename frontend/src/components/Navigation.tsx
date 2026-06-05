"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import GlobalSearch from "./GlobalSearch";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Close menu on Escape key
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { href: "#features", label: "Features", isRoute: false },
    { href: "#how-it-works", label: "How It Works", isRoute: false },
    { href: "#security", label: "Security", isRoute: false },
    { href: "/discovery", label: "Discover", isRoute: true },
    { href: "/about-us", label: "About Us", isRoute: true },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-[#1E293B] border-b border-[#50C878]/40 z-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Nevo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-[#50C878] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-[#50C878] transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <ConnectWallet />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-[#50C878] transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#1E293B] border-l border-[#50C878]/40 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <Link 
            href="/" 
            className="flex items-center gap-2"
            onClick={handleLinkClick}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"></div>
            <span className="text-xl font-bold text-white">Nevo</span>
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-3 px-4 text-lg text-slate-300 hover:text-[#50C878] hover:bg-slate-700/30 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Menu Actions */}
          <div className="px-6 py-6 border-t border-slate-700/50 space-y-4">
            <button
              onClick={() => {
                setIsSearchOpen(true);
                closeMenu();
              }}
              className="w-full flex items-center gap-3 py-3 px-4 text-slate-300 hover:text-[#50C878] hover:bg-slate-700/30 rounded-lg transition-all duration-200"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
            
            <div onClick={closeMenu}>
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>

      {/* Global Search Modal */}
      {isSearchOpen && (
        <GlobalSearch 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      )}
    </>
  );
}
