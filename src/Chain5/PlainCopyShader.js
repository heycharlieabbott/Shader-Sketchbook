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
		uniform float uTime;
		void main() {
			vec4 col = texture2D( tDiffuse, vUv );
			vec2 uv = vUv;
			float time = uTime;


			col *= (sin(col * smoothstep(.01,.9,col) * 50. + time))+1.32;

			col *= smoothstep(-.8,.32,col);

			col = smoothstep(vec4(0.32),vec4(2.3),col);

			col *=1.5;


			// col -= smoothstep(0.2,.9,1.-col.x)*.01;

			gl_FragColor = pow(col,vec4(.09));
			gl_FragColor.a *= opacity;
		}`

};

export { PlainCopyShader };