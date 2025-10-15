import { useState, useEffect } from 'react';

interface CameraCapabilities {
  torch?: boolean;
  zoom?: boolean;
  focusMode?: string[];
}

interface UseCameraReturn {
  hasPermission: boolean | null;
  error: string | null;
  capabilities: CameraCapabilities | null;
  requestPermission: () => Promise<boolean>;
  checkCapabilities: () => Promise<CameraCapabilities | null>;
}

export function useCamera(): UseCameraReturn {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<CameraCapabilities | null>(null);

  const requestPermission = async (): Promise<boolean> => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setHasPermission(true);
      
      // Get capabilities
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const caps = videoTrack.getCapabilities();
        setCapabilities({
          torch: 'torch' in caps,
          zoom: 'zoom' in caps,
          focusMode: caps.focusMode || []
        });
      }
      
      // Stop the stream as we just needed to check permissions
      stream.getTracks().forEach(track => track.stop());
      
      return true;
    } catch (err: any) {
      setHasPermission(false);
      
      if (err.name === 'NotAllowedError') {
        setError('Accès à la caméra refusé. Veuillez autoriser l\'accès dans les paramètres de votre navigateur.');
      } else if (err.name === 'NotFoundError') {
        setError('Aucune caméra trouvée sur cet appareil.');
      } else if (err.name === 'NotSupportedError') {
        setError('La caméra n\'est pas supportée par ce navigateur.');
      } else {
        setError('Erreur d\'accès à la caméra. Vérifiez que vous utilisez HTTPS.');
      }
      
      return false;
    }
  };

  const checkCapabilities = async (): Promise<CameraCapabilities | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      const videoTrack = stream.getVideoTracks()[0];
      const caps = videoTrack.getCapabilities();
      
      const capabilities: CameraCapabilities = {
        torch: 'torch' in caps,
        zoom: 'zoom' in caps,
        focusMode: caps.focusMode || []
      };
      
      stream.getTracks().forEach(track => track.stop());
      setCapabilities(capabilities);
      
      return capabilities;
    } catch (err) {
      console.error('Error checking camera capabilities:', err);
      return null;
    }
  };

  useEffect(() => {
    // Check if camera API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setHasPermission(false);
      setError('L\'API caméra n\'est pas supportée par ce navigateur.');
    }
  }, []);

  return {
    hasPermission,
    error,
    capabilities,
    requestPermission,
    checkCapabilities
  };
}