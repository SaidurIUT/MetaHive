"use client";

import React, { useRef, useState } from "react";
import { Camera, Monitor } from "lucide-react";

const CaptureComponent = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Start webcam
  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  // Stop webcam
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Capture photo from webcam
  const capturePhoto = () => {
    if (videoRef.current) {
      // Wait for video to be ready
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        // Get the video element's dimensions
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        // Create a canvas with the same dimensions as the video
        const canvas = document.createElement("canvas");
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // Draw the current video frame onto the canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

        // Convert the canvas to a data URL and set it as the captured image
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
        stopWebcam();
      } else {
        console.log("Video not ready yet");
      }
    }
  };

  // Capture screenshot
  const captureScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        preferCurrentTab: true,
      });
      const videoTrack = stream.getVideoTracks()[0];

      const imageCapture = new ImageCapture(videoTrack);
      const bitmap = await imageCapture.grabFrame();

      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);

      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Error capturing screenshot:", err);
    }
  };

  // Handle video load
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-[var(--color-bg-paper)] rounded-lg shadow-lg border border-[var(--color-border)]">
      <div className="space-y-6">
        {/* Video preview */}
        {stream && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-[var(--color-primary)]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              onLoadedMetadata={handleVideoLoad}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        {/* Captured image preview */}
        {capturedImage && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-[var(--color-primary)]">
            <img
              src={capturedImage}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-contain bg-black"
            />
          </div>
        )}

        {/* Control buttons */}
        <div className="flex gap-3 justify-center">
          {!stream && !capturedImage && (
            <>
              <button
                onClick={startWebcam}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-contrast)] rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                <Camera className="w-30 h-30" />
                Open Camera
              </button>

              <button
                onClick={captureScreen}
                className="flex items-center gap-2 px-6 py-3 bg-[var(--color-secondary)] text-[var(--color-secondary-contrast)] rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors"
              >
                <Monitor className="w-30 h-30" />
                Take Screenshot
              </button>
            </>
          )}

          {stream && (
            <>
              <button
                onClick={capturePhoto}
                className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-primary-contrast)] rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Capture Photo
              </button>
              <button
                onClick={stopWebcam}
                className="px-6 py-3 bg-[var(--color-status-error)] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
            </>
          )}

          {capturedImage && (
            <button
              onClick={() => setCapturedImage(null)}
              className="px-6 py-3 bg-[var(--color-bg-accent)] text-[var(--color-text-contrast)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptureComponent;
