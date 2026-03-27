import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Search, Book, MessageCircle, Phone, Mail, ChevronRight, ChevronDown, Video, FileText, MessageSquare } from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        { q: 'How do I create an account?', a: 'Click on the "Sign Up" button in the top right corner and fill in your details. You can also sign up using your Google or Facebook account.' },
        { q: 'How do I place an order?', a: 'Browse our products, add items to your cart, and proceed to checkout. Follow the steps to enter your shipping and payment information.' },
        { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers.' },
      ]
    },
    {
      category: 'Orders & Shipping',
      questions: [
        { q: 'How can I track my order?', a: 'You can track your order by logging into your account and visiting the "Orders" section. You will also receive tracking information via email.' },
        { q: 'How long does shipping take?', a: 'Standard shipping takes 5-10 business days. Express shipping takes 2-3 business days. International shipping takes 10-20 business days.' },
        { q: 'Do you ship internationally?', a: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.' },
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        { q: 'What is your return policy?', a: 'We offer a 30-day return policy for most items. Products must be unused, in original packaging, and in resalable condition.' },
        { q: 'How do I initiate a return?', a: 'Go to your order history, select the item you want to return, and click "Request Return". Our team will guide you through the process.' },
        { q: 'When will I receive my refund?', a: 'Refunds are typically processed within 5-10 business days after we receive your returned item. It may take an additional 3-5 days for the amount to appear in your account.' },
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your inbox.' },
        { q: 'How is my personal information protected?', a: 'We use industry-standard encryption and security measures to protect your data. Your information is never shared with third parties.' },
        { q: 'Can I delete my account?', a: 'Yes, you can delete your account from the Settings page. Note that this action is irreversible and all your data will be permanently deleted.' },
      ]
    },
  ];

  const helpTopics = [
    { icon: Book, title: 'Getting Started', desc: 'Learn the basics', count: 12 },
    { icon: MessageSquare, title: 'Orders & Shipping', desc: 'Track your orders', count: 8 },
    { icon: Mail, title: 'Returns & Refunds', desc: 'Easy returns', count: 6 },
    { icon: Video, title: 'Video Tutorials', desc: 'Watch & learn', count: 5 },
    { icon: FileText, title: 'Policies', desc: 'Terms & conditions', count: 4 },
  ];

  const filteredFaqs = searchQuery 
    ? faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q => 
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.questions.length > 0)
    : faqs;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0A84FF] to-[#5BA3F7] rounded-xl p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
              <HelpCircle className="w-8 h-8" />
              Help Center
            </h1>
            <p className="text-blue-100">Find answers to your questions</p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-lg text-gray-800 outline-none focus:ring-2 focus:ring-white"
            />
          </div>
        </div>
      </div>

      {/* Quick Help Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/contact" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-[#0A84FF]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Live Chat</h3>
            <p className="text-sm text-gray-500">Chat with our team</p>
          </div>
        </Link>
        <Link to="/contact" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Call Us</h3>
            <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
          </div>
        </Link>
        <Link to="/contact" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Email Support</h3>
            <p className="text-sm text-gray-500">support@brand.com</p>
          </div>
        </Link>
      </div>

      {/* Help Topics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {helpTopics.map((topic, idx) => (
          <button
            key={idx}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <topic.icon className="w-8 h-8 text-[#0A84FF] mb-2" />
            <h3 className="font-semibold text-gray-800">{topic.title}</h3>
            <p className="text-sm text-gray-500">{topic.desc}</p>
            <span className="text-xs text-[#0A84FF] mt-2 block">{topic.count} articles</span>
          </button>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {filteredFaqs.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{category.category}</h3>
              <div className="space-y-2">
                {category.questions.map((faq, faqIdx) => {
                  const faqId = `${catIdx}-${faqIdx}`;
                  return (
                    <div key={faqIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faqId ? null : faqId)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                      >
                        <span className="font-medium text-gray-800">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === faqId ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedFaq === faqId && (
                        <div className="px-4 pb-4 text-gray-600">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">No results found</h3>
            <p className="text-gray-500 mt-1">Try different keywords or contact support</p>
          </div>
        )}
      </div>

      {/* Still Need Help */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Still need help?</h3>
        <p className="text-gray-600 mb-4">Our support team is available 24/7</p>
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-2 bg-[#0A84FF] text-white px-6 py-3 rounded-lg hover:bg-[#0766CC] transition-colors"
        >
          Contact Support
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
