import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import DestinationDetailsPage from '@/pages/DestinationDetailsPage';
import { DistrictExplorerPage } from '@/pages/DistrictExplorerPage';
import { SeasonalExplorerPage } from '@/pages/SeasonalExplorerPage';
import { ThematicExplorerPage } from '@/pages/ThematicExplorerPage';
import { TripPlannerPage } from '@/pages/TripPlannerPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AdminPage } from '@/pages/AdminPage';
import { BlogPage, BlogPostDetailPage } from '@/pages/BlogPage';
import { AboutPage, ContactPage, PrivacyPage, TermsPage } from '@/pages/StaticPages';

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // Initialize theme from localStorage on load
  useEffect(() => {
    const theme = localStorage.getItem('travelwithus-dark');
    if (theme === 'true' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        {/* Main Content Area */}
        <div className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/planner" element={<TripPlannerPage />} />
            <Route path="/destination/:slug" element={<DestinationDetailsPage />} />
            <Route path="/districts" element={<DistrictExplorerPage />} />
            <Route path="/seasons" element={<SeasonalExplorerPage />} />
            <Route path="/theme/:themeSlug" element={<ThematicExplorerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
            
            {/* Fallback route */}
            <Route
              path="*"
              element={
                <div className="container min-h-[60vh] flex flex-col items-center justify-center text-center">
                  <h1 className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-4">404</h1>
                  <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                    The page you are looking for does not exist or has been moved.
                  </p>
                  <a
                    href="/"
                    className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-lg hover:bg-emerald-500 transition-all"
                  >
                    Go Back Home
                  </a>
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
