export default function MenuTransformation() {
    const stages = [
        {
            image: "/landing/transformation/1_physical_menu.png",
            title: "Physical Menu",
            desc: "Your traditional printed hardcopy menu",
        },
        {
            image: "/landing/transformation/2_qr_code.png",
            title: "QR Code",
            desc: "Customers scan to access your menu instantly",
        },
        {
            image: "/landing/transformation/3_menu_list_mobile.png",
            title: "Digital Menu",
            desc: "A rich visual menu list on their phone",
        },
        {
            image: "/landing/transformation/4_menu_item_detail.png",
            title: "Item Details",
            desc: "Every dish showcased with images & description",
        },
    ];

    return (
        <section className="py-20 lg:py-32 relative bg-alabaster overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Headline */}
                <div className="text-center mb-16 lg:mb-24" data-animate>
                    <p className="inline-block text-sm font-bold tracking-widest uppercase text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full mb-4">
                        The Transformation
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-warm-900 mb-6 tracking-tight">
                        Turn Your Physical Menu Into a{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">
                            Smart Digital Menu
                        </span>
                    </h2>
                    <p className="text-lg text-mutedgray max-w-2xl mx-auto">
                        See how your restaurant menu transforms from paper to a powerful digital ordering experience.
                    </p>
                </div>

                {/* Cards */}
                <div className="relative" data-animate>
                    {/* Connecting arrow line for Desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {stages.map((stage, i) => (
                            <div key={stage.title} className="flex flex-col items-center group">
                                {/* Step number */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-500 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                                    {i + 1}
                                </div>

                                {/* Card */}
                                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-warm-100 w-full hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:border-teal-100">
                                    {/* Image */}
                                    <div className="w-full h-52 overflow-hidden">
                                        <img
                                            src={stage.image}
                                            alt={stage.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="p-5 text-center">
                                        <p className="font-bold text-warm-900 text-lg mb-1">
                                            {stage.title}
                                        </p>
                                        <p className="text-sm text-mutedgray leading-relaxed">
                                            {stage.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
