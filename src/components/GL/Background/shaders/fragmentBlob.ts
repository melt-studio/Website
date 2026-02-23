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
  smoothIntersectSDF,
  smoothUnionSDF,
} from "./utils";

export const fragmentShaderBlob = /* glsl */ `
  varying vec2 vUv;

  uniform float PI;
  uniform float uMode;
  uniform vec2 uHover;
  uniform vec3 uTime;
  uniform vec2 uMouse;
  uniform vec2 uPath;
  uniform float uScroll;
  uniform vec4 uResolution;
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
  ${smoothIntersectSDF}
  ${rotate2d}

  void main() {
    vec3 bgDark = vec3(27.)/255.;
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

    vec2 uv = vUv * 2. - 1.;
    uv *= vec2(uResolution.x/uResolution.y, 1.);

    // Mouse coords
    vec2 path = uPath;
    vec2 mouse = uMouse;
    mouse *= vec2(uResolution.x/uResolution.y, 1.);

    float time = uTime.z * .02 + 4.;
    
    path *= vec2(uResolution.x/uResolution.y, 1.);

    float t3 = getTime(uTime.x, .5, uHover.y);
    t3 = easeInOutCubic(t3);
    float r_ = t3;
    if (uHover.x == 0.) r_ = 1. - t3;

    // Scroll factor
    float sf = uScroll;

    // Page load transition time
    float t_ = getTime(uTime.x, 1.5, uTime.y + 2. * uMode);
    t_ = easeInOutCubic(t_);
    t_ = mix(t_, 1.-t_, 1.-uMode);

    // Video load transition time
    float t0 = getTime(uTime.x, 1.5, uVideoPlaying.w);
    t0 = easeInOutCubic(t0);

    // Video expand transition time
    float t1 = getTime(uTime.x, 1.5, uVideoPlaying.y);
    float t2 = t1; // play/stop button scale time
    t1 = easeInOutCubic(t1);
    if (uVideoPlaying.x == 0.) t1 = 1. - t1;
    
    // Video texture
    float margin = 10.;
    Tex vidUv0 = getTexUv(uResolution.xy, uVideoResolution.xy, false, margin);
    vec2 vidUv = vidUv0.uv;
    vec2 vidSize = vidUv0.size;
    float outside = 0.;
    if (vidUv.x < 0. || vidUv.x > 1. || vidUv.y < 0. || vidUv.y > 1.) outside = 1.; 
    vec3 colVideo = texture2D(uVideo, vidUv.xy).rgb;
    // vec2 vidS = vidSize - .025;
    vec2 vidS = vec2(uResolution.x/uResolution.y, 1.) - .025;

    // Rounded video mask
    float box = sdRoundedBox(uv, vidS, vec4(.015) * vidS.x);
    box = smoothstep(.0, .1, box);

    // Blob shape 
    vec2 pb = uv - path;
    float pbf = (sin(atan2(uv.y, uv.x + 10.) * PI * 35. - uTime.x * .2))*.05;
    float angle = atan(pb.y, pb.x);
    float pfm = smoothstep(0., 1., length(uv - mouse));
    float pbf2 = mix(1., .6666, (sin(angle * 3. + uTime.x * .2 + path.x * PI * 4.)));
    float pbf3 = mix(1., .6666, (sin(angle * 4. + uTime.x * .2 + mouse.y * PI * 1.)));
    pb *= pbf2;
    pb *= mix(pbf3, 1., pfm);
    pb += pbf;

    // Empty shape
    float null = sdBox((vUv * 2. - 1.) + pbf, vec2(.0));

    float edge = sdRoundedBox(uv, (1.-margin*2./uResolution.xy)*vec2(uResolution.x/uResolution.y,1.), vec4(.1));
    float blobR = .25;
    float r = sdCircle(pb, mix(blobR + r_ * .1, 1., t1) * t0);
    r = smoothUnionSDF(mix(r, mix(v, box, t1), t1), mix(r, mix(v, box, t1), t1), .1);
    r = smoothUnionSDF(mix(r, null, sf), mix(r, null, sf), .1);
    r = mix(smoothIntersectSDF(r, edge, .1), r, t1);
    r = mix(smoothIntersectSDF(r, null, .1), r, t_);
    r = smoothstep(0., .005, r);
    r = mix(1., r, uVideoPlaying.z);
    r = mix(1., r, smoothstep(0., .5, t0));

    // Icon coords
    vec2 m = mix(path, mouse, t1);
    vec2 puv = uv - m;
    puv *= mix(1., 1.25, sin(smoothstep(0., .2, t2) * PI));
    puv *= mix(1.5, 1., r_);

    // Icon border
    float border = sdCircle(puv, mix(0., .0666, t0));
    float border2 = sdCircle(puv, mix(0., .0663, t0));
    float controlBorder = smoothDifferenceSDF(border, border2, .0);

    // Play icon
    float play = sdEquilateralTriangle(puv * rotate2d(PI/2.), .01);
    float controlPlay = smoothUnionSDF(controlBorder, play, .01);
    
    // Play/cancel icon transition time
    float off = controlBorder * 4.;
    if (uVideoPlaying.x == 0.) off *= -1.;
    float t4 = getTime(uTime.x, .75, uVideoPlaying.y + off);
    t4 = easeInOutCubic(t4);
    if (uVideoPlaying.x == 0.) t4 = 1. - t4;

    // Close icon coords
    vec2 cuv = puv;
    cuv *= 2.;
    vec2 cuv1 = cuv * rotate2d(mix(-PI/4., PI/4., t4));
    vec2 cuv2 = cuv * rotate2d(mix(PI/4., -PI/4., t4));

    // Close icon
    vec2 cSize = vec2(.075, .005);
    cSize *= .6;
    float close = sdBox(cuv1, cSize);
    float close2 = sdBox(cuv2, cSize);
    float controlStop = smoothUnionSDF(close, close2, .01);
    controlStop = smoothUnionSDF(controlStop, controlBorder, .01);

    float control = smoothUnionSDF(mix(controlPlay, controlStop, t4), mix(controlPlay, controlStop, t4), .005); 
    control = mix(control, null, sf);
    control = mix(1., control, uVideoPlaying.z);
    control = mix(smoothIntersectSDF(control, null, .1), control, t_);
    control = 1. - smoothstep(0., .002, control);
    if (m.y > 1.-90./uResolution.y) control = 0.; // hide control if pointer around top nav

    // Output color ----------------------------- //

    // Alpha
    float alphaBlob = max(1.-r, control);
    alphaBlob *= 1. - smoothstep(.9, 1., sf);

    vec3 col = bgLight;
    col = mix(col, colVideo, (1.-r) * (1.-sf));
    col = mix(col, mix(bgLight, bgMid, r), control * (1.-sf));

    gl_FragColor = vec4(col, alphaBlob);
  }
`;
