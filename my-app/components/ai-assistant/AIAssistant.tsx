"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: typeof products;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI Shopping Assistant. I can help you find products, answer questions about our catalog, or provide recommendations. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): { content: string; products?: typeof products } => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Check for product category queries
    const categories = ["audio", "tech", "accessories", "bags", "home", "stationery"];
    const categoryMatch = categories.find(cat => lowerMsg.includes(cat));
    
    if (categoryMatch) {
      const categoryProducts = products.filter(p => 
        p.category.toLowerCase() === categoryMatch
      );
      return {
        content: `I found ${categoryProducts.length} products in our ${categoryMatch} category. Here are some recommendations:`,
        products: categoryProducts.slice(0, 3),
      };
    }

    // Check for price-related queries
    if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("cheap") || lowerMsg.includes("expensive")) {
      const budgetMatch = lowerMsg.match(/\$(\d+)/);
      if (budgetMatch) {
        const budget = parseInt(budgetMatch[1]);
        const affordableProducts = products.filter(p => p.price <= budget);
        if (affordableProducts.length > 0) {
          return {
            content: `Here are products within your budget of $${budget}:`,
            products: affordableProducts.slice(0, 3),
          };
        }
        return {
          content: `I couldn't find any products under $${budget}. Our prices range from $49 to $399. Would you like to see our most affordable options?`,
        };
      }
      
      const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
      return {
        content: "Our products range from $49 to $399. Here are some of our most popular items across different price points:",
        products: [sortedByPrice[0], sortedByPrice[Math.floor(sortedByPrice.length / 2)], sortedByPrice[sortedByPrice.length - 1]],
      };
    }

    // Check for recommendations
    if (lowerMsg.includes("recommend") || lowerMsg.includes("suggest") || lowerMsg.includes("best") || lowerMsg.includes("popular")) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return {
        content: "Based on our customer favorites, here are some highly recommended products:",
        products: shuffled.slice(0, 3),
      };
    }

    // Check for specific product name
    const productMatch = products.find(p => 
      lowerMsg.includes(p.name.toLowerCase()) || 
      p.name.toLowerCase().split(" ").some(word => lowerMsg.includes(word) && word.length > 3)
    );
    
    if (productMatch) {
      return {
        content: `Great choice! The ${productMatch.name} is priced at ${formatPrice(productMatch.price)}. ${productMatch.description} Would you like to add it to your cart?`,
        products: [productMatch],
      };
    }

    // Check for features
    if (lowerMsg.includes("feature") || lowerMsg.includes("spec") || lowerMsg.includes("detail")) {
      return {
        content: "All our products come with detailed feature lists. Here are some of our feature-rich products:",
        products: products.filter(p => p.features && p.features.length > 0).slice(0, 3),
      };
    }

    // Check for shipping
    if (lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
      return {
        content: "We offer free shipping on orders over $100! For orders under $100, shipping is $15. All orders are delivered within 3-5 business days.",
      };
    }

    // Check for return policy
    if (lowerMsg.includes("return") || lowerMsg.includes("refund")) {
      return {
        content: "We have a 30-day return policy on all products. If you're not satisfied, you can return any item within 30 days for a full refund.",
      };
    }

    // Check for warranty
    if (lowerMsg.includes("warranty") || lowerMsg.includes("guarantee")) {
      return {
        content: "All our products come with a 2-year warranty. We stand behind the quality of every item we sell.",
      };
    }

    // Check for greeting
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      return {
        content: "Hello! How can I help you find the perfect product today?",
      };
    }

    // Check for help
    if (lowerMsg.includes("help") || lowerMsg.includes("what can you do")) {
      return {
        content: "I can help you with:\n• Finding products by category\n• Price range queries\n• Product recommendations\n• Feature information\n• Shipping & returns\n• Warranty information\n\nWhat would you like to know?",
      };
    }

    // Default response
    const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);
    return {
      content: "I'm not sure I understood that correctly. Here are some popular products you might be interested in:",
      products: randomProducts,
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        products: response.products,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickSuggestions = [
    "Show me audio products",
    "What's under $100?",
    "Best sellers",
    "Tell me about shipping",
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          isOpen 
            ? "bg-slate-900 text-white rotate-90" 
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        )}
        aria-label={isOpen ? "Close chat" : "Open AI Assistant"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Shopping Assistant</h3>
              <p className="text-xs text-indigo-200">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5",
                  message.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-md"
                    : "bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm"
                )}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  {message.role === "assistant" ? (
                    <Bot className="h-3.5 w-3.5 text-indigo-600" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-indigo-200" />
                  )}
                  <span className="text-xs font-medium opacity-70">
                    {message.role === "assistant" ? "Assistant" : "You"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                
                {/* Product Cards */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-indigo-600 font-semibold">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        {messages.length < 3 && (
          <div className="px-4 py-2 bg-white border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about products..."
              className="flex-1 px-4 py-2.5 bg-slate-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              size="sm"
              className="px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
