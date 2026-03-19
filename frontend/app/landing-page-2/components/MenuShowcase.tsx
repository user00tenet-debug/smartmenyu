export default function MenuShowcase() {
    const menuItems = [
        {
            name: "Wagyu Steak",
            desc: "Premium A5 Japanese wagyu, seared to perfection",
            image: "/landing/menu/wagyu_steak.png",
            tag: "Chef's Special",
        },
        {
            name: "Seared Salmon",
            desc: "Atlantic salmon with citrus glaze and herb crust",
            image: "/landing/menu/seared_salmon.png",
            tag: "Popular",
        },
        {
            name: "Truffle Risotto",
            desc: "Creamy Arborio rice with black truffle shavings",
            image: "/landing/menu/truffle_risotto.png",
            tag: "Vegetarian",
        },
        {
            name: "Lobster Thermidor",
            desc: "Classic French preparation with brandy cream sauce",
            image: "/landing/menu/lobster_thermidor.png",
            tag: "Premium",
        },
    ];

    return (
        <section id="menu-showcase" className="py-20 sm:py-28 bg-alabaster">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div data-animate className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        Visual Menu Preview
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        Let Customers <span className="text-shimmer">See Your Food</span>{" "}
                        Before They Order
                    </h2>
                    <p className="mt-4 text-mutedgray max-w-2xl mx-auto">
                        High-quality images and detailed descriptions help customers choose
                        with confidence — increasing order value and satisfaction.
                    </p>
                </div>

                {/* Menu Grid */}
                <div
                    data-animate-stagger
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className="menu-card relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-warm-200/60 group"
                        >
                            {/* Image */}
                            <div className="relative h-48 sm:h-52 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-teal-700 px-3 py-1 rounded-full">
                                    {item.tag}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <h3 className="font-bold font-heading text-warm-900 text-lg">
                                    {item.name}
                                </h3>
                                <p className="mt-1.5 text-sm text-mutedgray leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative divider */}
                <div className="restaurant-divider mt-16">
                    <span className="text-gold-500 text-sm">✦</span>
                </div>
            </div>
        </section>
    );
}
