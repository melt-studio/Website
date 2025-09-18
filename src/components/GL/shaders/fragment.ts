export const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform vec4 uResolution;
  uniform float uTime;
  uniform float PI;
  uniform float uColors;
  uniform float uWaves;
  uniform vec3 uTheme;
  uniform vec3 uTheme0;
  uniform vec3 uTheme1;
  // uniform float uThemeX;
  // uniform vec3 uTheme2;
  // uniform vec3 uTheme3;
  uniform vec4 uMode;
  uniform vec2 uMouse;
  uniform vec2 uVideoPlaying;
  uniform sampler2D uLogo;
  uniform vec4 uVideoResolution;
  uniform sampler2D uVideo;
  // uniform sampler2D uLogo2;
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

  float getTime(float ld, float delay) {
    float time = 0.;
    if (uTime < delay) time = 0.; 
    else if (uTime < delay + ld) time = map(uTime, delay, delay + ld, 0., 1.);
    else time = 1.;
    return time;
  }
  

float atan2(in float y, in float x){
    float s = abs(x) > abs(y) ? 1. : 0.;
    return mix(PI/2.0 - atan(x,y), atan(y,x), s);
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
    // float uImgFitWidth = uResolution.y > uResolution.x ? 1. : 0.;
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

    // vec2 vignetteCoords2 = fract(vUv * vec2(1.0, 1.0));
    // float v1 = smoothstep(0.5, 0.2, abs(vignetteCoords2.x - 0.5));
    // float v2 = smoothstep(0.5, 0.2, abs(vignetteCoords2.y - 0.5));
    // float vignetteAmount2 = v1 * v2;
    // vignetteAmount2 = pow(vignetteAmount2, 0.5);
    // vignetteAmount2 = map(vignetteAmount2, 0.0, 1.0, 0., 1.0);
    // float d32 = 1. - vignetteAmount2;
    // d32 = pow(d32, 4.);

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

    vec3 bg = vec3(193.)/255.;

    float t0_ = 0.;
    float ts0_ = cols.r * 0.;
    float ld0_ = 5.;
    float te0_ = ts0_ + ld0_;
    if (uTime < ts0_) t0_ = 0.;
    else if (uTime < te0_) t0_ = map(uTime, ts0_, te0_, 0., 1.);
    else t0_ = 1.;
    t0_ = smoothstep(0., 1., t0_);

    float delay1 = 1.;
    float t1 = 0.;
    float ts1 = delay1;
    float ld1 = 6.;
    float te1 = ts1 + ld1;
    if (uTime < ts1) t1 = 0.;
    else if (uTime < te1) t1 = map(uTime, ts1, te1, 0., 1.);
    else t1 = 1.;
    t1 = smoothstep(0., 1., t1);
    float scroll = clamp(uScroll, 0., 1.);
    vec2 vUv_ = imgUv;
    vec2 sx = vec2(
      cols.r * smoothstep(mix(.6, .6, scroll), 1., mix(1. - vUv_.y, 1., scroll)) * sin(time + vUv_.x * 2.), 
      // cols.r * smoothstep(.55, 1., 1. - vUv_.y) * uMouse.x, 
      // cols.r * smoothstep(mix(.6, .4, abs(vUv_.x * 2. - 1.)), 1., 1.-vUv_.y)
      cols.r * smoothstep(mix(.55, .55, scroll), 1., mix(1.-vUv_.y, 1., scroll)) + scroll * max(uResolution.x/uResolution.y, uResolution.y/uResolution.x)
    ) * t1 * (1.-d3);
    sx.y += scroll;
    // vUv_.x = mix(vUv_.x, (vUv_.x - .5) * mix(1.,.25,smoothstep(.5, .75, 1.-vUv.y)) + .5, uScroll);
    // vUv_ = (vUv_ - .5) * mix(1., 5., smoothstep(0., 1., uScroll)) + .5;
    // vUv_ -= length(vUv_ * 2. - 1.) * uScroll;
    vec4 logo = texture2D(uLogo, vUv_ + sx + vec2(0., 1.-t0_)*0.);

    vec3 colLogo = mix(bg, vec3(27.)/255., logo.r * (1.-smoothstep(.66, .75, uScroll)));

    // colLogo = mix(logo.rgb, bg, smoothstep(.75, .8, uScroll));
    // vec4 logo2 = texture2D(uLogo2, vUv_ + sx + vec2(0., 1.-t0_)*0.);

    // logo.rgb = smoothstep(.0, .1, logo2.rgb);
    // logo.rgb = mix(logo.rgb, bg)
    // vec4 logo2 = texture2D(uLogo2, vUv_ + sx + vec2(0., 1.-t0_)*0.);
    // logo.rgb = mix(logo.rgb, smoothstep(.0, 1., logo2.rgb), smoothstep(.5, 1., 1.-vUv.y));
    // logo.rgb = smoothstep(mix(0.,.45,t0_), mix(0.,.55,t0_), logo.rgb);

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

    vec3 colGradientBase = col;

    // // if (uTheme.x == 1.) {
    //   float tt = getTime(2., uTheme.z);
    //   tt = smoothstep(0., 1., tt);
    //   vec3 colt0 = mix(uTheme2, uTheme3, clamp(col.g, 0., 1.));
    //   vec3 colt1 = mix(uTheme0, uTheme1, clamp(col.g, 0., 1.));
    //   vec3 colt = mix(colt0, colt1, tt);
    //   float ft = mix(uTheme.y, uTheme.x, tt);
    //   col = mix(col, colt, mix(ft, 1., uMode.w));


      vec3 colProject = mix(uTheme0, uTheme1, clamp(b, 0., 1.));

      // col = mix(col, colProject, mix(uTheme.y, 1., uTheme.x));
      vec3 colGradient = mix(colGradientBase, colProject, uTheme.z);
      col = mix(colLogo, colGradient, mix(uTheme.x, 1., uTheme.y));

      
    // }

      // if (uTheme.x == 1. || uTheme.y == 1.) {
      // col = mix(col, colt, uTheme.x != uTheme.y ? tt : 0.);
      // }
    // }

    // col += rand(vUv) * .05;

    col = mix(vec3(193.)/255., col, t0);


    // float ldm = 1.;
    // float tm = uMode.x;
    // if (uTime < uMode.z) tm = uMode.x;
    // else if (uTime < uMode.z + ldm) tm = map(uTime, uMode.z, uMode.z + ldm, uMode.x, uMode.y);
    // else tm = uMode.y;
    // tm = smoothstep(0., 1., tm);

    // if (uMode.z == 0.) tm = uMode.y;


    // vec3 bg = vec3(193.)/255.;

    // t0_ = 1.;

    // vec3 colLogo = mix(bg, mix(bg, vec3(27.)/255., logo.r), t0_);

    // vec3 col_ = mix(colLogo, bg, smoothstep(.0, .75, tm));
    // col_ = mix(col_, col, smoothstep(.25, 1. ,tm));
    

vec3 col_ = col;

vec2 mouse = uMouse;
mouse -= .5;
mouse += .5;
mouse *= vec2(uResolution.x/uResolution.y, 1.);

vec2 uvm = vUv;
uvm -= .5;
// uvm *= vec2(uResolution.x/uResolution.y, 1.);
uvm += .5;
uvm = uvm * 2. - 1.;
uvm *= vec2(uResolution.x/uResolution.y, 1.);


    float rd = atan(uvm.y/uvm.x);

// uvm -=

  vec2 vidUv = vUv;
    vec2 viduvF = vec2(
      uVideoResolution.x / uResolution.x,
      uVideoResolution.y / uResolution.y
    );
    vidUv /= viduvF;
    // float uImgFitWidth = uResolution.y > uResolution.x ? 1. : 0.;
    float fitVidWidth = 1.;
    float vidoffSide = fitVidWidth == 1. ? uResolution.x / uVideoResolution.x : uResolution.y / uVideoResolution.y;

    vec2 viduvOff = vec2(
      (uResolution.x - uVideoResolution.x * vidoffSide),
      (uResolution.y - uVideoResolution.y * vidoffSide)
    );
    viduvOff *= .5;
    viduvOff /= uVideoResolution.xy;
    vidUv -= viduvOff;
    vidUv *= fitVidWidth == 1.? uVideoResolution.x / uResolution.x : uVideoResolution.y / uResolution.y;

    float outside = 0.;
    if (vidUv.x < 0. || vidUv.x > 1. || vidUv.y < 0. || vidUv.y > 1.) outside = 1.; 

vec4 video = texture2D(uVideo, vidUv);


    float r = length(uvm - mouse + (sin(atan2(uvm.y, uvm.x + 10.) * PI * 40. + uTime))*.05);
    // col_ = mix(col_, video.rgb, 1.-smoothstep(0.19, .2, r));
    float tv = getTime(2., uVideoResolution.w);
    float tv2 = getTime(.5, uVideoPlaying.y);
    tv2 = smoothstep(.0, 1., tv2);
    if (uVideoPlaying.x == 0.) tv2 = 1. - tv2;
    r = mix(r, mix(b, d3, tv2), tv2);
    // tv *= smoothstep(.333, .4, uScroll);
    // float vidf = 1.-smoothstep(mix(0., 0.19, tv), mix(0.,.2, tv), r);
    // float vidf = 1.-smoothstep(.19,.2, r);
    float vf = tv2;
    float vidf = 1.-smoothstep(mix(.19, 0.99, vf),mix(.2, 1., vf), r);

  

    // vidf = mix(vidf, max(vidf, 1.-smoothstep(.9, 1., d3)), tv2 * uVideoPlaying.x);
    // vidf *= tv;
    // vidf *= (1.-outside);
    video.rgb = mix(video.rgb, colGradientBase, mix(outside, 1., 1.-uVideoResolution.z));
    col_ = mix(col_, video.rgb, vidf);

    gl_FragColor = vec4(col_, 1.);
  }
`;
