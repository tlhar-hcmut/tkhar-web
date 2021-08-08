import MDrawing from "@mediapipe/drawing_utils";
import MPose, { Results } from "@mediapipe/pose";

export const initModelPose = (): MPose.Pose => {
    const path = "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.1627343400"
    // const path = "http://20.205.205.211:8000/static"
    const pose: MPose.Pose = new MPose.Pose({ locateFile: (file) => `${path}/${file}` })

    pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    })

    return pose;
}

export const drawSkeleton = (canvasElement: HTMLCanvasElement | null, skeleton: Results): void => {
    if (canvasElement == null) return
    const canvasCtx = canvasElement.getContext("2d")
    if (canvasCtx == null) return
    canvasCtx.save()
    canvasCtx.clearRect(
        0, 0,
        canvasElement.width,
        canvasElement.height
    )
    canvasCtx.drawImage(
        skeleton.image, 0, 0,
        canvasElement.width,
        canvasElement.height
    )
    MDrawing.drawConnectors(
        canvasCtx,
        skeleton.poseLandmarks,
        MPose.POSE_CONNECTIONS,
        { color: '#00FF00', lineWidth: 1 }
    )
    MDrawing.drawLandmarks(
        canvasCtx,
        skeleton.poseLandmarks,
        { color: '#FF0000', lineWidth: 0.001 }
    )
    canvasCtx.restore()

}