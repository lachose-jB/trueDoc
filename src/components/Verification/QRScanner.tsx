import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScannerConfig, Html5QrcodeResult } from 'html5-qrcode';
import { Camera, X, RotateCcw, Zap, ZapOff } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [torchEnabled, setTorchEnabled] = useState(false);

  useEffect(() => {
    // Check camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setHasPermission(true);
        initializeScanner();
      })
      .catch((err) => {
        setHasPermission(false);
        setError('Accès à la caméra refusé. Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur.');
        console.error('Camera permission denied:', err);
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, []);

  const initializeScanner = () => {
    const config: Html5QrcodeScannerConfig = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      disableFlip: false,
      videoConstraints: {
        facingMode: 'environment' // Use back camera by default
      }
    };

    const scanner = new Html5QrcodeScanner('qr-reader', config, false);
    scannerRef.current = scanner;

    scanner.render(
      (decodedText: string, decodedResult: Html5QrcodeResult) => {
        console.log('QR Code scanned:', decodedText);
        setIsScanning(false);
        onScanSuccess(decodedText);
        scanner.clear();
      },
      (error: string) => {
        // Handle scan errors silently (they occur frequently during scanning)
        console.debug('QR scan error:', error);
      }
    );

    setIsScanning(true);
  };

  const handleRetry = () => {
    setError('');
    setHasPermission(null);
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setHasPermission(true);
        if (scannerRef.current) {
          scannerRef.current.clear().then(() => {
            initializeScanner();
          });
        } else {
          initializeScanner();
        }
      })
      .catch((err) => {
        setHasPermission(false);
        setError('Impossible d\'accéder à la caméra. Vérifiez les permissions de votre navigateur.');
      });
  };

  const toggleTorch = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          advanced: [{ torch: !torchEnabled } as any]
        } 
      });
      
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if ('torch' in capabilities) {
        await track.applyConstraints({
          advanced: [{ torch: !torchEnabled } as any]
        });
        setTorchEnabled(!torchEnabled);
      }
    } catch (err) {
      console.error('Torch not supported:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Camera className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Scanner QR Code</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scanner Content */}
        <div className="space-y-4">
          {hasPermission === null && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Demande d'accès à la caméra...</p>
            </div>
          )}

          {hasPermission === false && (
            <div className="text-center py-8">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Accès caméra requis</h4>
              <p className="text-gray-600 mb-4 text-sm">{error}</p>
              <div className="space-y-2 text-xs text-gray-500">
                <p>Pour scanner un QR code, vous devez :</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Autoriser l'accès à la caméra</li>
                  <li>Utiliser HTTPS ou localhost</li>
                  <li>Vérifier que votre caméra fonctionne</li>
                </ul>
              </div>
              <button
                onClick={handleRetry}
                className="mt-4 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Réessayer</span>
              </button>
            </div>
          )}

          {hasPermission === true && (
            <div>
              {/* Scanner Container */}
              <div className="relative">
                <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
                
                {/* Scanner Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-white rounded-lg shadow-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleTorch}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    torchEnabled 
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {torchEnabled ? (
                    <ZapOff className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  <span>{torchEnabled ? 'Éteindre' : 'Allumer'} la lampe</span>
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 text-center">
                  Positionnez le QR code dans le cadre pour le scanner automatiquement
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Manual Input Option */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-2">
            Problème avec la caméra ?
          </p>
          <button
            onClick={onClose}
            className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Saisir le code manuellement
          </button>
        </div>
      </div>
    </div>
  );
}