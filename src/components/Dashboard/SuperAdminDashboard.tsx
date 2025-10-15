import React from 'react';
import { 
  Building2, 
  Users, 
  FileCheck, 
  TrendingUp, 
  Activity,
  AlertCircle,
  DollarSign,
  Globe
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
}

function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }[changeType];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm ${changeColor} flex items-center mt-2`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {change}
          </p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}

export function SuperAdminDashboard() {
  const stats = [
    { title: 'Total Institutions', value: '127', change: '+12 this month', changeType: 'positive' as const, icon: Building2 },
    { title: 'Active Users', value: '2,847', change: '+18% vs last month', changeType: 'positive' as const, icon: Users },
    { title: 'Documents Issued', value: '89,234', change: '+2,156 this week', changeType: 'positive' as const, icon: FileCheck },
    { title: 'Monthly Revenue', value: '$24,580', change: '+8.2% vs last month', changeType: 'positive' as const, icon: DollarSign }
  ];

  const recentActivities = [
    { type: 'institution', message: 'New institution "École Polytechnique" registered', time: '2 hours ago', status: 'success' },
    { type: 'document', message: '1,234 documents verified today', time: '4 hours ago', status: 'info' },
    { type: 'alert', message: 'High verification load detected', time: '6 hours ago', status: 'warning' },
    { type: 'system', message: 'System maintenance completed successfully', time: '1 day ago', status: 'success' }
  ];

  const topInstitutions = [
    { name: 'University of Sciences', documents: 15234, growth: '+12%' },
    { name: 'Technical Institute', documents: 8976, growth: '+8%' },
    { name: 'Business School', documents: 6543, growth: '+15%' },
    { name: 'Medical College', documents: 4321, growth: '+5%' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Institutions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Institutions</h3>
            <Building2 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topInstitutions.map((institution, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{institution.name}</p>
                  <p className="text-xs text-gray-500">{institution.documents.toLocaleString()} documents</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium">{institution.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          <div className="flex items-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Response Time</span>
              <span className="text-sm font-medium text-green-600">142ms</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div className="bg-green-500 h-1 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-medium text-green-600">99.98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div className="bg-green-500 h-1 rounded-full" style={{ width: '99%' }} />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage Usage</span>
              <span className="text-sm font-medium text-blue-600">67%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div className="bg-blue-500 h-1 rounded-full" style={{ width: '67%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}