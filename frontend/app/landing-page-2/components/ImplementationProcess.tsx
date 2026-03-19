export default function ImplementationProcess() {
    const steps = [
        {
            num: "01",
            icon: "📸",
            title: "Food Photography",
            desc: "Our team visits your restaurant and photographs every dish professionally.",
        },
        {
            num: "02",
            icon: "🍽️",
            title: "Menu Digitization",
            desc: "We build beautiful menu pages with images, descriptions, and ingredient details.",
        },
        {
            num: "03",
            icon: "📱",
            title: "QR Code Generation",
            desc: "Unique QR codes are generated for each table in your restaurant.",
        },
        {
            num: "04",
            icon: "🚀",
            title: "Go Live",
            desc: "Customers start scanning and ordering — your restaurant goes digital instantly.",
        },
    ];

    return (
        <section id="how-it-works" className="py-20 sm:py-28 bg-alabaster">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div data-animate className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        Simple Setup
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        How We Set Up Your{" "}
                        <span className="text-shimmer">Digital Menu</span>
                    </h2>
                    <p className="mt-4 text-mutedgray max-w-2xl mx-auto">
                        We handle everything — from food photography to going live.
                        Restaurants don&apos;t need to manage any technical system.
                    </p>
                </div>

                {/* Steps */}
                <div
                    data-animate-stagger
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {steps.map((step, i) => (
                        <div key={step.num} className="relative group">
                            {/* Connector line (desktop) */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[-40px] h-[2px] bg-gradient-to-r from-teal-300 to-teal-100 z-0" />
                            )}

                            <div className="relative z-10 bg-white rounded-2xl border border-warm-200/60 p-6 sm:p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                                {/* Step Number */}
                                <span className="inline-block text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full mb-4">
                                    Step {step.num}
                                </span>

                                {/* Icon */}
                                <div className="text-4xl mb-4">{step.icon}</div>

                                {/* Content */}
                                <h3 className="text-lg font-bold font-heading text-warm-900 mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-mutedgray leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Information */}
                <div data-animate className="text-center max-w-3xl mx-auto px-4 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-warm-200/60 shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold font-heading text-warm-900 mb-4">
                        No complex setup required.
                    </p>
                    <p className="text-lg sm:text-xl text-teal-700 font-medium">
                        Just provide your WhatsApp number to receive orders and your UPI ID to accept payments. We take care of the rest.
                    </p>
                </div>
            </div>
        </section>
    );
}
