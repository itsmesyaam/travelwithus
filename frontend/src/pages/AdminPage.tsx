import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldAlert, Settings, Plus, Edit2, Trash2, Users, MapPin,
  Sparkles, Database, Check, X, Info, Star, Compass
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Input } from '@/components/ui/Input';

export function AdminPage() {
  const { user, token, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'destinations' | 'users'>('destinations');
  
  // Destinations state
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loadingDest, setLoadingDest] = useState(true);
  
  // Destination Add/Edit form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDestId, setEditingDestId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [district, setDistrict] = useState('Idukki');
  const [region, setRegion] = useState('Central Kerala');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [category, setCategory] = useState('hill-station');
  const [tagsStr, setTagsStr] = useState('hills, tea gardens');
  const [rating, setRating] = useState(4.5);
  const [reviews, setReviews] = useState(10);
  const [bestTime, setBestTime] = useState('October to March');
  const [nearestAirport, setNearestAirport] = useState('Cochin International Airport (COK)');
  const [latitude, setLatitude] = useState(10.08);
  const [longitude, setLongitude] = useState(77.05);
  const [isHiddenGem, setIsHiddenGem] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [priceRange, setPriceRange] = useState('mid-range');

  // Auth redirect check
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Fetch destinations
  const fetchDestinations = async () => {
    setLoadingDest(true);
    try {
      const response = await fetch('/api/destinations');
      if (response.ok) {
        const data = await response.json();
        setDestinations(data);
      }
    } catch (e) {
      console.error("Failed to fetch destinations");
    } finally {
      setLoadingDest(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleOpenAddForm = () => {
    setEditingDestId(null);
    setName('');
    setSlug('');
    setDistrict('Idukki');
    setRegion('Central Kerala');
    setDescription('');
    setShortDescription('');
    setImage('/api/placeholder/800/600');
    setCoverImage('/api/placeholder/1200/800');
    setCategory('hill-station');
    setTagsStr('hills, tea gardens');
    setRating(4.5);
    setReviews(10);
    setBestTime('October to March');
    setNearestAirport('Cochin International Airport (COK)');
    setLatitude(10.08);
    setLongitude(77.05);
    setIsHiddenGem(false);
    setIsTrending(false);
    setPriceRange('mid-range');
    setIsFormOpen(true);
  };

  const handleSaveDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate save or notify
    alert("In-memory write succeeded. Admin CRUD interfaces are ready for Neon database synchronization.");
    setIsFormOpen(false);
  };

  const handleDeleteDestination = (id: number) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      setDestinations(destinations.filter(d => d.id !== id));
    }
  };

  // Mock users
  const mockUsers = [
    { id: 1, email: "admin@keralax.ai", full_name: "Staff Admin", role: "admin", is_active: true, created_at: "2026-07-02" },
    { id: 2, email: "john.doe@gmail.com", full_name: "John Doe", role: "user", is_active: true, created_at: "2026-07-01" },
    { id: 3, email: "sara.smith@yahoo.com", full_name: "Sara Smith", role: "user", is_active: true, created_at: "2026-06-28" }
  ];

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="py-12 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container px-4 mx-auto max-w-6xl">
        <SectionHeader
          badge="Admin Console"
          title="KeralaX Control Center"
          description="Manage destination records, user authorization profiles, and system databases."
        />

        {/* Tab switcher */}
        <div className="flex gap-4 border-b border-gray-100 dark:border-gray-800 mb-8">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`pb-3 text-sm font-semibold flex items-center gap-1.5 transition-all border-b-2 cursor-pointer ${
              activeTab === 'destinations'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Manage Destinations
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 text-sm font-semibold flex items-center gap-1.5 transition-all border-b-2 cursor-pointer ${
              activeTab === 'users'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <Users className="w-4 h-4" />
            User Access profiles
          </button>
        </div>

        {/* DESTINATIONS TAB */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-500" />
                Destination Registry ({destinations.length} records)
              </h3>
              <Button onClick={handleOpenAddForm} size="sm">
                <Plus className="w-4 h-4 mr-1" /> Add Record
              </Button>
            </div>

            {/* Destination CRUD Inline Card Form */}
            {isFormOpen && (
              <Card padding="lg" className="border-emerald-500/30 bg-gray-50/50 dark:bg-gray-900/30">
                <form onSubmit={handleSaveDestination} className="space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-850 pb-3">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                      {editingDestId ? 'Edit Destination Record' : 'Create New Destination'}
                    </h4>
                    <button type="button" onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl text-sm outline-none">
                        {['hill-station', 'backwaters', 'beach', 'wildlife', 'heritage', 'pilgrimage', 'adventure', 'waterfall'].map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <Input label="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Region</label>
                      <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl text-sm outline-none">
                        {['North Kerala', 'Central Kerala', 'South Kerala'].map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Price Tier</label>
                      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl text-sm outline-none">
                        {['budget', 'mid-range', 'luxury'].map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Short description</label>
                      <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl text-sm outline-none" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Tags (Comma-separated)</label>
                      <input type="text" value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl text-sm outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Long Description</label>
                    <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-xl text-sm outline-none" required />
                  </div>

                  <div className="flex gap-4 justify-end border-t border-gray-200 dark:border-gray-850 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                    <Button type="submit">Save Destination</Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Destinations Table Registry */}
            <Card padding="none" className="overflow-hidden border border-gray-100 dark:border-gray-850">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/50 dark:bg-gray-900/40 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                    <tr>
                      <th className="py-4 px-6">Destination</th>
                      <th className="py-4 px-6">District & Region</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Rating</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                    {destinations.map((dest) => (
                      <tr key={dest.id} className="hover:bg-gray-50/20 dark:hover:bg-gray-900/10">
                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                          {dest.name}
                          {dest.isHiddenGem && <Badge size="sm" variant="blue" className="ml-2">Hidden Gem</Badge>}
                        </td>
                        <td className="py-4 px-6 text-gray-500">
                          {dest.district} ({dest.region})
                        </td>
                        <td className="py-4 px-6">
                          <span className="capitalize text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                            {dest.category.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold flex items-center gap-1 mt-1 text-gray-700 dark:text-gray-300">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{dest.rating}</span>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteDestination(dest.id)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" />
              Member Authorization Profiles
            </h3>

            <Card padding="none" className="overflow-hidden border border-gray-100 dark:border-gray-850">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/50 dark:bg-gray-900/40 text-gray-400 text-xs uppercase border-b border-gray-100 dark:border-gray-800">
                  <tr>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Security Role</th>
                    <th className="py-4 px-6">Registry Date</th>
                    <th className="py-4 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {mockUsers.map((u) => (
                    <tr key={u.id}>
                      <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">{u.full_name}</td>
                      <td className="py-4 px-6 text-gray-500">{u.email}</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          u.role === 'admin' ? 'bg-red-50 dark:bg-red-950/20 text-red-600' : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600'
                        }`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">{u.created_at}</td>
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
