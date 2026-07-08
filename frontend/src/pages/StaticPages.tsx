import React, { useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { 
  Compass, Mail, Phone, MapPin, Award, Shield, Check, 
  Users, Clock, Lock, Globe, AlertCircle, FileText, Send, 
  HelpCircle, ShieldCheck, Heart, Coffee, ExternalLink
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export function AboutPage() {
  const teamMembers = [
    {
      name: 'Anandakrishnan V.',
      role: 'Co-Founder & CEO',
      initials: 'AV',
      gradient: 'from-emerald-500 to-teal-500',
      bio: 'A native of Alappuzha and former AI product lead at a top Silicon Valley tech firm. Anan returned to Kerala to build sustainable, graph-routing models that digitize his homeland’s local tourism ecosystem responsibly.',
    },
    {
      name: 'Sneha Nair',
      role: 'Co-Founder & Head of Curation',
      initials: 'SN',
      gradient: 'from-amber-500 to-orange-500',
      bio: 'A travel journalist and field photographer who spent 7 years mapping the remote tribal hamlets, hidden spice routes, and culinary treasures of the Western Ghats. She leads our network of local physical verifiers.',
    },
    {
      name: 'Devanand K. S.',
      role: 'Chief AI Architect',
      initials: 'DK',
      gradient: 'from-sky-500 to-indigo-500',
      bio: 'An IIT Madras alumnus specializing in multi-criteria pathfinding. Devanand engineered our custom routing engine to dynamically adjust routes for local weather, elevation, and traveler interests.',
    },
    {
      name: 'Meera Pillai',
      role: 'Director of Community Relations',
      initials: 'MP',
      gradient: 'from-purple-500 to-pink-500',
      bio: 'A former community development officer who partners directly with Kerala’s local homestays, Kudumbashree food units, and traditional canoe operators to bring their micro-enterprises directly to global travelers.',
    },
  ];

  const values = [
    {
      icon: Compass,
      title: 'Decentralized Curation',
      description: 'We ignore commercialized tourist traps. Our system indexes over 500+ local viewpoints, secret bathing pools, and artisanal farms verified personally by our team.',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
    },
    {
      icon: Award,
      title: 'Zero-Markup Policy',
      description: 'We do not charge commissions or partner with predatory tour operators. By matching travelers directly with native hosts, we ensure 100% of your travel spend stays in the local economy.',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30'
    },
    {
      icon: ShieldCheck,
      title: 'Ethical Routing & AI',
      description: 'We design itineraries that distribute tourism density. By steering foot traffic away from ecologically sensitive zones, we help conserve the fragile ecosystems of Kerala.',
      color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30'
    }
  ];

  return (
    <div className="py-16 bg-sand-warm dark:bg-gray-950 min-h-screen">
      <div className="container max-w-6xl px-4 mx-auto">
        <SectionHeader
          badge="Our Story"
          title="About TravelWithUs AI"
          description="We are redefining travel planning in God's Own Country, blending cutting-edge artificial intelligence with authentic native curation."
        />

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-gray-900 dark:text-white">
              Born from a quiet ridge in Munnar
            </h3>
            <p>
              In the autumn of 2024, our founders Anandakrishnan and Sneha stood on a high mountain ridge in Munnar, watching a line of seventy diesel SUVs idling on a narrow mountain road. The travelers in those vehicles were all heading to a single commercialized 'sunset point' promoted by legacy booking agencies. 
            </p>
            <p>
              Yet, just two kilometers away lay an empty mountain clearing offering an unobstructed, breathtaking 360-degree view of the tea valleys, completely silent and untouched. That contrast sparked the vision for <strong>TravelWithUs AI</strong>.
            </p>
            <p>
              Traditional tourism is driven by commissions. It channels thousands of travelers down the exact same pipelines, creating gridlocks, environmental strain, and lackluster traveler experiences. We believed there was a better way—one that puts tech in service of discovery.
            </p>
            <p>
              We combined advanced geospatial mapping and graph theory with the rich, offline stories of local communities. Our platform crafts personalized, fluid journeys that adjust to the seasons, avoid crowded times, and lead you to genuine encounters.
            </p>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative bg-emerald-900 text-white rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-800 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
              <div className="relative z-10 space-y-6">
                <h4 className="text-xl font-bold font-serif text-emerald-300">The Native Impact</h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-emerald-500 pl-4">
                    <p className="text-3xl font-extrabold">500+</p>
                    <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">Verified Hidden Locations</p>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-4">
                    <p className="text-3xl font-extrabold">100%</p>
                    <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">Direct Native Business Support</p>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-4">
                    <p className="text-3xl font-extrabold">0%</p>
                    <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">Agent Markups or Commissions</p>
                  </div>
                </div>
                <div className="pt-4 flex items-center gap-3 text-sm text-emerald-100">
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-400 shrink-0" />
                  <span>Proudly built in Kochi, Kerala for travelers worldwide.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center font-serif text-gray-900 dark:text-white mb-12">
            The Principles We Guide By
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <Card key={idx} hover={false} padding="lg" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${val.color}`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{val.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{val.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center font-serif text-gray-900 dark:text-white mb-4">
            Meet the Curators & Builders
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-12">
            A small team of native storytellers, data scientists, and community builders working together in Kochi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <Card key={idx} hover={true} padding="md" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-lg shadow-inner`}>
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{member.name}</h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
                  {member.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: 'Planning',
    urgency: 'Medium',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    
    // Simulate API submission and generate unique ticket ID
    const randomTicket = 'TWU-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(randomTicket);
    setSubmitted(true);
  };

  const supportGuidelines = [
    {
      title: 'General Itinerary Planning',
      sla: 'SLA: Response within 4 hours',
      desc: 'Get assistance with custom travel dates, routing options, backwater home cruises, or recommendations.',
      email: 'explore@travelwithus.ai'
    },
    {
      title: 'On-Trip Urgent Support',
      sla: 'SLA: Response within 30 minutes',
      desc: 'For active travelers currently on the road facing sudden route blockages or service check-in issues.',
      email: 'assist@travelwithus.ai'
    },
    {
      title: 'Host & Homestay Relations',
      sla: 'SLA: Response within 24 hours',
      desc: 'Are you a local host, homestay entrepreneur, or canoe operator looking to list your services fee-free?',
      email: 'hosts@travelwithus.ai'
    }
  ];

  return (
    <div className="py-16 bg-sand-warm dark:bg-gray-950 min-h-screen">
      <div className="container max-w-6xl px-4 mx-auto">
        <SectionHeader
          badge="Get in Touch"
          title="Contact Our Team"
          description="Have questions about planning your journey? Our travel architects and support specialists are standing by."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">
                How We Can Help You
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                We avoid automated chatbot loops. When you write to us, a real human traveler based in Kochi will review your route maps and reply.
              </p>
            </div>

            {/* Support SLA list */}
            <div className="space-y-4">
              {supportGuidelines.map((guide, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{guide.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 shrink-0">
                      {guide.sla}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{guide.desc}</p>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono select-all">
                    {guide.email}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Contacts */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Support</h5>
                  <p className="text-sm font-semibold text-gray-950 dark:text-white">+91 484 2901234 (9 AM - 6 PM IST)</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Headquarters</h5>
                  <p className="text-sm font-semibold text-gray-950 dark:text-white">
                    Third Floor, Phase II, Infopark Kochi, Kerala, 682030, India
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Info */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 flex gap-3 text-xs text-amber-800 dark:text-amber-300">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
              <div className="space-y-1">
                <span className="font-bold">Kerala Tourism Emergency Helplines:</span>
                <p>Tourism Police: 112 or 1090. Medical Helpline: 108. Direct assistance for foreign national travelers is supported in English, Hindi, and Malayalam.</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            {submitted ? (
              <Card padding="lg" className="bg-white dark:bg-gray-900 border border-emerald-100 dark:border-emerald-950/50 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">Message Received Successfully!</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    We have logged your query under ticket ID <strong className="font-mono text-emerald-600 dark:text-emerald-400">{ticketId}</strong>. A traveler relations expert will reply to <span className="font-medium">{formData.email}</span> soon.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl max-w-sm mx-auto text-left text-xs space-y-2 text-gray-500 dark:text-gray-400">
                  <p><strong>Department:</strong> {formData.department} Support</p>
                  <p><strong>Urgency Level:</strong> {formData.urgency}</p>
                  <p><strong>Your Message:</strong> "{formData.message.substring(0, 100)}{formData.message.length > 100 ? '...' : ''}"</p>
                </div>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: '', email: '', department: 'Planning', urgency: 'Medium', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  Send Another Message
                </button>
              </Card>
            ) : (
              <Card padding="lg" className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-sand-warm dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-900 dark:text-white" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-sand-warm dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-900 dark:text-white" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Department</label>
                      <select 
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-sand-warm dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-900 dark:text-white"
                      >
                        <option value="Planning">Itinerary & Planning Support</option>
                        <option value="Technical">Technical App Issue</option>
                        <option value="Partnership">Partnerships & Co-Ops</option>
                        <option value="Emergency">Emergency Route Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Urgency Level</label>
                      <select 
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-sand-warm dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-900 dark:text-white"
                      >
                        <option value="Low">Low - Response within 24h</option>
                        <option value="Medium">Medium - Response within 4h</option>
                        <option value="High">Urgent - Response within 1h</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">How Can We Help?</label>
                    <textarea 
                      rows={5} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-sand-warm dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-gray-900 dark:text-white" 
                      placeholder="Please details your inquiry. If you have an active trip, specify your trip code." 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-500 hover:shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Support Request
                  </button>
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRIVACY POLICY PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('collection');

  const cookiesList = [
    { name: 'travelwithus-dark', purpose: 'Stores user dark mode configuration preference.', type: 'Functional', duration: 'Persistent (1 Year)' },
    { name: '_twu_session', purpose: 'Secures user authentication tokens and JWT sessions.', type: 'Strictly Essential', duration: 'Session' },
    { name: '_twu_mapbox_cache', purpose: 'Caches map tile vectors locally to reduce cellular bandwidth usage.', type: 'Performance', duration: 'Session (Local Storage)' },
    { name: '_twu_lang', purpose: 'Remembers user interface language settings.', type: 'Functional', duration: 'Persistent (30 Days)' }
  ];

  return (
    <div className="py-16 bg-sand-warm dark:bg-gray-950 min-h-screen">
      <div className="container max-w-6xl px-4 mx-auto">
        <SectionHeader
          badge="Legal Framework"
          title="Privacy & Data Protection"
          description="Last updated: July 8, 2026. We believe your travel data belongs to you. Read our full data practices below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Quick Index */}
          <div className="lg:col-span-4 sticky top-24 space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Table of Contents</h4>
            <button 
              onClick={() => setActiveSection('collection')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'collection' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              1. Information Collection
            </button>
            <button 
              onClick={() => setActiveSection('usage')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'usage' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              2. Data Processing & Usage
            </button>
            <button 
              onClick={() => setActiveSection('cookies')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'cookies' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Coffee className="w-4 h-4 shrink-0" />
              3. Cookies Statement
            </button>
            <button 
              onClick={() => setActiveSection('security')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'security' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Lock className="w-4 h-4 shrink-0" />
              4. Security & Cryptography
            </button>
            <button 
              onClick={() => setActiveSection('rights')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'rights' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Users className="w-4 h-4 shrink-0" />
              5. Data Rights & DPDP Act
            </button>
          </div>

          {/* Policy Content */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-sm min-h-[400px]">
            {activeSection === 'collection' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">1. Information Collection</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  We collect only the minimum necessary data to provide optimized, customized travel recommendations. This includes:
                </p>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 pl-4 list-disc">
                  <li><strong>Account Identifiers:</strong> Your email address and cryptographically-hashed credentials used to create and verify your user profile.</li>
                  <li><strong>Travel Preferences:</strong> Parameters such as starting city, travel party configuration (families, solo, couples), interest tags (beaches, high-ranges, cultural heritage), and duration of stay.</li>
                  <li><strong>Saved Itineraries:</strong> Routing logs, pinned destinations, and custom daily notes compiled by you in our planner interface.</li>
                  <li><strong>Device Meta-data:</strong> Anonymized operating system, screen sizes, browser models, and network speeds to correctly scale map tiles and coordinate points.</li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  We <strong>never</strong> collect browser histories, contact lists, or background physical location data unless you explicitly enable browser-level geolocation services to locate your coordinates on our interactive maps.
                </p>
              </div>
            )}

            {activeSection === 'usage' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">2. Data Processing & Usage</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Your travel planning details are processed transparently. We utilize the information to:
                </p>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 pl-4 list-disc">
                  <li>Compute distance matrices and optimal transit paths between Kerala’s districts.</li>
                  <li>Identify seasonal travel advisories based on your planning dates (e.g. recommending high-range fog avoidance in Munnar during peak monsoon weeks).</li>
                  <li>Validate authorization tokens to authenticate requests to custom dashboard routers.</li>
                </ul>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex gap-3 text-sm text-emerald-800 dark:text-emerald-300">
                  <Shield className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span><strong>Our Integrity Pledge:</strong> TravelWithUs AI is fully self-funded. We explicitly guarantee that we do not sell, license, or share your travel profiles, booking preferences, or identity files with third-party travel brokers, airlines, hotel groups, or ad networks.</span>
                </div>
              </div>
            )}

            {activeSection === 'cookies' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Coffee className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">3. Cookies & Session Storage</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  We use cookies and localStorage parameters strictly for core user-experience stability. We do not use third-party marketing or cross-site tracking cookies.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase tracking-widest font-bold">
                        <th className="pb-3 pr-4">Cookie Key</th>
                        <th className="pb-3 px-4">Core Purpose</th>
                        <th className="pb-3 px-4">Classification</th>
                        <th className="pb-3 pl-4">Storage Term</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                      {cookiesList.map((cook, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20">
                          <td className="py-3 pr-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{cook.name}</td>
                          <td className="py-3 px-4">{cook.purpose}</td>
                          <td className="py-3 px-4 font-semibold">{cook.type}</td>
                          <td className="py-3 pl-4 text-gray-400">{cook.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-400">
                  You can purge your cookies cache at any time via your browser settings. However, doing so will sign you out and reset dark mode styles to match your system preferences.
                </p>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">4. Security & Cryptographic Standards</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  We protect our system architecture to ensure traveler database integrity. Our current protocols include:
                </p>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 pl-4 list-disc">
                  <li><strong>TLS 1.3 Encryption:</strong> All server-client communications are wrapped under HTTPS TLS 1.3 protocols, preventing eavesdropping or interception.</li>
                  <li><strong>JSON Web Tokens (JWT):</strong> Authentication states are secured via encrypted JWT payloads transmitted inside Secure, SameSite, and HTTP-only cookie headers. This prevents Cross-Site Scripting (XSS) and Session Hijacking.</li>
                  <li><strong>Data-at-Rest Protection:</strong> User tables, itinerary models, and account details are stored on encrypted logical volumes using AES-256 block ciphers.</li>
                  <li><strong>VPC Isolation:</strong> Our backend routing algorithms run on Isolated Virtual Private Cloud (VPC) servers behind unified firewall clusters with active rate limiters to deflect denial-of-service (DDoS) requests.</li>
                </ul>
              </div>
            )}

            {activeSection === 'rights' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">5. Your Rights & Statutory Compliance</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  TravelWithUs AI aligns operational activities with global frameworks, including India's <strong>Digital Personal Data Protection (DPDP) Act</strong> and the European Union's <strong>GDPR</strong>. As a user, you have absolute control over your records:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-1">Right to Access & Rectify</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400">View and update your stored account details, home cities, and itineraries directly through your profile settings.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-1">Right to Deletion (Right to be Forgotten)</h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Trigger a one-click database purge in your profile settings. This permanently deletes your account and trip logs from our servers.</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  To log formal requests or questions regarding security concerns, please address your correspondence to our Data Protection Officer at <span className="font-semibold text-emerald-600 dark:text-emerald-400 select-all">dpo@travelwithus.ai</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TERMS OF SERVICE PAGE
   ───────────────────────────────────────────────────────────────────────────── */
export function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  return (
    <div className="py-16 bg-sand-warm dark:bg-gray-950 min-h-screen">
      <div className="container max-w-6xl px-4 mx-auto">
        <SectionHeader
          badge="Terms of Use"
          title="Terms of Service"
          description="Last updated: July 8, 2026. Please review our legal provisions, algorithmic disclaimers, and local dispute guidelines."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Quick Index */}
          <div className="lg:col-span-4 sticky top-24 space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">Table of Contents</h4>
            <button 
              onClick={() => setActiveSection('acceptance')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'acceptance' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Check className="w-4 h-4 shrink-0" />
              1. Acceptance & Use
            </button>
            <button 
              onClick={() => setActiveSection('accounts')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'accounts' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Users className="w-4 h-4 shrink-0" />
              2. Accounts & Operations
            </button>
            <button 
              onClick={() => setActiveSection('disclaimer')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'disclaimer' ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              3. AI Advisory Disclaimer
            </button>
            <button 
              onClick={() => setActiveSection('intellectual')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'intellectual' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              4. Intellectual Property
            </button>
            <button 
              onClick={() => setActiveSection('dispute')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center gap-3 ${activeSection === 'dispute' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'}`}
            >
              <Shield className="w-4 h-4 shrink-0" />
              5. Dispute Jurisdiction
            </button>
          </div>

          {/* Terms Content */}
          <div className="lg:col-span-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-sm min-h-[400px]">
            {activeSection === 'acceptance' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">1. Agreement & Acceptance of Terms</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  By registering with, navigating, or accessing the <strong>TravelWithUs AI</strong> platform, you agree to comply with and be bound by these legal terms. If you do not accept these guidelines, you must terminate your access immediately.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  These terms represent a legally binding agreement between you and the operating entity of TravelWithUs AI. We reserve the right to revise or modify these provisions to align with new local laws, features, or architectural adjustments.
                </p>
              </div>
            )}

            {activeSection === 'accounts' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">2. User Accounts & Fair Usage</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  When creating an account to save itineraries, you agree to submit precise profile details and maintain secure local credentials. You are entirely responsible for preventing unauthorized actions under your session keys.
                </p>
                <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-gray-400">Strictly Prohibited Behavior:</h5>
                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <li>Executing automated scripts, data scrapers, or web spiders to extract our custom points-of-interest database or routing tables.</li>
                    <li>Attempting to bypass authentication headers, API rate-limiters, or reverse-engineer our proprietary itinerary matching models.</li>
                    <li>Posting offensive content or abusing support channels to submit false emergency advisories.</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Violation of these guidelines will result in immediate suspension of account privileges and deletion of saved databases.
                </p>
              </div>
            )}

            {activeSection === 'disclaimer' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-amber-200 dark:border-amber-900">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-amber-600 dark:text-amber-400">3. AI Advisory Disclaimer & Liability Release</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                  PLEASE READ THIS DISCLAIMER CARFULLY BEFORE INITIATING YOUR JOURNEY.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  TravelWithUs AI operates as an advanced advisory algorithm designed to optimize routes, schedule daily lists, and estimate travel transit windows. However, Kerala’s geographic terrain features unique, rapidly changing variables:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-950/50 space-y-1.5">
                    <span className="font-bold text-amber-800 dark:text-amber-300">Weather & Seasonal Hazards</span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Western Ghats high-range roads (Munnar, Vagamon, Wayanad) are subject to sudden monsoon mudslides, road washes, and dense fog which can reduce traffic speed to under 10 km/h.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-950/50 space-y-1.5">
                    <span className="font-bold text-amber-800 dark:text-amber-300">Local Closures & Events</span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Local temple festivals (such as Thrissur Pooram), boat races (Nehru Trophy), or strikes may cause immediate, unannounced closures of public routes or waterways.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-950/50 space-y-1.5">
                    <span className="font-bold text-amber-800 dark:text-amber-300">Wildlife Migration Paths</span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Routes passing near forest limits (e.g. Athirappilly, Munnar-Marayoor, Chinnar) are subject to traffic restrictions due to wild elephant or bison movements.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-950/50 space-y-1.5">
                    <span className="font-bold text-amber-800 dark:text-amber-300">Third-Party Operations</span>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Service quality, room hygiene, canoe safety, or pricing at recommended homestays and operators are the sole responsibility of the respective service providers.</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong>Liability Release:</strong> TravelWithUs AI is not liable for structural delays, direct or indirect financial loss, injury, illness, or property damage resulting from travel decisions made using our platform. You agree to cross-reference recommendations with regional government warnings (e.g., KSDMA alerts) and exercise logical judgment on the field.
                </p>
              </div>
            )}

            {activeSection === 'intellectual' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Compass className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">4. Intellectual Property Rights</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  All custom digital components on this platform are owned by or licensed to TravelWithUs AI:
                </p>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 pl-4 list-disc">
                  <li><strong>The Local Curation Database:</strong> Our collection of over 500+ hand-verified viewpoints, spice plantations, and homestay descriptions is copyrighted.</li>
                  <li><strong>Proprietary Designs:</strong> The UI structure, styling tokens, custom maps, icons, brand names, and logo marks.</li>
                  <li><strong>The Graph Engine:</strong> Our algorithms and server code.</li>
                </ul>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  You are permitted to download and share your personal trip itinerary maps for private, non-commercial purposes. Re-selling, syndicating, or licensing compiled lists under a different brand name is strictly forbidden.
                </p>
              </div>
            )}

            {activeSection === 'dispute' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-gray-900 dark:text-white">5. Governing Law & Dispute Jurisdiction</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  These Terms of Service, along with all operational actions of the platform, are governed by and construed in accordance with the laws of <strong>India</strong>.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  In the event of any conflict, dispute, or lawsuit arising out of or in connection with the platform's services, you agree that such disputes shall be settled exclusively in the competent courts situated in <strong>Ernakulam (Kochi), Kerala, India</strong>.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  For formal notifications or legal correspondences, please contact our Legal Counsel at <span className="font-semibold text-emerald-600 dark:text-emerald-400 select-all">legal@travelwithus.ai</span>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
