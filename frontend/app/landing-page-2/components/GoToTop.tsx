"use client";

import { useState, useEffect } from "react";

export default function GoToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Scroll back to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-3 rounded-full bg-teal-600 text-white shadow-[0_4px_14px_0_rgba(15,118,110,0.39)] hover:bg-teal-700 hover:shadow-[0_6px_20px_rgba(15,118,110,0.23)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center ${
                isVisible ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
            aria-label="Go to top"
        >
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
            </svg>
        </button>
    );
}
