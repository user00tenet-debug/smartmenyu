export default function MenuEvolution() {
    const stages = [
        {
            icon: "📋",
            title: "Traditional Menu",
            color: "from-warm-100 to-warm-50",
            border: "border-warm-200",
            items: [
                "Paper menu",
                "Text-only items",
                "Customers guess what food looks like",
                "Waiter must explain dishes",
            ],
        },
        {
            icon: "📱",
            title: "QR Menu",
            color: "from-teal-50 to-teal-100/40",
            border: "border-teal-200",
            items: [
                "Customer scans QR code",
                "Menu opens instantly on phone",
                "No printing costs",
                "Contactless browsing",
            ],
        },
        {
            icon: "✨",
            title: "Smart Visual Menu",
            color: "from-gold-50 to-gold-100/40",
            border: "border-gold-300",
            badge: true,
            items: [
                "High-quality food images",
                "Food preparation videos",
                "Ingredient details",
                "Nutritional information",
                "Detailed item descriptions",
            ],
        },
    ];

    return (
        <section id="features" className="py-20 sm:py-28 bg-warm-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div data-animate className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        The Evolution
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        From Paper Menus to{" "}
                        <span className="text-shimmer">Smart Visual Menus</span>
                    </h2>
                    <p className="mt-4 text-mutedgray max-w-2xl mx-auto">
                        See how restaurant menus have evolved — and why visual digital menus
                        are the future.
                    </p>
                </div>

                {/* Three Columns */}
                <div
                    data-animate-stagger
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                >
                    {stages.map((stage, i) => (
                        <div key={stage.title} className="relative flex flex-col">
                            {/* Arrow between cards (desktop) */}
                            {i < stages.length - 1 && (
                                <div className="hidden md:flex absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-10 text-gold-500 text-2xl">
                                    →
                                </div>
                            )}

                            <div
                                className={`flex-1 rounded-2xl bg-gradient-to-br ${stage.color} border ${stage.border} p-6 sm:p-8 relative overflow-hidden`}
                            >
                                {stage.badge && (
                                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-teal-600 text-white px-3 py-1 rounded-full">
                                        SmartMenyu
                                    </span>
                                )}

                                <span className="text-3xl mb-4 block">{stage.icon}</span>
                                <h3 className="text-xl font-bold font-heading text-warm-900 mb-4">
                                    {stage.title}
                                </h3>

                                <ul className="space-y-2.5">
                                    {stage.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2 text-sm text-mutedgray"
                                        >
                                            <span className="text-teal-600 mt-0.5 shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
