import { Collapse } from 'antd';
import React, { useEffect } from 'react';
import MediaPipeDemo from "src/MediaPipeDemo";

const App: React.FC = () => {

  useEffect(() => {
    document.title = "TK HAR"
  }, []);

  return <>
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header="Mediapipe Demo" key="1">
        <MediaPipeDemo />
      </Collapse.Panel>
      <Collapse.Panel header="Upload Demo" key="2">
        <p>ahaha</p>
      </Collapse.Panel>
      <Collapse.Panel header="Webcam Demo" key="3">
        <p>ahaha</p>
      </Collapse.Panel>
    </Collapse>
  </>

}

export default App
