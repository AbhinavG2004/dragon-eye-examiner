
import React, { useRef, useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface CameraProps {
  onError?: (error: string) => void;
  className?: string;
}

const Camera: React.FC<CameraProps> = ({ onError, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user" 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
          setIsCameraActive(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
        onError && onError("Camera access denied. Please allow camera permissions to continue.");
        toast({
          title: "Camera Error",
          description: "Unable to access your camera. Please check your permissions.",
          variant: "destructive",
        });
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [onError]);

  return (
    <div className={`camera-container rounded-xl bg-black overflow-hidden ${className}`}>
      {hasPermission === false && (
        <div className="camera-overlay flex flex-col gap-2 p-4 text-white">
          <span className="text-lg font-medium">Camera Access Required</span>
          <p className="text-sm opacity-80">Please enable camera permissions to continue.</p>
        </div>
      )}
      {hasPermission === null && (
        <div className="camera-overlay flex items-center justify-center p-4">
          <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className={`w-full h-full object-cover ${!isCameraActive && 'opacity-0'}`}
      />
    </div>
  );
};

export default Camera;
