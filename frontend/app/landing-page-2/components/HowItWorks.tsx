export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 lg:py-32 relative bg-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 lg:mb-24" data-animate>
                    <p className="inline-block text-sm font-bold tracking-widest uppercase text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full mb-4">
                        Seamless Process
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-warm-900 mb-6 tracking-tight">
                        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">SMARTMENYU</span> Works
                    </h2>
                    <p className="text-lg text-warm-200/80 max-w-2xl mx-auto text-mutedgray">
                        From traditional paper to a fully digital ordering experience in five simple steps.
                    </p>
                </div>

                <div className="relative" data-animate>
                    {/* Connecting Line for Desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-100 via-teal-300 to-teal-100 -translate-y-1/2 z-0" />

                    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-4 relative z-10">
                        {[
                            {
                                icon: "📋",
                                label: "Paper Menu",
                                desc: "Traditional printed menu",
                            },
                            {
                                icon: "📱",
                                label: "QR Code",
                                desc: "Scan with any phone",
                            },
                            {
                                icon: "🍽️",
                                label: "Digital Menu",
                                desc: "Photos, videos & details",
                            },
                            {
                                icon: "🛒",
                                label: "Order",
                                desc: "Directly via WhatsApp",
                            },
                            {
                                icon: "💳",
                                label: "Pay",
                                desc: "Instant UPI payment",
                            },
                        ].map((step, i, arr) => (
                            <div key={step.label} className="flex flex-col items-center flex-1 w-full max-w-xs lg:max-w-none group">
                                {/* Mobile/Tablet connecting line */}
                                {i > 0 && (
                                    <div className="lg:hidden w-0.5 h-12 bg-gradient-to-b from-teal-200 to-transparent my-2 transition-all group-hover:from-teal-400" />
                                )}

                                <div className="bg-white rounded-2xl p-6 shadow-xl border border-warm-100 w-full text-center hover:-translate-y-2 transition-transform duration-300 relative z-10 hover:shadow-2xl hover:border-teal-100">
                                    <div className="w-16 h-16 mx-auto bg-teal-50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                        {step.icon}
                                    </div>
                                    <p className="font-bold text-warm-900 text-lg mb-2">
                                        {step.label}
                                    </p>
                                    <p className="text-sm text-mutedgray leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
