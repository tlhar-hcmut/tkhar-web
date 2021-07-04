import MCamera from "@mediapipe/camera_utils";
import MPose from "@mediapipe/pose";
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as skeleton from "src/util/skeleton";

const App: React.FC = () => {
    const [webcam, setWebcam] = useState<Webcam | null>()
    const refCanvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!webcam?.video) return;
        const video = webcam.video as HTMLVideoElement;
        const pose: MPose.Pose = skeleton.initModelPose()
        pose.onResults((results) => { skeleton.drawSkeleton(refCanvas?.current, results) })
        new MCamera.Camera(video, { onFrame: async () => await pose.send({ image: video }) }).start()
    })

    return <div style={{ textAlign: 'center' }}>
        <Webcam ref={setWebcam} hidden={true} />
        {webcam?.video ? <canvas ref={refCanvas} style={{ height: 500 }} /> : <></>}
    </div>

}

export default App
