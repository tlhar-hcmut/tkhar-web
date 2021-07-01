import React from 'react';
import MPose from '@mediapipe/pose';
import './App.css';

const App: React.FC = () => {
  const pose: MPose.Pose = new MPose.Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.4.1624666670/${file}`
  });

  console.log(pose)
  return (
    <p>Hi</p>
  );
}

export default App;
