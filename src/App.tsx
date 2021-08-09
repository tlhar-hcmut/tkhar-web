import { Button, Collapse, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
// import MediaPipeDemo from "src/pages/DemoMediaPipe";
// import UploadSkeletonDemo from "src/pages/DemoUploadSkeleton";
import UploadVideoDemo from "src/pages/DemoUploadVideo";

const App: React.FC = () => {

  useEffect(() => {
    document.title = "TK HAR"
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleAbout = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="header">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Trocchi",
            color: "#7c795d",
            fontSize: "50px",
            fontWeight: 400,
          }}
        >
          Human Action Recognition Application
        </h1>
        <div className="header-right">
          <Button className="active" href="">
            Home
          </Button>
          <Button onClick={handleAbout}>About</Button>
        </div>
      </div>

      <Collapse defaultActiveKey="3">
        {/* <Collapse.Panel header="Mediapipe Demo" key="1" style={{fontSize:"15px"}}>
        <MediaPipeDemo />
      </Collapse.Panel>
      <Collapse.Panel header="Upload Skeleton Demo" key="2" style={{fontSize:"15px"}}>
        <UploadSkeletonDemo />
      </Collapse.Panel> */}
        <Collapse.Panel
          header="Upload Video Demo"
          key="3"
          style={{ fontSize: "20px" }}
        >
          <UploadVideoDemo />
        </Collapse.Panel>
      </Collapse>

      {/* Modal */}
      <Modal
        title="About HAR application"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <p>Author: Tran Huu Thuc, Do Dang Khoi.</p>
        <p>
          Desciptions: This is a demonstration of our thesis topic{" "}
          <b>Action recognition in video using machine learning</b>. In this
          website, you can upload video and our model will predict action
          performed in video.
        </p>
        <p>
          Data: You can download videos on link (these videos are made ourselves):
          <a
            href="https://drive.google.com/drive/folders/1BRrJaN3NcO5ujfmO5AuRqjBYHyrQbw9c?usp=sharing"
            target="_blank"
          >
            {"  "} video_actions.
          </a>
        </p>
      </Modal>
    </>
  );

}

export default App
