export default function Pricing() {
    const features = [
        "Visual Digital Menu",
        "QR Table Ordering",
        "UPI Payments",
        "WhatsApp Orders",
        "Analytics Dashboard",
        "Call Waiter Feature",
    ];

    return (
        <section id="pricing" className="py-20 sm:py-28 bg-warm-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div data-animate className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        Simple Pricing
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        One Plan. <span className="text-shimmer">Everything Included.</span>
                    </h2>
                    <p className="mt-4 text-mutedgray max-w-xl mx-auto">
                        No hidden fees. No commissions on orders. Simple and transparent.
                    </p>
                </div>

                {/* Pricing Card */}
                <div data-animate className="flex justify-center mb-20">
                    <div className="w-full max-w-md bg-white rounded-3xl border-2 border-teal-200 shadow-xl overflow-hidden relative">
                        {/* Top accent */}
                        <div className="h-2 bg-gradient-to-r from-teal-600 via-gold-400 to-teal-600" />

                        <div className="p-8 sm:p-10 text-center">
                            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full mb-6">
                                Starter Plan
                            </span>

                            {/* Price */}
                            <div className="mb-8">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-lg font-medium text-mutedgray">₹</span>
                                    <span className="text-5xl sm:text-6xl font-bold font-heading text-warm-900">
                                        999
                                    </span>
                                    <span className="text-base text-mutedgray">/month</span>
                                </div>
                                <p className="text-sm text-mutedgray mt-2">
                                    No commissions on orders
                                </p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3.5 text-left mb-10">
                                {features.map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-center gap-3 text-sm text-warm-800"
                                    >
                                        <span className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                            <span className="text-teal-600 text-xs">✓</span>
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <a
                                href="#contact"
                                className="block w-full py-4 rounded-full text-center font-semibold text-white bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-glow"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div
                    id="contact"
                    data-animate
                    className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-warm-900 via-warm-800 to-warm-900 px-6 sm:px-12 py-16 text-center shadow-2xl"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                            Bring Your Restaurant Menu Into{" "}
                            <span className="text-shimmer">The Digital Era</span>
                        </h2>
                        <p className="text-warm-200 max-w-xl mx-auto mb-8">
                            Join restaurants using SmartMenyu to serve customers faster, reduce
                            costs, and increase revenue.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:hello@smartmenyu.in"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 shadow-lg transition-all duration-300"
                            >
                                Get Started
                            </a>
                            <a
                                href="mailto:hello@smartmenyu.in?subject=Demo%20Request"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
                            >
                                Request Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
