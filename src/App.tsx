import * as React from "react";
import './App.css'
import { Canvas } from "@react-three/fiber";
import {useState } from "react";
import Recorder from './Recorder.jsx';
import { button, folder, Leva, useControls } from 'leva'
import {EffectChain} from './Chain4Header/EffectChain.tsx'

function App() {

  const [FF, setFF] = useState(true)
  const [captureStarted, setCaptureStarted] = useState(false)
  const [screenShot, setScreenshot] = useState(false)

  // const opts = useControls(
  //   {
  //     CaptureVideo: folder({
  //       [captureStarted ? 'Stop' : 'Start']: button(() => {
  //         setCaptureStarted((s) => !s)
  //       }),
  //     }),
  //   },
  //   [captureStarted],
  // )

  // useControls({
  //   screenshot: button(() => setScreenshot((s) => !s)),
  // })

  return (
    <>
     <Canvas gl={{ preserveDrawingBuffer: true }}>
      <EffectChain/>
      <Recorder cap={captureStarted} endTime={70} screenshot={screenShot}/>
    </Canvas>
    </>
  )
}

export default App
