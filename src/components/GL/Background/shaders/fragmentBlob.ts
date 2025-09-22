import {
  atan2,
  easeInOutCubic,
  getTexUv,
  getTime,
  map,
  rotate2d,
  sdBox,
  sdCircle,
  sdEquilateralTriangle,
  sdRoundedBox,
  smoothDifferenceSDF,
  smoothUnionSDF,
} from "./utils";

export const fragmentShaderBlob = /* glsl */ `
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

  ${map}
  ${getTime}
  ${easeInOutCubic}
  ${getTexUv}
  ${sdRoundedBox}
  ${sdCircle}
  ${sdBox}
  ${sdEquilateralTriangle}
  ${atan2}
  ${smoothDifferenceSDF}
  ${smoothUnionSDF}
  ${rotate2d}

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
        
    // Blob ----------------------------- //

    // Mouse coords
    vec2 mouse = uMouse;
    vec2 mouse2 = uMouse;
    float time = uTime * .0333 + 4.;
    // mouse += vec2(sin(time + sin(time * .5 + cos(time * .25))), cos(time + cos(time * .5 + sin(time * .5)))) * .5;
    // mouse = vec2(sin(time), cos(time)) * .5;
    // mouse += vec2(sin(time * 2.), cos(time * 2.)) * .25;
    // mouse -= vec2(sin(time * 3.), cos(time * 3.)) * .125;

    float x = sin(time * 5.) * .5;
    float y = sin(time * 4.) * .5;
    x += sin(time * 6.) * .25;
    y += sin(time * 5.) * .25;
    x += sin(time * 10.) * .25;
    y += sin(time * 8.) * .25;
    mouse = vec2(x, y);
    mouse *= vec2(uResolution.x/uResolution.y, 1.);
    mouse2 *= vec2(uResolution.x/uResolution.y, 1.);

    vec2 uv = vUv * 2. - 1.;
    uv *= vec2(uResolution.x/uResolution.y, 1.);

    // Scroll factor
    float sf = uScroll.y;

    // Video load transition time
    float t0 = getTime(uTime, 1.5, uVideoPlaying.w);
    t0 = easeInOutCubic(t0);

    // Video expand transition time
    float t1 = getTime(uTime, 1.5, uVideoPlaying.y);
    float t2 = t1; // play/stop button scale time
    t1 = easeInOutCubic(t1);
    if (uVideoPlaying.x == 0.) t1 = 1. - t1;
    
    // Video texture
    float margin = 10.;
    Tex vidUv0 = getTexUv(uResolution.xy, uVideoResolution.xy, false, margin);
    Tex vidUv1 = getTexUv(uResolution.xy, uVideoResolution.xy, true, margin);
    vec2 vidUv = mix(vidUv0.uv, vidUv1.uv, 1.-t1);
    vec2 vidSize = mix(vidUv0.size, vidUv1.size, 1.-t1);
    float outside = 0.;
    if (vidUv.x < 0. || vidUv.x > 1. || vidUv.y < 0. || vidUv.y > 1.) outside = 1.; 
    vec3 colVideo = texture2D(uVideo, vidUv.xy).rgb;
    vec2 vidS = vidSize - .025;

    // Rounded video mask
    float box = sdRoundedBox(uv, vidS, vec4(.05) * vidS.x);
    box = smoothstep(.0, .1, box);

    // Blob shape 
    vec2 pb = uv - mouse;
    float pbf = (sin(atan2(uv.y, uv.x + 10.) * PI * 40. + uTime * .666))*.05;
    float angle = atan(pb.y, pb.x);
    float pbf2 = mix(1., .6666, (sin(angle * 4. + uTime * .666 + mouse.x * PI))*.5 + (sin(angle * 7. - uTime * .5 * .6666 + mouse.y * PI * 1.))*.5);
    pb *= pbf2;
    pb += pbf;

    // Empty shape
    float null = sdBox((vUv * 2. - 1.) + pbf, vec2(.0));

    float r = sdCircle(pb, mix(.35, 1., t1) * t0);
    r = smoothUnionSDF(mix(r, mix(v, box, t1), t1), mix(r, mix(v, box, t1), t1), .1);
    r = smoothUnionSDF(mix(r, null, sf), mix(r, null, sf), .1);
    r = smoothstep(0., mix(.01, .02, t1), r);
    r = mix(1., r, uVideoPlaying.z);
    r = mix(1., r, smoothstep(0., .5, t0));

    // Icon coords
    vec2 m = mix(mouse, mouse2, t1);
    vec2 puv = uv - m;
    puv *= mix(1., 1.25, sin(smoothstep(0., .2, t2) * PI));

    // Icon border
    float border = sdCircle(puv, mix(0., .0666, t0));
    float border2 = sdCircle(puv, mix(0., .0633, t0));
    float controlBorder = smoothDifferenceSDF(border, border2, .0);

    // Play icon
    float play = sdEquilateralTriangle(puv * rotate2d(PI/2.), .02);
    float controlPlay = smoothUnionSDF(controlBorder, play, .01);
    
    // Play/cancel icon transition time
    float off = controlBorder * 4.;
    if (uVideoPlaying.x == 0.) off *= -1.;
    float t4 = getTime(uTime, .75, uVideoPlaying.y + off);
    t4 = easeInOutCubic(t4);
    if (uVideoPlaying.x == 0.) t4 = 1. - t4;

    // Close icon coords
    vec2 cuv = puv;
    cuv *= 2.;
    vec2 cuv1 = cuv * rotate2d(mix(-PI/4., PI/4., t4));
    vec2 cuv2 = cuv * rotate2d(mix(PI/4., -PI/4., t4));

    // Close icon
    vec2 cSize = vec2(.075, .005);
    float close = sdBox(cuv1, cSize);
    float close2 = sdBox(cuv2, cSize);
    float controlStop = smoothUnionSDF(close, close2, .01);
    controlStop = smoothUnionSDF(controlStop, controlBorder, .01);

    float control = smoothUnionSDF(mix(controlPlay, controlStop, t4), mix(controlPlay, controlStop, t4), .005); 
    control = mix(control, null, sf);
    control = 1. - smoothstep(0., .002, control);
    if (m.y > 1.-90./uResolution.y) control = 0.; // hide control if pointer around top nav

    // Output color ----------------------------- //

    // float vidf = 1.-r;
    // colVideo = mix(colVideo, bgMid, mix(0., 1., 1.-uVideoResolution.z));
    // vec3 col = bgMid;
    // col = mix(col, colGradient, mix(uTheme.x, 1., uTheme.y));
    // col = mix(col, colVideo, vidf * (1.-sf));
    // col = mix(col, bgLight, control * (1.-sf));

    // // // Fade in
    // // float t0 = getTime(time, 1., 0.);
    // // col = mix(bgMid, col, t0);

    // // Output alpha
    // float a = vidf;
    // a = max(a, control);
    // a = mix(a, 1., sf);

    // // float a = max(max(1.-r, control), mix(uTheme.x, 1., uTheme.y));

    // gl_FragColor = vec4(col, a);


    // Alpha
    float alphaBlob = max(1.-r, control);
    alphaBlob *= 1. - smoothstep(.9, 1., sf);
    // float alphaGradient = mix(uTheme.x, 1., uTheme.y);
    // float alpha = max(alphaBlob, alphaGradient);
    // alpha = mix(0., alpha, t5);

    // colVideo = mix(colVideo, bgMid, mix(0., 1., 1.-uVideoResolution.z));
    vec3 col = bgMid;
    // col = mix(col, colGradient, alphaGradient);
    col = mix(col, colVideo, (1.-r) * (1.-sf));
    col = mix(col, bgLight, control * (1.-sf));

    gl_FragColor = vec4(col, alphaBlob);
  // }
  }
`;
