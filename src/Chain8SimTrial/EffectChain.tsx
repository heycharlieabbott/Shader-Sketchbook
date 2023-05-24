import * as React from "react";
import { useRef } from "react";
import { Effects, useDepthBuffer } from "@react-three/drei";
import { extend, useThree, useFrame,  } from "@react-three/fiber";

//Shaders and Passes
import { AfterimagePass } from "./AfterimagePass";
import { ShaderPass } from './ShaderPass.js';
import {CopyShader} from './CopyShader.js'
import {PlainCopyShader} from './PlainCopyShader.js'

const EffectChain = () =>{
 
  extend({ AfterimagePass, ShaderPass })

  const frameCount = useRef(0);

  useFrame(({ clock }, delta) => {
    frameCount.current += 1;    
    airef.current.uniforms.framecount.value = frameCount.current;
    airef.current.uniforms.time.value = clock.elapsedTime;
    shref.current.uniforms.uTime.value = clock.elapsedTime;
    shref.current.uniforms.framecount.value = frameCount.current;
    ccref.current.uniforms.uTime.value = clock.elapsedTime;

  });

  
const {scene, camera} = useThree();
const airef = useRef();
const shref = useRef();
const ccref = useRef();

const depthBuffer = useDepthBuffer({
  frames: 1, // How many frames it renders, Infinity by default
});


  return (
    <>
      <Effects>
      <shaderPass args={[CopyShader]} ref={shref}/>
      <afterimagePass args={[-100.1, 0, depthBuffer]} ref={airef} />
      <shaderPass args={[PlainCopyShader]} ref={ccref}/>
      </Effects>
     
      </>
  )
}




export { EffectChain };