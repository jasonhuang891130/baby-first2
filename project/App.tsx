import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, Book, FileText, Settings } from 'lucide-react';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

import HomeScreen from './src/screens/HomeScreen';
import GuidesScreen from './src/screens/GuidesScreen';
import ArticlesScreen from './src/screens/ArticlesScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CreatePlanScreen from './src/screens/CreatePlanScreen';
import FoodLogsScreen from './src/screens/FoodLogsScreen';
import AuthScreen from './src/screens/AuthScreen';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/auth" element={<AuthScreen />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/guides"
            element={
              <ProtectedRoute>
                <GuidesScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/articles"
            element={
              <ProtectedRoute>
                <ArticlesScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-plan"
            element={
              <ProtectedRoute>
                <CreatePlanScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/food-logs"
            element={
              <ProtectedRoute>
                <FoodLogsScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around p-4">
          <Link to="/" className="flex flex-col items-center">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/guides" className="flex flex-col items-center">
            <Book className="w-6 h-6" />
            <span className="text-xs mt-1">Guides</span>
          </Link>
          <Link to="/articles" className="flex flex-col items-center">
            <FileText className="w-6 h-6" />
            <span className="text-xs mt-1">Articles</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center">
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;