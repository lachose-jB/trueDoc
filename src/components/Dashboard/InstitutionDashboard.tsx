import React from 'react';
import { 
  FileCheck, 
  Users, 
  TrendingUp, 
  Shield,
  Clock,
  AlertTriangle,
  Download,
  Eye
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<any>;
  color?: string;
}

function MetricCard({ title, value, change, icon: Icon, color = 'blue' }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-50 rounded-lg`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );
}

export function InstitutionDashboard() {
  const metrics = [
    { title: 'Documents Issued', value: '1,847', change: '+156 this month', icon: FileCheck, color: 'blue' },
    { title: 'Active Templates', value: '12', change: '+2 this month', icon: FileCheck, color: 'green' },
    { title: 'Team Members', value: '8', icon: Users, color: 'purple' },
    { title: 'Verifications', value: '3,241', change: '+12% this week', icon: Shield, color: 'emerald' }
  ];

  const recentDocuments = [
    { id: 'TD-2024-001234', student: 'John Doe', template: 'Master Degree', status: 'issued', date: '2024-01-15', verified: 12 },
    { id: 'TD-2024-001235', student: 'Jane Smith', template: 'Bachelor Degree', status: 'issued', date: '2024-01-15', verified: 8 },
    { id: 'TD-2024-001236', student: 'Mike Johnson', template: 'Certificate', status: 'pending', date: '2024-01-15', verified: 0 },
    { id: 'TD-2024-001237', student: 'Sarah Wilson', template: 'Diploma', status: 'issued', date: '2024-01-14', verified: 5 }
  ];

  const alerts = [
    { type: 'warning', message: 'Template "Master Degree" needs update for compliance', time: '2 hours ago' },
    { type: 'info', message: 'Monthly report is ready for download', time: '1 day ago' },
    { type: 'success', message: 'All documents successfully backed up', time: '2 days ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Document</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Verifications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.id}</p>
                        <p className="text-xs text-gray-500">{doc.template}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <p className="text-sm text-gray-900">{doc.student}</p>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        doc.status === 'issued' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{doc.verified}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
            <AlertTriangle className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'success' ? 'bg-green-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Download Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.location.hash = '#templates'}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <FileCheck className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Issue Document</h4>
            <p className="text-sm text-gray-600">Create a new diploma or certificate</p>
          </button>
          
          <button 
            onClick={() => window.location.hash = '#import'}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
          >
            <Users className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Gérer Étudiants</h4>
            <p className="text-sm text-gray-600">Import et synchronisation des données</p>
          </button>
          
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
            <Shield className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Security Check</h4>
            <p className="text-sm text-gray-600">Review security settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}