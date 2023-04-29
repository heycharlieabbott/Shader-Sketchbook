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

     float random(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}
     
vec4 when_gt( vec4 x, float y ) {
  return max( sign( x - y ), 0.0 );
}
 
mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
              sin(_angle),cos(_angle));
}
    void main() {
 
    vec4 texelOld = texture2D( tOld, vUv );
    vec4 texelNew = texture2D( tNew, vUv );

    float alph = texelNew.w;
    // texelOld *= damp;
 
    gl_FragColor.a = 1.;

    float mask = (smoothstep(alph,0.2,.9));
    

    texelOld *= .1;

    texelOld.xy *= rotate2d(time);

vec4 mixer = (max(texelNew,sin(texelOld*700. * texelNew + time*.1)*.9));

vec4 col = mix(vec4(mask),pow(mixer * (1.-pow(length(vUv - 0.5),.1)),vec4(.7)),1.);
    

gl_FragColor = pow(col,vec4(1.2,1.2,.9,1.));

 

     }`
 }