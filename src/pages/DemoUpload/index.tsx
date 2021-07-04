import { UploadOutlined } from '@ant-design/icons';
import * as skeleton from "src/util/skeleton";
import MPose, { NormalizedLandmarkList } from '@mediapipe/pose';
import { Button, Col, Descriptions, Row, Upload } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { HarRes } from 'src/entity/response';

const lsSkeleton: NormalizedLandmarkList[] = []

const App: React.FC = () => {
    const [output, setOutput] = useState<HarRes>();
    const [urlVideo, setUrlVideo] = useState<string>();
    const [refVideo, setRefVideo] = useState<HTMLVideoElement | null>();
    const refCanvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!refVideo) return;
        const pose: MPose.Pose = skeleton.initModelPose()
        pose.onResults((results) => {
            lsSkeleton.push(results.poseWorldLandmarks)
            skeleton.drawSkeleton(refCanvas?.current, results)
        })
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
            {urlVideo ? <video ref={setRefVideo} width="500" controls><source src={urlVideo} /></video> : <></>}
        </Col>
        <Col span={8}>
            <canvas ref={refCanvas} style={{ width: 555 }} />
        </Col >
    </Row >
}

export default App