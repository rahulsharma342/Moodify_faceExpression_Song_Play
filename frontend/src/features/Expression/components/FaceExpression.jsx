import React, { useEffect, useRef, useState } from "react";
import { detect, initialize } from "../utils/utils";
import { useSong } from "../../../home/hooks/useSong";
import { useNavigate } from "react-router-dom";

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Click Detect");
  const [isDetecting, setIsDetecting] = useState(false);

  const { fetchSongs } = useSong();
  const navigate = useNavigate();

  // 🔴 stop camera function
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // detect button
  const handleDetect = async () => {
    setIsDetecting(true);

    try {
      const { expressionText, mood } = await detect({
        faceLandmarkerRef,
        videoRef,
      });

      setExpression(expressionText);

      if (mood) {
        stopCamera();

        await fetchSongs(mood);

        navigate("/playlist", { replace: true });
      }
    } catch (error) {
      console.error("Detection error:", error);
      setExpression("Detection failed");
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      await initialize({
        faceLandmarkerRef,
        videoRef,
        streamRef,
      });
    };

    startCamera();

    // cleanup
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>AI Face Expression Detector</h2>

      <video
        ref={videoRef}
        width="480"
        height="360"
        autoPlay
        muted
        playsInline
        style={{
          borderRadius: "12px",
          border: "2px solid #ccc",
        }}
      />

      <h3>Expression: {expression}</h3>

      <button
        onClick={handleDetect}
        disabled={isDetecting}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {isDetecting ? "Detecting..." : "Detect"}
      </button>
    </div>
  );
};

export default FaceExpressionDetector;