import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  QrCode, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Shield,
  Calendar,
  Building2,
  User,
  Download,
  Eye
} from 'lucide-react';

interface VerificationResult {
  valid: boolean;
  document?: {
    id: string;
    uniqueId: string;
    studentName: string;
    templateName: string;
    institutionName: string;
    issuedDate: string;
    verificationCount: number;
  };
  errors?: string[];
  warnings?: string[];
}

export function PublicVerification() {
  const [verificationMethod, setVerificationMethod] = useState<'id' | 'qr' | 'file'>('id');
  const [verificationInput, setVerificationInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerification = async () => {
    setIsVerifying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock verification result
    if (verificationInput === 'TD-2024-001234' || verificationInput.includes('demo')) {
      setResult({
        valid: true,
        document: {
          id: 'TD-2024-001234',
          uniqueId: 'ae4f9b2c-8d7e-4a1b-9c2d-3e4f5a6b7c8d',
          studentName: 'John Doe',
          templateName: 'Master of Science in Computer Engineering',
          institutionName: 'University of Sciences',
          issuedDate: '2024-01-15',
          verificationCount: 24
        }
      });
    } else if (verificationInput === 'TD-2024-REVOKED') {
      setResult({
        valid: false,
        errors: ['This document has been revoked by the issuing institution'],
        warnings: ['Please contact the institution for more information']
      });
    } else {
      setResult({
        valid: false,
        errors: ['Document not found or invalid verification code']
      });
    }
    
    setIsVerifying(false);
  };

  const resetVerification = () => {
    setResult(null);
    setVerificationInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">TRUSTDOC AFRICA</h1>
              <p className="text-blue-600 font-semibold">Document Verification Portal</p>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of educational documents issued by certified institutions
          </p>
        </div>

        {!result ? (
          /* Verification Form */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Verify Document
            </h2>

            {/* Verification Method Selector */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setVerificationMethod('id')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    verificationMethod === 'id'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Document ID</span>
                </button>
                <button
                  onClick={() => setVerificationMethod('qr')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    verificationMethod === 'qr'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <QrCode className="h-4 w-4" />
                  <span>QR Code</span>
                </button>
                <button
                  onClick={() => setVerificationMethod('file')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    verificationMethod === 'file'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload File</span>
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              {verificationMethod === 'id' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Document ID
                  </label>
                  <input
                    type="text"
                    value={verificationInput}
                    onChange={(e) => setVerificationInput(e.target.value)}
                    placeholder="e.g., TD-2024-001234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    You can find this ID on the document or in the QR code
                  </p>
                </div>
              )}

              {verificationMethod === 'qr' && (
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-4">
                    <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Scan QR Code with your camera</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Open Camera
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Or enter the QR code content manually above
                  </p>
                </div>
              )}

              {verificationMethod === 'file' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Document File
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Drop your PDF file here or click to browse</p>
                    <p className="text-sm text-gray-500">Supports PDF files up to 10MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Hints */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">Demo Instructions</h4>
              <p className="text-sm text-blue-700">
                Try these sample IDs: <code className="bg-blue-100 px-1 rounded">TD-2024-001234</code> (valid document) or <code className="bg-blue-100 px-1 rounded">TD-2024-REVOKED</code> (revoked document)
              </p>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerification}
              disabled={!verificationInput || isVerifying}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                verificationInput && !isVerifying
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Verify Document</span>
                </div>
              )}
            </button>
          </div>
        ) : (
          /* Verification Result */
          <div className="max-w-4xl mx-auto">
            <div className={`bg-white rounded-2xl shadow-xl border-2 ${
              result.valid ? 'border-green-200' : 'border-red-200'
            } p-8`}>
              {/* Result Header */}
              <div className={`text-center mb-8 p-6 rounded-xl ${
                result.valid ? 'bg-green-50' : 'bg-red-50'
              }`}>
                {result.valid ? (
                  <>
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-green-900 mb-2">Document Verified</h2>
                    <p className="text-green-700 text-lg">This document is authentic and valid</p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-red-900 mb-2">Verification Failed</h2>
                    <p className="text-red-700 text-lg">This document could not be verified</p>
                  </>
                )}
              </div>

              {result.valid && result.document && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Document Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Document Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Student Name</p>
                          <p className="text-lg font-medium text-gray-900">{result.document.studentName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Qualification</p>
                          <p className="text-lg font-medium text-gray-900">{result.document.templateName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Building2 className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Institution</p>
                          <p className="text-lg font-medium text-gray-900">{result.document.institutionName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Issue Date</p>
                          <p className="text-lg font-medium text-gray-900">{result.document.issuedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification Info */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Verification Info</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Document ID</span>
                        <code className="text-sm bg-white px-2 py-1 rounded">{result.document.id}</code>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Unique Hash</span>
                        <code className="text-sm bg-white px-2 py-1 rounded text-xs">
                          {result.document.uniqueId.substring(0, 16)}...
                        </code>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Times Verified</span>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{result.document.verificationCount}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Verified On</span>
                        <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 text-green-700">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Security Verified</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        This document has been cryptographically verified and is authentic.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Errors and Warnings */}
              {result.errors && result.errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2 flex items-center">
                    <XCircle className="h-5 w-5 mr-2" />
                    Errors
                  </h4>
                  <ul className="text-red-700 space-y-1">
                    {result.errors.map((error, index) => (
                      <li key={index} className="text-sm">• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.warnings && result.warnings.length > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Warnings
                  </h4>
                  <ul className="text-yellow-700 space-y-1">
                    {result.warnings.map((warning, index) => (
                      <li key={index} className="text-sm">• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetVerification}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Verify Another Document
                </button>
                
                {result.valid && (
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download Verification Report</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="mb-2">Powered by TRUSTDOC AFRICA - Secure Document Authentication</p>
          <p className="text-sm">For support, contact your issuing institution or visit our help center.</p>
        </div>
      </div>
    </div>
  );
}