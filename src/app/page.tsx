"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { destinations, packages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Search, Star, MapPin, Calendar, Users, Plane, Shield, Sparkles, ArrowRight, MessageSquare } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [searchDest, setSearchDest] = useState("");
  const [searchDates, setSearchDates] = useState("");
  const [searchTravelers, setSearchTravelers] = useState("2");

  const exclusivePackages = packages.filter((p) => p.isExclusive);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-16 bg-gradient-to-br from-primary via-primary-dark to-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Your Dream Vacation,<br />
                <span className="text-accent-light">One Click Away</span>
              </h1>
              <p className="text-lg lg:text-xl text-teal-100 mb-10 max-w-2xl">
                Exclusive deals on flights, hotels, and tours — powered by direct partnerships with top airlines and resorts.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 lg:p-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500 block">Destination</label>
                    <select
                      value={searchDest}
                      onChange={(e) => setSearchDest(e.target.value)}
                      className="w-full bg-transparent text-gray-900 font-medium text-sm focus:outline-none"
                    >
                      <option value="">Any destination</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}, {d.country}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500 block">When</label>
                    <input
                      type="month"
                      value={searchDates}
                      onChange={(e) => setSearchDates(e.target.value)}
                      className="w-full bg-transparent text-gray-900 font-medium text-sm focus:outline-none"
                      placeholder="Select month"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-500 block">Travelers</label>
                    <select
                      value={searchTravelers}
                      onChange={(e) => setSearchTravelers(e.target.value)}
                      className="w-full bg-transparent text-gray-900 font-medium text-sm focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "traveler" : "travelers"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/search?dest=${searchDest}&travelers=${searchTravelers}`)}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl px-6 py-3 flex items-center justify-center gap-2 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Destinations Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-2">Popular Destinations</h2>
          <p className="text-gray-500 mb-8">Handpicked destinations with exclusive deals</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => router.push(`/search?dest=${dest.name}`)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                  <p className="text-white/80 text-sm">from {formatPrice(dest.avgPrice)}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Exclusive Packages */}
        <section className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-accent" />
              <h2 className="text-3xl font-bold">Exclusive Packages</h2>
            </div>
            <p className="text-gray-500 mb-8">Available only through us — direct deals you won&apos;t find anywhere else</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exclusivePackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => router.push(`/package/${pkg.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow text-left"
                >
                  <div className="relative">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
                    <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                      EXCLUSIVE
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>{pkg.duration} days</span>
                      <span>·</span>
                      <span>{pkg.hotel}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span>{pkg.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">{formatPrice(pkg.retailPrice)}</span>
                        <span className="text-sm text-gray-500 ml-1">/ person</span>
                      </div>
                      <span className="text-primary font-medium text-sm flex items-center gap-1">
                        View <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Direct Deals", desc: "We work directly with airlines and hotels — no middlemen, better prices." },
              { icon: Sparkles, title: "Exclusive Tours", desc: "Unique experiences you won't find on any other platform." },
              { icon: Plane, title: "Instant Booking", desc: "Search, choose, book — your entire trip confirmed in minutes." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Not sure where to go?</h2>
            <p className="text-teal-100 mb-8 text-lg">Our AI travel assistant can help you find the perfect trip based on your preferences and budget.</p>
            <button
              onClick={() => router.push("/chat")}
              className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors inline-flex items-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Chat with AI Assistant
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>&copy; 2026 TourFlow. Tourism Operating System.</p>
            <p className="mt-1">Powered by AltAI Labs</p>
          </div>
        </footer>
      </main>
    </>
  );
}
