import React from 'react';
import { 
  Shield, 
  Building2, 
  FileText, 
  Users, 
  Search, 
  Settings, 
  BarChart3,
  FileCheck,
  Upload,
  History,
  AlertTriangle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ isCollapsed, onToggle, activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [];

    if (user?.role === 'super-admin') {
      baseItems.push(
        { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
        { id: 'institutions', icon: Building2, label: 'Institutions' },
        { id: 'users', icon: Users, label: 'Users' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'settings', icon: Settings, label: 'System Settings' }
      );
    } else if (user?.role === 'institution-admin') {
      baseItems.push(
        { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
        { id: 'import', icon: Upload, label: 'Données Étudiants' },
        { id: 'templates', icon: FileText, label: 'Templates' },
        { id: 'documents', icon: FileCheck, label: 'Documents' },
        { id: 'users', icon: Users, label: 'Team' },
        { id: 'audit', icon: History, label: 'Audit Trail' },
        { id: 'settings', icon: Settings, label: 'Settings' }
      );
    } else if (user?.role === 'editor') {
      baseItems.push(
        { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
        { id: 'import', icon: Upload, label: 'Données Étudiants' },
        { id: 'templates', icon: FileText, label: 'Templates' },
        { id: 'documents', icon: FileCheck, label: 'Documents' },
        { id: 'audit', icon: History, label: 'My Activity' }
      );
    }

    // Add verification for all roles except super-admin
    if (user?.role !== 'super-admin') {
      baseItems.splice(-1, 0, { id: 'verify', icon: Search, label: 'Verify Document' });
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className={`bg-white border-r border-gray-200 h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">TRUSTDOC</h1>
              <p className="text-xs text-blue-600 font-medium">AFRICA</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar || `https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&crop=face`}
              alt={user.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role.replace('-', ' ')}</p>
              {user.institutionName && (
                <p className="text-xs text-blue-600 truncate">{user.institutionName}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}