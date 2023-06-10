/**
 * Full-screen textured quad shader
 */
import glsl from 'glslify'

const PlainCopyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 },
		'uTime': { value: 0.0 },
		'resX': {value : 0.0},
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

		vec4 when_gt( vec4 x, float y ) {
			return max( sign( x - y ), 0.0 );
		  }
		   
		  
		  
		  vec3 mod289(vec3 x) {
			return x - floor(x * (1.0 / 289.0)) * 289.0;
		  }
		  
		  vec4 mod289(vec4 x) {
			return x - floor(x * (1.0 / 289.0)) * 289.0;
		  }
		  
		  vec4 permute(vec4 x) {
			   return mod289(((x*34.0)+1.0)*x);
		  }
		  
		  vec4 taylorInvSqrt(vec4 r)
		  {
			return 1.79284291400159 - 0.85373472095314 * r;
		  }
		  
		  float snoise3(vec3 v)
			{
			const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
			const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
		  
		  // First corner
			vec3 i  = floor(v + dot(v, C.yyy) );
			vec3 x0 =   v - i + dot(i, C.xxx) ;
		  
		  // Other corners
			vec3 g = step(x0.yzx, x0.xyz);
			vec3 l = 1.0 - g;
			vec3 i1 = min( g.xyz, l.zxy );
			vec3 i2 = max( g.xyz, l.zxy );
		  
			//   x0 = x0 - 0.0 + 0.0 * C.xxx;
			//   x1 = x0 - i1  + 1.0 * C.xxx;
			//   x2 = x0 - i2  + 2.0 * C.xxx;
			//   x3 = x0 - 1.0 + 3.0 * C.xxx;
			vec3 x1 = x0 - i1 + C.xxx;
			vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
			vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
		  
		  // Permutations
			i = mod289(i);
			vec4 p = permute( permute( permute(
					   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
					 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
					 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
		  
		  // Gradients: 7x7 points over a square, mapped onto an octahedron.
		  // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
			float n_ = 0.142857142857; // 1.0/7.0
			vec3  ns = n_ * D.wyz - D.xzx;
		  
			vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
		  
			vec4 x_ = floor(j * ns.z);
			vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
		  
			vec4 x = x_ *ns.x + ns.yyyy;
			vec4 y = y_ *ns.x + ns.yyyy;
			vec4 h = 1.0 - abs(x) - abs(y);
		  
			vec4 b0 = vec4( x.xy, y.xy );
			vec4 b1 = vec4( x.zw, y.zw );
		  
			//vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
			//vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
			vec4 s0 = floor(b0)*2.0 + 1.0;
			vec4 s1 = floor(b1)*2.0 + 1.0;
			vec4 sh = -step(h, vec4(0.0));
		  
			vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
			vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
		  
			vec3 p0 = vec3(a0.xy,h.x);
			vec3 p1 = vec3(a0.zw,h.y);
			vec3 p2 = vec3(a1.xy,h.z);
			vec3 p3 = vec3(a1.zw,h.w);
		  
		  //Normalise gradients
			vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
			p0 *= norm.x;
			p1 *= norm.y;
			p2 *= norm.z;
			p3 *= norm.w;
		  
		  // Mix final noise value
			vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
			m = m * m;
			return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
										  dot(p2,x2), dot(p3,x3) ) );
			}
		  
		  vec3 fade(vec3 t) {
			return t*t*t*(t*(t*6.0-15.0)+10.0);
		  }
		  
		  // Classic Perlin noise, periodic variant
		  float pnoise3(vec3 P, vec3 rep)
		  {
			vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
			vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
			Pi0 = mod289(Pi0);
			Pi1 = mod289(Pi1);
			vec3 Pf0 = fract(P); // Fractional part for interpolation
			vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
			vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
			vec4 iy = vec4(Pi0.yy, Pi1.yy);
			vec4 iz0 = Pi0.zzzz;
			vec4 iz1 = Pi1.zzzz;
		  
			vec4 ixy = permute(permute(ix) + iy);
			vec4 ixy0 = permute(ixy + iz0);
			vec4 ixy1 = permute(ixy + iz1);
		  
			vec4 gx0 = ixy0 * (1.0 / 7.0);
			vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
			gx0 = fract(gx0);
			vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
			vec4 sz0 = step(gz0, vec4(0.0));
			gx0 -= sz0 * (step(0.0, gx0) - 0.5);
			gy0 -= sz0 * (step(0.0, gy0) - 0.5);
		  
			vec4 gx1 = ixy1 * (1.0 / 7.0);
			vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
			gx1 = fract(gx1);
			vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
			vec4 sz1 = step(gz1, vec4(0.0));
			gx1 -= sz1 * (step(0.0, gx1) - 0.5);
			gy1 -= sz1 * (step(0.0, gy1) - 0.5);
		  
			vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
			vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
			vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
			vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
			vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
			vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
			vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
			vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
		  
			vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
			g000 *= norm0.x;
			g010 *= norm0.y;
			g100 *= norm0.z;
			g110 *= norm0.w;
			vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
			g001 *= norm1.x;
			g011 *= norm1.y;
			g101 *= norm1.z;
			g111 *= norm1.w;
		  
			float n000 = dot(g000, Pf0);
			float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
			float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
			float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
			float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
			float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
			float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
			float n111 = dot(g111, Pf1);
		  
			vec3 fade_xyz = fade(Pf0);
			vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
			vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
			float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
			return 2.2 * n_xyz;
		  }
		  
		  vec2 fade2(vec2 t) {
			return t*t*t*(t*(t*6.0-15.0)+10.0);
		  }
		  
		  float cnoise2(vec2 P)
		  {
			vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
			vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
			Pi = mod289(Pi); // To avoid truncation effects in permutation
			vec4 ix = Pi.xzxz;
			vec4 iy = Pi.yyww;
			vec4 fx = Pf.xzxz;
			vec4 fy = Pf.yyww;
		  
			vec4 i = permute(permute(ix) + iy);
		  
			vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
			vec4 gy = abs(gx) - 0.5 ;
			vec4 tx = floor(gx + 0.5);
			gx = gx - tx;
		  
			vec2 g00 = vec2(gx.x,gy.x);
			vec2 g10 = vec2(gx.y,gy.y);
			vec2 g01 = vec2(gx.z,gy.z);
			vec2 g11 = vec2(gx.w,gy.w);
		  
			vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
			g00 *= norm.x;
			g01 *= norm.y;
			g10 *= norm.z;
			g11 *= norm.w;
		  
			float n00 = dot(g00, vec2(fx.x, fy.x));
			float n10 = dot(g10, vec2(fx.y, fy.y));
			float n01 = dot(g01, vec2(fx.z, fy.z));
			float n11 = dot(g11, vec2(fx.w, fy.w));
		  
			vec2 fade_xy = fade2(Pf.xy);
			vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
			float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
			return 2.3 * n_xy;
		  }
		  
		  mat2 rotate2d(float _angle){
			  return mat2(cos(_angle),-sin(_angle),
						  sin(_angle),cos(_angle));
		  }
		  
		  mat2 scale(vec2 _scale){
			  return mat2(_scale.x,0.0,
						  0.0,_scale.y);
		  }
		  
		  float random(vec2 co)
		  {
			  highp float a = 12.9898;
			  highp float b = 78.233;
			  highp float c = 43758.5453;
			  highp float dt= dot(co.xy ,vec2(a,b));
			  highp float sn= mod(dt,3.14);
			  return fract(sin(sn) * c);
		  }
		  
		  vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
		  {
			  return a + b*cos( 6.28318*(c*t+d) );
		  }
		  
		  
		  float sdBox( in vec2 p, in vec2 b )
		  {
			  vec2 d = abs(p)-b;
			  return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
		  }
		  
		  float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r )
		  {
			  r.xy = (p.x>0.0)?r.xy : r.zw;
			  r.x  = (p.y>0.0)?r.x  : r.y;
			  vec2 q = abs(p)-b+r.x;
			  return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
		  }
		  
		  
		  float noise (in vec2 st) {
			vec2 i = floor(st);
			vec2 f = fract(st);
		  
			// Four corners in 2D of a tile
			float a = random(i);
			float b = random(i + vec2(1.0, 0.0));
			float c = random(i + vec2(0.0, 1.0));
			float d = random(i + vec2(1.0, 1.0));
		  
			vec2 u = f * f * (3.0 - 2.0 * f);
		  
			return mix(a, b, u.x) +
					(c - a)* u.y * (1.0 - u.x) +
					(d - b) * u.x * u.y;
		  }
		  
		  #define OCTAVES 10
		  float fbm (in vec2 st) {
			// Initial values
			float value = 0.0;
			float amplitude = .5;
			float frequency = 0.;
			//
			// Loop of octaves
			for (int i = 0; i < OCTAVES; i++) {
				value += amplitude * noise(st);
				st *= 2.;
				amplitude *= .1;
			}
			return value;
		  }


		  vec4 blur(sampler2D img, vec2 uv, vec2 res, float time ){
			vec4 colX = vec4(0.);
			vec4 colY = vec4(0.);
			vec4 col = vec4(0.);
			vec4 bcol = vec4(0.);

	
			
			

			for (int x = -5; x < 5; x++ ){
				//colX = texelFetch(img, ivec2(uv) + ivec2(x,0), 0);
				for (int y = -5; y < 5; y++){

					vec2 mods = mod(vec2(uv.x, uv.y),vec2(res.x,res.y));
					bcol = texelFetch(img, ivec2(uv) - ivec2(x,y), 0);
					bcol = texture(img, uv + vec2(float(x) / res.x, float(y) / res.y));
					// if (bcol.x >= 0.){
					// 	colY += bcol * smoothstep(0.1,.7,length(uv -0.5));
					// }
					colY += bcol;
											
				}
				
			}

			col = colY / 32.;

			return col;
		  }
	

		  vec2 random2( vec2 p ) {
			return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
		}



		void main() {
			float time = uTime;

			float SIZE = 1.;

			vec2 uv = vUv;
			vec4 col = (texture2D( tDiffuse, uv / SIZE));

			vec4 uncol = (texture2D( tDiffuse, uv / SIZE));


			vec4 b = blur(tDiffuse, uv * SIZE, vec2(resX,resY), time);

			vec2 gv = fract(uv * SIZE) - 0.5;
			vec2 gvid = floor(uv * SIZE) - 0.5;


			col *= 1.;
			// col *= smoothstep(0.8,1.,col);


			col += b*.3;
			
			col = pow(col,vec4(1.));
			col = clamp(vec4(0.),vec4(1.),col);
			
			gl_FragColor = vec4(col);
		
		}`

};

export { PlainCopyShader };