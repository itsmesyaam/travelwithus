import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Compass, MapPin, Calendar, Users, DollarSign,
  Briefcase, Heart, UtensilsCrossed, AlertCircle,
  ArrowRight, ArrowLeft, RefreshCw, Save, Check, Plus, Minus
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
  const [duration, setDuration] = useState(3);
  const [travelersCount, setTravelersCount] = useState(1);
  const [budget, setBudget] = useState('mid-range');
  const [travelStyle, setTravelStyle] = useState('Solo');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [accommodationPref, setAccommodationPref] = useState('Hotel');
  const [vehiclePref, setVehiclePref] = useState('Private Cab');
  const [foodPref, setFoodPref] = useState('Local Seafood');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');

  // Result itinerary
  const [itinerary, setItinerary] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  const interestOptions = [
    { value: 'backwaters', label: 'Backwaters & Lagoons' },
    { value: 'hill-station', label: 'Hill Stations & Tea Gardens' },
    { value: 'beach', label: 'Sandy Beaches & Cliffs' },
    { value: 'wildlife', label: 'Wildlife Reserves & Forests' },
    { value: 'heritage', label: 'Cultural Heritage & History' },
    { value: 'adventure', label: 'Trekking & Adventure Sports' },
    { value: 'pilgrimage', label: 'Spiritual & Pilgrimage Sites' }
  ];

  const handleInterestToggle = (val: string) => {
    if (selectedInterests.includes(val)) {
      setSelectedInterests(selectedInterests.filter(i => i !== val));
    } else {
      setSelectedInterests([...selectedInterests, val]);
    }
  };

  const handleGenerate = async () => {
    if (!sourceCity.trim()) {
      setError("Please specify your origin/source city.");
      return;
    }
    if (selectedInterests.length === 0) {
      setError("Please pick at least one travel interest.");
      return;
    }

    setError(null);
    setCurrentStep('generating');
    setLoading(true);

    try {
      const response = await fetch('/api/trips/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_city: sourceCity,
          start_date: startDate || undefined,
          duration: duration,
          budget: budget,
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
      // Trigger registration/login alert
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
          source_city: sourceCity,
          duration: duration,
          budget: budget,
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
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container max-w-4xl px-4 mx-auto">
        <SectionHeader
          badge="AI Concierge"
          title="Plan Your Kerala Journey"
          description="Craft a personalized itinerary designed dynamically matching your interests, travel pacing, and budget."
        />

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* STEP 1: BASIC DETAILS */}
          {currentStep === 'details' && (
            <motion.div
              key="step-details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card padding="lg">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-500" />
                  1. Basic Trip Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Origin */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Departure City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={sourceCity}
                        onChange={(e) => setSourceCity(e.target.value)}
                        placeholder="e.g. Cochin, Mumbai, London"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Start Date (Optional)
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none focus:border-emerald-500 transition-colors [color-scheme:light]"
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Duration (Days)
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                        className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-bold w-12 text-center">{duration} Days</span>
                      <button
                        type="button"
                        onClick={() => setDuration(prev => Math.min(14, prev + 1))}
                        className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Travelers */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Number of Travelers
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setTravelersCount(prev => Math.max(1, prev - 1))}
                        className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-bold w-12 text-center">{travelersCount}</span>
                      <button
                        type="button"
                        onClick={() => setTravelersCount(prev => prev + 1)}
                        className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end">
                <Button onClick={() => setCurrentStep('preferences')}>
                  Continue to Preferences
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PREFERENCES */}
          {currentStep === 'preferences' && (
            <motion.div
              key="step-pref"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card padding="lg">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  2. Travel Style & Budget
                </h3>

                <div className="space-y-6">
                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Your Preferred Budget
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Budget', 'Mid-Range', 'Luxury'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBudget(b)}
                          className={cn(
                            'py-4 px-3 rounded-xl border-2 text-sm font-bold transition-all text-center',
                            budget === b
                              ? 'border-emerald-500 bg-emerald-50/20 text-emerald-700 dark:text-emerald-400'
                              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Travel Style */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Who are you traveling with?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {['Solo', 'Couple', 'Family', 'Friends'].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setTravelStyle(style)}
                          className={cn(
                            'py-4 px-3 rounded-xl border-2 text-sm font-bold transition-all text-center',
                            travelStyle === style
                              ? 'border-emerald-500 bg-emerald-50/20 text-emerald-700 dark:text-emerald-400'
                              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                          )}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('details')}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button onClick={() => setCurrentStep('interests')}>
                  Configure Interests
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: INTERESTS & SERVICES */}
          {currentStep === 'interests' && (
            <motion.div
              key="step-interests"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card padding="lg">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-500" />
                  3. Interests & Service Preferences
                </h3>

                <div className="space-y-6">
                  {/* Category Interests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Select what you want to explore (Pick one or more)
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
                              'px-4 py-2.5 rounded-full text-xs font-semibold border-2 transition-all',
                              active
                                ? 'border-emerald-500 bg-emerald-50/30 text-emerald-700 dark:text-emerald-400'
                                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 text-gray-600 dark:text-gray-400'
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    {/* Accommodation */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Stay Style
                      </label>
                      <select
                        value={accommodationPref}
                        onChange={(e) => setAccommodationPref(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none"
                      >
                        {['Hotel', 'Resort', 'Homestay', 'Houseboat'].map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    {/* Transport */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Transport Preference
                      </label>
                      <select
                        value={vehiclePref}
                        onChange={(e) => setVehiclePref(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none"
                      >
                        {['Private Cab', 'Car Rental', 'Public Transport'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Food */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Food focus
                      </label>
                      <select
                        value={foodPref}
                        onChange={(e) => setFoodPref(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none"
                      >
                        {['Local Seafood', 'Vegetarian', 'Non-Vegetarian'].map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Accessibility requirements (Optional)
                    </label>
                    <input
                      type="text"
                      value={accessibilityNeeds}
                      onChange={(e) => setAccessibilityNeeds(e.target.value)}
                      placeholder="e.g. Wheelchair access, infant seat, elderly friendly"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('preferences')}>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <Button onClick={handleGenerate}>
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Generate AI Itinerary
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: GENERATING (LOADING STATUS STATE) */}
          {currentStep === 'generating' && (
            <motion.div
              key="step-generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-20"
            >
              <div className="relative inline-block w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/10 dark:border-emerald-500/5" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">TravelWithUs AI Planning</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto animate-pulse">
                Analyzing geographic connections, matching local spice resorts, and designing day-by-day scheduling for you...
              </p>
            </motion.div>
          )}

          {/* STEP 5: ITINERARY DISPLAY VIEW */}
          {currentStep === 'itinerary' && itinerary && (
            <motion.div
              key="step-itinerary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header card banner */}
              <div className="relative rounded-3xl p-8 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/10 overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest bg-white/25 px-3 py-1 rounded-full font-bold">
                      Personalized Itinerary
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold mt-3 leading-tight">
                      {itinerary.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/80 mt-4">
                      <span>Origin: <strong>{itinerary.source_city}</strong></span>
                      <span>·</span>
                      <span>Duration: <strong>{itinerary.duration} Days</strong></span>
                      <span>·</span>
                      <span>Budget: <strong className="capitalize">{budget}</strong></span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={isSaved ? <Check className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
                      onClick={handleSavePlan}
                      disabled={isSaved}
                    >
                      {isSaved ? 'Saved to Profile' : 'Save Itinerary'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/50 text-white hover:bg-white/10"
                      onClick={() => setCurrentStep('details')}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Plan Again
                    </Button>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold border-b border-gray-100 dark:border-gray-800 pb-2">
                  Day-by-Day Plan
                </h4>

                <div className="relative pl-6 border-l border-gray-200 dark:border-gray-800 space-y-8">
                  {itinerary.days.map((dayObj: any) => (
                    <div key={dayObj.day} className="relative">
                      {/* Circle dot marker */}
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-gray-950" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                            Day {dayObj.day}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">|</span>
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {dayObj.destination}
                          </span>
                        </div>

                        <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                          {dayObj.title}
                        </h5>

                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          Transfer status: <strong>{dayObj.travel_time}</strong>
                        </p>

                        {/* Activities */}
                        <div className="grid grid-cols-1 gap-3 mt-4">
                          {dayObj.activities.map((act: any, idx: number) => (
                            <Card key={idx} hover={false} padding="sm" className="bg-gray-50/50 dark:bg-gray-900/20">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <span className="text-xs font-bold text-emerald-500 tracking-wider">
                                    {act.time}
                                  </span>
                                  <h6 className="font-bold text-sm text-gray-900 dark:text-white mt-0.5">
                                    {act.title}
                                  </h6>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {act.description}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0 text-xs text-gray-400">
                                  <span className="block font-semibold text-gray-700 dark:text-gray-300">
                                    {act.cost === 0 ? 'Free' : `INR ${act.cost}`}
                                  </span>
                                  <span>{act.duration}</span>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs text-gray-600 dark:text-gray-400 bg-gray-50/20 dark:bg-gray-900/10 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                          <div>
                            <strong>🍴 Culinary Focus:</strong>
                            <p className="mt-0.5">{dayObj.meals.lunch} / {dayObj.meals.dinner}</p>
                          </div>
                          <div>
                            <strong>🏡 Suggested Stay:</strong>
                            <p className="mt-0.5">{dayObj.accommodation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Estimation */}
              <Card padding="lg">
                <h4 className="text-lg font-bold mb-4">Estimated Budget Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 text-xs uppercase">
                        <th className="pb-3">Expense Category</th>
                        <th className="pb-3 text-right">Estimated Cost (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                      <tr>
                        <td className="py-3 text-gray-700 dark:text-gray-300">Stay & Accommodation ({accommodationPref})</td>
                        <td className="py-3 text-right font-semibold">
                          INR {itinerary.budget_breakdown.accommodation.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-700 dark:text-gray-300">Meals & Food (Focus: {foodPref})</td>
                        <td className="py-3 text-right font-semibold">
                          INR {itinerary.budget_breakdown.food.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-700 dark:text-gray-300">Local Transfers & Private Cab</td>
                        <td className="py-3 text-right font-semibold">
                          INR {itinerary.budget_breakdown.transport.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-gray-700 dark:text-gray-300">Activities & Entry Tickets</td>
                        <td className="py-3 text-right font-semibold">
                          INR {itinerary.budget_breakdown.activities.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="font-bold text-emerald-600 dark:text-emerald-400">
                        <td className="pt-4 text-base">Grand Total (for {travelersCount} travelers)</td>
                        <td className="pt-4 text-right text-base">
                          INR {itinerary.budget_breakdown.total.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Travel Packing & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Packing suggestions */}
                <Card padding="md">
                  <h5 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-500" />
                    Recommended Packing List
                  </h5>
                  <ul className="space-y-2">
                    {itinerary.packing_suggestions.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Local travel tips */}
                <Card padding="md">
                  <h5 className="font-bold text-sm text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Local Travel Advice
                  </h5>
                  <ul className="space-y-2">
                    {itinerary.travel_tips.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <Button onClick={() => setCurrentStep('details')}>
                  Start Over / Plan Another Trip
                </Button>
              </div>
            </motion.div>
          )}

          {currentStep === 'coming-soon' && (
            <motion.div
              key="step-coming-soon"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16 px-6 max-w-md mx-auto"
            >
              <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/50 rounded-full text-emerald-600 dark:text-emerald-400 mb-6">
                <Sparkles className="w-12 h-12 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI Planner coming soon</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                Our custom AI Planner is currently under development. We are fine-tuning the recommendations to curate the most premium travel plans for you.
              </p>
              <div className="flex flex-col gap-3">
                <Link to="/explore" className="w-full btn btn-primary flex justify-center items-center gap-2 cursor-pointer text-white">
                  <Compass className="w-4 h-4" /> Explore Destinations
                </Link>
                <button
                  onClick={() => {
                    setError(null);
                    setCurrentStep('details');
                  }}
                  className="w-full py-3 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Edit Trip Details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
