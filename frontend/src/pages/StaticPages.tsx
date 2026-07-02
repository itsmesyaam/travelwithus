import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Compass, Mail, Phone, MapPin, Award, Shield, Check } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container max-w-4xl">
        <SectionHeader
          badge="Our Story"
          title="About KeralaX AI"
          description="We are redefining travel planning in God's Own Country using state-of-the-art artificial intelligence."
        />

        <div className="space-y-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
            Traditional travel booking is broken. Hours of manual search, rigid agent packages, and hidden fees make travel planning stressful. 
            KeralaX AI combines deep local expertise with modern tech to put you in complete control.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <Card hover={false} padding="md" className="text-center">
              <Compass className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Smart Curation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed local data of 500+ hidden spots, beaches, and tea gardens.
              </p>
            </Card>
            <Card hover={false} padding="md" className="text-center">
              <Award className="w-10 h-10 text-sky-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Premium Experience</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Apple-inspired fluid layouts designed for speed and simplicity.
              </p>
            </Card>
            <Card hover={false} padding="md" className="text-center">
              <Shield className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Zero Markup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No agencies or commission rates. Free itineraries, forever.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container max-w-5xl">
        <SectionHeader
          badge="Get in Touch"
          title="Contact Us"
          description="Have questions about planning your trip? Our travel experts and tech support are here to assist."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Reach Out Directly</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We love helping travelers make the most of their visit. Drop us a line, and we'll reply within 24 hours.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</h4>
                  <p className="text-sm font-semibold">explore@keralax.ai</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</h4>
                  <p className="text-sm font-semibold">+91 484 2901234</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Headquarters</h4>
                  <p className="text-sm font-semibold">Infopark Kochi, Kerala, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card padding="lg" className="bg-gray-50/50 dark:bg-gray-900/40">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 transition-colors" placeholder="How can we help you plan your journey?" defaultValue={""} />
              </div>
              <button className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-500 transition-colors">
                Send Message
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container max-w-3xl">
        <SectionHeader title="Privacy Policy" subtitle="Legal" />
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
          <p>Last updated: July 2, 2026</p>
          <p>
            At KeralaX AI, we take your privacy seriously. This privacy policy describes what personal data we collect, how we use it, and how we keep it safe when you use our services.
          </p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-2">1. Information We Collect</h3>
          <p>
            When you register, generate trip plans, or save itineraries, we collect the necessary credentials, travelers configuration, travel preferences, and source city.
          </p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-2">2. How We Use It</h3>
          <p>
            We use your data strictly to validate authentication tokens, retrieve your saved travel plans, and optimize the AI recommendation model. We do NOT share or sell your details to third-party travel brokers or aggregators.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container max-w-3xl">
        <SectionHeader title="Terms of Service" subtitle="Legal" />
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
          <p>Last updated: July 2, 2026</p>
          <p>
            By accessing or using KeralaX AI, you agree to comply with and be bound by these Terms of Service.
          </p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-2">1. Use of Service</h3>
          <p>
            You agree to use our travel planning platform only for personal, non-commercial purposes. AI-generated travel advice, itineraries, weather statistics, and travel warnings are curated as recommendations. KeralaX AI is not responsible for sudden local closures, delays, weather anomalies, or service disruptions during your actual trip.
          </p>
        </div>
      </div>
    </div>
  );
}
