import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Compass, MapPin, Calendar, Users, DollarSign,
  Briefcase, Heart, UtensilsCrossed, AlertCircle,
  ArrowRight, ArrowLeft, RefreshCw, Save, Check, Plus, Minus,
  Activity, Star, Compass as CompassIcon, FileText, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Step definition
type Step = 'details' | 'preferences' | 'interests' | 'generating' | 'itinerary' | 'coming-soon';

export function TripPlannerPage() {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form inputs
  const [sourceCity, setSourceCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState(5);
  const [travelersCount, setTravelersCount] = useState(2);
  const [budget, setBudget] = useState('Mid-Range');
  const [travelStyle, setTravelStyle] = useState('Couple');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [accommodationPref, setAccommodationPref] = useState('Resort');
  const [vehiclePref, setVehiclePref] = useState('Private Cab');
  const [foodPref, setFoodPref] = useState('Local Seafood');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');

  // Result itinerary
  const [itinerary, setItinerary] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  const interestOptions = [
    { value: 'backwaters', label: 'Backwaters & Lagoons' },
    { value: 'hill-station', label: 'Hill Stations & Tea Hills' },
    { value: 'beach', label: 'Cliffs & Sandy Beaches' },
    { value: 'wildlife', label: 'Jungle Reserves & Wildlife' },
    { value: 'heritage', label: 'History & Temple Culture' },
    { value: 'adventure', label: 'Trekking & Forest Paces' },
    { value: 'pilgrimage', label: 'Spiritual Spaces' }
  ];

  const handleInterestToggle = (val: string) => {
    if (selectedInterests.includes(val)) {
      setSelectedInterests(selectedInterests.filter(i => i !== val));
    } else {
      setSelectedInterests([...selectedInterests, val]);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setCurrentStep('generating');

    try {
      const response = await fetch('/api/trips/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_city: sourceCity || 'Cochin',
          start_date: startDate || undefined,
          duration: duration,
          budget: budget.toLowerCase(),
          travelers_count: travelersCount,
          interests: selectedInterests,
          travel_style: travelStyle,
          accommodation_pref: accommodationPref,
          vehicle_pref: vehiclePref,
          food_pref: foodPref,
          accessibility_needs: accessibilityNeeds || undefined
        })
      });

      if (!response.ok) {
        throw new Error("AI Planner coming soon");
      }

      const data = await response.json();
      setItinerary(data);
      setCurrentStep('itinerary');
      setIsSaved(false);
    } catch (err: any) {
      console.log('AI Planner server offline. Using coming-soon placeholder:', err);
      setError(null);
      setCurrentStep('coming-soon');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePlan = async () => {
    const token = localStorage.getItem('travelwithus-token');
    if (!token) {
      alert("Please sign in or register to save itineraries to your dashboard.");
      return;
    }

    try {
      const response = await fetch('/api/trips/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          source_city: sourceCity || 'Cochin',
          duration: duration,
          budget: budget.toLowerCase(),
          travelers_count: travelersCount,
          travel_style: travelStyle,
          interests: selectedInterests,
          accommodation_pref: accommodationPref,
          vehicle_pref: vehiclePref,
          food_pref: foodPref,
          itinerary: itinerary
        })
      });

      if (response.ok) {
        setIsSaved(true);
      } else {
        alert("Failed to save. Session might be expired. Try logging in again.");
      }
    } catch (e) {
      alert("Error trying to connect with server database.");
    }
  };

  return (
    <div className="py-24 bg-sand-warm dark:bg-gray-950 min-h-screen transition-colors duration-500">
      <div className="container max-w-4xl px-6 mx-auto">
        <SectionHeader
          badge="AI Journey Concierge"
          title="Curate Your Sanctuary"
          description="Rethink travel planners. Answer conversational story guides to tailor your emotional Kerala journey."
        />

        <AnimatePresence mode="wait">
          {/* STEP 1: CONVERSATIONAL STORYTELLING DETAILS */}
          {currentStep === 'details' && (
            <motion.div
              key="step-details"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-md shadow-emerald-950/[0.01]">
                <div className="space-y-8 text-xl md:text-2xl font-serif text-emerald-deep dark:text-white leading-loose font-light">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>I wish to embark on a journey departing from</span>
                    <div className="inline-block border-b-2 border-gold focus-within:border-emerald-600 transition-colors py-1">
                      <input
                        type="text"
                        value={sourceCity}
                        onChange={(e) => setSourceCity(e.target.value)}
                        placeholder="e.g. Cochin, London, Mumbai"
                        className="bg-transparent border-none text-xl font-serif outline-none focus:ring-0 p-0 text-emerald-600 dark:text-emerald-400 font-bold placeholder-emerald-900/25 dark:placeholder-white/20 w-64"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span>to experience God's Own Country for a duration of</span>
                    <div className="flex items-center gap-3 bg-mist/60 dark:bg-gray-950 px-4 py-1.5 rounded-full border border-emerald-950/[0.04]">
                      <button
                        type="button"
                        onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                        className="p-1 rounded-full hover:bg-emerald-900/5 text-emerald-deep dark:text-emerald-400"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold font-sans text-sm tracking-wide">{duration} Days</span>
                      <button
                        type="button"
                        onClick={() => setDuration(prev => Math.min(14, prev + 1))}
                        className="p-1 rounded-full hover:bg-emerald-900/5 text-emerald-deep dark:text-emerald-400"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span>traveling with a total count of</span>
                    <div className="flex items-center gap-3 bg-mist/60 dark:bg-gray-950 px-4 py-1.5 rounded-full border border-emerald-950/[0.04]">
                      <button
                        type="button"
                        onClick={() => setTravelersCount(prev => Math.max(1, prev - 1))}
                        className="p-1 rounded-full hover:bg-emerald-900/5 text-emerald-deep dark:text-emerald-400"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold font-sans text-sm tracking-wide">{travelersCount} Guests</span>
                      <button
                        type="button"
                        onClick={() => setTravelersCount(prev => prev + 1)}
                        className="p-1 rounded-full hover:bg-emerald-900/5 text-emerald-deep dark:text-emerald-400"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span>starting on the date of</span>
                    <div className="inline-block border-b-2 border-gold focus-within:border-emerald-600 transition-colors py-1">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-transparent border-none text-sm font-sans font-bold tracking-wide outline-none focus:ring-0 p-0 text-emerald-600 dark:text-emerald-400 [color-scheme:light] w-48"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStep('preferences')}
                  className="px-8 py-3.5 bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/10"
                >
                  <span>Select Pacing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: TRAVEL STYLE & BUDGET preferences */}
          {currentStep === 'preferences' && (
            <motion.div
              key="step-pref"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-md shadow-emerald-950/[0.01]">
                <h3 className="font-serif text-2xl font-bold text-emerald-deep dark:text-white mb-8 flex items-center gap-2 border-b border-emerald-950/5 pb-4">
                  <DollarSign className="w-5 h-5 text-gold" /> Style & Budget
                </h3>

                <div className="space-y-8">
                  {/* Budget Options */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep/45 dark:text-sand-warm/40">Preferred Budget Pacing</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Budget', 'Mid-Range', 'Luxury'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={cn(
                            'py-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest cursor-pointer',
                            budget === b
                              ? 'border-gold bg-emerald-deep/5 text-emerald-deep dark:text-gold dark:border-gold'
                              : 'border-emerald-950/[0.06] dark:border-white/10 hover:border-emerald-950/20 text-slate-500'
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel style Options */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep/45 dark:text-sand-warm/40">Traveling Companion</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {['Solo', 'Couple', 'Family', 'Friends'].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setTravelStyle(style)}
                          className={cn(
                            'py-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest cursor-pointer',
                            travelStyle === style
                              ? 'border-gold bg-emerald-deep/5 text-emerald-deep dark:text-gold dark:border-gold'
                              : 'border-emerald-950/[0.06] dark:border-white/10 hover:border-emerald-950/20 text-slate-500'
                          )}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentStep('details')}
                  className="px-6 py-3.5 rounded-full border border-emerald-950/10 dark:border-white/10 hover:bg-emerald-950/5 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-emerald-deep dark:text-sand-warm transition-all cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep('interests')}
                  className="px-8 py-3.5 bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/10"
                >
                  <span>Select Moods</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: MOODS & SANCTUARY DETAILS */}
          {currentStep === 'interests' && (
            <motion.div
              key="step-interests"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <Card className="p-8 md:p-12 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-md shadow-emerald-950/[0.01]">
                <h3 className="font-serif text-2xl font-bold text-emerald-deep dark:text-white mb-8 flex items-center gap-2 border-b border-emerald-950/5 pb-4">
                  <Briefcase className="w-5 h-5 text-gold" /> 3. Select Sanctuary Pacing
                </h3>

                <div className="space-y-8">
                  {/* Category Interests */}
                  <div className="space-y-3.5">
                    <label className="block text-xs font-bold uppercase tracking-widest text-emerald-deep/45 dark:text-sand-warm/40">
                      What does your soul seek? (Pick one or more)
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {interestOptions.map((opt) => {
                        const active = selectedInterests.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleInterestToggle(opt.value)}
                            className={cn(
                              'px-5 py-3 rounded-full text-xs font-semibold border-2 transition-all cursor-pointer tracking-wider',
                              active
                                ? 'border-emerald-deep bg-emerald-deep text-white dark:border-gold dark:bg-gold dark:text-slate-950'
                                : 'border-emerald-950/[0.06] dark:border-white/10 hover:border-emerald-950/20 text-slate-500'
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-emerald-950/5 dark:border-white/5">
                    {/* Stay style */}
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-widest text-emerald-deep/45 dark:text-sand-warm/40 mb-2">
                        Stay Pacing
                      </label>
                      <select
                        value={accommodationPref}
                        onChange={(e) => setAccommodationPref(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-950/10 dark:border-white/10 bg-sand-warm dark:bg-gray-950 text-xs font-semibold uppercase tracking-wider outline-none cursor-pointer"
                      >
                        {['Resort', 'Homestay', 'Houseboat', 'Hotel'].map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    {/* Transfers */}
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-widest text-emerald-deep/45 dark:text-sand-warm/40 mb-2">
                        Transfer style
                      </label>
                      <select
                        value={vehiclePref}
                        onChange={(e) => setVehiclePref(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-950/10 dark:border-white/10 bg-sand-warm dark:bg-gray-950 text-xs font-semibold uppercase tracking-wider outline-none cursor-pointer"
                      >
                        {['Private Cab', 'Car Rental', 'Public Transport'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Culinary focus */}
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-widest text-emerald-deep/45 dark:text-sand-warm/40 mb-2">
                        Culinary Focus
                      </label>
                      <select
                        value={foodPref}
                        onChange={(e) => setFoodPref(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-950/10 dark:border-white/10 bg-sand-warm dark:bg-gray-950 text-xs font-semibold uppercase tracking-wider outline-none cursor-pointer"
                      >
                        {['Local Seafood', 'Vegetarian', 'Non-Vegetarian'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-[9px] uppercase font-bold tracking-widest text-emerald-deep/45 dark:text-sand-warm/40 mb-2">
                      Accessibility requirements (Optional)
                    </label>
                    <input
                      type="text"
                      value={accessibilityNeeds}
                      onChange={(e) => setAccessibilityNeeds(e.target.value)}
                      placeholder="e.g. Wheelchair access, infant seat, elderly friendly"
                      className="w-full px-4 py-3 rounded-xl border border-emerald-950/10 dark:border-white/10 bg-sand-warm dark:bg-gray-950 text-xs font-semibold outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </Card>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setCurrentStep('preferences')}
                  className="px-6 py-3.5 rounded-full border border-emerald-950/10 dark:border-white/10 hover:bg-emerald-950/5 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-emerald-deep dark:text-sand-warm transition-all cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-8 py-3.5 bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep rounded-full font-bold text-xs uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/10"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold fill-gold" />
                  <span>Curate Itinerary</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: MANDALA LOADING SEQUENCER */}
          {currentStep === 'generating' && (
            <motion.div
              key="step-generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-24 flex flex-col items-center justify-center space-y-8"
            >
              {/* Spinning organic SVG Mandala wheel loader */}
              <div className="relative w-28 h-28">
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-gold"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Stylized Mandala pattern */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" fill="none" opacity="0.3" />
                  <path d="M 50,5 C 55,25 45,25 50,45 C 55,45 60,40 80,50 C 60,60 55,55 50,75 C 45,55 40,60 20,50 C 40,40 45,45 50,5 Z" fill="currentColor" opacity="0.1" />
                  <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="8" fill="currentColor" className="animate-pulse" />
                </motion.svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-emerald-deep dark:text-white">Curating Sanctuary Plans</h3>
                <p className="text-xs text-emerald-deep/55 dark:text-sand-warm/50 max-w-sm mx-auto font-sans tracking-wide leading-relaxed animate-pulse">
                  Tracing spice lanes, anchoring houseboat channels, and matching stays to compose your day-by-day retreat.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 5: ITINERARY DISPLAY VIEW */}
          {currentStep === 'itinerary' && itinerary && (
            <motion.div
              key="step-itinerary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12 animate-fade-in"
            >
              {/* Header card banner */}
              <div className="relative rounded-[32px] p-8 md:p-12 bg-emerald-deep text-white shadow-xl shadow-emerald-950/15 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 translate-x-1/3 -translate-y-1/3" />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-white/5" />

                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full font-bold border border-white/10">
                      Handcrafted Itinerary
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl font-normal leading-tight">
                      {itinerary.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-sand-warm/75">
                      <span>Origin: <strong>{itinerary.source_city}</strong></span>
                      <span>•</span>
                      <span>Duration: <strong>{itinerary.duration} Days</strong></span>
                      <span>•</span>
                      <span>Budget: <strong className="capitalize">{budget}</strong></span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={isSaved ? <Check className="w-4.5 h-4.5 text-emerald-600" /> : <Save className="w-4.5 h-4.5" />}
                      onClick={handleSavePlan}
                      disabled={isSaved}
                      className="bg-gold text-emerald-deep hover:bg-gold/90 border-none font-bold uppercase tracking-widest text-[10px] py-3 rounded-full"
                    >
                      {isSaved ? 'Saved to Profile' : 'Save Plan'}
                    </Button>
                    <button
                      onClick={() => setCurrentStep('details')}
                      className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-[10px] transition-all"
                    >
                      <RefreshCw className="w-3 h-3 mr-1 inline" />
                      Plan Again
                    </button>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-8">
                <h4 className="font-serif text-2xl font-bold border-b border-emerald-950/5 dark:border-white/5 pb-3">
                  The Sequence of Sanctuaries
                </h4>

                <div className="relative pl-8 border-l border-gold/45 space-y-12">
                  {itinerary.days.map((dayObj: any) => (
                    <div key={dayObj.day} className="relative">
                      {/* Circle dot marker */}
                      <div className="absolute -left-[39px] top-1.5 w-4.5 h-4.5 rounded-full bg-gold border-[3.5px] border-sand-warm dark:border-gray-950" />
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-gold">
                            Day {dayObj.day}
                          </span>
                          <span className="text-slate-300 dark:text-gray-800">•</span>
                          <span className="text-xs font-bold uppercase tracking-wider text-emerald-deep/60 dark:text-sand-warm/60">
                            {dayObj.destination}
                          </span>
                        </div>

                        <h5 className="font-serif text-2xl font-bold text-emerald-deep dark:text-white leading-tight">
                          {dayObj.title}
                        </h5>

                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                          Transfer pace: <strong>{dayObj.travel_time}</strong>
                        </p>

                        {/* Activities */}
                        <div className="grid grid-cols-1 gap-4 mt-4">
                          {dayObj.activities.map((act: any, idx: number) => (
                            <Card key={idx} className="p-6 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-sm shadow-emerald-950/[0.01]">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                    {act.time}
                                  </span>
                                  <h6 className="font-serif text-lg font-bold text-emerald-deep dark:text-white">
                                    {act.title}
                                  </h6>
                                  <p className="text-xs text-emerald-deep/60 dark:text-sand-warm/60 leading-relaxed pt-1">
                                    {act.description}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0 text-xs">
                                  <span className="block font-bold text-emerald-deep dark:text-white">
                                    {act.cost === 0 ? 'Curated' : `INR ${act.cost}`}
                                  </span>
                                  <span className="text-[10px] text-slate-400 block mt-0.5">{act.duration}</span>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-mist/40 dark:bg-gray-900/40 p-5 rounded-2xl border border-emerald-950/5 dark:border-white/5 text-xs text-emerald-deep/70 dark:text-sand-warm/75">
                          <div>
                            <strong>🍽️ Local Gastronomy:</strong>
                            <p className="mt-1 leading-relaxed">{dayObj.meals.lunch} / {dayObj.meals.dinner}</p>
                          </div>
                          <div>
                            <strong>🏡 Custom Stay Selection:</strong>
                            <p className="mt-1 leading-relaxed">{dayObj.accommodation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Estimation */}
              <Card className="p-8 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-md shadow-emerald-950/[0.01]">
                <h4 className="font-serif text-xl font-bold mb-6">Financial Ledger Pacing</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-emerald-950/10 dark:border-white/10 text-slate-400 uppercase tracking-widest font-bold">
                        <th className="pb-3">Sanctuary Expense Category</th>
                        <th className="pb-3 text-right">Estimate (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-950/5 dark:divide-white/5 font-medium text-emerald-deep/80 dark:text-sand-warm/90">
                      <tr>
                        <td className="py-4">Stay & Accommodation ({accommodationPref})</td>
                        <td className="py-4 text-right font-bold">
                          INR {itinerary.budget_breakdown.accommodation.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Local Gastronomy Focus ({foodPref})</td>
                        <td className="py-4 text-right font-bold">
                          INR {itinerary.budget_breakdown.food.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Transfers Pacing ({vehiclePref})</td>
                        <td className="py-4 text-right font-bold">
                          INR {itinerary.budget_breakdown.transport.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4">Excursions & Curated Entries</td>
                        <td className="py-4 text-right font-bold">
                          INR {itinerary.budget_breakdown.activities.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        <td className="pt-5 text-base font-serif">Grand Ledger Total (for {travelersCount} guests)</td>
                        <td className="pt-5 text-right text-base font-sans">
                          INR {itinerary.budget_breakdown.total.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Travel Packing & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6.5 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-sm">
                  <h5 className="font-serif text-sm font-bold text-emerald-deep dark:text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gold" />
                    Sanctuary Packing Checker
                  </h5>
                  <ul className="space-y-3">
                    {itinerary.packing_suggestions.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-emerald-deep/60 dark:text-sand-warm/60">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6.5 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-sm">
                  <h5 className="font-serif text-sm font-bold text-emerald-deep dark:text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold fill-gold" />
                    Field Journal Guide
                  </h5>
                  <ul className="space-y-3">
                    {itinerary.travel_tips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-emerald-deep/60 dark:text-sand-warm/60">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setCurrentStep('details')}
                  className="px-6 py-3 border border-emerald-950/10 dark:border-white/10 hover:bg-emerald-950/5 dark:hover:bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Plan Another Journey
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: COMING SOON RESILIENT WARNING VIEW */}
          {currentStep === 'coming-soon' && (
            <motion.div
              key="step-coming-soon"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="text-center py-20 px-6 max-w-md mx-auto space-y-6"
            >
              <div className="inline-flex p-4 bg-gold/10 rounded-full text-gold mb-2">
                <Sparkles className="w-12 h-12 animate-pulse fill-gold/15" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-emerald-deep dark:text-white">AI Planner Coming Soon</h3>
                <p className="text-xs text-emerald-deep/55 dark:text-sand-warm/50 leading-relaxed font-sans">
                  Our customized AI Planner is currently under maintenance or development. We are curate-matching local databases to deliver ultimate sanctuary suggestions.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/explore" className="w-full py-3.5 bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep rounded-full text-center text-xs font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer">
                  <CompassIcon className="w-4 h-4" /> Explore Sanctuary Spots
                </Link>
                <button
                  onClick={() => {
                    setError(null);
                    setCurrentStep('details');
                  }}
                  className="w-full py-3 border border-emerald-950/10 dark:border-white/10 hover:bg-emerald-950/5 dark:hover:bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Edit Specifications
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
