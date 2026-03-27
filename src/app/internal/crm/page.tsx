"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { leads, staff } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Search, Phone, Mail, MessageSquare, Globe, Building2, UserPlus, Filter } from "lucide-react";

const statusColumns = [
  { key: "new", label: "New Leads", color: "bg-blue-500" },
  { key: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { key: "quoted", label: "Quoted", color: "bg-purple-500" },
  { key: "booked", label: "Booked", color: "bg-green-500" },
  { key: "traveled", label: "Traveled", color: "bg-teal-500" },
  { key: "lost", label: "Lost", color: "bg-red-400" },
] as const;

const sourceIcons: Record<string, React.ElementType> = {
  web: Globe,
  whatsapp: MessageSquare,
  phone: Phone,
  walkin: UserPlus,
  b2b: Building2,
};

export default function CRMPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");

  const filteredLeads = leads.filter((lead) => {
    if (searchQuery && !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) && !lead.destination.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterAssignee && lead.assignedTo !== filterAssignee) return false;
    if (filterSource && lead.source !== filterSource) return false;
    return true;
  });

  const getLeadsByStatus = (status: string) => filteredLeads.filter((l) => l.status === status);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">CRM Pipeline</h1>
              <p className="text-gray-500">
                {filteredLeads.length} leads · {filteredLeads.filter((l) => l.status === "booked").length} booked ·
                {" "}{Math.round((filteredLeads.filter((l) => l.status === "booked" || l.status === "traveled").length / filteredLeads.length) * 100)}% conversion
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === "kanban" ? "bg-primary text-white" : "text-gray-500"}`}
                >
                  Kanban
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${viewMode === "list" ? "bg-primary text-white" : "text-gray-500"}`}
                >
                  List
                </button>
              </div>
              <button className="bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-2.5 text-sm flex items-center gap-1.5 transition-colors">
                <UserPlus className="w-4 h-4" /> Add Lead
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All agents</option>
              {staff.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All sources</option>
              <option value="web">Web</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="phone">Phone</option>
              <option value="walkin">Walk-in</option>
              <option value="b2b">B2B</option>
            </select>
          </div>

          {/* Kanban View */}
          {viewMode === "kanban" && (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {statusColumns.map((col) => {
                const colLeads = getLeadsByStatus(col.key);
                return (
                  <div key={col.key} className="min-w-[280px] w-[280px] shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${col.color}`} />
                      <h3 className="font-bold text-sm">{col.label}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{colLeads.length}</span>
                    </div>
                    <div className="space-y-3">
                      {colLeads.map((lead) => {
                        const SourceIcon = sourceIcons[lead.source] || Globe;
                        return (
                          <div key={lead.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm">{lead.name}</h4>
                              <SourceIcon className="w-4 h-4 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{lead.destination} · Budget {formatPrice(lead.budget)}</p>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{lead.notes}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                  {lead.assignedTo[0]}
                                </div>
                                <span className="text-xs text-gray-500">{lead.assignedTo}</span>
                              </div>
                              <span className="text-[10px] text-gray-400">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Lead</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Destination</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Budget</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Assigned</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => {
                    const statusCol = statusColumns.find((c) => c.key === lead.status);
                    return (
                      <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-3">
                          <p className="font-medium text-sm">{lead.name}</p>
                          <p className="text-xs text-gray-400">{lead.email}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">{lead.destination}</td>
                        <td className="px-4 py-3 text-sm font-medium">{formatPrice(lead.budget)}</td>
                        <td className="px-4 py-3 text-sm capitalize">{lead.source}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusCol?.color} text-white`}>
                            {statusCol?.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{lead.assignedTo}</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
