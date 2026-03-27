"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { packages } from "@/lib/data";
import { formatPrice, formatDate } from "@/lib/utils";
import { Star, Check, Plane, Hotel, Calendar, Users, ArrowLeft, Sparkles } from "lucide-react";

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) {
    return (
      <>
        <Navbar />
        <main className="pt-24 text-center">
          <p className="text-gray-500 text-lg">Package not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to results
          </button>

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <img src={pkg.image} alt={pkg.name} className="w-full h-64 md:h-96 object-cover" />
            {pkg.isExclusive && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-accent text-white text-sm font-bold px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" /> EXCLUSIVE DEAL
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{pkg.name}</h1>
                <div className="flex items-center gap-3 text-gray-500">
                  <span>{pkg.destination}, {pkg.destinationCountry}</span>
                  <span>·</span>
                  <span>{pkg.duration} days</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium text-gray-900">{pkg.rating}</span>
                    <span>({pkg.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{pkg.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Plane, label: "Airline", value: pkg.airline },
                  { icon: Hotel, label: "Hotel", value: `${pkg.hotel} (${pkg.hotelStars}★)` },
                  { icon: Calendar, label: "Duration", value: `${pkg.duration} days` },
                  { icon: Users, label: "Max Group", value: `${pkg.maxPax} people` },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 shadow-sm">
                    <item.icon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="font-medium text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <div>
                <h2 className="text-xl font-bold mb-4">What&apos;s Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.inclusions.map((inc) => (
                    <div key={inc} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-gray-700">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departure Dates */}
              <div>
                <h2 className="text-xl font-bold mb-4">Available Dates</h2>
                <div className="flex flex-wrap gap-2">
                  {pkg.departureDates.map((date) => (
                    <button
                      key={date}
                      className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-primary">{formatPrice(pkg.retailPrice)}</span>
                  <span className="text-gray-500 ml-1">/ person</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Select date</label>
                    <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      {pkg.departureDates.map((date) => (
                        <option key={date} value={date}>{formatDate(date)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Travelers</label>
                    <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Package (2 travelers)</span>
                    <span>{formatPrice(pkg.retailPrice * 2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxes & fees</span>
                    <span>{formatPrice(Math.round(pkg.retailPrice * 0.1))}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(pkg.retailPrice * 2 + Math.round(pkg.retailPrice * 0.1))}</span>
                  </div>
                </div>

                <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl py-3.5 transition-colors">
                  Book Now
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">Free cancellation up to 14 days before departure</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
