/**
 * Afterimage shader
 * I created this effect inspired by a demo on codepen:
 * https://codepen.io/brunoimbrizi/pen/MoRJaN?page=1&
 */

 import type { IUniform, Texture } from 'three'
 import type { IShader } from 'three-stdlib/shaders/types'
 import glsl from 'glslify'
 
 export type AfterimageShaderUniforms = {
   damp: IUniform<number>
   tNew: IUniform<Texture | null>
   tOld: IUniform<Texture | null>
   d: IUniform<Texture | null>
   time: IUniform<number>
 }
 
 export interface IAfterimageShader extends IShader<AfterimageShaderUniforms> {}
 
 export const AfterimageShader: IAfterimageShader = {
   uniforms: {
     damp: { value: 0.96 },
     time: {value: 0},
     tOld: { value: null },
     tNew: { value: null },
     d: { value: null },
     
   },
 
   
   vertexShader: glsl`
    
     varying vec2 vUv;
 
     void main() {
 
     vUv = uv;
     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
     

     }`
   ,
 
   fragmentShader: glsl`
    
     uniform float damp;
     uniform float time;
 
      uniform sampler2D tOld;
     uniform sampler2D tNew;
     uniform sampler2D d;

 
     varying vec2 vUv;
     

 
    void main() {
 
    vec4 texelOld = texture2D( tOld, vUv );
    vec4 texelNew = texture2D( tNew, vUv );
    vec4 de = texture2D( d, vUv );
    texelOld *= damp;
 
    gl_FragColor.a = 1.;

    gl_FragColor = texelNew;

     }`
 }