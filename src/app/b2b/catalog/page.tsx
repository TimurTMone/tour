"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useLang } from "@/lib/LangContext";
import { packages, operators } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Star, Sparkles, Building2, TrendingUp, Package, ShoppingCart, Eye, LogIn } from "lucide-react";

export default function B2BCatalogPage() {
  const router = useRouter();
  const { t } = useLang();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const currentOperator = operators[0];

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-surface flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">{t.b2b.partnerPortal}</h1>
              <p className="text-gray-500 mt-1">{t.b2b.accessExclusive}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t.b2b.email}</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="operator@company.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">{t.b2b.password}</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <button onClick={() => setIsLoggedIn(true)} className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors">
                <LogIn className="w-5 h-5" /> {t.b2b.signIn}
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-6">{t.b2b.demoHint}</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"><Building2 className="w-6 h-6 text-primary" /></div>
                <div>
                  <h1 className="text-xl font-bold">{currentOperator.company}</h1>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 uppercase">{currentOperator.tier} {t.b2b.partner}</span>
                    <span className="text-sm text-gray-500">{t.b2b.welcome}, {currentOperator.contactName}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center"><p className="text-sm text-gray-500">{t.b2b.totalOrders}</p><p className="text-xl font-bold">{currentOperator.totalOrders}</p></div>
                <div className="text-center"><p className="text-sm text-gray-500">{t.b2b.revenue}</p><p className="text-xl font-bold">{formatPrice(currentOperator.revenue)}</p></div>
                <div className="text-center"><p className="text-sm text-gray-500">{t.b2b.creditLimit}</p><p className="text-xl font-bold">{formatPrice(currentOperator.creditLimit)}</p></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
              <Package className="w-8 h-8 text-primary" />
              <div><p className="text-xs text-gray-500">{t.b2b.availablePackages}</p><p className="text-lg font-bold">{packages.length}</p></div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-accent" />
              <div><p className="text-xs text-gray-500">{t.b2b.exclusiveDeals}</p><p className="text-lg font-bold">{packages.filter(p => p.isExclusive).length}</p></div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div><p className="text-xs text-gray-500">{t.b2b.avgMargin}</p><p className="text-lg font-bold">32%</p></div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-purple-500" />
              <div><p className="text-xs text-gray-500">{t.b2b.cart}</p><p className="text-lg font-bold">0 {t.b2b.items}</p></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{t.b2b.inventoryCatalog}</h2>
          <p className="text-gray-500 mb-6">{t.b2b.netPricesShown}</p>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.packageCol}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.destinationCol}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.durationCol}</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.hotelCol}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.netPrice}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.retailPrice}</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.margin}</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase">{t.b2b.actions}</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => {
                  const margin = Math.round(((pkg.retailPrice - pkg.netPrice) / pkg.retailPrice) * 100);
                  return (
                    <tr key={pkg.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={pkg.image} alt={pkg.name} className="w-12 h-10 rounded-lg object-cover" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-medium text-sm">{pkg.name}</p>
                              {pkg.isExclusive && <Sparkles className="w-3.5 h-3.5 text-accent" />}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star className="w-3 h-3 fill-accent text-accent" />
                              <span className="text-xs text-gray-400">{pkg.rating} ({pkg.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{pkg.destination}</td>
                      <td className="px-4 py-3 text-sm">{pkg.duration} {t.landing.days}</td>
                      <td className="px-4 py-3 text-sm">{pkg.hotel} <span className="text-gray-400">({pkg.hotelStars}★)</span></td>
                      <td className="px-4 py-3 text-right"><span className="font-bold text-primary">{formatPrice(pkg.netPrice)}</span></td>
                      <td className="px-4 py-3 text-right text-sm text-gray-500">{formatPrice(pkg.retailPrice)}</td>
                      <td className="px-4 py-3 text-right"><span className="text-sm font-medium text-green-600">{margin}%</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => router.push(`/package/${pkg.id}`)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors"><Eye className="w-4 h-4 text-gray-400" /></button>
                          <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">{t.b2b.addToOrder}</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
