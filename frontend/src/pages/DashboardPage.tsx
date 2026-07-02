import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User as UserIcon, Calendar, MapPin, Trash2, ChevronDown,
  ChevronUp, Sparkles, Briefcase, PlusCircle, LogOut, ArrowRight, Clock
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function DashboardPage() {
  const { user, token, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTripId, setExpandedTripId] = useState<number | null>(null);

  // Auth redirect check
  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem('travelwithus-token')) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Fetch saved itineraries
  useEffect(() => {
    const fetchTrips = async () => {
      if (!token) return;
      try {
        const response = await fetch('/api/trips', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Sort trips by generated_at descending
          data.sort((a: any, b: any) => new Date(b.generated_at).getTime() - new Date(a.generated_at).getTime());
          setTrips(data);
        }
      } catch (e) {
        console.error("Failed to fetch itineraries");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [token]);

  const toggleExpand = (id: number) => {
    setExpandedTripId(expandedTripId === id ? null : id);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Clock className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-sm text-gray-500">Loading your travel dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container max-w-5xl px-4 mx-auto">
        <SectionHeader
          badge="Welcome Back"
          title={`${user.full_name || 'Traveler'}'s Dashboard`}
          description="Manage your custom travel plans, explore saved routes, and edit your profile."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Sidebar Profile Card */}
          <div className="space-y-6">
            <Card padding="md" className="bg-gray-50/50 dark:bg-gray-900/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-2xl">
                  {user.full_name ? user.full_name.charAt(0) : 'K'}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                    {user.full_name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>
                  <Badge variant="emerald" size="sm" className="mt-2">
                    {user.role === 'admin' ? 'System Administrator' : 'Premium Member'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-4">
                <div className="flex justify-between">
                  <span>Member Since:</span>
                  <strong className="text-gray-900 dark:text-gray-200">
                    {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Saved Itineraries:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{trips.length} Plans</strong>
                </div>
              </div>

              {/* Admin Panel redirect link */}
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block mt-6 w-full py-2.5 text-center text-xs font-bold rounded-xl border border-dashed border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/10 hover:bg-emerald-50/30 transition-all"
                >
                  Enter Admin Console
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </Card>

            <Link to="/planner" className="block">
              <Card hover={true} className="border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
                <div className="flex items-center gap-3">
                  <PlusCircle className="w-8 h-8 text-emerald-500" />
                  <div>
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white">Plan Another Trip</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Generate a new custom route instantly.</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Saved Itineraries Accordion List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold border-b border-gray-100 dark:border-gray-800 pb-2">
              Your Saved Itineraries
            </h3>

            {trips.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="font-bold text-gray-700 dark:text-gray-300 text-lg">No itineraries saved yet</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto mt-1 mb-6">
                  Generate your first custom AI plan and save it directly here to access it anytime.
                </p>
                <Link
                  to="/planner"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/10"
                >
                  Create Trip Plan
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {trips.map((trip) => {
                  const plan = trip.itinerary;
                  const isExpanded = expandedTripId === trip.id;
                  
                  return (
                    <Card key={trip.id} hover={false} padding="none" className="overflow-hidden border border-gray-100 dark:border-gray-850">
                      {/* Accordion Trigger Header */}
                      <div
                        onClick={() => toggleExpand(trip.id)}
                        className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-base text-gray-900 dark:text-white leading-tight">
                            {plan.title || `${trip.duration}-Day Trip from ${trip.source_city}`}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500">
                            <span>Origin: <strong>{trip.source_city}</strong></span>
                            <span>·</span>
                            <span>Duration: <strong>{trip.duration} Days</strong></span>
                            <span>·</span>
                            <span className="capitalize">Budget: <strong>{trip.budget}</strong></span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="emerald" size="sm" className="hidden sm:inline-block">
                            AI Generated
                          </Badge>
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>

                      {/* Accordion Expandable Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden border-t border-gray-100 dark:border-gray-800"
                          >
                            <div className="p-6 space-y-6">
                              {/* Short Timeline summary */}
                              <div className="space-y-4">
                                <h5 className="font-bold text-sm text-gray-900 dark:text-white border-b border-gray-50 dark:border-gray-800 pb-1">
                                  Days Summary & Highlights
                                </h5>
                                <div className="space-y-3">
                                  {plan.days?.map((day: any) => (
                                    <div key={day.day} className="flex gap-4 text-xs">
                                      <span className="font-bold text-emerald-600 flex-shrink-0 w-12">
                                        Day {day.day}
                                      </span>
                                      <div>
                                        <h6 className="font-bold text-gray-800 dark:text-gray-200">
                                          {day.destination} — {day.title}
                                        </h6>
                                        <ul className="list-disc pl-4 mt-1 text-gray-500 space-y-0.5">
                                          {day.activities?.slice(0, 2).map((a: any, idx: number) => (
                                            <li key={idx}>{a.title}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Budget Summary */}
                              {plan.budget_breakdown && (
                                <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 text-xs">
                                  <h6 className="font-bold text-gray-900 dark:text-white mb-2">Estimated Budget</h6>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600 dark:text-gray-400">
                                    <div>
                                      <span>Accommodation:</span>
                                      <p className="font-bold text-gray-900 dark:text-gray-200 mt-0.5">
                                        INR {plan.budget_breakdown.accommodation.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <span>Transports:</span>
                                      <p className="font-bold text-gray-900 dark:text-gray-200 mt-0.5">
                                        INR {plan.budget_breakdown.transport.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <span>Food focus:</span>
                                      <p className="font-bold text-gray-900 dark:text-gray-200 mt-0.5">
                                        INR {plan.budget_breakdown.food.toLocaleString()}
                                      </p>
                                    </div>
                                    <div>
                                      <span>Grand Total:</span>
                                      <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                                        INR {plan.budget_breakdown.total.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex gap-3 justify-end border-t border-gray-50 dark:border-gray-800 pt-4">
                                <Link
                                  to={`/planner`}
                                  onClick={() => {
                                    // Pre-fill planning state (Mock or storage context)
                                    localStorage.setItem('travelwithus-prefill-trip', JSON.stringify(trip));
                                  }}
                                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-750 dark:text-gray-250 transition-colors"
                                >
                                  Open in Wizard
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
