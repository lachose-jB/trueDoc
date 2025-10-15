import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Save, Eye, Download, Calendar,
  User, Hash, MapPin, GraduationCap, Award,
  FileText, Users, Printer, QrCode
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DocumentTemplate } from '../../types';

interface DiplomaFormProps {
  template: DocumentTemplate;
  onBack: () => void;
  onSave: (data: Record<string, any>) => void;
}

export function DiplomaForm({ template, onBack, onSave }: DiplomaFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const diplomaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const exportPDF = async () => {
    if (!diplomaRef.current) return;

    const canvas = await html2canvas(diplomaRef.current, {
      scale: 2, // meilleure qualité
      useCORS: true, // permet de charger border.png depuis /public
    });

    const imgData = canvas.toDataURL('image/png');

    // Dimensions A4 / A3 en mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: template.format === 'A3' ? 'a3' : 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save(`diplome-${formData.fullName || 'preview'}.pdf`);
  };

  const getFieldIcon = (fieldName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      diplomaNumber: Hash,
      deliberationDate: Calendar,
      fullName: User,
      registrationNumber: Hash,
      birthInfo: MapPin,
      discipline: GraduationCap,
      grade: Award,
      issueDate: Calendar,
      rector: Users,
      minister: Users
    };
    return icons[fieldName] || FileText;
  };

  const renderPreview = () => (
    <div
      ref={diplomaRef}
      className={`relative bg-white rounded-lg p-16 shadow-lg ${
        template.format === 'A3' ? 'w-[1587px] h-[1123px]' : 'w-[1123px] h-[794px]'
      }`}
      style={{
        backgroundImage: "url('/border.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Contenu interne du diplôme */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            RÉPUBLIQUE DU CAMEROUN
          </h1>
          <p className="text-lg text-gray-700 mb-1">Peace - Work - Fatherland</p>
          <p className="text-lg font-semibold text-blue-800">
            {template.design.fixedContent.institution}
          </p>
        </div>

        {/* Diploma Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {template.design.fixedContent.diplomaType}
          </h2>
          <div className="w-32 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Legal References */}
        <div className="mb-8 text-sm text-gray-600 italic">
          <p>{template.design.fixedContent.legalReferences}</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Numéro de diplôme</p>
                <p className="font-semibold text-gray-900">
                  {formData.diplomaNumber || '[À remplir]'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Date de délibération</p>
                <p className="font-semibold text-gray-900">
                  {formData.deliberationDate || '[À remplir]'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Matricule</p>
                <p className="font-semibold text-gray-900">
                  {formData.registrationNumber || '[À remplir]'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600 mb-1">Nom complet du récipiendaire</p>
                <p className="text-xl font-bold text-blue-900">
                  {formData.fullName || '[NOM DU RÉCIPIENDAIRE]'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Date et lieu de naissance</p>
                <p className="font-semibold text-gray-900">
                  {formData.birthInfo || '[À remplir]'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-green-600 mb-1">Série (discipline/option)</p>
              <p className="text-lg font-bold text-green-900">
                {formData.discipline || '[DISCIPLINE]'}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-600 mb-1">Mention obtenue</p>
              <p className="text-lg font-bold text-yellow-900">
                {formData.grade || '[MENTION]'}
              </p>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Le Recteur</p>
            <div className="h-16 border-b border-gray-300 mb-2"></div>
            <p className="font-semibold text-gray-900">
              {formData.rector || '[Nom du Recteur]'}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Le Ministre de l'Enseignement Supérieur</p>
            <div className="h-16 border-b border-gray-300 mb-2"></div>
            <p className="font-semibold text-gray-900">
              {formData.minister || '[Nom du Ministre]'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 pt-4">
          <div>
            <p>Date de délivrance: {formData.issueDate || '[À remplir]'}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
              <QrCode className="h-8 w-8 text-gray-400" />
            </div>
            <div className="text-right">
              <p className="font-mono text-xs">ID: TD-2024-XXXXXX</p>
              <p className="text-xs">Format: {template.format}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour aux modèles</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                template.format === 'A3' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                <Printer className="h-3 w-3 mr-1" />
                {template.format}
              </span>
              <span className="text-sm text-gray-500">
                {template.design.fixedContent.institution}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isPreviewMode 
                ? 'bg-gray-100 text-gray-700' 
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>{isPreviewMode ? 'Masquer aperçu' : 'Aperçu'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FileText className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Informations du diplôme</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {template.fields.map((field) => {
              const Icon = getFieldIcon(field.name);
              
              return (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span>{field.label}</span>
                      {field.required && <span className="text-red-500">*</span>}
                    </div>
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={field.required}
                    >
                      <option value="">Sélectionner...</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'date' ? (
                    <input
                      type="date"
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={field.required}
                    />
                  ) : (
                    <input
                      type="text"
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required={field.required}
                    />
                  )}
                  
                  {field.placeholder && (
                    <p className="text-xs text-gray-500 mt-1">
                      Exemple: {field.placeholder}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Générer le diplôme</span>
              </button>
              
              <button
                type="button"
                onClick={exportPDF}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Exporter PDF</span>
              </button>
            </div>
          </form>
        </div>

        {/* Preview */}
        {isPreviewMode && (
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Aperçu du diplôme</h3>
              <span className="text-sm text-gray-500">Format {template.format}</span>
            </div>
            
            <div className="overflow-auto max-h-[800px]">
              {renderPreview()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
