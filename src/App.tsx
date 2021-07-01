import React from 'react';
import MPose from '@mediapipe/pose';
import MDrawing from '@mediapipe/drawing_utils';
import MCamera from '@mediapipe/camera_utils';
import MControl from '@mediapipe/control_utils';
import './App.css';

const App: React.FC = () => {
  const pose: MPose.Pose = new MPose.Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.1624666670/${file}`
  });
  
  
  return (
    <p>Hi</p>
  );
}

export default App;
