/**
 * Full-screen textured quad shader
 */
import glsl from 'glslify'

const PlainCopyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 },
		'uTime': { value: 0.0 },
		'uWidth': { value: 0.0 },
		'uHeight': { value: 0.0 },


	},

	vertexShader: /* glsl */`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: /* glsl */`
		uniform float opacity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		uniform float uTime;
		uniform float uWidth;
		uniform float uHeight;


		// 16x acceleration of https://www.shadertoy.com/view/4tSyzy
// by applying gaussian at intermediate MIPmap level.

		const int samples = 100,
		LOD = 1,         // gaussian done on MIPmap at scale LOD
		sLOD = 3 << LOD; // tile size = 2^LOD
const float sigma = float(samples) * .3;

float gaussian(vec2 i) {
  return exp( -.5* dot(i/=sigma,i) ) / ( 6.28 * sigma*sigma );
}

vec4 blur(sampler2D sp, vec2 U, vec2 scale) {
  vec4 O = vec4(0);  
  int s = samples/sLOD;
  
  for ( int i = 0; i < s*s; i++ ) {
	  vec2 d = vec2(i%s, i/s)*float(sLOD) - float(samples)/2.;
	  O += gaussian(d) * textureLod( sp, U + scale * d , float(LOD) );
  }
  
  return O / O.a;
}




		void main() {
			vec4 col2 = blur( tDiffuse,vUv,.5/vec2(uWidth,uHeight) );
			vec4 col = texture2D(tDiffuse, vUv);
			vec2 uv = vUv;
			float time = uTime;

			vec4 coloration = (sin(col * smoothstep(.01,.9,col) * 70. + time))+1.32;

			col *= coloration;
			col2 *= coloration;

			col = mix(col,col2,20.8 * sin(time));


			col *= smoothstep(-.8,.32,col);

			col = smoothstep(vec4(0.32),vec4(3.3),col);


			col *=1.5;

			


			// col -= smoothstep(0.2,.9,1.-col.x)*.01;

			col = pow(col,vec4(.09));
			gl_FragColor = col;
			gl_FragColor.a *= opacity;
		}`

};

export { PlainCopyShader };