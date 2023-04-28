import * as React from "react";
import './App.css'
import { Canvas } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { BoxGeometry } from "three";
import { AfterimagePass } from "./bounce2/AfterimagePass";
import { extend } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { useDepthBuffer } from "@react-three/drei";
import Recorder from './Recorder.jsx';
import { button, folder, Leva, useControls } from 'leva'
import { ShaderPass } from './bounce2/ShaderPass.js';
import {CopyShader} from './bounce2/CopyShader.js'






const Box = () =>{
  const box = useRef<BoxGeometry>(null);
  extend({ AfterimagePass, ShaderPass })

  useFrame(({ clock }, delta) => {
    
    airef.current.uniforms.time.value = clock.elapsedTime;
    shref.current.uniforms.uTime.value = clock.elapsedTime;

  });

  
const {scene, camera} = useThree();
const airef = useRef();
const shref = useRef();

const depthBuffer = useDepthBuffer({
  frames: 1, // How many frames it renders, Infinity by default
});

  useFrame(() =>{
    box.current?.rotateX(.01);
  })
  return (
    <>
    <mesh rotation={[10, 15, 6]}>
    <boxGeometry args={[2, 2, 2]} ref={box} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
      <Effects>
      <shaderPass args={[CopyShader]} ref={shref}/>
      <afterimagePass args={[-100.1, 0, depthBuffer]} ref={airef} />
     

      </Effects>
     
      </>
  )
}

function App() {

  const [FF, setFF] = useState(true)
  const [captureStarted, setCaptureStarted] = useState(false)
  const [screenShot, setScreenshot] = useState(false)

  const opts = useControls(
    {
      CaptureVideo: folder({
        [captureStarted ? 'Stop' : 'Start']: button(() => {
          setCaptureStarted((s) => !s)
        }),
      }),
    },
    [captureStarted],
  )

  useControls({
    screenshot: button(() => setScreenshot((s) => !s)),
  })

  return (
    <>
     <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} power={1000} />
      <Box/>
      <Recorder cap={captureStarted} endTime={70} screenshot={screenShot}/>
    </Canvas>
    </>
  )
}

export default App
