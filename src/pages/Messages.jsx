import { useState, useRef, useEffect } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Image, Paperclip, Smile, Bot, Sparkles, Loader } from 'lucide-react';

const AI_RESPONSES = {
  greeting: [
    "Hello! I'm your AI assistant. How can I help you today?",
    "Hi there! I can help you with products, orders, or any questions you have.",
    "Welcome! Ask me anything about our products or services."
  ],
  products: [
    "We have a wide range of products including electronics, home items, clothing, and more. Would you like me to show you our featured products?",
    "Our product catalog includes categories like Consumer Electronics, Home & Outdoor, and more. You can browse them at /products",
    "I can help you find specific products. Just tell me what you're looking for!"
  ],
  orders: [
    "To check your orders, please go to the Orders page or I can show you the status of your recent orders here.",
    "You can track your orders from the Orders section in your profile. Would you like me to help you with that?",
    "For order-related queries, you can view all your orders in the Orders tab. Need help with anything specific?"
  ],
  shipping: [
    "We offer free shipping on orders above $50. Standard shipping takes 5-10 business days.",
    "Shipping times vary: Standard (5-10 days), Express (2-3 days). Free shipping on orders over $50!",
    "Most orders ship within 24 hours. Delivery takes 5-10 business days for standard shipping."
  ],
  returns: [
    "We offer a 30-day return policy for most items. Products must be unused and in original packaging.",
    "To initiate a return, go to your order history and click 'Request Return'. Easy process!",
    "Yes, we have a hassle-free 30-day return policy. Just ensure the item is unused and in original packaging."
  ],
  pricing: [
    "Our prices are competitive and we offer discounts on bulk orders. Feel free to ask for special deals!",
    "For bulk pricing, contact us through the contact form. We offer attractive discounts on large orders.",
    "We frequently have deals and offers. Check our Hot Offers section for current discounts!"
  ],
  contact: [
    "You can contact us through the Contact Us page. We respond within 24 hours!",
    "For support, visit our Contact page or call us at +1 (555) 123-4567. We're happy to help!",
    "Need more help? Visit our Contact Us page or send us a message. Our team is available 24/7."
  ],
  default: [
    "That's an interesting question! Let me help you with that. Could you provide more details?",
    "I understand. Let me assist you better - could you clarify what you need?",
    "I'm here to help! You can also visit our Help page for more information.",
    "Thanks for asking! Check our Help section for detailed FAQs, or I can help you find products."
  ]
};

