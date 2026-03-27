"use client";

import Navbar from "@/components/layout/Navbar";
import { dashboardMetrics, staff, leads, tasks } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import {
  TrendingUp, TrendingDown, Users, DollarSign, Plane, Building2,
  AlertTriangle, CheckCircle2, Clock, Target, BarChart3, ArrowUpRight
} from "lucide-react";

export default function DashboardPage() {
  const m = dashboardMetrics;
  const overdueCount = tasks.filter((t) => t.status === "overdue").length;
  const newLeadsToday = leads.filter((l) => l.createdAt.startsWith("2026-03-27")).length;
  const revenuePercent = Math.round((m.revenue.mtd / m.revenue.target) * 100);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500">March 2026 · Real-time overview</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-500">Live</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <span className="flex items-center gap-1 text-sm text-red-500">
                  <TrendingDown className="w-4 h-4" /> -6.7%
                </span>
              </div>
              <p className="text-sm text-gray-500">Revenue MTD</p>
              <p className="text-2xl font-bold">{formatPrice(m.revenue.mtd)}</p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400">Target: {formatPrice(m.revenue.target)}</span>
                  <span className="font-medium">{revenuePercent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${revenuePercent}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <TrendingUp className="w-4 h-4" /> +{newLeadsToday} today
                </span>
              </div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold">{m.leads.total}</p>
              <p className="text-xs text-gray-400 mt-1">Conversion rate: <span className="font-medium text-primary">{m.leads.conversionRate}%</span></p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Plane className="w-5 h-5 text-purple-600" />
                </div>
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle2 className="w-4 h-4" /> {m.bookings.confirmed} confirmed
                </span>
              </div>
              <p className="text-sm text-gray-500">Bookings</p>
              <p className="text-2xl font-bold">{m.bookings.total}</p>
              <p className="text-xs text-gray-400 mt-1">{m.bookings.pending} pending · {m.bookings.completed} completed</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <ArrowUpRight className="w-4 h-4" /> +{m.b2b.newOperators} new
                </span>
              </div>
              <p className="text-sm text-gray-500">B2B Operators</p>
              <p className="text-2xl font-bold">{m.b2b.activeOperators}</p>
              <p className="text-xs text-gray-400 mt-1">B2B Revenue: <span className="font-medium">{formatPrice(m.b2b.b2bRevenue)}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart (simplified bar chart) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Revenue Trend</h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-end gap-3 h-48">
                {m.monthlySales.map((month, i) => {
                  const maxRev = Math.max(...m.monthlySales.map((s) => s.revenue));
                  const heightPercent = (month.revenue / maxRev) * 100;
                  const isLast = i === m.monthlySales.length - 1;
                  return (
                    <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">{formatPrice(month.revenue / 1000)}k</span>
                      <div
                        className={`w-full rounded-t-lg transition-all ${isLast ? "bg-primary" : "bg-primary/20"}`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className={`text-xs ${isLast ? "font-bold text-primary" : "text-gray-400"}`}>{month.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Destinations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-6">Top Destinations</h2>
              <div className="space-y-4">
                {m.topDestinations.map((dest, i) => (
                  <div key={dest.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{i + 1}. {dest.name}</span>
                      <span className="text-gray-500">{dest.share}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${dest.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Staff Performance + Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Staff */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Staff Performance</h2>
              <div className="space-y-4">
                {staff.map((s) => (
                  <div key={s.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {s.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{s.name}</p>
                        <span className="text-sm font-bold text-primary">{s.bookings} bookings</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-400">{s.leads} leads</span>
                        <span className="text-xs text-gray-400">Conv: {s.conversion}%</span>
                        <span className="text-xs text-gray-400">{s.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts & Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-4">Alerts & Actions</h2>
              <div className="space-y-3">
                {overdueCount > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-700">{overdueCount} overdue task{overdueCount > 1 ? "s" : ""}</p>
                      <p className="text-xs text-red-500 mt-0.5">Respond to RFP from TourCo Uzbekistan</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
                  <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">2 unresponded leads (&gt;24h)</p>
                    <p className="text-xs text-amber-500 mt-0.5">Aisha Karimova, Ruslan Kasenov need follow-up</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">Revenue target: {revenuePercent}% achieved</p>
                    <p className="text-xs text-blue-500 mt-0.5">{formatPrice(m.revenue.target - m.revenue.mtd)} remaining to hit March target</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-700">New B2B operator interested</p>
                    <p className="text-xs text-green-500 mt-0.5">Aziz Nazarov from Uzbekistan — schedule meeting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
