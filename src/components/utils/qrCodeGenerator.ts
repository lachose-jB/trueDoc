// QR Code generation utilities for TRUSTDOC documents

export interface DocumentQRData {
  id: string;
  hash: string;
  verificationUrl: string;
  issuedDate: string;
  institutionId: string;
}

export function generateQRCodeData(documentId: string, institutionId: string): DocumentQRData {
  const baseUrl = window.location.origin;
  const hash = generateDocumentHash(documentId);
  
  return {
    id: documentId,
    hash,
    verificationUrl: `${baseUrl}/verify?id=${documentId}&hash=${hash}`,
    issuedDate: new Date().toISOString(),
    institutionId
  };
}

export function generateDocumentHash(documentId: string): string {
  // Simple hash generation for demo purposes
  // In production, this would use proper cryptographic hashing
  const timestamp = Date.now().toString();
  const combined = documentId + timestamp + Math.random().toString(36);
  
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
}

export function parseQRCodeData(qrContent: string): DocumentQRData | null {
  try {
    // Try to parse as JSON first
    const data = JSON.parse(qrContent);
    if (data.id && data.hash && data.verificationUrl) {
      return data as DocumentQRData;
    }
  } catch {
    // If not JSON, try to extract from URL
    if (qrContent.includes('/verify?')) {
      const url = new URL(qrContent);
      const id = url.searchParams.get('id');
      const hash = url.searchParams.get('hash');
      
      if (id && hash) {
        return {
          id,
          hash,
          verificationUrl: qrContent,
          issuedDate: new Date().toISOString(),
          institutionId: 'unknown'
        };
      }
    }
    
    // If it looks like a document ID, use it directly
    if (qrContent.match(/^TD-\d{4}-\d{6}$/)) {
      return {
        id: qrContent,
        hash: generateDocumentHash(qrContent),
        verificationUrl: `${window.location.origin}/verify?id=${qrContent}`,
        issuedDate: new Date().toISOString(),
        institutionId: 'unknown'
      };
    }
  }
  
  return null;
}

export function generateSecureDocumentId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `TD-${year}-${randomNum}`;
}

export function validateDocumentId(id: string): boolean {
  return /^TD-\d{4}-\d{6}$/.test(id);
}