function getAIResponse(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  if (lowerMsg.match(/hi|hello|hey|greeting/)) {
    return AI_RESPONSES.greeting[Math.floor(Math.random() * AI_RESPONSES.greeting.length)];
  }
  if (lowerMsg.match(/product|shop|buy|item|catalog/)) {
    return AI_RESPONSES.products[Math.floor(Math.random() * AI_RESPONSES.products.length)];
  }
  if (lowerMsg.match(/order|order status|track|delivery/)) {
    return AI_RESPONSES.orders[Math.floor(Math.random() * AI_RESPONSES.orders.length)];
  }
  if (lowerMsg.match(/ship|shipping|delivery|free ship|delivery time/)) {
    return AI_RESPONSES.shipping[Math.floor(Math.random() * AI_RESPONSES.shipping.length)];
  }
  if (lowerMsg.match(/return|refund|exchange|退货/)) {
    return AI_RESPONSES.returns[Math.floor(Math.random() * AI_RESPONSES.returns.length)];
  }
  if (lowerMsg.match(/price|cost|discount|bulk|cheap|expensive/)) {
    return AI_RESPONSES.pricing[Math.floor(Math.random() * AI_RESPONSES.pricing.length)];
  }
  if (lowerMsg.match(/contact|support|help|help center|customer service/)) {
    return AI_RESPONSES.contact[Math.floor(Math.random() * AI_RESPONSES.contact.length)];
  }
  
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)];
}

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const chats = [
    {
      id: 'ai',
      name: 'AI Assistant',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AI',
      lastMessage: 'Ask me anything!',
      time: '',
      unread: 0,
      online: true,
      isAI: true
    },
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      lastMessage: 'Thanks for your order!',
      time: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMessage: 'Is the product available?',
      time: '1h ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      lastMessage: 'Can you give me a discount?',
      time: '3h ago',
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: 'Emily Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      lastMessage: 'When will it ship?',
      time: '1d ago',
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: 'David Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      lastMessage: 'I need bulk pricing',
      time: '2d ago',
      unread: 0,
      online: false
    },
  ];

  const [chatMessages, setChatMessages] = useState({
    0: [
      { id: 1, sender: 'ai', text: 'Hello! I\'m your AI Assistant. I can help you with:\n\n• Product information\n• Order status\n• Shipping details\n• Returns & refunds\n• Pricing & discounts\n\nWhat would you like to know?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ],
    1: [
      { id: 1, sender: 'them', text: 'Hi! I saw your product catalog.', time: '10:30 AM' },
      { id: 2, sender: 'them', text: 'I am interested in ordering 50 units of the wireless headphones.', time: '10:31 AM' },
      { id: 3, sender: 'me', text: 'Hello! Great to hear that. Yes, we have those in stock.', time: '10:32 AM' },
      { id: 4, sender: 'me', text: 'Can you provide a bulk discount?', time: '10:33 AM' },
      { id: 5, sender: 'them', text: 'Of course! For orders above 50 units, we offer 15% off.', time: '10:35 AM' },
      { id: 6, sender: 'them', text: 'Thanks for your order!', time: '10:36 AM' },
    ]
  });

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, selectedChat]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const currentMessages = chatMessages[selectedChat] || [];
    const userMsg = {
      id: currentMessages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages({
      ...chatMessages,
      [selectedChat]: [...currentMessages, userMsg]
    });

    const selectedChatData = filteredChats[selectedChat];
    
    if (selectedChatData?.isAI) {
      setIsTyping(true);
      
      setTimeout(() => {
        const aiMsg = {
          id: currentMessages.length + 2,
          sender: 'ai',
          text: getAIResponse(newMessage),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setChatMessages(prev => ({
          ...prev,
          [selectedChat]: [...(prev[selectedChat] || []), aiMsg]
        }));
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    }

    setNewMessage('');
  };

  const currentMessages = chatMessages[selectedChat] || [];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[calc(100vh-180px)] flex">
        {/* Chat List */}
        <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedChat !== null ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat, idx) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(idx)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                  selectedChat === idx ? 'bg-blue-50' : ''
                }`}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                  {chat.isAI && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold truncate ${chat.isAI ? 'text-purple-600' : 'text-gray-800'}`}>
                      {chat.isAI && <Bot className="inline w-4 h-4 mr-1" />}
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-[#0A84FF] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChat !== null && filteredChats[selectedChat] && (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  className="md:hidden mr-2"
                  onClick={() => setSelectedChat(null)}
                >
                  ← Back
                </button>
                <div className="relative">
                  <img 
                    src={filteredChats[selectedChat].avatar} 
                    alt={filteredChats[selectedChat].name} 
                    className="w-10 h-10 rounded-full" 
                  />
                  {filteredChats[selectedChat].online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                  {filteredChats[selectedChat].isAI && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </span>
                  )}
                </div>
                <div>
                  <h3 className={`font-semibold ${filteredChats[selectedChat].isAI ? 'text-purple-600' : 'text-gray-800'}`}>
                    {filteredChats[selectedChat].isAI && <Bot className="inline w-4 h-4 mr-1" />}
                    {filteredChats[selectedChat].name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {filteredChats[selectedChat].isAI ? 'AI Powered Assistant' : (filteredChats[selectedChat].online ? 'Online' : 'Offline')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {!filteredChats[selectedChat].isAI && (
                  <>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Video className="w-5 h-5" />
                    </button>
                  </>
                )}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-[#0A84FF] text-white rounded-br-none' 
                        : msg.sender === 'ai'
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 rounded-bl-none border border-purple-200'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex items-center gap-1 mb-1 text-purple-600">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-xs font-medium">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                      <span className="text-xs text-gray-500">AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              {!filteredChats[selectedChat].isAI && (
                <div className="flex items-center gap-2 mb-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Image className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={filteredChats[selectedChat].isAI ? "Ask AI Assistant anything..." : "Type a message..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className={`flex-1 h-10 px-4 border border-gray-200 rounded-full text-sm outline-none focus:border-[#0A84FF] ${filteredChats[selectedChat].isAI ? 'border-purple-300 focus:border-purple-500' : ''}`}
                />
                <button 
                  onClick={handleSend}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    filteredChats[selectedChat].isAI 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : 'bg-[#0A84FF] text-white hover:bg-[#0766CC]'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Chat Selected */}
        {selectedChat === null && (
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Select a conversation</h3>
              <p className="text-gray-500 mt-1">Choose from your existing conversations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
