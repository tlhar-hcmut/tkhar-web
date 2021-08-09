import { Button, Modal } from 'antd';
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
      <div className="header" style={{
        marginBottom: 50
      }}>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Trocchi",
            color: "#7c795d",
            fontSize: "50px",
            fontWeight: 400
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

      <UploadVideoDemo />

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
            rel="noreferrer"
          >
            {"  "} video_actions.
          </a>
        </p>
      </Modal>
    </>
  );

}

export default App
