import React, { useEffect } from 'react';
import MediaPipeDemo from "src/MediaPipeDemo";

const App: React.FC = () => {

  useEffect(() => {
    document.title = "TK HAR"
  }, []);

  return <>
    <MediaPipeDemo />
  </>

}

export default App
