export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image with Ken Burns */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/landing/hero_restaurant.png"
                    alt="Luxury restaurant dining"
                    className="w-full h-full object-cover animate-ken-burns"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                <div className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
                    {/* Main Text Content */}
                    <div data-animate className="space-y-6">
                        <p className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold-300 bg-gold-500/10 px-4 py-1.5 rounded-full border border-gold-400/20">
                            Smart QR-Menu Platform
                        </p>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading leading-tight text-white mb-4">
                            <span className="text-shimmer">A Smarter Menu</span> For Modern Restaurants
                        </h1>
                        <p className="text-2xl sm:text-3xl font-semibold text-gold-300 -mt-2">
                            Let Customers See Your Food Before They Order
                        </p>

                        <p className="text-base sm:text-xl text-warm-200 lg:mx-0 leading-relaxed mt-6">
                            Customers scan a QR code, explore a rich visual menu with images
                            and videos, place orders instantly, pay using UPI, and even place
                            home delivery orders through WhatsApp — all from their phone.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex justify-center pt-8">
                            <p className="text-base sm:text-lg text-white font-medium bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
                                To convert your physical menu into Smart menu{" "}
                                <a 
                                    href="#contact" 
                                    className="text-teal-400 hover:text-teal-300 font-bold underline decoration-2 underline-offset-4 hover:decoration-teal-300 transition-all duration-300"
                                >
                                    contact us now
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-alabaster to-transparent z-10" />
        </section>
    );
}
