// @ts-nocheck

import * as React from "react";
import './App.css'
import { Canvas } from "@react-three/fiber";
import {useState, useEffect } from "react";
import Recorder from './Recorder.jsx';
import { button, folder, Leva, useControls } from 'leva'


import {EffectChain} from './Chain11Sim4/EffectChain.tsx'


import {EffectChain as EffectChain1} from './Chain1/EffectChain.tsx'
import {EffectChain as EffectChain2} from './Chain2/EffectChain.tsx'
import {EffectChain as EffectChain3} from './Chain3v6/EffectChain.tsx'
import {EffectChain as EffectChain4} from './Chain4Header/EffectChain.tsx'
import {EffectChain as EffectChain5} from './Chain5/EffectChain.tsx'
import {EffectChain as EffectChain6} from './Chain6/EffectChain.tsx'
import {EffectChain as EffectChain7} from './Chain7AccumTrial/EffectChain.tsx'
import {EffectChain as EffectChain8} from './Chain8SimTrial/EffectChain.tsx'
import {EffectChain as EffectChain9} from './Chain9Sim2/EffectChain.tsx'
import {EffectChain as EffectChain10} from './Chain10Sim3/EffectChain.tsx'
import {EffectChain as EffectChain11} from './Chain11Sim4/EffectChain.tsx'
import {EffectChain as EffectChain12} from './Chain12Accum2/EffectChain.tsx'
import {EffectChain as EffectChain13} from './Chain13B/EffectChain.tsx'
import {EffectChain as EffectChain14} from './Chain14Sim5/EffectChain.tsx'
import {EffectChain as EffectChain15} from './Chain15Fractal2/EffectChain.tsx'
import {EffectChain as EffectChain16} from './Chain16Sim6/EffectChain.tsx'
import {EffectChain as EffectChain17} from './Chain17RayMarch1/EffectChain.tsx'
import {EffectChain as EffectChain18} from './Chain18RayPathGPT/EffectChain.tsx'
import {EffectChain as EffectChain19} from './Chain19RayPathGPT/EffectChain.tsx'
import {EffectChain as EffectChain20} from './Chain20noises/EffectChain.tsx'


import { Descriptions } from "./Descriptions.tsx";




function App() {

  const [FF, setFF] = useState(true)
  const [captureStarted, setCaptureStarted] = useState(false)
  const [screenShot, setScreenshot] = useState(false)

  const EffectChains = [
    EffectChain1,
    EffectChain2,
    EffectChain3,
    EffectChain4,
    EffectChain5,
    EffectChain6,
    EffectChain7,
    EffectChain8,
    EffectChain9,
    EffectChain10,
    EffectChain11,
    EffectChain12,
    EffectChain13,
    EffectChain14,
    EffectChain15,
    EffectChain16,
    EffectChain17,
    EffectChain18,
    EffectChain19
  ]

  const [chains, setChains] = useState([
    <EffectChain1/>,
    <EffectChain2/>,
    <EffectChain3/>,
    <EffectChain4/>,
    <EffectChain5/>,
    <EffectChain6/>,
    <EffectChain7/>,
    <EffectChain8/>,
    <EffectChain9/>,
    <EffectChain10/>,
    <EffectChain11/>,
    <EffectChain12/>,
    <EffectChain13/>,
    <EffectChain14/>,
    <EffectChain15/>,
    <EffectChain16/>,
    <EffectChain17/>,
    <EffectChain18/>,
    <EffectChain19/>
  ])

  const [description, setDescription] = useState(Object.values(Descriptions)[0])
  
  const [curShader,setCurShader] = useState(<EffectChain20/>)

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

const [titleshader, setTitleShader] = useState(0)

  const handleClick = (i) => {
    setCurShader(chains[i])
    setDescription(Object.values(Descriptions)[i])
    setTitleShader(i)

  }

const [fullscreen, setFullScreen] = useState(true);

  return (
    <>
    
    {/* <div className="titles">
    <div className="shadertitle">SHADER {titleshader + 1}</div>
    <div className="shaderselector">SELECTOR</div>
    </div> */}
    
    <div className={fullscreen ? 'app-full': 'app'}>
      
    <div className={fullscreen ? 'canvas-full': 'canvas'}>
     <Canvas gl={{ preserveDrawingBuffer: true }}>
      {curShader}
      {/* <Recorder cap={captureStarted} endTime={70} screenshot={screenShot}/> */}
    </Canvas>
    </div>
    {/* <div className="interface">
    <ul className="shaderlist">
    {chains.map((t,i) => (
<button key={i} onClick={()=>handleClick(i)}>{i + 1}</button>
))}
    </ul> */}
    </div>
    {/* </div>
    <section className="description">
    <p className="descriptiontext">{description}</p>
    <p className="description2">Shaders created by <a target="_blank" href="https://heycharlieabbott.com">Charlie Abbott</a></p>
    </section> */}
    </>
  )
}

export default App
