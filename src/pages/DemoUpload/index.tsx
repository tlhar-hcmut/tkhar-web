import { UploadOutlined } from '@ant-design/icons';
import MPose, { InputImage } from '@mediapipe/pose';
import { Button, Col, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';


const App: React.FC = () => {
    const [video, setVideo] = useState<HTMLVideoElement | null>();
    const [videoFile, setVideoFile] = useState<File>();

    useEffect(() => {
        const path = "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.1624666670/"
        const pose: MPose.Pose = new MPose.Pose({ locateFile: (file) => `${path}/${file}` })

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        })

        pose.onResults((results) => {
            console.log(results)
        })

        if (video) pose.send({ image: video as InputImage })
    })
    return <Row>
        <Col span={8}>
            <Upload
                maxCount={1}
                customRequest={({ file, onSuccess }) => {
                    setVideoFile((file as File));
                    if (onSuccess) onSuccess("ok", new XMLHttpRequest());
                }}
                onRemove={() => setVideoFile(undefined)}
            >
                Add video at here, and see your result <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </Col>
        <Col span={8}>
            {videoFile ? <video ref={setVideo} width="400" controls><source src={URL.createObjectURL(videoFile)} /></video> : <></>}
        </Col>
        <Col span={8}>
            <p>Skeleton will show here!</p>
        </Col >
    </Row >
}

export default App