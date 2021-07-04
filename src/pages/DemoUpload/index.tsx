import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import SkeletonVideo from 'src/components/SkeletonVideo';

const App: React.FC = () => {
    const [video, setVideo] = useState<HTMLVideoElement | null>();
    const [videoFile, setVideoFile] = useState<File>();

    useEffect(() => {
        console.info(video)
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
            <SkeletonVideo video={video}></SkeletonVideo>
        </Col >
    </Row >
}

export default App