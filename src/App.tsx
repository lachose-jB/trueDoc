import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { SuperAdminDashboard } from './components/Dashboard/SuperAdminDashboard';
import { InstitutionDashboard } from './components/Dashboard/InstitutionDashboard';
import { PublicVerification } from './components/Verification/PublicVerification';
import { TemplateManager } from './components/Templates/TemplateManager';
import { StudentDataManager } from './components/Students/StudentDataManager';

function MainApp() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPublicPortal, setShowPublicPortal] = useState(false);

  if (!user && !showPublicPortal) {
    return (
      <div>
        <LoginForm />
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setShowPublicPortal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
          >
            Public Verification
          </button>
        </div>
      </div>
    );
  }

  if (showPublicPortal) {
    return (
      <div>
        <PublicVerification />
        <div className="fixed bottom-4 left-4">
          <button
            onClick={() => setShowPublicPortal(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      institutions: 'Institutions',
      users: 'User Management',
      templates: 'Document Templates',
      documents: 'Documents',
      import: 'Import Data',
      verify: 'Verify Documents',
      audit: 'Audit Trail',
      analytics: 'Analytics',
      settings: 'Settings'
    };
    return titles[activeTab] || 'Dashboard';
  };

  const getPageSubtitle = () => {
    if (user?.role === 'super-admin') {
      return 'System overview and management';
    } else if (user?.institutionName) {
      return `${user.institutionName} - ${user.role.replace('-', ' ')}`;
    }
    return '';
  };

  const renderContent = () => {
    if (activeTab === 'verify') {
      return <PublicVerification />;
    }

    if (activeTab === 'templates') {
      return <TemplateManager />;
    }

    if (activeTab === 'import') {
      return <StudentDataManager />;
    }

    if (activeTab === 'dashboard') {
      if (user?.role === 'super-admin') {
        return <SuperAdminDashboard />;
      } else {
        return <InstitutionDashboard />;
      }
    }

    // Placeholder for other tabs
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {getPageTitle()}
          </h3>
          <p className="text-gray-600 mb-4">
            This section is coming soon in the full implementation.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <span className="text-sm font-medium">Feature in development</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab !== 'verify' && (
          <Header 
            title={getPageTitle()} 
            subtitle={getPageSubtitle()}
          />
        )}
        
        <main className={`flex-1 overflow-y-auto ${activeTab === 'verify' ? 'p-0' : 'p-6'}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;