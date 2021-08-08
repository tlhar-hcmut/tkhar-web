import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table, Upload } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Action, HarResponse } from 'src/entity/response';

const App: React.FC = () => {
    const [output, setOutput] = useState<HarResponse>();
    const [urlVideo, setUrlVideo] = useState<string>();

    return <Row>
        <Col span={12}>
            <Upload
                maxCount={1}
                customRequest={({ file, onSuccess }) => {
                    setUrlVideo(undefined)
                    setOutput(undefined)

                    setUrlVideo(URL.createObjectURL(file as File));
                    const formData = new FormData()
                    formData.append("filename", "fucku")
                    formData.append("file", file)
                    axios.post("http://20.205.205.211:8000/video", formData)
                        .then((res) => {
                            setOutput(res.data)
                            console.info(res);
                        })
                        .catch((err) => console.error(err))
                    if (onSuccess) onSuccess("ok", new XMLHttpRequest());
                }}
                onRemove={() => {
                    setUrlVideo(undefined)
                    setOutput(undefined)
                }}
            >
                Add video at here, and see your result <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {urlVideo ? <video width="500" controls><source src={urlVideo} /></video> : <></>}
        </Col>
        <Col span={12}>
            <Table pagination={{ pageSize: 12 }} dataSource={output?.data} columns={[
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
    </Row >
}

export default App