"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles, ShoppingBag } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

// Smart AI response logic
function generateAIResponse(userMessage: string): { content: string; products?: Product[] } {
  const lowerMsg = userMessage.toLowerCase().trim();
  
  // Cheapest product query
  if (lowerMsg.includes("cheapest") || lowerMsg.includes("lowest price") || lowerMsg.includes("least expensive")) {
    const cheapest = [...products].sort((a, b) => a.price - b.price)[0];
    return {
      content: `Our most affordable product is the **${cheapest.name}** at ${formatPrice(cheapest.price)}. It's a great entry point into our collection!`,
      products: [cheapest],
    };
  }
  
  // Most expensive/premium query
  if (lowerMsg.includes("most expensive") || lowerMsg.includes("highest price") || lowerMsg.includes("premium")) {
    const expensive = [...products].sort((a, b) => b.price - a.price)[0];
    return {
      content: `Our premium offering is the **${expensive.name}** at ${formatPrice(expensive.price)}. It represents the pinnacle of our collection with exceptional quality.`,
      products: [expensive],
    };
  }
  
  // Electronics/Tech query
  if (lowerMsg.includes("electronics") || lowerMsg.includes("tech") || lowerMsg.includes("gadget") || lowerMsg.includes("device")) {
    const techProducts = products.filter(p => 
      p.category.toLowerCase() === "tech" || 
      p.category.toLowerCase() === "audio"
    );
    return {
      content: `Yes! We have ${techProducts.length} tech products in our collection, including headphones, keyboards, fitness trackers, and more. Here are some highlights:`,
      products: techProducts.slice(0, 3),
    };
  }
  
  // Budget/Price range queries
  const budgetMatch = lowerMsg.match(/under\s*\$?(\d+)|less\s*than\s*\$?(\d+)|\$?(\d+)\s*or\s*less|cheap/i);
  if (budgetMatch) {
    const budget = parseInt(budgetMatch[1] || budgetMatch[2] || budgetMatch[3] || "100");
    const affordable = products.filter(p => p.price <= budget);
    if (affordable.length > 0) {
      return {
        content: `I found ${affordable.length} products under ${formatPrice(budget)}. Here are some great options:`,
        products: affordable.slice(0, 3),
      };
    }
    return {
      content: `I couldn't find any products under ${formatPrice(budget)}. Our prices start at ${formatPrice(Math.min(...products.map(p => p.price)))}. Would you like to see our most affordable items?`,
    };
  }
  
  // Category queries
  const categories = ["audio", "tech", "accessories", "bags", "home", "stationery"];
  const categoryMatch = categories.find(cat => lowerMsg.includes(cat));
  if (categoryMatch) {
    const categoryProducts = products.filter(p => p.category.toLowerCase() === categoryMatch);
    return {
      content: `We have ${categoryProducts.length} products in our ${categoryMatch} category. Take a look at these:`,
      products: categoryProducts.slice(0, 3),
    };
  }
  
  // Compare products
  if (lowerMsg.includes("compare") || lowerMsg.includes("difference") || lowerMsg.includes("vs")) {
    const audioProducts = products.filter(p => p.category === "Audio");
    if (audioProducts.length >= 2) {
      return {
        content: `Here's a quick comparison of our popular items. Would you like more details on any specific product?`,
        products: audioProducts.slice(0, 2),
      };
    }
  }
  
  // Best value / recommendations
  if (lowerMsg.includes("best value") || lowerMsg.includes("recommend") || lowerMsg.includes("suggest") || lowerMsg.includes("what should i buy")) {
    const midRange = products.filter(p => p.price >= 100 && p.price <= 250);
    const shuffled = [...midRange].sort(() => 0.5 - Math.random());
    return {
      content: `Based on customer favorites, I'd recommend these products that offer excellent value for their price:`,
      products: shuffled.slice(0, 3),
    };
  }
  
  // Product count
  if (lowerMsg.includes("how many") || lowerMsg.includes("total products")) {
    return {
      content: `We currently have **${products.length} products** in our catalog across ${categories.length} categories: ${categories.join(", ")}.`,
    };
  }
  
  // Specific product by name
  const productByName = products.find(p => 
    lowerMsg.includes(p.name.toLowerCase()) ||
    p.name.toLowerCase().split(" ").some(word => word.length > 4 && lowerMsg.includes(word))
  );
  if (productByName) {
    return {
      content: `The **${productByName.name}** is a fantastic choice! Priced at ${formatPrice(productByName.price)}, it's a ${productByName.category} item. ${productByName.description.slice(0, 100)}...`,
      products: [productByName],
    };
  }
  
  // Features query
  if (lowerMsg.includes("features") || lowerMsg.includes("specs") || lowerMsg.includes("what does it have")) {
    const featuredProducts = products.filter(p => p.features && p.features.length > 0);
    return {
      content: `Many of our products come with impressive features. Here are some feature-rich options:`,
      products: featuredProducts.slice(0, 3),
    };
  }
  
  // Gift ideas
  if (lowerMsg.includes("gift") || lowerMsg.includes("present")) {
    const giftable = products.filter(p => p.price >= 50 && p.price <= 200);
    const shuffled = [...giftable].sort(() => 0.5 - Math.random());
    return {
      content: `Looking for a gift? Here are some popular items in the perfect gift price range:`,
      products: shuffled.slice(0, 3),
    };
  }
  
  // Greeting
  if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
    return {
      content: `Hello! 👋 I'm your AI shopping assistant. I can help you find products, compare prices, or answer questions about our catalog. What are you looking for today?`,
    };
  }
  
  // Help
  if (lowerMsg.includes("help") || lowerMsg.includes("what can you do")) {
    return {
      content: `I can help you with:\n\n• **Finding products** by category (audio, tech, bags, etc.)\n• **Price queries** (cheapest, under $X, premium)\n• **Product recommendations** based on your needs\n• **Comparisons** between products\n• **Gift ideas** for any budget\n• **General questions** about our catalog\n\nTry asking: "What's the cheapest?" or "Show me electronics"`,
    };
  }
  
  // Default response with random suggestions
  const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);
  return {
    content: `I'm not sure I understood that. Here are some popular products you might like, or type "help" to see what I can do:`,
    products: randomProducts,
  };
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI shopping assistant. Ask me anything about our products - like 'What's the cheapest?' or 'Do you have electronics?'",
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
  }, [messages, isTyping]);

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

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        products: response.products,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "What's the cheapest?",
    "Do you have electronics?",
    "Show me bags",
    "Under $150",
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        aria-label={isOpen ? "Close chat" : "Open AI Chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="h-6 w-6" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="h-3 w-3 text-yellow-300" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 3 }}
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-sm font-semibold text-white">AI Shopping Assistant</h3>
                  <p className="text-xs text-indigo-200">Powered by Smart Logic</p>
                </div>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-md"
                          : "bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm"
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1">
                        {message.role === "assistant" ? (
                          <Bot className="h-3.5 w-3.5 text-indigo-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full bg-indigo-300" />
                        )}
                        <span className="text-xs font-medium opacity-70">
                          {message.role === "assistant" ? "AI" : "You"}
                        </span>
                      </div>
                      <p 
                        className="text-sm whitespace-pre-line"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                        }}
                      />
                      
                      {/* Product Cards */}
                      {message.products && message.products.length > 0 && (
                        <motion.div 
                          className="mt-3 space-y-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ delay: 0.2 }}
                        >
                          {message.products.map((product, pIndex) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * pIndex }}
                            >
                              <Link
                                href={`/product/${product.id}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-12 h-12 rounded-md object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-indigo-600 font-semibold">
                                    {formatPrice(product.price)}
                                  </p>
                                </div>
                                <ShoppingBag className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-indigo-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length < 3 && (
              <motion.div 
                className="px-4 py-2 bg-white border-t border-slate-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs text-slate-500 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-600 rounded-full transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
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
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-indigo-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
