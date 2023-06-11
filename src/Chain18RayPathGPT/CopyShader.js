/**
 * Full-screen textured quad shader
 */
import glsl from 'glslify'

const CopyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 },
		'uTime': { value: 0.0 },
		'resX': {value: 0.0},
		'resY': {value: 0.0}


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
		uniform float resX;
		uniform float resY;

		float random(vec2 co)
		{
			highp float a = 12.9898;
			highp float b = 78.233;
			highp float c = 43758.5453;
			highp float dt= dot(co.xy ,vec2(a,b));
			highp float sn= mod(dt,3.14);
			return fract(sin(sn) * c);
		}

		mat3 calcLookAtMatrix(vec3 origin, vec3 target, float roll) {
			vec3 rr = vec3(sin(roll), cos(roll), 0.0);
			vec3 ww = normalize(target - origin);
			vec3 uu = normalize(cross(ww, rr));
			vec3 vv = normalize(cross(uu, ww));
		  
			return mat3(uu, vv, ww);
		  }


		//   vec2 RayMarch(vec3 ro, vec3 rd, float time) {
		// 	float dO=0.;
		// 	vec2 dS;
			
		// 	for(int i=0; i<MAX_STEPS; i++) {
		// 		vec3 p = ro + rd*dO;
		// 		dS = GetDist(p, time);
		// 		dO += dS.x;
		// 		if(dO>MAX_DIST || dS.x<SURF_DIST) break;
		// 	}
			
		// 	return vec2(dO,dS.y);
		// }

		mat2 rotate2d(float _angle){
			return mat2(cos(_angle),-sin(_angle),
						sin(_angle),cos(_angle));
		}




/////////////////////// GPT STUFF
const int MAX_ITERATIONS = 200;
const float EPSILON = 0.000001;
const float MAX_DISTANCE = 100.0;

// Distance function for the scene
float sceneDistance(vec3 p)
{
    // Define your scene geometry here
    // For example, a sphere of radius 1 centered at the origin:
	vec3 s1c = vec3(0.011,1.,0.01);
	float s1 = length(p - s1c) - 1.;

	vec3 s2c = vec3(1,.5,0.);
	float s2 = length(p - s2c) - .4;

	float g = (p.y);


    return min(min(s1,g),s2);
}

// Normal estimation using finite differences
vec3 estimateNormal(vec3 position)
{
    const vec3 offset = vec3(0.001, 0.0, 0.0);
    float x = sceneDistance(position + offset.xyy);
    float y = sceneDistance(position + offset.yxy);
    float z = sceneDistance(position + offset.yyx);
    return normalize(vec3(x, y, z) - sceneDistance(position));
}

// Path tracing for lighting and colors
vec3 pathTrace(vec3 origin, vec3 direction, vec2 uv, float time)
{
    vec3 accumulatedColor = vec3(0.0);
    vec3 attenuation = vec3(1.2);
	vec3 normal;

	//additions
	float dO=0.;
	vec2 dS;

    for (int i = 0; i < MAX_ITERATIONS; i++) {
       
		
		
		vec3 position = origin + direction * dO;
        float d = sceneDistance(position);
		dO += d;

				// 		vec3 p = ro + rd*dO;
		// 		dS = GetDist(p, time);
		// 		dO += dS.x;
 		if(dO>MAX_DISTANCE) break;

        
        if (d <= EPSILON) {
            // Object hit, perform lighting calculation here
            normal = estimateNormal(position);
            vec3 lightPosition = vec3(10.0, 10.0, 1.0);
            vec3 lightDirection = normalize(lightPosition - position);
            float lightDistance = length(lightPosition - position);

            // Simplified Lambertian lighting
            float diffuse = max(0.0, dot(normal, lightDirection));
            vec3 lightIntensity = vec3(1.0) / (lightDistance * lightDistance);
            vec3 color = vec3(sin(position * 1. + normal)); // Object color
            vec3 lightColor = vec3(1.0); // Light color

            accumulatedColor += attenuation * diffuse * color * lightColor * lightIntensity;

            // Terminate path tracing based on probability
            float terminateProbability = .9;
            if (random(vec2(position.xz)) < terminateProbability) {
				for (int bounce = 0; bounce < 20; bounce++){
					vec3 reflectionDirection = normalize(reflect(direction , normal * random(position.xy * rotate2d(float(bounce))) ));
				     accumulatedColor += attenuation * sceneDistance(position + EPSILON * reflectionDirection);
				}
                break;
            }

		

			// if (bounce > 0 && random(vec2(position.xz)) > terminateProbability) {
            //     vec3 reflectionDirection = normalize(reflect(direction, normal));
            //     accumulatedColor += attenuation * pathTrace(position + EPSILON * reflectionDirection,
            //                                                reflectionDirection);
            // }
            // break;
        }
        
        // Update ray origin and attenuation for the next bounce
        //origin = position;
        attenuation *= 1.1; // Attenuation factor
    }
    
    return accumulatedColor;
}






		void main() {

			vec2 uv = vUv - 0.5;

			//vec2 uv = (gl_FragCoord.xy - 0.5 * vec2(resX,resY)) / min(resX,resY);
			float time = uTime;
			
			vec3 rayOrigin = vec3(sin(time), cos(time)+2., -5.);

			vec3 target = vec3(0.,0.,0.);

			 mat3 L = calcLookAtMatrix(rayOrigin, target, 0.);

			vec3 rayDirection = normalize(L * vec3(uv, 1.));
			
			vec3 color = pathTrace(rayOrigin, rayDirection, uv, time);
			gl_FragColor = vec4(color, 1.0);
			
		}`

};

export { CopyShader };