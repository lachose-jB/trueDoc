export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institutionId?: string;
  institutionName?: string;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
  status: 'active' | 'inactive' | 'suspended';
}

export type UserRole = 'super-admin' | 'institution-admin' | 'editor' | 'verifier' | 'api-partner';

export interface Institution {
  id: string;
  name: string;
  type: 'university' | 'school' | 'institute';
  country: string;
  logo?: string;
  primaryColor: string;
  contactEmail: string;
  address: string;
  website?: string;
  status: 'active' | 'inactive' | 'suspended';
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  documentsIssued: number;
  createdAt: Date;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: 'diploma' | 'certificate' | 'attestation';
  format: 'A3' | 'A4';
  institutionId: string;
  fields: TemplateField[];
  design: {
    background?: string;
    logo?: string;
    signature?: string;
    layout: 'classic' | 'modern' | 'minimal';
    fixedContent: {
      institution: string;
      diplomaType: string;
      legalReferences: string;
    };
  };
  status: 'draft' | 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select';
  required: boolean;
  options?: string[];
  validation?: string;
  placeholder?: string;
}

export interface Document {
  id: string;
  uniqueId: string;
  templateId: string;
  institutionId: string;
  studentName: string;
  studentEmail?: string;
  data: Record<string, any>;
  qrCode: string;
  hash: string;
  status: 'issued' | 'revoked' | 'suspended';
  issuedBy: string;
  issuedAt: Date;
  verificationCount: number;
  lastVerified?: Date;
  blockchainTxId?: string;
  format: 'A3' | 'A4';
}

export interface AuditLog {
  id: string;
  action: 'issue' | 'verify' | 'revoke' | 'suspend' | 'modify';
  documentId?: string;
  userId: string;
  institutionId?: string;
  metadata: Record<string, any>;
  ipAddress: string;
  timestamp: Date;
}

export interface VerificationResult {
  valid: boolean;
  document?: Document;
  template?: DocumentTemplate;
  institution?: Institution;
  verificationId: string;
  verifiedAt: Date;
  warnings?: string[];
  errors?: string[];
}

export interface Student {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email?: string;
  birthDate: string;
  birthPlace: string;
  discipline: string;
  specialization?: string;
  academicYear: string;
  average: number;
  grade: string;
  status: 'active' | 'graduated' | 'suspended';
  institutionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseConnection {
  id: string;
  institutionId: string;
  name: string;
  type: 'mysql' | 'postgresql' | 'mssql' | 'oracle';
  host: string;
  port: number;
  database: string;
  username: string;
  isActive: boolean;
  lastSync?: Date;
  studentsCount: number;
  createdAt: Date;
}

export interface ImportJob {
  id: string;
  institutionId: string;
  fileName: string;
  fileSize: number;
  totalRows: number;
  processedRows: number;
  successRows: number;
  errorRows: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errors?: string[];
  createdAt: Date;
  completedAt?: Date;
}