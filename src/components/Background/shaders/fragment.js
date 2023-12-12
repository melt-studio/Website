const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  uniform float uCount;
  uniform float uMultiple;
  uniform vec2 uMultiLoaded;
  uniform float uScroll;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;
  uniform float uCursor;

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float f = 1. - vUv.y;

    float tf = 1. - uMultiple * .5;

    float speed = .5;
    float time = uTime * speed;

    vec2 vUv2 = vUv + sin(vUv.x * 4. + time * .25 * tf) - cos(-vUv.y * 3. + vUv.x * 0. - time * .333/2.* tf);
    f = sin(length(vUv2) + time * .25 * tf + uC0.r + uC1.g + uC2.b) * .5 + .5;
    f += sin(-vUv.x * 4.- vUv.y * 2.+ length(vUv) * sin(time * .25 * tf) + sin(vUv.y * 4. + time * .125 * tf + uC2.r + uC3.g + uC4.b) + time * .25 * tf + sin(-vUv.x * vUv.y + time * .25 * tf + uC1.g - uC2.r + uC3.g) * 2.) * .5 + .5;
    f /= 2.;
    // float ff = uMultiple == 1. ? .05 : .1;
    float ff = uMultiple == 1. ? .05 : .333;
    // 27/11/23 reduced blur
    f = mix(
      smoothstep(.4, .55, f * mix(1., ((1.-ff) + ff * rand(vec2(f))), .1)),
      smoothstep(.15, .85, f * mix(1., (1.-ff) + ff * rand(vec2(f)), .1)),
      uCursor
    );
    f = clamp(f, 0., 1.);

    vec3 color = mix(uColor1, uColor2, f);
    vec3 m2 = mix(mix(vec3(0.), vec3(51./255.)*0., f), vec3(1.), uCursor);

    if (uMultiple == 1.) {
      color = vec3(uCursor);

      if (uMultiLoaded.x == 1.) {
        vec3 colorA = uC0;
        float stopA = 0.;
        for (float i = 1.; i < uCount; i++) {
          vec3 cB = uC1;
          if (i == 2.) cB = uC2;
          if (i == 3.) cB = uC3;
          if (i == 4.) cB = uC4;
          vec3 colorB = cB;
          float stopB = i / uCount;
          float fc = smoothstep(stopA , stopB, f);
          colorA = mix(colorA, colorB, fc);
          stopA = stopB;
        }
  
        color = colorA;
        color = mix(color, m2, uScroll * (1.-uCursor));
      }
    }

    if (uMultiLoaded.x == 1.) {
      float t = 0.;
      float ld = 2.;
      if (uTime < uMultiLoaded.y) t = 0.;
      else if (uTime < uMultiLoaded.y + ld) t = (uTime - uMultiLoaded.y) / ld;
      else t = 1.;
      color = mix(vec3(uCursor), color, t);
    }

    gl_FragColor = vec4(color, 1.);
  }
`;

export default fragmentShader;
