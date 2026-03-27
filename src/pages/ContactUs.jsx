import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Globe, ChevronRight } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        preferredContact: 'email'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Business Center', 'New York, NY 10001'],
      link: '#',
      linkText: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      link: 'tel:+15551234567',
      linkText: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['contact@brand.com', 'support@brand.com'],
      link: 'mailto:contact@brand.com',
      linkText: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon-Fri: 9am-6pm EST', 'Sat: 10am-4pm EST'],
      link: null,
      linkText: null
    },
  ];

  const departments = [
    { name: 'General Inquiry', email: 'info@brand.com' },
    { name: 'Sales & Partnership', email: 'sales@brand.com' },
    { name: 'Technical Support', email: 'support@brand.com' },
    { name: 'Press & Media', email: 'press@brand.com' },
    { name: 'Careers', email: 'careers@brand.com' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0A84FF] to-[#5BA3F7] rounded-xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-blue-100">We would love to hear from you. Get in touch!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
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
              {info.link && (
                <a 
                  href={info.link} 
                  className="text-[#0A84FF] text-sm ml-13 inline-flex items-center gap-1 mt-2 hover:underline"
                >
                  {info.linkText} <ChevronRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}

          {/* Social Media */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white hover:bg-sky-600 transition-colors">
                <span className="text-lg">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                <span className="text-lg">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                <span className="text-lg">▶</span>
              </a>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-green-50 rounded-xl border border-green-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Live Chat</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Chat with us for quick answers</p>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
              Start Chat
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Message sent successfully! We'll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Full Name *</label>
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
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email Address *</label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Subject *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="sales">Sales & Partnership</option>
                  <option value="support">Technical Support</option>
                  <option value="press">Press & Media</option>
                  <option value="careers">Careers</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Preferred Contact Method</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="contact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="text-[#0A84FF]"
                    />
                    <span className="text-sm text-gray-600">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="contact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                      className="text-[#0A84FF]"
                    />
                    <span className="text-sm text-gray-600">Phone</span>
                  </label>
                </div>
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
        </div>
      </div>

      {/* Department Contacts */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Contact by Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {departments.map((dept, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="font-medium text-gray-800 mb-1">{dept.name}</h3>
              <a href={`mailto:${dept.email}`} className="text-sm text-[#0A84FF] hover:underline">
                {dept.email}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Find Us on Map</h2>
        <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
          <MapPin className="w-12 h-12 text-gray-400" />
          <span className="ml-3 text-gray-500">Map integration would go here</span>
        </div>
      </div>
    </div>
  );
}
