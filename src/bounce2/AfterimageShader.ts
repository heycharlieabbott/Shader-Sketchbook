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
     
 
     vec4 when_gt( vec4 x, float y ) {
 
     return max( sign( x + y ), 0.0 );
 
     }
 
    void main() {
 
    vec4 texelOld = texture2D( tOld, vUv );
    vec4 texelNew = texture2D( tNew, vUv );
    vec4 de = texture2D( d, vUv );
    texelOld *= damp;
    vec3 depth = vec3(de.r/4.);
 
    vec4 c = max(sin(texelNew*10.), texelOld);
    c += sin(vUv.y*100. / texelNew.y);
    c.rgb = mix(vec3(c.r + c.g + c.b)/vec3(3.),c.rgb, vec3(sin(time/3.)));
    vec3 depc = mix(texelNew.rgb,c.rgb,vec3(sin(1.-depth*2.8)));
    vec3 minus = gl_FragColor.rgb - mix(texelNew.rgb,vec3(.9),vec3(sin(1.-depth*20.8)));
    gl_FragColor.rgb = mix(depc,minus,vec3(sin(time)+0.1)*depth);
    gl_FragColor.rgb = vec3(sin(time),0.,0.);
    gl_FragColor.a = 1.;

    // gl_FragColor = texelNew + texelOld;

     }`
 }