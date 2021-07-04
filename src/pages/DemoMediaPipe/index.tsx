import React, { useState } from 'react'
import Webcam from 'react-webcam'
import SkeletonVideo from 'src/components/SkeletonVideo'

const App: React.FC = () => {
    const [webcam, setWebcam] = useState<Webcam | null>()
    return <div style={{ textAlign: 'center' }}>
        <Webcam ref={setWebcam} hidden={true} />
        <SkeletonVideo video={webcam?.video}></SkeletonVideo>
    </div>

}

export default App
