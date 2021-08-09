import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Row, Spin, Table, Upload } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Action, HarResponse } from 'src/entity/response';

const App: React.FC = () => {
    const [output, setOutput] = useState<HarResponse>();
    const [urlVideo, setUrlVideo] = useState<string>();
    const [predict, setPredict] = useState<boolean>(false);

    return (
      <Row>
        <Col span={12}>
          <Upload
            maxCount={1}
            customRequest={({ file, onSuccess }) => {
              setUrlVideo(undefined);
              setOutput(undefined);

              setUrlVideo(URL.createObjectURL(file as File));
              const formData = new FormData();
              formData.append("filename", "fucku");
              formData.append("file", file);
              setPredict(true);
              axios
                .post("http://20.205.205.211:8000/video", formData)
                .then((res) => {
                  setPredict(false);
                  setOutput(res.data);
                  console.info(res);
                })
                .catch((err) => console.error(err));
              if (onSuccess) onSuccess("ok", new XMLHttpRequest());
            }}
            onRemove={() => {
              setUrlVideo(undefined);
              setOutput(undefined);
            }}
          >
            <span style={{ fontSize: "20px", padding: "10px" }}>
              Add video at here, and see your result
            </span>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {urlVideo ? (
            <video width="500" controls>
              <source src={urlVideo} />
            </video>
          ) : (
            <></>
          )}
        </Col>
        <Col span={12}>
          <Spin
            style={{ display: predict ? "block" : "none", fontSize:"30px"}}
            tip="Predicting...."
          />
          <Table
            style={{ display: predict ? "none" : "block" }}
            pagination={{ pageSize: 12 }}
            dataSource={output?.data}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                key: "id",
              },
              {
                title: "Action",
                dataIndex: "action",
                key: "action",
              },
              {
                title: "Confidence (%)",
                dataIndex: "confidence",
                key: "confidence",
                sorter: (a: Action, b: Action) => a.confidence - b.confidence,
                defaultSortOrder: "descend",
              },
            ]}
          />
        </Col>
      </Row>
    );
}

export default App