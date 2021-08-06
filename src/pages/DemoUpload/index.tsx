import { UploadOutlined } from '@ant-design/icons';
import MPose, { NormalizedLandmarkList } from '@mediapipe/pose';
import { Button, Col, Row, Table, Upload } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Action } from 'src/entity/response';
import * as skeleton from "src/util/skeleton";

const lsSkeleton: NormalizedLandmarkList[] = []

const App: React.FC = () => {
    const [output, setOutput] = useState<Action[]>();
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
                    axios.post("http://20.205.205.211:8000/har", { data: lsSkeleton })
                        .then((res) => setOutput(res.data))
                        .catch((err) => console.error(err))
                    lsSkeleton.length = 0
                    break
                };
                pose.send({ image: refVideo })
                await new Promise(r => setTimeout(r, 100));
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

            <Table pagination={{ pageSize: 12 }} dataSource={output} columns={[
                {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                },
                {
                    title: 'Confidence (%)',
                    dataIndex: 'confidence',
                    key: 'confidence',
                    sorter: (a: Action, b: Action) => a.confidence - b.confidence,
                    defaultSortOrder: 'descend',
                },
            ]} />
        </Col>
        <Col span={8}>
            {urlVideo ? <video ref={setRefVideo} width="500" controls><source src={urlVideo} /></video> : <></>}
        </Col>
        <Col span={8}>
            <canvas ref={refCanvas} style={{ width: 555, height: 880 }} />
        </Col >
    </Row >
}

export default App