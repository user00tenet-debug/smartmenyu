export default function Ordering() {
    const benefits = [
        "Fewer Order Mistakes",
        "Faster Service During Busy Hours",
    ];

    return (
        <section className="py-20 lg:py-32 relative bg-alabaster overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
                    {/* Left Side — Text Content */}
                    <div className="lg:w-1/2" data-animate>
                        <p className="inline-block text-sm font-bold tracking-widest uppercase text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full mb-4">
                            Ordering
                        </p>

                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-warm-900 mb-6 tracking-tight">
                            Simple Ordering{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-500">
                                From the Table
                            </span>
                        </h2>

                        <p className="text-lg text-mutedgray leading-relaxed mb-4">
                            Customers can select items directly from the menu on their phone and place their order in seconds.
                        </p>
                        <p className="text-lg text-mutedgray leading-relaxed mb-8">
                            No waiting for menus, no confusion while explaining dishes, and no delays during busy hours.
                        </p>

                        {/* Benefits */}
                        <ul className="space-y-4">
                            {benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-3">
                                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </span>
                                    <span className="text-warm-800 font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side — Image Placeholder */}
                    <div className="lg:w-1/2" data-animate>
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-warm-100 transition-all duration-300 hover:shadow-2xl hover:border-teal-100">
                            <img
                                src={`/landing/sections/ordering/1.png`}
                                alt={`Ordering`}
                                className="w-full aspect-[4/3] object-cover bg-gradient-to-br from-gray-100 to-gray-200"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
