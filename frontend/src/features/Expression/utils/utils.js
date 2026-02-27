 
 import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";



 
export const initialize = async ({faceLandmarkerRef ,videoRef ,streamRef}) => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
    );

    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
      filesetResolver,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
      },
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
  };

export const detect = async ({faceLandmarkerRef ,videoRef ,setExpression}) => {
     if (isLocked) return; // freeze after detection
    if (!videoRef.current || !faceLandmarkerRef.current) return;

    const now = performance.now();

    const results = faceLandmarkerRef.current.detectForVideo(
      videoRef.current,
      now,
    );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;

      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

      const smileLeft = getScore("mouthSmileLeft");
      const smileRight = getScore("mouthSmileRight");
      const frownLeft = getScore("mouthFrownLeft");
      const frownRight = getScore("mouthFrownRight");
      const jawOpen = getScore("jawOpen");

      const smileAvg = (smileLeft + smileRight) / 2;

      // More realistic thresholds
      if (smileAvg > 0.55) {
        setExpression("😊 Smiling");
      } else if (
        frownLeft > 0.001 && // realistic threshold
        frownRight > 0.001
      ) {
        setExpression("😢 Sad");
      } else if (jawOpen > 0.6) {
        setExpression("😲 Surprised");
      } else {
        setExpression("😐 Neutral");
      }
      setIsLocked(true);
      setIsLocked(false);
    }else{
       setExpression("No face detected");
    }

    const resetDetection = () => {
    setExpression("Click Detect");
    setIsLocked(false);
  };
  };