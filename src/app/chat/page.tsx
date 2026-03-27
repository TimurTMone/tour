"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { packages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Send, Bot, User, Star, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
  packages?: typeof packages;
}

const suggestions = [
  "I want 5 days in Turkey for a family of 4 under $1500 per person",
  "Best honeymoon destinations with overwater villas",
  "Affordable beach vacation in July for 2 adults",
  "Adventure trip with diving and cultural experiences",
];

function getAIResponse(userMessage: string): Message {
  const msg = userMessage.toLowerCase();

  // Simple keyword matching for demo
  let matchedPackages = packages;
  let response = "";

  if (msg.includes("turkey") || msg.includes("antalya") || msg.includes("istanbul") || msg.includes("cappadocia")) {
    matchedPackages = packages.filter(p => p.destinationCountry === "Turkey");
    response = "Great choice! Turkey is one of our most popular destinations. Here are the best packages I found for you:";
  } else if (msg.includes("honeymoon") || msg.includes("romantic") || msg.includes("couple")) {
    matchedPackages = packages.filter(p => p.name.toLowerCase().includes("honeymoon") || p.name.toLowerCase().includes("luxury") || p.destination === "Maldives");
    response = "For a romantic getaway, I'd highly recommend these packages — they're perfect for couples:";
  } else if (msg.includes("beach") || msg.includes("sea") || msg.includes("sun")) {
    matchedPackages = packages.filter(p => ["Antalya", "Maldives", "Phuket", "Sharm El-Sheikh"].includes(p.destination));
    response = "Love the beach vibes! Here are our best beach packages with sun, sea, and sand:";
  } else if (msg.includes("budget") || msg.includes("cheap") || msg.includes("affordable") || msg.includes("under")) {
    matchedPackages = packages.filter(p => p.retailPrice <= 1000).sort((a, b) => a.retailPrice - b.retailPrice);
    response = "Here are our most affordable packages — great value without compromising on experience:";
  } else if (msg.includes("family") || msg.includes("kids") || msg.includes("children")) {
    matchedPackages = packages.filter(p => p.inclusions.some(i => i.toLowerCase().includes("kids") || i.toLowerCase().includes("family")) || p.name.toLowerCase().includes("family"));
    if (matchedPackages.length === 0) matchedPackages = packages.filter(p => p.retailPrice <= 1500);
    response = "Family-friendly options with kids clubs, pools, and activities everyone will enjoy:";
  } else if (msg.includes("dive") || msg.includes("diving") || msg.includes("snorkel") || msg.includes("adventure")) {
    matchedPackages = packages.filter(p => p.inclusions.some(i => i.toLowerCase().includes("div") || i.toLowerCase().includes("snorkel")) || p.name.toLowerCase().includes("adventure"));
    response = "For adventure seekers! These packages include amazing diving and water activities:";
  } else if (msg.includes("luxury") || msg.includes("premium") || msg.includes("5 star") || msg.includes("exclusive")) {
    matchedPackages = packages.filter(p => p.isExclusive || p.hotelStars === 5).sort((a, b) => b.retailPrice - a.retailPrice);
    response = "Our premium selection — exclusive deals with 5-star luxury:";
  } else {
    matchedPackages = packages.slice(0, 4);
    response = "Based on what you're looking for, here are some popular options I'd recommend. Feel free to tell me more about your preferences (destination, budget, dates, activities) and I'll narrow it down!";
  }

  return {
    role: "assistant",
    content: response,
    packages: matchedPackages.slice(0, 3),
  };
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI travel assistant. Tell me about your dream vacation — where do you want to go, when, how many travelers, and your budget — and I'll find the perfect package for you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const message = text || input;
    if (!message.trim()) return;

    const userMsg: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(message);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 h-screen flex flex-col bg-surface">
        <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] ${msg.role === "user" ? "order-first" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white shadow-sm rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>

                  {/* Package Cards */}
                  {msg.packages && msg.packages.length > 0 && (
                    <div className="mt-3 space-y-3">
                      {msg.packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => router.push(`/package/${pkg.id}`)}
                          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4 w-full text-left"
                        >
                          <img src={pkg.image} alt={pkg.name} className="w-24 h-20 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-bold text-sm truncate">{pkg.name}</h4>
                              {pkg.isExclusive && <Sparkles className="w-4 h-4 text-accent shrink-0" />}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{pkg.duration} days · {pkg.hotel} · {pkg.airline}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-accent text-accent" />
                                <span className="text-xs font-medium">{pkg.rating}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">{formatPrice(pkg.retailPrice)}</span>
                                <ArrowRight className="w-4 h-4 text-primary" />
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-400 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="max-w-4xl mx-auto flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Tell me about your dream vacation..."
                className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-xl px-4 py-3 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
