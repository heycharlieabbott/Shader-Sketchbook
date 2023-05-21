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
		LOD = 2,         // gaussian done on MIPmap at scale LOD
		sLOD = 2 << LOD; // tile size = 2^LOD
const float sigma = float(samples) * .25;

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

			col = mix(col2,col,length(uv-0.5)*3.);

			vec4 monocol = (col.x + col.y + col.z + col.w) / vec4(4.);

			monocol = smoothstep(0.4,.6,monocol);

			col = mix(col,monocol, (sin(time)+1.)*.5 * (length(uv - 0.5)*2.));
			// col -= smoothstep(0.9,.5,length(uv - 0.5))*0.02;

			col = pow(col,vec4(.8));

			col *= 1.5;

			//col = clamp(vec4(0.),vec4(1.),col);
			gl_FragColor = col;
			gl_FragColor.a *= opacity;
		}`

};

export { PlainCopyShader };