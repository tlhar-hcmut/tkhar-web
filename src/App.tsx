import { Collapse } from 'antd';
import React, { useEffect } from 'react';
import MediaPipeDemo from "src/pages/DemoMediaPipe";
import UploadDemo from "src/pages/DemoUpload";
import WebcamDemo from "src/pages/DemoWebcam";

const App: React.FC = () => {

  useEffect(() => {
    document.title = "TK HAR"
  }, []);

  return <>
    <Collapse>
      <Collapse.Panel header="Mediapipe Demo" key="1">
        <MediaPipeDemo />
      </Collapse.Panel>
      <Collapse.Panel header="Upload Demo" key="2">
        <UploadDemo />
      </Collapse.Panel>
      <Collapse.Panel header="Webcam Demo" key="3">
        <WebcamDemo />
      </Collapse.Panel>
    </Collapse>
  </>

}

export default App
