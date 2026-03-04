import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const initialize = async ({
  faceLandmarkerRef,
  videoRef,
  streamRef,
}) => {
  const filesetResolver = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  faceLandmarkerRef.current =
    await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
      },
      runningMode: "VIDEO",
      outputFaceBlendshapes: true,
    });

  streamRef.current = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = streamRef.current;
  await videoRef.current.play();
};

export const detect = async ({
  faceLandmarkerRef,
  videoRef,
}) => {
  if (!videoRef.current || !faceLandmarkerRef.current) {
    return { expressionText: "Detector is not ready", mood: null };
  }

  const now = performance.now();

  const results = faceLandmarkerRef.current.detectForVideo(
    videoRef.current,
    now
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileAvg =
      (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;

    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");
    const jawOpen = getScore("jawOpen");

     if (smileAvg > 0.55) {
        return { expressionText: "😊 Smiling", mood: "happy" };
      } else if (
        frownLeft > 0.001 && // realistic threshold
        frownRight > 0.001
      ) {
        return { expressionText: "😢 Sad", mood: "sad" };
      } else if (jawOpen > 0.6) {
        return { expressionText: "😲 Surprised", mood: "surprised" };
      } else {
        return { expressionText: "😐 Neutral", mood: "neutral" };
      }
  } else {
    return { expressionText: "No face detected", mood: null };
  }
};