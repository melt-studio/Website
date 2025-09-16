export const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform vec4 uResolution;
  uniform float uTime;
  uniform float PI;
  uniform float uColors;
  uniform float uWaves;
  uniform vec3 uMode;
  uniform vec2 uMouse;
  uniform sampler2D uLogo;
  uniform float uScroll;
  uniform float uDistortion;

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  float smin(float a, float b, float k) {
    k *= 1.0;
    float r = exp2(-a/k) + exp2(-b/k);
    return -k*log2(r);
  }

  float brightness(vec3 c) {
    return 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  }

  vec3 zuc(float w, float k) {
    float x = (w - 400.) / 300.;
    if (x < 0.) x = 0.;
    if (x > 1.) x = 1.;

    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

    vec3 cs = vec3(3.54541723, 2.86670055, 2.29421995);
    vec3 xs = vec3(0.69548916, 0.49416934, 0.28269708);
    vec3 ys = vec3(0.02320775, 0.15936245, 0.53520021);
    
    vec3 z = vec3(x - xs[0], x - xs[1], x - xs[2]);

    vec3 z1 = vec3(0.0);
    for (int i = 0; i < 3; i++) {
      z1[i] = cs[i] * z[i];
    }

    z1[0] = cs[1] * z[1];
    z1[1] = cs[2] * z[2];
    z1[2] = cs[0] * z[0];
    
    if (k == 1.) {
      z1[0] = cs[1] * z[0];
      z1[1] = cs[2] * z[1];
      z1[2] = cs[0] * z[2];
    }

    if (k == 2.) {
      z1[0] = cs[0] * z[2];
      z1[1] = cs[2] * z[1];
      z1[2] = cs[1] * z[0];
    }

    vec3 z2 = vec3(0.0);
    for (int i = 0; i < 3; i++) {
      z2[i] = 1. - (z1[i] * z1[i]);
    }

    if (k == 2.) {
      z2[0] = 1. - (z1[1] * z1[0]);
      z2[1] = 1. - (z1[2] * z1[1]);
      z2[2] = 1. - (z1[0] * z1[2]);
    }

    for (int i = 0; i < 3; i++) {
      color[i] = z2[i] - ys[i];
    }

    color[0] = z2[0] - ys[1];
    color[1] = z2[1] - ys[2];
    color[2] = z2[2] - ys[0];

    if (k == 2.) {
      color[0] = z2[2] - ys[1];
      color[1] = z2[0] - ys[2];
      color[2] = z2[1] - ys[0];
    }

    return color.rgb;
  }
  
  void main() {
    vec2 aspectS = vec2(
      uResolution.x > uResolution.y ? uResolution.x / uResolution.y : 1., 
      uResolution.x > uResolution.y ? 1. : uResolution.y / uResolution.x 
    );

    float time = uTime * .2;


    vec2 imgUv = vUv;
    vec2 uvF = vec2(
      1. / uResolution.x,
      1. / uResolution.y
    );
    imgUv /= uvF;
    float uImgFitWidth = 1.;
    float offSide = uImgFitWidth == 1. ? uResolution.x / 1. : uResolution.y / 1.;

    vec2 uvOff = vec2(
      (uResolution.x - 1. * offSide),
      (uResolution.y - 1. * offSide)
    );
    uvOff *= .5;
    imgUv -= uvOff;
    imgUv *= uImgFitWidth == 1.? 1. / uResolution.x : 1. / uResolution.y;
    // imgUv /= imgScale;

    float delay = 0.;
    float t0 = 0.;
    float ts0 = delay;
    float ld0 = 3.;
    float te0 = ts0 + ld0;
    if (uTime < ts0) t0 = 0.;
    else if (uTime < te0) t0 = map(uTime, ts0, te0, 0., 1.);
    else t0 = 1.;

    float ld = 2.;

    float distort = uDistortion;
    distort *= mix(smoothstep(0., 1., 1.-vUv.y), 1., smoothstep(.5, 1., distort));
    distort = smoothstep(0., .5, distort);


    float distorts = .5;
    distorts *= mix(smoothstep(0., 1., 1.-imgUv.y), 1., smoothstep(.5, 1., distorts));
    distorts = smoothstep(0., .5, distorts);

    vec2 uv = vUv;

    vec2 vignetteCoords = fract(vUv * vec2(1.0, 1.0));
    float v1 = smoothstep(0.5, 0.2, abs(vignetteCoords.x - 0.5));
    float v2 = smoothstep(0.5, 0.2, abs(vignetteCoords.y - 0.5));
    float vignetteAmount = v1 * v2;
    vignetteAmount = pow(vignetteAmount, 0.5);
    vignetteAmount = map(vignetteAmount, 0.0, 1.0, 0., 1.0);
    float d3 = 1. - vignetteAmount;
    d3 = pow(d3, 4.);

    vec2 p = vUv * 5.;
    for (float i = 0.0; i < 8.; i++) {
      p.x += sin(p.y + i + time * .5);
      p *= mat2(6, -8, 8, 6) / 8.;
      vec2 q = vec2(time, -time / 2.);
      q *= 8. / mat2(6, -8, 8, 6);
      p -= q * .5;
    }

    vec2 p2 = vUv * 5.;
    for (float i = 0.0; i < 8.; i++) {
      p2.x += sin(p2.y + i + time * .5 + 0.2);
      p2 *= mat2(6, -8, 8, 6) / 8.;
      vec2 q = vec2(time, -time / 2.);
      q *= 8. / mat2(6, -8, 8, 6);
      p2 -= q * .5;
    }

    vec3 colx = (sin(vec4(p.y, p2.x, p2.xy) * .6) * .5 + .5).xyz;

    float xx = colx.r;
    
    float d = (((pow(1. - uv.y * 2. + 1., .5))) - (sin(uv.x * PI * 1.5 - PI * .25)));
    float d_ = (((pow(1. - uv.y * 2. + 1., .5))) - (sin(uv.x * PI * 1.)) + sin(uv.x * 3.5 * PI) * .5 + sin(uv.x * 8. * PI) * .25 + sin(uv.x * 15. * PI) * .125);

    float ds = mix(d, d_, 1.);
    ds = mix(ds, xx, distorts);
    float ds2 = length(imgUv - .5)  + .75;
    ds2 = smin(ds, ds2, .2);
    ds += rand(imgUv + ds) * .006 * 0.5;
    float ts = mod(time - ds, ld) / ld;
    ts = mix(ts, xx, distorts);
    float wavs = ts * mix(290., 100., d3) + mix(400., 500., d3);
    vec3 cols = zuc(wavs, 0.);
    cols = mix(cols, zuc(wavs, 1.), smoothstep(0., .3333, uColors));
    cols = mix(cols, zuc(wavs, 2.), smoothstep(.3333, .6666, uColors));

    d = mix(d, d_, uWaves);
    d = mix(d, xx, distort);
    float d2 = length(vUv - .5)  + .75;
    d = smin(d, d2, .2);
    d += rand(vUv + d) * .006 * uDistortion;
    float t = mod(time - d, ld) / ld;
    t = mix(t, xx, distort);
    float wav = t * mix(290., 100., d3) + mix(400., 500., d3);
    vec3 col = zuc(wav, 0.);
    col = mix(col, zuc(wav, 1.), smoothstep(0., .3333, uColors));
    col = mix(col, zuc(wav, 2.), smoothstep(.3333, .6666, uColors));



    // float sx = sin(uTime + vUv.x * 4.)*.5+.5;
    // sx *= smoothstep(0.6, 1., 1.-vUv.y);

    // // sx +=  (sin(uTime + vUv.x * 8.)*.5+.5) * smoothstep(0.7, 1., 1.-vUv.y);
    // sx +=  (sin(uTime + vUv.x * 8.)*.5+.5) * smoothstep(0.7, 1., 1.-vUv.y);

    // float sx2 = sin(uTime + vUv.x * 4.)*.5+.5;
    // sx2 *= smoothstep(0.6, 1., 1.-vUv.y);

    float delay1 = 1.;
    float t1 = 0.;
    float ts1 = delay1;
    float ld1 = 6.;
    float te1 = ts1 + ld1;
    if (uTime < ts1) t1 = 0.;
    else if (uTime < te1) t1 = map(uTime, ts1, te1, 0., 1.);
    else t1 = 1.;
    t1 = smoothstep(0., 1., t1);
    vec2 sx = vec2(
      cols.r * smoothstep(mix(.6, .6, uScroll), 1., 1. - vUv.y) * sin(time + vUv.x * 2.), 
      // cols.r * smoothstep(.55, 1., 1. - vUv.y) * uMouse.x, 
      // cols.r * smoothstep(mix(.6, .4, abs(vUv.x * 2. - 1.)), 1., 1.-vUv.y)
      cols.r * smoothstep(mix(.55, .55, uScroll), 1., 1.-vUv.y) + uScroll * 1.5
    ) * t1;
    vec2 vUv_ = imgUv;
    // vUv_.x = mix(vUv_.x, (vUv_.x - .5) * mix(1.,.25,smoothstep(.5, .75, 1.-vUv.y)) + .5, uScroll);
    vec4 logo = texture2D(uLogo, vUv_ + sx);

    float b = sin(t * PI + d3);
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
    col = mix(col, colorA, smoothstep(.6666, 1., uColors));

    // col += rand(vUv) * .05;

    col = mix(vec3(193.)/255., col, t0);


    float ldm = 1.;
    float tm = uMode.x;
    if (uTime < uMode.z) tm = uMode.x;
    else if (uTime < uMode.z + ldm) tm = map(uTime, uMode.z, uMode.z + ldm, uMode.x, uMode.y);
    else tm = uMode.y;
    tm = smoothstep(0., 1., tm);

    if (uMode.z == 0.) tm = uMode.y;


    vec3 bg = vec3(193.)/255.;
    vec3 colLogo = mix(bg, vec3(27.)/255., logo.r);

    vec3 col_ = mix(colLogo, bg, smoothstep(.0, .75, tm));
    col_ = mix(col_, col, smoothstep(.25, 1. ,tm));


    // float r = length(vUv - (uMouse*.5+.5));
    // col_ = mix(col_, vec3(0.), 1.-smoothstep(0.09, .1, r));

    gl_FragColor = vec4(col_, 1.);
  }
`;
