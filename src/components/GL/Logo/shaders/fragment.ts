import { getTexUv2, map, rand, sdRoundedBox, smoothUnionSDF, zuc } from "../../Background/shaders/utils";

export const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform vec4 uResolution;
  uniform float uTime;
  uniform float PI;
  uniform float uColors;
  uniform float uWaves;
  uniform float uDistortion;
  uniform vec4 uMode;
  uniform sampler2D uLogo;

  ${getTexUv2}
  ${sdRoundedBox}
  ${zuc}
  ${rand}
  ${map}
  ${smoothUnionSDF}

  void main() {
    float time = uTime * .2;

    Tex iuv = getTexUv(uResolution.xy, uResolution.zw, false, 0.);
    vec2 imgUv = iuv.uv;

    float delay = 0.;
    float t0 = 0.;
    float ts0 = delay;
    float ld0 = 3.;
    float te0 = ts0 + ld0;
    if (uTime < ts0) t0 = 0.;
    else if (uTime < te0) t0 = map(uTime, ts0, te0, 0., 1.);
    else t0 = 1.;

    float distorts = .5;
    distorts *= mix(smoothstep(0., 1., 1.-imgUv.y + .25), 1., smoothstep(.5, 1., distorts));
    distorts = smoothstep(0., .5, distorts);

    vec2 uv = imgUv;

    vec2 vignetteCoords = fract(imgUv * vec2(1.0, 1.0));
    float v1 = smoothstep(0.5, 0.2, abs(vignetteCoords.x - 0.5));
    float v2 = smoothstep(0.5, 0.2, abs(vignetteCoords.y - 0.5));
    float vignetteAmount = v1 * v2;
    vignetteAmount = pow(vignetteAmount, 0.5);
    vignetteAmount = map(vignetteAmount, 0.0, 1.0, 0., 1.0);
    float d3 = 1. - vignetteAmount;
    d3 = pow(d3, 4.);
    if (imgUv.x > 1. || imgUv.x < 0. || imgUv.y > 1. || imgUv.y < 0.) d3 = 1.;

    vec2 p = imgUv * 5.;
    vec2 p2 = imgUv * 5.;
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
    
    float d = (((pow(1. - (uv.y) * 2. + 1., .5))) - (sin(uv.x * PI * 1.5 - PI * .25)));
    float d_ = (((pow(1. - (uv.y) * 2. + 1., .5))) - (sin(uv.x * PI * 1.)) + sin(uv.x * 3.5 * PI) * .5 + sin(uv.x * 8. * PI) * .25 + sin(uv.x * 15. * PI) * .125);

    float ld = 2.;
    float ds = mix(d, d_, 1.);
    ds = mix(ds, xx, distorts);
    float ds2 = length(imgUv.xy + vec2(0.,.25) - .5)  + .75;
    ds2 = smoothUnionSDF(ds, ds2, .2);
    ds += rand(imgUv.xy + ds) * .006 * 0.5;
    float ts = mod(time - ds, ld) / ld;
    ts = mix(ts, xx, distorts);
    float wavs = ts * mix(290., 100., d3) + mix(400., 500., d3);
    vec3 cols = zuc(wavs, 0.);
    cols = mix(cols, zuc(wavs, 1.), smoothstep(0., .3333, uColors));
    cols = mix(cols, zuc(wavs, 2.), smoothstep(.3333, .6666, uColors));

    vec3 bg = vec3(193.)/255.;

    float delay1 = 1.;
    float t1 = 0.;
    float ts1 = delay1;
    float ld1 = 6.;
    float te1 = ts1 + ld1;
    if (uTime < ts1) t1 = 0.;
    else if (uTime < te1) t1 = map(uTime, ts1, te1, 0., 1.);
    else t1 = 1.;
    t1 = smoothstep(0., 1., t1);

    vec2 vUv_ = imgUv.xy;
    
    vec2 sx = vec2(
      cols.r * smoothstep(.6, 1., 1. - vUv_.y+.25) * sin(time + vUv_.x * 2.),
      cols.r * smoothstep(.55, 1., 1.-vUv_.y + .25)
    ) * t1 * (1.-d3);

    vec4 logo = texture2D(uLogo, vUv_ + sx);

    vec3 colLogo = mix(bg, vec3(27.)/255., logo.r);

    gl_FragColor = vec4(colLogo, logo.r);
  }
`;
