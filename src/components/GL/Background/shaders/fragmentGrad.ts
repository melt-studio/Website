import { getTexUv, map, rand, smoothUnionSDF, zuc } from "./utils";

export const fragmentShaderGrad = /* glsl */ `
  varying vec2 vUv;

  uniform float PI;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uScroll;
  uniform vec4 uResolution;
  uniform float uColors;
  uniform float uDistortion;
  uniform float uWaves;
  uniform vec3 uTheme;
  uniform vec3 uTheme0;
  uniform vec3 uTheme1;
  uniform vec4 uMode;
  uniform sampler2D uVideo;
  uniform vec4 uVideoPlaying;
  uniform vec4 uVideoResolution;

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
        
    // // Blob ----------------------------- //

    // // Mouse coords
    // vec2 mouse = uMouse;
    // mouse *= vec2(uResolution.x/uResolution.y, 1.);

    // vec2 uv = vUv * 2. - 1.;
    // uv *= vec2(uResolution.x/uResolution.y, 1.);

    // // Scroll factor
    // float sf = uScroll.y;

    // // Video load transition time
    // float t0 = getTime(uTime, 1., uVideoPlaying.w);
    // t0 = EaseInOutCubic(t0);

    // // Video expand transition time
    // float t1 = getTime(uTime, 1., uVideoPlaying.y);
    // float t2 = t1; // play/stop button scale time
    // t1 = EaseInOutCubic(t1);
    // if (uVideoPlaying.x == 0.) t1 = 1. - t1;
    
    // // Video texture
    // float margin = 10.;
    // Tex vidUv0 = getTexUv(uResolution.xy, uVideoResolution.xy, false, margin);
    // Tex vidUv1 = getTexUv(uResolution.xy, uVideoResolution.xy, true, margin);
    // vec2 vidUv = mix(vidUv0.uv, vidUv1.uv, 1.-t1);
    // vec2 vidSize = mix(vidUv0.size, vidUv1.size, 1.-t1);
    // float outside = 0.;
    // if (vidUv.x < 0. || vidUv.x > 1. || vidUv.y < 0. || vidUv.y > 1.) outside = 1.; 
    // vec3 colVideo = texture2D(uVideo, vidUv.xy).rgb;
    // vec2 vidS = vidSize - .025;

    // // Rounded video mask
    // float box = sdRoundedBox(uv, vidS, vec4(.05) * vidS.x);
    // box = smoothstep(.0, .1, box);

    // // Blob shape 
    // vec2 pb = uv - mouse;
    // float pbf = (sin(atan2(uv.y, uv.x + 10.) * PI * 40. + b * 0. + uTime))*.05;
    // float angle = atan(pb.y, pb.x);
    // float pbf2 = mix(1., .6666, (sin(angle * 4. + uTime + uMouse.x * PI))*.5 + (sin(angle * 7. - uTime * .5 + uMouse.y * PI * 1.))*.5);
    // pb *= pbf2;
    // pb += pbf;

    // // Empty shape
    // float null = sdBox((vUv * 2. - 1.) + pbf, vec2(.0));

    // float r = sdCircle(pb, mix(.35, 1., t1) * t0);
    // r = smoothUnionSDF(mix(r, mix(v, box, t1), t1), mix(r, mix(v, box, t1), t1), .1);
    // r = smoothUnionSDF(mix(r, null, sf), mix(r, null, sf), .1);
    // r = smoothstep(0., mix(.01, .02, t1), r);
    // r = mix(1., r, uVideoPlaying.z);
    // r = mix(1., r, smoothstep(0., .5, t0));

    // // Icon coords
    // vec2 puv = uv - mouse;
    // puv *= mix(1., 1.25, sin(smoothstep(0., .2, t2) * PI));

    // // Icon border
    // float border = sdCircle(puv, mix(0., .0666, t0));
    // float border2 = sdCircle(puv, mix(0., .0633, t0));
    // float controlBorder = smoothDifferenceSDF(border, border2, .0);

    // // Play icon
    // float play = sdEquilateralTriangle(puv * rotate2d(PI/2.), .02);
    // float controlPlay = smoothUnionSDF(controlBorder, play, .01);
    
    // // Play/cancel icon transition time
    // float off = controlBorder * 4.;
    // if (uVideoPlaying.x == 0.) off *= -1.;
    // float t4 = getTime(uTime, .75, uVideoPlaying.y + off);
    // t4 = EaseInOutCubic(t4);
    // if (uVideoPlaying.x == 0.) t4 = 1. - t4;

    // // Close icon coords
    // vec2 cuv = puv;
    // cuv *= 2.;
    // vec2 cuv1 = cuv * rotate2d(mix(-PI/4., PI/4., t4));
    // vec2 cuv2 = cuv * rotate2d(mix(PI/4., -PI/4., t4));

    // // Close icon
    // vec2 cSize = vec2(.075, .005);
    // float close = sdBox(cuv1, cSize);
    // float close2 = sdBox(cuv2, cSize);
    // float controlStop = smoothUnionSDF(close, close2, .01);
    // controlStop = smoothUnionSDF(controlStop, controlBorder, .01);

    // float control = smoothUnionSDF(mix(controlPlay, controlStop, t4), mix(controlPlay, controlStop, t4), .005); 
    // control = mix(control, null, sf);
    // control = 1. - smoothstep(0., .002, control);
    // if (mouse.y > 1.-90./uResolution.y) control = 0.; // hide control if pointer around top nav

    // // Output color ----------------------------- //

    // // float vidf = 1.-r;
    // // colVideo = mix(colVideo, bgMid, mix(0., 1., 1.-uVideoResolution.z));
    // // vec3 col = bgMid;
    // // col = mix(col, colGradient, mix(uTheme.x, 1., uTheme.y));
    // // col = mix(col, colVideo, vidf * (1.-sf));
    // // col = mix(col, bgLight, control * (1.-sf));

    // // // // Fade in
    // // // float t0 = getTime(time, 1., 0.);
    // // // col = mix(bgMid, col, t0);

    // // // Output alpha
    // // float a = vidf;
    // // a = max(a, control);
    // // a = mix(a, 1., sf);

    // // // float a = max(max(1.-r, control), mix(uTheme.x, 1., uTheme.y));

    // // gl_FragColor = vec4(col, a);


    // // Alpha
    // float alphaBlob = max(1.-r, control);
    // float alphaGradient = mix(uTheme.x, 1., uTheme.y);
    // float alpha = max(alphaBlob, alphaGradient);
    // // alpha = mix(0., alpha, t5);

    // colVideo = mix(colVideo, bgMid, mix(0., 1., 1.-uVideoResolution.z));
    // vec3 col = bgMid;
    // col = mix(col, colGradient, alphaGradient);
    // col = mix(col, colVideo, (1.-r) * (1.-sf) * (1.-uTheme.x));
    // col = mix(col, bgLight, control * (1.-sf) * (1.-uTheme.x));

    gl_FragColor = vec4(colGradient, uTheme.y);
  // }
  }
`;
