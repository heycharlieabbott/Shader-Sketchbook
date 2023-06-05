/**
 * Full-screen textured quad shader
 */
import glsl from 'glslify'

const PlainCopyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 },
		'uTime': {value: 0.}
	},

	vertexShader: glsl`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

	fragmentShader: glsl`
		uniform float opacity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		void main() {
			vec2 uv = vUv;

			float cirmask = length(uv - 0.5);


			vec4 col = texture2D( tDiffuse, vUv );

			//col = sqrt(col);

			// col *= smoothstep(vec4(.0),vec4(.1),col);
			col *= 2.;

			col = pow(col,vec4(1.));
			col = clamp(vec4(0.),vec4(1.),col);
			gl_FragColor = col;
			
		}`

};

export { PlainCopyShader };