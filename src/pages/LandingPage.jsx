import React from "react";
import { ArrowRight } from "lucide-react";
import backgroundimage from "../assets/dashboard.png";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header / Navbar */}
            <header className="w-full bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-blue-600">TravelMate</h1>
                    <nav className="space-x-6 hidden md:flex">
                        <a href="#features" className="text-gray-700 hover:text-blue-600">
                            Features
                        </a>
                        <a href="#about" className="text-gray-700 hover:text-blue-600">
                            About
                        </a>
                        <a href="#contact" className="text-gray-700 hover:text-blue-600">
                            Contact
                        </a>
                    </nav>
                    <a
                        href="/app"
                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center"
                    >
                        Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center text-center px-6 py-20">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Discover & Explore <span className="text-blue-600">Tourist Spots</span>{" "}
                    with AI
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    Your personal travel assistant. Find attractions, restaurants, and
                    hotels, all visualized on an interactive map with smart
                    recommendations.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex space-x-4">
                    <a
                        href="/app"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
                    >
                        Launch App
                    </a>
                    <a
                        href="#features"
                        className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-gray-200"
                    >
                        Learn More
                    </a>
                </div>

                {/* Dashboard Screenshot Mockup */}
                <div className="mt-12 w-full max-w-5xl">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                        {/* Browser top bar */}
                        <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <div className="ml-4 text-sm text-gray-500 truncate">
                                travelmate.app/demo
                            </div>
                        </div>
                        {/* Screenshot */}
                        <img
                            src={backgroundimage} // 👈 place your screenshot in public/assets
                            alt="TravelMate Dashboard Preview"
                            className="w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-blue-600">
                            Chatbot Assistant
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Ask in any language and get AI-powered travel suggestions instantly.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-blue-600">
                            Interactive Map
                        </h3>
                        <p className="mt-3 text-gray-600">
                            View attractions, food, and hotels marked on a live map with routes.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
                        <h3 className="text-xl font-semibold text-blue-600">
                            Smart Recommendations
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Get ratings, reviews, and the best options tailored to your trip.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 mt-auto">
                <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
                    © {new Date().getFullYear()} TravelMate. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
