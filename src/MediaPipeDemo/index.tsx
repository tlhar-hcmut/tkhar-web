import MCamera from '@mediapipe/camera_utils'
import MDrawing from '@mediapipe/drawing_utils'
import MPose from '@mediapipe/pose'
import React, { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'

const App: React.FC = () => {
    const refWebcam = useRef<Webcam>(null)
    const refCanvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        document.title = "TK-HAR"
        const video = refWebcam.current?.video
        const path = "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.1624666670/"
        const pose: MPose.Pose = new MPose.Pose({ locateFile: (file) => `${path}/${file}` })

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        })

        pose.onResults((results) => {
            const canvasElement = refCanvas.current
            if (canvasElement == null) return
            const canvasCtx = canvasElement.getContext("2d")
            if (canvasCtx == null) return
            canvasCtx.save()
            canvasCtx.clearRect(
                0, 0,
                canvasElement.width,
                canvasElement.height)
            canvasCtx.drawImage(
                results.image, 0, 0,
                canvasElement.width,
                canvasElement.height)
            MDrawing.drawConnectors(
                canvasCtx,
                results.poseLandmarks,
                MPose.POSE_CONNECTIONS,
                { color: '#00FF00', lineWidth: 1 }
            )
            MDrawing.drawLandmarks(
                canvasCtx,
                results.poseLandmarks,
                { color: '#FF0000', lineWidth: 1 }
            )
            canvasCtx.restore()
        })
        if (video != null) new MCamera.Camera(video, { onFrame: async () => await pose.send({ image: video }) }).start()
    }, [])

    return <div style={{ textAlign: 'center' }}>
        <Webcam ref={refWebcam} hidden={true} />
        <canvas ref={refCanvas} style={{ height: 500 }} />
    </div>

}

export default App
