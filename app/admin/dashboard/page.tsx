'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services/authService';
import { Trophy, Users, AlertTriangle, FileText, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import ChallengesPage from './components/challenges/ChallengesPage';
import UsersPage from './components/UsersPage';
import ProfileReportsPage from './components/reports/ProfileReportsPage';
import PostReportsPage from './components/reports/PostReportsPage';
import CommentReportsPage from './components/reports/CommentReportsPage';
import ConfirmationModal from '../components/ConfirmationModal';

type PageType = 'challenges' | 'users' | 'profile-reports' | 'post-reports' | 'comment-reports';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState<PageType>('challenges');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: 'challenges' as PageType, label: 'Challenges', icon: Trophy },
    { id: 'users' as PageType, label: 'Users', icon: Users },
    { id: 'profile-reports' as PageType, label: 'Profile Reports', icon: AlertTriangle },
    { id: 'post-reports' as PageType, label: 'Post Reports', icon: FileText },
    { id: 'comment-reports' as PageType, label: 'Comment Reports', icon: MessageSquare },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    try {
      await authService.logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePageChange = (page: PageType) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'challenges':
        return <ChallengesPage />;
      case 'users':
        return <UsersPage />;
      case 'profile-reports':
        return <ProfileReportsPage />;
      case 'post-reports':
        return <PostReportsPage />;
      case 'comment-reports':
        return <CommentReportsPage />;
      default:
        return <ChallengesPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" style={{ fontFamily: "var(--font-satoshi)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          bg-[#003366] text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
              FitsCheck
            </h2>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block text-white/70 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activePage === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                onClick={() => handlePageChange(item.id)}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors ${sidebarCollapsed ? 'justify-center' : ''
              }`}
            onClick={handleLogout}
            title={sidebarCollapsed ? 'Logout' : ''}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold text-[#003366]" style={{ fontFamily: "var(--font-whyte-inktrap)" }}>
            FitsCheck Admin
          </h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </header>

        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        type="default"
      />
    </div>
  );
}
