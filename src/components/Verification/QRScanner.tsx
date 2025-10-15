import { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, X, RotateCcw, Zap, ZapOff } from 'lucide-react';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  type ScannerInstance = { render: (onSuccess: (s: string) => void, onError?: (e: unknown) => void) => void; clear: () => Promise<void> };
  const scannerRef = useRef<ScannerInstance | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');
  const [torchEnabled, setTorchEnabled] = useState(false);

  const initializeScanner = useCallback(async () => {
    try {
      const module = await import('html5-qrcode');
      const Html5QrcodeScanner = (module as unknown as Record<string, unknown>)['Html5QrcodeScanner'] as unknown as {
        new (elemId: string, config: unknown, verbose?: boolean): ScannerInstance;
      };

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
        videoConstraints: { facingMode: 'environment' }
      };

      const scanner = new Html5QrcodeScanner('qr-reader', config, false);
      scannerRef.current = scanner;

      scanner.render(
        (decodedText: string) => {
          // stop and return result
          scanner.clear().catch(() => {}).finally(() => {
            scannerRef.current = null;
            onScanSuccess(decodedText);
          });
        },
        (err: unknown) => {
          // ignore frame errors
          console.debug('QR scan error', err);
        }
      );

      setHasPermission(true);
    } catch (err) {
      console.error('Failed to init scanner', err);
      setError("Impossible d'initialiser le scanner QR.");
      setHasPermission(false);
    }
  }, [onScanSuccess]);

  useEffect(() => {
    let mounted = true;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        if (mounted) {
          setHasPermission(true);
          initializeScanner();
        }
      })
      .catch((e) => {
        console.error('camera permission denied', e);
        setHasPermission(false);
        setError("Accès à la caméra refusé. Veuillez autoriser l'accès à la caméra dans les paramètres de votre navigateur.");
      });

    return () => {
      mounted = false;
      try {
        scannerRef.current?.clear?.();
      } catch (e) {
        console.error('Error clearing scanner on unmount', e);
      }
      scannerRef.current = null;
    };
  }, [initializeScanner]);

  const handleRetry = () => {
    setError('');
    setHasPermission(null);
    initializeScanner();
  };

  const handleClose = async () => {
    try {
      await scannerRef.current?.clear?.();
    } catch (e) {
      console.error('Error clearing scanner on close', e);
    }
    scannerRef.current = null;
    onClose();
  };

  const toggleTorch = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities() as MediaTrackCapabilities;
  if ((capabilities as unknown as { torch?: unknown }).torch) {
        try {
          // @ts-expect-error - browser-specific
          await track.applyConstraints({ advanced: [{ torch: !torchEnabled }] });
          setTorchEnabled(prev => !prev);
        } catch (e) {
          console.error('applyConstraints torch failed', e);
        }
      }
    } catch (e) {
      console.error('Torch not supported or camera error', e);
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
          <button onClick={handleClose} aria-label="Fermer le scanner" className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
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
              <button onClick={handleRetry} className="mt-4 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto">
                <RotateCcw className="h-4 w-4" />
                <span>Réessayer</span>
              </button>
            </div>
          )}

          {hasPermission === true && (
            <div>
              <div className="relative">
                <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-white rounded-lg shadow-lg">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button onClick={toggleTorch} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${torchEnabled ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {torchEnabled ? <ZapOff className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                  <span>{torchEnabled ? 'Éteindre' : 'Allumer'} la lampe</span>
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 text-center">Positionnez le QR code dans le cadre pour le scanner automatiquement</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-2">Problème avec la caméra ?</p>
          <button onClick={handleClose} className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">Saisir le code manuellement</button>
        </div>
      </div>
    </div>
  );
}