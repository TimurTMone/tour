"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useLang } from "@/lib/LangContext";
import { packages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Star, SlidersHorizontal, ArrowRight } from "lucide-react";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLang();
  const destFilter = searchParams.get("dest") || "";

  const [destination, setDestination] = useState(destFilter);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minStars, setMinStars] = useState(0);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "duration">("price");
  const [showExclusiveOnly, setShowExclusiveOnly] = useState(false);

  const filtered = useMemo(() => {
    let result = packages.filter((p) => {
      if (destination && !p.destination.toLowerCase().includes(destination.toLowerCase())) return false;
      if (p.retailPrice > maxPrice) return false;
      if (p.hotelStars < minStars) return false;
      if (showExclusiveOnly && !p.isExclusive) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "price") return a.retailPrice - b.retailPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.duration - b.duration;
    });

    return result;
  }, [destination, maxPrice, minStars, sortBy, showExclusiveOnly]);

  const allDestinations = [...new Set(packages.map((p) => p.destination))];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">
            {destination ? `${t.search.packagesTo} ${destination}` : t.search.allPackages}
          </h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-72 shrink-0">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-lg">{t.search.filters}</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">{t.search.destination}</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">{t.search.allDestinations}</option>
                      {allDestinations.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      {t.search.maxPrice}: {formatPrice(maxPrice)}
                    </label>
                    <input
                      type="range"
                      min={500}
                      max={5000}
                      step={100}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">{t.search.minHotelStars}</label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          onClick={() => setMinStars(s)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            minStars === s ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {s === 0 ? t.search.any : `${s}+`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">{t.search.sortBy}</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "price" | "rating" | "duration")}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="price">{t.search.priceLowHigh}</option>
                      <option value="rating">{t.search.ratingHighLow}</option>
                      <option value="duration">{t.search.durationShortLong}</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showExclusiveOnly}
                      onChange={(e) => setShowExclusiveOnly(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">{t.search.exclusiveOnly}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-4">{filtered.length} {t.search.packagesFound}</p>
              <div className="space-y-4">
                {filtered.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => router.push(`/package/${pkg.id}`)}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row overflow-hidden w-full text-left"
                  >
                    <div className="relative md:w-72 shrink-0">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-48 md:h-full object-cover" />
                      {pkg.isExclusive && (
                        <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                          {t.landing.exclusive}
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {pkg.destination}, {pkg.destinationCountry} · {pkg.duration} {t.landing.days} · {pkg.airline}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium text-gray-700">{pkg.hotel}</span>
                          <div className="flex">
                            {Array.from({ length: pkg.hotelStars }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {pkg.inclusions.slice(0, 4).map((inc) => (
                            <span key={inc} className="bg-primary/5 text-primary text-xs px-2.5 py-1 rounded-full">{inc}</span>
                          ))}
                          {pkg.inclusions.length > 4 && (
                            <span className="text-xs text-gray-400">+{pkg.inclusions.length - 4}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-medium">{pkg.rating}</span>
                          <span className="text-sm text-gray-400">({pkg.reviews} {t.search.reviews})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-2xl font-bold text-primary">{formatPrice(pkg.retailPrice)}</span>
                            <span className="text-sm text-gray-500 ml-1">{t.landing.perPerson}</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg">{t.search.noResults}</p>
                  <p className="text-gray-400 text-sm mt-1">{t.search.noResultsHint}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
