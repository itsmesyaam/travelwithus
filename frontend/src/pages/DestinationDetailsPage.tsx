import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Star, MapPin, Calendar, Sun,
  Compass, Navigation, BookOpen, Heart, CheckCircle2, Check,
  Send, Bot, Sparkles, MessageSquare, ShieldAlert, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { destinations } from '@/data/kerala';

export default function DestinationDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [botLoading, setBotLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Attempt database API fetch, fallback to local dataset lookup
    fetch(`/api/destinations/${slug}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API offline');
      })
      .then((data) => {
        if (data && data.name) {
          setDestination(data);
        } else {
          fallbackLookup();
        }
      })
      .catch(() => {
        fallbackLookup();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const fallbackLookup = () => {
    const matched = destinations.find((d) => d.slug === slug);
    setDestination(matched || null);
  };

  useEffect(() => {
    if (destination) {
      setChatMessages([
        {
          sender: 'bot',
          text: `Namaste! I am your TravelWithUs local concierge. Ask me anything about exploring the beauty of ${destination.name}.`,
        },
      ]);
    }
  }, [destination]);

  const handleSendMsg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !destination) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setBotLoading(true);

    try {
      const response = await fetch('/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination_id: destination.id || destination.slug,
          question: userText,
        }),
      });

      if (!response.ok) {
        throw new Error('Fallback chat response');
      }

      const data = await response.json();
      setChatMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      // Local graceful fallback response
      setTimeout(() => {
        let reply = `In ${destination.name}, you should definitely experience the local sights. `;
        if (userText.toLowerCase().includes('food') || userText.toLowerCase().includes('eat')) {
          reply += `Make sure to try traditional Kerala meals served on a banana leaf, fresh seafood curries, and appam with stew.`;
        } else if (userText.toLowerCase().includes('visit') || userText.toLowerCase().includes('best')) {
          reply += `The best time to visit is during ${destination.bestTimeToVisit}. We recommend starting early in the morning to enjoy mist-free views.`;
        } else {
          reply += `Exploring early morning yields peaceful photo moments. Let me know if you would like packing suggestions or route advice!`;
        }
        setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      }, 600);
    } finally {
      setBotLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-sand-warm dark:bg-gray-950">
        <Compass className="w-10 h-10 text-emerald-deep animate-spin" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-sand-warm dark:bg-gray-950 text-center px-6">
        <ShieldAlert className="w-12 h-12 text-gold mb-4" />
        <h2 className="font-serif text-3xl font-bold text-emerald-deep dark:text-white">Sanctuary Not Registered</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-sm">
          The requested destination could not be located in our registry. Try browsing explore to see all spots.
        </p>
        <Link to="/explore" className="mt-6 px-6 py-2.5 bg-emerald-deep text-white text-xs font-bold uppercase tracking-widest rounded-full">
          Browse Registry
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-sand-warm dark:bg-gray-950 min-h-screen transition-colors duration-500 relative">
      
      {/* ── PARALLAX COVER HEADER (50vh) ── */}
      <div className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.02]"
          style={{ backgroundImage: `url(${destination.coverImage || destination.image})` }}
        />
        
        {/* Cinematic dark linear overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-sand-warm dark:to-gray-950" />

        {/* Back navigation buttons */}
        <div className="absolute top-28 left-6 md:left-12 z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-black/55 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sanctuary Directory</span>
          </button>
        </div>

        {/* Floating Typography Details inside header bounds */}
        <div className="absolute bottom-12 left-6 md:left-12 right-6 z-10 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 text-white">
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-gold text-emerald-deep border-none text-[9px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                {destination.category.replace('-', ' ')}
              </Badge>
              {destination.isHiddenGem && (
                <Badge className="bg-emerald-deep text-white dark:bg-emerald-400 dark:text-emerald-deep border-none text-[9px] font-bold uppercase tracking-widest py-1 px-3 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 fill-current" /> Hidden Gem
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>{destination.district}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-normal leading-tight tracking-tight">
              {destination.name}
            </h1>
          </div>

          {/* Rating Widget */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/35 backdrop-blur-md border border-white/10 shrink-0">
            <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
            <span className="text-base font-bold text-white">{destination.rating}</span>
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">({destination.reviews} Reviews)</span>
          </div>
        </div>
      </div>

      {/* ── MAIN THREE-COLUMN MAGAZINE CONTAINER ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Sanctuary Details & Story spreads (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Minimal Luxury parameters strip */}
            <div className="grid grid-cols-3 gap-3.5 p-6 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 rounded-2xl shadow-sm">
              <div className="text-center space-y-1.5 border-r border-emerald-950/5 dark:border-white/5">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-400">Best Season</span>
                <span className="text-xs font-bold text-emerald-deep dark:text-white">{destination.bestTimeToVisit.split(' (')[0]}</span>
              </div>
              <div className="text-center space-y-1.5 border-r border-emerald-950/5 dark:border-white/5">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-400">Temperature</span>
                <span className="text-xs font-bold text-emerald-deep dark:text-white">
                  {destination.temperature.min}°C – {destination.temperature.max}°C
                </span>
              </div>
              <div className="text-center space-y-1.5">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-400">Elevation</span>
                <span className="text-xs font-bold text-emerald-deep dark:text-white">{destination.elevation || 'Sea Level'}</span>
              </div>
            </div>

            {/* Overview paragraph */}
            <div className="space-y-4">
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold block">
                Sanctuary Overview
              </span>
              <p className="font-serif text-lg md:text-xl font-light text-emerald-deep/80 dark:text-sand-warm/80 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Highlights checking lists */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold border-b border-emerald-950/5 pb-2">
                Sanctuary Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((high: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-emerald-950/5 dark:border-white/5 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-emerald-deep/80 dark:text-sand-warm/80">{high}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Excursions / Activities grid */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl font-bold border-b border-emerald-950/5 pb-2">
                Suggested Excursions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.activities.map((act: string, idx: number) => (
                  <Card key={idx} className="p-6 bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 shadow-sm">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gold block mb-1">Activity 0{idx + 1}</span>
                    <h4 className="font-serif text-lg font-bold text-emerald-deep dark:text-white mb-2">{act}</h4>
                    <p className="text-xs text-emerald-deep/60 dark:text-sand-warm/60 leading-relaxed">
                      Custom tailored excursion option for travelers seeking authentic local experiences in {destination.name}.
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Practical details (Airport and coordinates) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-mist/50 dark:bg-gray-900/50 rounded-2xl border border-emerald-950/5 dark:border-white/5 text-xs">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Transit Airport Access</span>
                <p className="font-semibold text-emerald-deep/80 dark:text-sand-warm/90">{destination.nearestAirport}</p>
              </div>
              <div className="p-6 bg-mist/50 dark:bg-gray-900/50 rounded-2xl border border-emerald-950/5 dark:border-white/5 text-xs">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Coordinates Map rose</span>
                <p className="font-mono text-emerald-deep/70 dark:text-sand-warm/80">
                  Latitude: {destination.coordinates.lat}° N / Longitude: {destination.coordinates.lng}° E
                </p>
              </div>
            </div>

          </div>

          {/* Column 2: Traveler's Field Journal side pane (4 Cols) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            
            {/* Field journal notebook card */}
            <Card className="p-8 bg-[#FBF6EE] dark:bg-gray-900 border-2 border-dashed border-emerald-950/10 dark:border-white/10 rounded-3xl shadow-sm text-emerald-deep dark:text-sand-warm">
              <span className="text-[9px] uppercase font-bold tracking-widest text-gold flex items-center gap-1 mb-3">
                <BookOpen className="w-3.5 h-3.5" /> Field Journal Notes
              </span>
              <h3 className="font-serif text-xl font-bold mb-4">Practical Travel Tips</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2.5 text-xs text-emerald-deep/70 dark:text-sand-warm/70">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Start early in the morning to beat the tropical heat or mists.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-emerald-deep/70 dark:text-sand-warm/70">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Carry light cotton wear and standard monsoon rain gear.</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs text-emerald-deep/70 dark:text-sand-warm/70">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Respect local pilgrimage sanctuary dress codes.</span>
                </li>
              </ul>
            </Card>

            {/* Quick concierge callout widget button */}
            <button
              onClick={() => setChatOpen(true)}
              className="w-full py-4.5 bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep rounded-full text-xs font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Bot className="w-4 h-4 text-gold fill-gold" />
              <span>Ask Local Concierge</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── SLIDE OUT CONCIERGE CHAT WINDOW ── */}
      <AnimatePresence>
        {chatOpen && (
          <>
            {/* Screen overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setChatOpen(false)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Chatbox panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 border-l border-emerald-950/5 dark:border-white/5 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 bg-emerald-deep text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Bot className="w-5 h-5 text-gold fill-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold">Local Concierge</h3>
                    <p className="text-[10px] text-white/50 tracking-wider font-sans uppercase">Expert advice for {destination.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-sand-warm/30 dark:bg-gray-950/20">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-end gap-2.5 max-w-[80%] rounded-2xl p-4.5 text-xs leading-relaxed",
                      msg.sender === 'user'
                        ? "ml-auto bg-emerald-deep text-white rounded-br-none"
                        : "bg-white dark:bg-gray-900 border border-emerald-950/5 dark:border-white/5 rounded-bl-none text-emerald-deep dark:text-sand-warm shadow-xs"
                    )}
                  >
                    <p>{msg.text}</p>
                  </div>
                ))}
                {botLoading && (
                  <div className="flex items-center gap-2 p-4 max-w-[50%] bg-white dark:bg-gray-900 rounded-2xl border text-xs text-slate-400">
                    <Compass className="w-4 h-4 animate-spin text-gold" />
                    <span>Typing...</span>
                  </div>
                )}
              </div>

              {/* Form Input Footer */}
              <form onSubmit={handleSendMsg} className="p-4 border-t border-emerald-950/5 dark:border-white/5 bg-white dark:bg-gray-900 flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Ask about ${destination.name}...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-emerald-950/10 dark:border-white/10 bg-sand-warm dark:bg-gray-950 text-xs font-semibold focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="p-3 bg-emerald-deep dark:bg-emerald-400 text-white dark:text-emerald-deep rounded-xl hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
