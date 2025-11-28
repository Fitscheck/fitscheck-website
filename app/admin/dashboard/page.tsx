'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../../services/authService';
import ChallengesPage from './components/ChallengesPage';
import UsersPage from './components/UsersPage';
import ProfileReportsPage from './components/ProfileReportsPage';
import PostReportsPage from './components/PostReportsPage';
import CommentReportsPage from './components/CommentReportsPage';
import ConfirmationModal from '../components/ConfirmationModal';
import './Dashboard.css';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('challenges');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: 'challenges', label: 'Challenges', icon: '🏆' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'profile-reports', label: 'Profile Reports', icon: '🚨' },
    { id: 'post-reports', label: 'Post Reports', icon: '📝' },
    { id: 'comment-reports', label: 'Comment Reports', icon: '💬' },
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
    <div className="dashboard" style={{ fontFamily: "Satoshi Variable" }}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">FitsCheck Admin</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>
      <main className="dashboard-content">
        {renderPage()}
      </main>
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
