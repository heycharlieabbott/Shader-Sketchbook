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
			vec4 col = texture2D( tDiffuse, vUv );
			col = pow(col,vec4(.35));
			col *= 1.1;

			col = clamp(vec4(0.),vec4(1.),col);
			gl_FragColor = col;
			gl_FragColor.a *= opacity;
		}`

};

export { PlainCopyShader };