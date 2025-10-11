import { getTexUv, map, rand, smoothUnionSDF, zuc } from "./utils";

export const fragmentShaderGrad = /* glsl */ `
  varying vec2 vUv;

  uniform float PI;
  uniform float uTime;
  uniform vec4 uResolution;
  uniform float uColors;
  uniform float uDistortion;
  uniform float uWaves;
  uniform vec3 uTheme;
  uniform vec3 uTheme0;
  uniform vec3 uTheme1;
  uniform vec4 uMode;

  ${getTexUv}
  ${map}
  ${smoothUnionSDF}
  ${rand}
  ${zuc}

  void main() {
    vec3 bgMid = vec3(193.)/255.;
    vec3 bgLight = vec3(236., 236., 233.)/255.;

    // Gradient vignette
    vec2 vignetteCoords = fract(vUv * vec2(1.0, 1.0));
    vignetteCoords = smoothstep(0.5, 0.2, abs(vignetteCoords - 0.5));
    float vignetteAmount = vignetteCoords.x * vignetteCoords.y;
    vignetteAmount = pow(vignetteAmount, 0.5);
    vignetteAmount = map(vignetteAmount, 0.0, 1.0, 0., 1.0);
    float v = 1. - vignetteAmount;
    v = pow(v, 4.);

    // Gradient distortion
    float distort = uDistortion;
    distort *= mix(smoothstep(0., 1., 1.-vUv.y), 1., smoothstep(.5, 1., distort));
    distort = smoothstep(0., .5, distort);

    vec2 p = vUv * 5.;
    vec2 p2 = vUv * 5.;
    float time = uTime * .2;

    for (float i = 0.0; i < 8.; i++) {
      p.x += sin(p.y + i + time * .5);
      p *= mat2(6, -8, 8, 6) / 8.;
      vec2 q = vec2(time, -time / 2.);
      q *= 8. / mat2(6, -8, 8, 6);
      p -= q * .5;

      p2.x += sin(p2.y + i + time * .5 + 0.2);
      p2 *= mat2(6, -8, 8, 6) / 8.;
      vec2 q2 = vec2(time, -time / 2.);
      q2 *= 8. / mat2(6, -8, 8, 6);
      p2 -= q2 * .5;
    }

    vec3 colx = (sin(vec4(p.y, p2.x, p2.xy) * .6) * .5 + .5).xyz;
    float xx = colx.r;
    
    float d = (((pow(1. - vUv.y * 2. + 1., .5))) - (sin(vUv.x * PI * 1.5 - PI * .25)));
    float d_ = (((pow(1. - vUv.y * 2. + 1., .5))) - (sin(vUv.x * PI * 1.)) + sin(vUv.x * 3.5 * PI) * .5 + sin(vUv.x * 8. * PI) * .25 + sin(vUv.x * 15. * PI) * .125);
    d = mix(d, d_, uWaves);
    d = mix(d, xx, distort);
    float d2 = length(vUv - .5)  + .75;
    d = smoothUnionSDF(d, d2, .2);
    d += rand(vUv + d) * .006 * uDistortion;
    float t = mod(time - d, 2.) / 2.;
    t = mix(t, xx, distort);
    float wav = t * mix(290., 100., v) + mix(400., 500., v);
    float b = sin(t * PI + v);

    // Project gradient color
    vec3 colProject = mix(uTheme0, uTheme1, clamp(b, 0., 1.));
    
    // Default gradient color
    vec3 colGradient = zuc(wav, 0.);
    colGradient = mix(colGradient, zuc(wav, 1.), smoothstep(0., .3333, uColors));
    colGradient = mix(colGradient, zuc(wav, 2.), smoothstep(.3333, .6666, uColors));

    vec3 yellow = vec3(0.8588, 0.9882, 0.3216);
    vec3 gray = vec3(0.7569);
    vec4 uColor0 = vec4(vec3(0.15), 0.);
    vec4 uColor1 = vec4(gray, .6);
    vec4 uColor2 = vec4(yellow, .75);
    vec4 uColor3 = vec4(clamp(yellow * 1.1, 0., 1.), .85);
    vec4 uColor4 = vec4(gray, .9);
    vec4 uColor5 = vec4(yellow, 1.);
    vec3 colorA = uColor0.rgb;
    float stopA = uColor0.a;
    for (float i = 1.; i < 6.; i++) {
      vec4 cB = uColor1;
      if (i == 2.) cB = uColor2;
      if (i == 3.) cB = uColor3;
      if (i == 4.) cB = uColor4;
      if (i == 5.) cB = uColor5;
      vec3 colorB = cB.rgb;
      float stopB = cB.a;
      float fc = smoothstep(stopA, stopB, b);
      colorA = mix(colorA, colorB, fc);
      stopA = cB.a;
    }
    colGradient = mix(colGradient, colorA, smoothstep(.6666, 1., uColors));
    colGradient = mix(colGradient, colProject, uTheme.z);

    gl_FragColor = vec4(colGradient, uTheme.y);
  }
`;
