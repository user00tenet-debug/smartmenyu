"use client";

import { useRef } from "react";

const services = [
    {
        icon: "🍽️",
        title: "Visual Menu",
        desc: "Rich digital menu with photos, videos, ingredients, and nutrition details.",
        color: "from-gold-50 to-gold-100/40",
        border: "border-gold-200",
    },
    {
        icon: "🛒",
        title: "Ordering",
        desc: "Customers select items and send orders directly to the kitchen via WhatsApp.",
        color: "from-teal-50 to-teal-100/40",
        border: "border-teal-200",
    },
    {
        icon: "💳",
        title: "UPI Payments",
        desc: "Fast, contactless payments using any UPI app — PhonePe, Google Pay, Paytm.",
        color: "from-warm-50 to-warm-100/40",
        border: "border-warm-200",
    },
    {
        icon: "🚚",
        title: "Home Delivery",
        desc: "Share your menu link on WhatsApp — accept direct orders without commissions.",
        color: "from-gold-50 to-gold-100/40",
        border: "border-gold-200",
    },
    {
        icon: "📊",
        title: "Analytics",
        desc: "Insights into most ordered dishes, peak times, and customer behavior.",
        color: "from-teal-50 to-teal-100/40",
        border: "border-teal-200",
    },
    {
        icon: "🔔",
        title: "Call Waiter",
        desc: "Customers tap a button to request service — no waiting or searching for staff.",
        color: "from-warm-50 to-warm-100/40",
        border: "border-warm-200",
    },
];

export default function ServicesCarousel() {
    return (
        <section className="py-20 sm:py-28 bg-warm-50 overflow-hidden">
            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 10px)); }
                }
                .animate-infinite-scroll {
                    display: flex;
                    width: max-content;
                    animation: scroll 40s linear infinite;
                }
                .animate-infinite-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div data-animate className="text-center mb-16">
                    <p className="text-xs font-semibold tracking-widest uppercase text-teal-600 mb-3">
                        Platform Services
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-warm-900">
                        Everything Your Restaurant Needs in{" "}
                        <span className="text-shimmer">One Smart QR Menu</span>
                    </h2>
                </div>

                {/* Infinite Carousel Container */}
                <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="animate-infinite-scroll gap-5 px-4 sm:px-6 lg:px-8">
                        {[...services, ...services].map((service, index) => (
                            <div
                                key={`${service.title}-${index}`}
                                className={`shrink-0 w-[280px] sm:w-[300px] rounded-2xl bg-gradient-to-br ${service.color} border ${service.border} p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group cursor-pointer`}
                            >
                                <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </span>
                                <h3 className="text-lg font-bold font-heading text-warm-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-mutedgray leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
