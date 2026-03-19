export default function Footer() {
    const links = [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <footer className="bg-warm-900 text-warm-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
                    {/* Logo & Tagline */}
                    <div>
                        <span className="text-2xl font-bold font-heading text-white tracking-tight">
                            SMARTMENYU
                        </span>
                        <p className="mt-3 text-sm text-warm-200/70 leading-relaxed max-w-xs">
                            The smart QR menu platform for modern Indian restaurants. Scan,
                            browse, order, and pay — all from one system.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-warm-200/80 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400 mb-4">
                            Contact
                        </h4>
                        <a
                            href="mailto:hello@smartmenyu.in"
                            className="text-sm text-warm-200/80 hover:text-white transition-colors duration-200"
                        >
                            hello@smartmenyu.in
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-warm-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-warm-200/50">
                        © 2026 SmartMenyu. All rights reserved.
                    </p>
                    <p className="text-xs text-warm-200/50">
                        Made with ❤️ for Indian restaurants
                    </p>
                </div>
            </div>
        </footer>
    );
}
