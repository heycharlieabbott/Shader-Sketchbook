/**
 * Full-screen textured quad shader
 */
import glsl from 'glslify'

const PlainCopyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 },
		'uTime': { value: 0.0 },


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





		
		void main() {
			vec2 uv = vUv;
			vec3 col = texture2D( tDiffuse, vUv ).xyz;

			float cir = smoothstep(0.1,0.2,length(uv-0.5));

			col = pow(col,vec3(2.-cir));
			col *= 1.5 - cir*.2;
			gl_FragColor.xyz = col;
			gl_FragColor.a = 1.;


		}`

};

export { PlainCopyShader };