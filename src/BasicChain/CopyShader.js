/**
 * Full-screen textured quad shader
 */
import glsl from 'glslify'

const CopyShader = {

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
		uniform float uTime;
		void main() {

			vec3 col = vec3(abs(sin(uTime)));
			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.xyz = col;
			gl_FragColor.a *= opacity;
		}`

};

export { CopyShader };