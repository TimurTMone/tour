"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { tasks, staff } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Plus, Filter, AlertCircle, Clock, CheckCircle2, Circle } from "lucide-react";

const priorityColors = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-amber-100 text-amber-700",
  urgent: "bg-red-100 text-red-700",
};

const statusConfig = {
  todo: { icon: Circle, label: "To Do", color: "text-gray-400" },
  in_progress: { icon: Clock, label: "In Progress", color: "text-blue-500" },
  done: { icon: CheckCircle2, label: "Done", color: "text-green-500" },
  overdue: { icon: AlertCircle, label: "Overdue", color: "text-red-500" },
};

export default function TasksPage() {
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = tasks.filter((t) => {
    if (filterAssignee && t.assignedTo !== filterAssignee) return false;
    if (filterStatus && t.status !== filterStatus) return false;
    return true;
  });

  const grouped = {
    overdue: filtered.filter((t) => t.status === "overdue"),
    in_progress: filtered.filter((t) => t.status === "in_progress"),
    todo: filtered.filter((t) => t.status === "todo"),
    done: filtered.filter((t) => t.status === "done"),
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Tasks</h1>
              <p className="text-gray-500">{filtered.length} tasks · {grouped.overdue.length} overdue</p>
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white font-medium rounded-xl px-4 py-2.5 text-sm flex items-center gap-1.5 transition-colors">
              <Plus className="w-4 h-4" /> New Task
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All team members</option>
              {staff.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All statuses</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="space-y-8">
            {(["overdue", "in_progress", "todo", "done"] as const).map((status) => {
              const group = grouped[status];
              if (group.length === 0) return null;
              const config = statusConfig[status];
              const StatusIcon = config.icon;

              return (
                <div key={status}>
                  <div className="flex items-center gap-2 mb-3">
                    <StatusIcon className={`w-5 h-5 ${config.color}`} />
                    <h2 className="font-bold">{config.label}</h2>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{group.length}</span>
                  </div>
                  <div className="space-y-2">
                    {group.map((task) => (
                      <div
                        key={task.id}
                        className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4 ${
                          task.status === "overdue" ? "border-l-4 border-red-500" : ""
                        }`}
                      >
                        <StatusIcon className={`w-5 h-5 ${config.color} shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium text-sm ${task.status === "done" ? "line-through text-gray-400" : ""}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-400">Due: {formatDate(task.dueDate)}</span>
                            {task.bookingId && (
                              <span className="text-xs text-gray-400">Booking #{task.bookingId}</span>
                            )}
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                            {task.assignedTo[0]}
                          </div>
                          <span className="text-xs text-gray-500 hidden md:inline">{task.assignedTo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
