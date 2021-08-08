import { Collapse } from 'antd';
import React, { useEffect } from 'react';
// import MediaPipeDemo from "src/pages/DemoMediaPipe";
// import UploadSkeletonDemo from "src/pages/DemoUploadSkeleton";
import UploadVideoDemo from "src/pages/DemoUploadVideo";

const App: React.FC = () => {

  useEffect(() => {
    document.title = "TK HAR"
  }, []);

  return <>
    <Collapse>
      {/* <Collapse.Panel header="Mediapipe Demo" key="1">
        <MediaPipeDemo />
      </Collapse.Panel>
      <Collapse.Panel header="Upload Skeleton Demo" key="2">
        <UploadSkeletonDemo />
      </Collapse.Panel> */}
      <Collapse.Panel header="Upload Video Demo" key="3">
        <UploadVideoDemo />
      </Collapse.Panel>
    </Collapse>
  </>

}

export default App
