import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Edit3, 
  Trash2, 
  Copy, 
  Eye,
  Settings,
  Layout,
  Printer
} from 'lucide-react';
import { DocumentTemplate } from '../../types';
import { DiplomaForm } from './DiplomaForm';

interface TemplateManagerProps {
  onCreateDocument?: (templateId: string) => void;
}

export function TemplateManager({ onCreateDocument }: TemplateManagerProps) {
  const [activeView, setActiveView] = useState<'list' | 'create' | 'edit' | 'form'>('list');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);

  // Mock templates data
  const templates: DocumentTemplate[] = [
    {
      id: 'template-1',
      name: 'Diplôme de Professeur - Format A3',
      type: 'diploma',
      format: 'A3',
      institutionId: 'inst-1',
      fields: [
        { id: 'diplomaNumber', name: 'diplomaNumber', label: 'Numéro de diplôme', type: 'text', required: true, placeholder: 'N°//MINESUP/DDES' },
        { id: 'deliberationDate', name: 'deliberationDate', label: 'Date de délibération du jury', type: 'date', required: true, placeholder: '10 juillet 2011' },
        { id: 'fullName', name: 'fullName', label: 'Nom complet du récipiendaire', type: 'text', required: true, placeholder: 'LIHAN LI NDJOM HANS' },
        { id: 'registrationNumber', name: 'registrationNumber', label: 'Numéro matricule', type: 'text', required: true, placeholder: '03Y107' },
        { id: 'birthInfo', name: 'birthInfo', label: 'Date et lieu de naissance', type: 'text', required: true, placeholder: '16/02/1984 – NTI LOUM' },
        { id: 'discipline', name: 'discipline', label: 'Série (discipline/option)', type: 'select', required: true, options: ['Informatique Fondamentale', 'Mathématiques', 'Physique', 'Chimie', 'Biologie', 'Français', 'Anglais', 'Histoire-Géographie'] },
        { id: 'grade', name: 'grade', label: 'Mention (Grade obtenu)', type: 'select', required: true, options: ['Très Bien', 'Bien', 'Assez Bien', 'Passable'] },
        { id: 'issueDate', name: 'issueDate', label: 'Date de délivrance du diplôme', type: 'date', required: true, placeholder: '7 Novembre 2011' },
        { id: 'rector', name: 'rector', label: 'Recteur', type: 'text', required: true, placeholder: 'Professeur Oumarou BOUBA' },
        { id: 'minister', name: 'minister', label: 'Ministre de l\'Enseignement Supérieur', type: 'text', required: true, placeholder: 'Jacques Pama' }
      ],
      design: {
        layout: 'classic',
        fixedContent: {
          institution: 'Université de Yaoundé I – École Normale Supérieure',
          diplomaType: 'Diplôme de Professeur de l\'Enseignement Secondaire 2ᵉ Grade',
          legalReferences: 'VU les textes en vigueur, notamment la loi n° 2001/005 du 16 avril 2001 portant orientation de l\'Enseignement Supérieur...'
        }
      },
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'template-2',
      name: 'Diplôme de Professeur - Format A4',
      type: 'diploma',
      format: 'A4',
      institutionId: 'inst-1',
      fields: [
        { id: 'diplomaNumber', name: 'diplomaNumber', label: 'Numéro de diplôme', type: 'text', required: true, placeholder: 'N°//MINESUP/DDES' },
        { id: 'deliberationDate', name: 'deliberationDate', label: 'Date de délibération du jury', type: 'date', required: true, placeholder: '10 juillet 2011' },
        { id: 'fullName', name: 'fullName', label: 'Nom complet du récipiendaire', type: 'text', required: true, placeholder: 'LIHAN LI NDJOM HANS' },
        { id: 'registrationNumber', name: 'registrationNumber', label: 'Numéro matricule', type: 'text', required: true, placeholder: '03Y107' },
        { id: 'birthInfo', name: 'birthInfo', label: 'Date et lieu de naissance', type: 'text', required: true, placeholder: '16/02/1984 – NTI LOUM' },
        { id: 'discipline', name: 'discipline', label: 'Série (discipline/option)', type: 'select', required: true, options: ['Informatique Fondamentale', 'Mathématiques', 'Physique', 'Chimie', 'Biologie', 'Français', 'Anglais', 'Histoire-Géographie'] },
        { id: 'grade', name: 'grade', label: 'Mention (Grade obtenu)', type: 'select', required: true, options: ['Très Bien', 'Bien', 'Assez Bien', 'Passable'] },
        { id: 'issueDate', name: 'issueDate', label: 'Date de délivrance du diplôme', type: 'date', required: true, placeholder: '7 Novembre 2011' },
        { id: 'rector', name: 'rector', label: 'Recteur', type: 'text', required: true, placeholder: 'Professeur Oumarou BOUBA' },
        { id: 'minister', name: 'minister', label: 'Ministre de l\'Enseignement Supérieur', type: 'text', required: true, placeholder: 'Jacques Pama' }
      ],
      design: {
        layout: 'modern',
        fixedContent: {
          institution: 'Université de Yaoundé I – École Normale Supérieure',
          diplomaType: 'Diplôme de Professeur de l\'Enseignement Secondaire 2ᵉ Grade',
          legalReferences: 'VU les textes en vigueur, notamment la loi n° 2001/005 du 16 avril 2001 portant orientation de l\'Enseignement Supérieur...'
        }
      },
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-15')
    }
  ];

  const handleCreateDocument = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setActiveView('form');
  };

  const handleBackToList = () => {
    setActiveView('list');
    setSelectedTemplate(null);
  };

  if (activeView === 'form' && selectedTemplate) {
    return (
      <DiplomaForm 
        template={selectedTemplate}
        onBack={handleBackToList}
        onSave={(data) => {
          console.log('Document data:', data);
          // Here you would save the document
          handleBackToList();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Modèles de Documents</h2>
          <p className="text-gray-600 mt-1">Gérez vos templates de diplômes et certificats</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nouveau Modèle</span>
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            {/* Template Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  template.format === 'A3' ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                  <Layout className={`h-6 w-6 ${
                    template.format === 'A3' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      template.format === 'A3' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      <Printer className="h-3 w-3 mr-1" />
                      {template.format}
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      template.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">Institution</p>
                <p className="text-sm text-gray-600">{template.design.fixedContent.institution}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">Type de diplôme</p>
                <p className="text-sm text-gray-600">{template.design.fixedContent.diplomaType}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{template.fields.length} champs</span>
                <span>Modifié le {template.updatedAt.toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button 
                onClick={() => handleCreateDocument(template)}
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
              >
                <FileText className="h-4 w-4" />
                <span>Remplir</span>
              </button>
              <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for New Institution */}
      {templates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun modèle disponible</h3>
          <p className="text-gray-600 mb-4">Créez votre premier modèle de document pour commencer.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Créer un modèle
          </button>
        </div>
      )}
    </div>
  );
}