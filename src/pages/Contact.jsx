import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      available: 'Mon-Fri, 9am-6pm EST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@brand.com', 'sales@brand.com'],
      available: '24/7 Support'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Business Avenue', 'New York, NY 10001'],
      available: 'Visit during business hours'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9am-6pm', 'Sat: 10am-4pm'],
      available: 'Closed on Sundays'
    },
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the Orders section, or by using the tracking number sent to your email.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be unused and in original packaging.'
    },
    {
      question: 'How can I get a refund?',
      answer: 'To request a refund, go to your order history and click on "Request Refund" next to the item you wish to return.'
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0A84FF] to-[#5BA3F7] rounded-xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-blue-100">We are here to help! Reach out to us anytime.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-4">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <info.icon className="w-5 h-5 text-[#0A84FF]" />
                </div>
                <h3 className="font-semibold text-gray-800">{info.title}</h3>
              </div>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 text-sm ml-13">{detail}</p>
              ))}
              <p className="text-xs text-gray-500 mt-2">{info.available}</p>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-[#0A84FF] hover:bg-blue-100 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Live Chat</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg text-green-600 hover:bg-green-100 transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0A84FF] text-white py-3 rounded-lg font-medium hover:bg-[#0766CC] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Find Us</h2>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-8 h-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Map integration would go here</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
