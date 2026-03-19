export default function Benefits() {
    const restaurantBenefits = [
        {
            icon: "📈",
            title: "Higher Order Value",
            desc: "Visual menus encourage customers to explore and order more items.",
        },
        {
            icon: "⭐",
            title: "Promote Premium Items",
            desc: "Highlight chef's specials and premium dishes with stunning visuals.",
        },
        {
            icon: "⚡",
            title: "Reduce Waiter Workload",
            desc: "Customers browse and order independently — freeing up your staff.",
        },
        {
            icon: "🖨️",
            title: "No Menu Printing Cost",
            desc: "Update your digital menu anytime — no reprinting needed.",
        },
        {
            icon: "💰",
            title: "Direct Payments",
            desc: "Receive UPI payments directly — no commissions or middlemen.",
        },
        {
            icon: "✨",
            title: "Modern Brand Image",
            desc: "A smart digital menu positions your restaurant as innovative and premium.",
        },
    ];

    const customerBenefits = [
        {
            icon: "👀",
            title: "See Food Before Ordering",
            desc: "High-quality images help customers choose confidently.",
        },
        {
            icon: "🍜",
            title: "Explore New Dishes",
            desc: "Discover items they might have overlooked on a paper menu.",
        },
        {
            icon: "🥗",
            title: "Clear Ingredient Info",
            desc: "Know exactly what's in each dish — great for allergies and preferences.",
        },
        {
            icon: "📱",
            title: "Easy Mobile Ordering",
            desc: "Select items and order from the phone — no waiting for a waiter.",
        },
        {
            icon: "💳",
            title: "Fast UPI Payments",
            desc: "Pay the bill instantly using any UPI app.",
        },
    ];

    return (
        <section id="benefits" className="py-20 sm:py-28 bg-alabaster">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Restaurant Benefits */}
                <div data-animate className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        For Restaurants
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        Why Restaurants Love{" "}
                        <span className="text-shimmer">SmartMenyu</span>
                    </h2>
                </div>

                <div
                    data-animate-stagger
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
                >
                    {restaurantBenefits.map((b) => (
                        <div
                            key={b.title}
                            className="advantage-card bg-white rounded-2xl border border-warm-200/60 p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <span className="text-3xl block mb-3">{b.icon}</span>
                            <h3 className="font-bold font-heading text-warm-900 mb-1.5">
                                {b.title}
                            </h3>
                            <p className="text-sm text-mutedgray leading-relaxed">
                                {b.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Decorative divider */}
                <div className="restaurant-divider mb-20">
                    <span className="text-gold-500 text-sm">✦</span>
                </div>

                {/* Customer Benefits */}
                <div data-animate className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-3">
                        For Customers
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        A Better <span className="text-shimmer">Dining Experience</span>
                    </h2>
                </div>

                <div
                    data-animate-stagger
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {customerBenefits.map((b) => (
                        <div
                            key={b.title}
                            className="advantage-card bg-white rounded-2xl border border-warm-200/60 p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <span className="text-3xl block mb-3">{b.icon}</span>
                            <h3 className="font-bold font-heading text-warm-900 mb-1.5">
                                {b.title}
                            </h3>
                            <p className="text-sm text-mutedgray leading-relaxed">
                                {b.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
