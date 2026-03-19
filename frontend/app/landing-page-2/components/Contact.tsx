export default function Contact() {
    return (
        <section id="contact" className="py-20 sm:py-28 bg-white overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div data-animate className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        Get In Touch
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        Contact <span className="text-shimmer">Us</span>
                    </h2>
                    <p className="mt-4 text-mutedgray max-w-2xl mx-auto">
                        Have questions about our digital menu system? We're here to help. Reach out to us via phone or email.
                    </p>
                </div>

                <div 
                    data-animate-stagger 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                >
                    {/* Phone Card */}
                    <a 
                        href="tel:9381957903" 
                        className="bg-alabaster rounded-2xl border border-warm-200/60 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-teal-600 to-teal-500 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold font-heading text-warm-900 mb-2">Phone</h3>
                        <p className="text-lg text-teal-700 font-medium">
                            9381957903
                        </p>
                        <p className="text-sm text-mutedgray mt-2">Mon-Fri from 8am to 5pm</p>
                    </a>

                    {/* Email Card */}
                    <a 
                        href="mailto:smartmenyu@gmail.com" 
                        className="bg-alabaster rounded-2xl border border-warm-200/60 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gold-600 to-gold-500 rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold font-heading text-warm-900 mb-2">Email</h3>
                        <p className="text-lg text-gold-700 font-medium truncate">
                            smartmenyu@gmail.com
                        </p>
                        <p className="text-sm text-mutedgray mt-2">We typically reply within 24 hours</p>
                    </a>
                </div>
            </div>
        </section>
    );
}
