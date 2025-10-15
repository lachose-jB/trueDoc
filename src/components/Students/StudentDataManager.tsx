import React, { useState } from 'react';
import { Database, Upload, Download, Users, Filter, Search, Plus, Settings, RefreshCw, CheckCircle, AlertCircle, FileText, Award, TrendingUp, Eye, CreditCard as Edit3, Trash2 } from 'lucide-react';
import { Student, DatabaseConnection, ImportJob } from '../../types';

export function StudentDataManager() {
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'import' | 'students' | 'generate'>('overview');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'average' | 'name' | 'matricule'>('average');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data
  const students: Student[] = [
    {
      id: '1',
      matricule: '03Y107',
      firstName: 'Hans',
      lastName: 'LIHAN LI NDJOM',
      fullName: 'LIHAN LI NDJOM HANS',
      email: 'hans.lihan@student.uy1.cm',
      birthDate: '1984-02-16',
      birthPlace: 'NTI LOUM',
      discipline: 'Informatique Fondamentale',
      academicYear: '2010-2011',
      average: 16.5,
      grade: 'Très Bien',
      status: 'graduated',
      institutionId: 'inst-1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      matricule: '03Y108',
      firstName: 'Marie',
      lastName: 'NGONO ATANGANA',
      fullName: 'NGONO ATANGANA MARIE',
      email: 'marie.ngono@student.uy1.cm',
      birthDate: '1985-05-12',
      birthPlace: 'YAOUNDÉ',
      discipline: 'Mathématiques',
      academicYear: '2010-2011',
      average: 15.2,
      grade: 'Bien',
      status: 'graduated',
      institutionId: 'inst-1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '3',
      matricule: '03Y109',
      firstName: 'Paul',
      lastName: 'MBARGA ESSONO',
      fullName: 'MBARGA ESSONO PAUL',
      email: 'paul.mbarga@student.uy1.cm',
      birthDate: '1983-11-08',
      birthPlace: 'DOUALA',
      discipline: 'Physique',
      academicYear: '2010-2011',
      average: 14.8,
      grade: 'Bien',
      status: 'graduated',
      institutionId: 'inst-1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '4',
      matricule: '03Y110',
      firstName: 'Françoise',
      lastName: 'OWONA NGUINI',
      fullName: 'OWONA NGUINI FRANÇOISE',
      email: 'francoise.owona@student.uy1.cm',
      birthDate: '1984-09-22',
      birthPlace: 'BAFOUSSAM',
      discipline: 'Français',
      academicYear: '2010-2011',
      average: 13.5,
      grade: 'Assez Bien',
      status: 'graduated',
      institutionId: 'inst-1',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    }
  ];

  const dbConnections: DatabaseConnection[] = [
    {
      id: 'db-1',
      institutionId: 'inst-1',
      name: 'Base Académique Principale',
      type: 'mysql',
      host: 'db.uy1.cm',
      port: 3306,
      database: 'academic_system',
      username: 'trustdoc_user',
      isActive: true,
      lastSync: new Date('2024-01-15T10:30:00'),
      studentsCount: 2847,
      createdAt: new Date('2024-01-01')
    }
  ];

  const importJobs: ImportJob[] = [
    {
      id: 'job-1',
      institutionId: 'inst-1',
      fileName: 'etudiants_2023_2024.xlsx',
      fileSize: 2.4,
      totalRows: 1250,
      processedRows: 1250,
      successRows: 1247,
      errorRows: 3,
      status: 'completed',
      createdAt: new Date('2024-01-14T14:20:00'),
      completedAt: new Date('2024-01-14T14:25:00')
    },
    {
      id: 'job-2',
      institutionId: 'inst-1',
      fileName: 'nouveaux_etudiants.csv',
      fileSize: 0.8,
      totalRows: 450,
      processedRows: 320,
      successRows: 315,
      errorRows: 5,
      status: 'processing',
      createdAt: new Date('2024-01-15T09:15:00')
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Très Bien': return 'bg-green-100 text-green-800';
      case 'Bien': return 'bg-blue-100 text-blue-800';
      case 'Assez Bien': return 'bg-yellow-100 text-yellow-800';
      case 'Passable': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAndSortedStudents = students
    .filter(student => filterGrade === 'all' || student.grade === filterGrade)
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'average':
          comparison = a.average - b.average;
          break;
        case 'name':
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case 'matricule':
          comparison = a.matricule.localeCompare(b.matricule);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Étudiants</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Diplômés</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
            </div>
            <Award className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Moyenne Générale</p>
              <p className="text-2xl font-bold text-gray-900">14.2</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dernière Sync</p>
              <p className="text-sm font-medium text-gray-900">Il y a 2h</p>
            </div>
            <RefreshCw className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setActiveTab('import')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Upload className="h-6 w-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Importer des Données</h4>
            <p className="text-sm text-gray-600">CSV, Excel ou base de données</p>
          </button>

          <button 
            onClick={() => setActiveTab('generate')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <FileText className="h-6 w-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Générer Diplômes</h4>
            <p className="text-sm text-gray-600">Automatisation par moyenne</p>
          </button>

          <button 
            onClick={() => setActiveTab('database')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <Database className="h-6 w-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Connexion BDD</h4>
            <p className="text-sm text-gray-600">Synchronisation automatique</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDatabaseTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Connexions Base de Données</h3>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nouvelle Connexion</span>
        </button>
      </div>

      {dbConnections.map((connection) => (
        <div key={connection.id} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{connection.name}</h4>
                <p className="text-sm text-gray-600">{connection.type.toUpperCase()} - {connection.host}:{connection.port}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                connection.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {connection.isActive ? 'Actif' : 'Inactif'}
              </span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Base de données</p>
              <p className="font-medium text-gray-900">{connection.database}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Étudiants</p>
              <p className="font-medium text-gray-900">{connection.studentsCount.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Dernière sync</p>
              <p className="font-medium text-gray-900">
                {connection.lastSync?.toLocaleString('fr-FR') || 'Jamais'}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Synchroniser</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4" />
              <span>Tester Connexion</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderImportTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Import de Données</h3>
        <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Upload className="h-4 w-4" />
          <span>Nouveau Import</span>
        </button>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Importer un fichier</h4>
          <p className="text-gray-600 mb-4">Glissez-déposez votre fichier CSV ou Excel ici, ou cliquez pour parcourir</p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>• CSV (UTF-8)</span>
            <span>• Excel (.xlsx, .xls)</span>
            <span>• Taille max: 50MB</span>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Format requis</h5>
          <p className="text-sm text-blue-700 mb-2">Colonnes obligatoires :</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-600">
            <span>• matricule</span>
            <span>• prenom</span>
            <span>• nom</span>
            <span>• date_naissance</span>
            <span>• lieu_naissance</span>
            <span>• discipline</span>
            <span>• moyenne</span>
            <span>• annee_academique</span>
          </div>
        </div>
      </div>

      {/* Import History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Historique des Imports</h4>
        <div className="space-y-4">
          {importJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  job.status === 'completed' ? 'bg-green-50' :
                  job.status === 'processing' ? 'bg-blue-50' :
                  job.status === 'failed' ? 'bg-red-50' : 'bg-gray-50'
                }`}>
                  {job.status === 'completed' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : job.status === 'processing' ? (
                    <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{job.fileName}</p>
                  <p className="text-sm text-gray-600">
                    {job.successRows}/{job.totalRows} lignes • {job.fileSize}MB
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {job.createdAt.toLocaleDateString('fr-FR')}
                </p>
                <p className="text-xs text-gray-500">
                  {job.createdAt.toLocaleTimeString('fr-FR')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudentsTab = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Toutes les mentions</option>
              <option value="Très Bien">Très Bien</option>
              <option value="Bien">Bien</option>
              <option value="Assez Bien">Assez Bien</option>
              <option value="Passable">Passable</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="average-desc">Moyenne (décroissant)</option>
              <option value="average-asc">Moyenne (croissant)</option>
              <option value="name-asc">Nom (A-Z)</option>
              <option value="name-desc">Nom (Z-A)</option>
              <option value="matricule-asc">Matricule (croissant)</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedStudents.length} sélectionné(s)
            </span>
            {selectedStudents.length > 0 && (
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <FileText className="h-4 w-4" />
                <span>Générer Diplômes</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents(filteredAndSortedStudents.map(s => s.id));
                      } else {
                        setSelectedStudents([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Étudiant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discipline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Moyenne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mention
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents([...selectedStudents, student.id]);
                        } else {
                          setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{student.fullName}</p>
                      <p className="text-sm text-gray-600">
                        {student.matricule} • {student.birthDate} - {student.birthPlace}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{student.discipline}</p>
                    <p className="text-xs text-gray-500">{student.academicYear}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-900">{student.average}</span>
                      <span className="text-sm text-gray-500 ml-1">/20</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGenerateTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Génération Automatisée de Diplômes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Critères de Sélection</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moyenne minimale
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.1"
                  defaultValue="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Année académique
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="2023-2024">2023-2024</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2021-2022">2021-2022</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discipline
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Toutes les disciplines</option>
                  <option value="Informatique Fondamentale">Informatique Fondamentale</option>
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Physique">Physique</option>
                  <option value="Français">Français</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Paramètres de Génération</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template de diplôme
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="template-1">Diplôme Professeur - A3</option>
                  <option value="template-2">Diplôme Professeur - A4</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de délibération
                </label>
                <input
                  type="date"
                  defaultValue="2024-07-10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de délivrance
                </label>
                <input
                  type="date"
                  defaultValue="2024-11-07"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Étudiants éligibles</p>
              <p className="text-sm text-blue-700">
                127 étudiants correspondent aux critères sélectionnés et peuvent recevoir leur diplôme.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
            <FileText className="h-5 w-5" />
            <span>Générer les Diplômes</span>
          </button>
          
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <Eye className="h-5 w-5" />
            <span>Prévisualiser</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Données Étudiants</h2>
          <p className="text-gray-600 mt-1">Import, synchronisation et génération automatisée</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
            { id: 'database', label: 'Base de Données', icon: Database },
            { id: 'import', label: 'Import', icon: Upload },
            { id: 'students', label: 'Étudiants', icon: Users },
            { id: 'generate', label: 'Génération', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'database' && renderDatabaseTab()}
      {activeTab === 'import' && renderImportTab()}
      {activeTab === 'students' && renderStudentsTab()}
      {activeTab === 'generate' && renderGenerateTab()}
    </div>
  );
}