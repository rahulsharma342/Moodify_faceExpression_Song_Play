import React, { useEffect, useRef, useState } from "react";
import { detect, initialize } from "../utils/utils";

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Click Detect");

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

      <button
        onClick={() =>
          detect({ faceLandmarkerRef, videoRef, setExpression })
        }
      >
        Detect
      </button>
    </div>
  );
};

export default FaceExpressionDetector;