import { UploadOutlined } from '@ant-design/icons';
import MPose, { NormalizedLandmarkList } from '@mediapipe/pose';
import { Button, Col, Descriptions, Row, Upload } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HarRes } from 'src/entity/response';

const lsSkeleton: NormalizedLandmarkList[] = []

const App: React.FC = () => {
    const [urlVideo, setUrlVideo] = useState<string>();
    const [refVideo, setRefVideo] = useState<HTMLVideoElement | null>();
    const [output, setOutput] = useState<HarRes>();

    useEffect(() => {
        if (!refVideo) return;

        const path = "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.1624666670/"
        const pose: MPose.Pose = new MPose.Pose({ locateFile: (file) => `${path}/${file}` })

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        })

        pose.onResults((results) => { lsSkeleton.push(results.poseWorldLandmarks) })

        refVideo.addEventListener("play", async () => {
            while (true) {
                if (refVideo.paused || refVideo.ended) {
                    axios.post("http://localhost:8000/har", { data: lsSkeleton })
                        .then((res) => setOutput(res.data["data"]))
                        .catch((err) => console.error(err))
                    lsSkeleton.length = 0
                    break
                };
                pose.send({ image: refVideo })
                await new Promise(r => setTimeout(r, 1000));
            }

        }, false)

    }, [refVideo])
    return <Row>
        <Col span={8}>
            <Upload
                maxCount={1}
                customRequest={({ file, onSuccess }) => {
                    setUrlVideo(URL.createObjectURL(file as File));
                    if (onSuccess) onSuccess("ok", new XMLHttpRequest());
                }}
                onRemove={() => {
                    setUrlVideo(undefined)
                    setOutput(undefined)
                }}
            >
                Add video at here, and see your result <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>

            <Descriptions title="Output" bordered={true} column={1}>
                <Descriptions.Item label="Action ID">{output?.idAction}</Descriptions.Item>
                <Descriptions.Item label="Action Name">{output?.nameAction}</Descriptions.Item>
                <Descriptions.Item label="Model Version">{output?.version}</Descriptions.Item>
            </Descriptions>
        </Col>
        <Col span={8}>
            {urlVideo ? <video ref={setRefVideo} width="400" controls><source src={urlVideo} /></video> : <></>}
        </Col>
        <Col span={8}>
            
        </Col >
    </Row >
}

export default App