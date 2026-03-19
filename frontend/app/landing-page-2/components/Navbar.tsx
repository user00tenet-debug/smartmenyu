"use client";

import { useState, useEffect } from "react";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "glass shadow-lg border-b border-gold-200/30"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-18">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group md:flex-1">
                        <span className="text-2xl font-bold font-heading tracking-tight">
                            <span className="text-shimmer">SMARTMENYU</span>
                        </span>
                    </a>

                    {/* Desktop Links - Centered */}
                    <div className="hidden md:flex items-center justify-center gap-8 flex-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 relative whitespace-nowrap ${scrolled
                                    ? "text-warm-800 hover:text-teal-700 hover:bg-teal-50"
                                    : "text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Reserved for future CTA Button - Right */}
                    <div className="hidden md:flex items-center justify-end flex-1">
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-warm-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`block w-5 h-0.5 bg-warm-800 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""
                                }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-warm-800 mt-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                                }`}
                        />
                        <span
                            className={`block w-5 h-0.5 bg-warm-800 mt-1 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="glass border-t border-gold-200/30 px-4 py-4 space-y-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-3 rounded-lg text-sm font-medium text-warm-800 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
