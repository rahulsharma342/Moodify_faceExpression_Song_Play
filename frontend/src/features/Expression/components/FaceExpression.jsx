import React, { useEffect, useRef, useState } from "react";
import { detect ,initialize} from "../utils/utils"

const FaceExpressionDetector = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef=useRef(null);

  const [expression, setExpression] = useState("Detecting...");
   const [isLocked, setIsLocked] = useState(false);

 

  useEffect(() => {
    initialize({faceLandmarkerRef ,videoRef ,streamRef});

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

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
      <button onClick={()=>{detect({faceLandmarkerRef ,videoRef ,streamRef})}}>Detect</button>
    </div>
  );
};

export default FaceExpressionDetector;
