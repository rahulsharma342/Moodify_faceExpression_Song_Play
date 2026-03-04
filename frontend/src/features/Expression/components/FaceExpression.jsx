import React, { useEffect, useRef, useState } from "react";
import { detect, initialize } from "../utils/utils";
import { useSong } from "../../../home/hooks/useSong";

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Click Detect");
  const [isDetecting, setIsDetecting] = useState(false);
  const { fetchSongs } = useSong();

  const handleDetect = async () => {
    setIsDetecting(true);
    try {
      const { expressionText, mood } = await detect({
        faceLandmarkerRef,
        videoRef,
      });

      setExpression(expressionText);

      if (mood) {
        await fetchSongs(mood);
      }
    } catch (error) {
      console.error("Error while detecting expression:", error);
      setExpression("Detection failed");
    } finally {
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    const start = async () => {
      await initialize({ faceLandmarkerRef, videoRef, streamRef });
    };

    start();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>AI Face Expression Detector</h2>

      <video
        ref={videoRef}
        width="480"
        height="360"
        style={{ borderRadius: "12px" }}
        autoPlay
        muted
      />

      <h3>Expression: {expression}</h3>

      <button onClick={handleDetect} disabled={isDetecting}>
        {isDetecting ? "Detecting..." : "Detect"}
      </button>
    </div>
  );
};

export default FaceExpressionDetector;
