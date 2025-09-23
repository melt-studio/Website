export const rand = /* glsl */ `
  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }
`;

export const sdBox = /* glsl */ `
  float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
  }
`;

export const sdCircle = /* glsl */ `
  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }
`;

export const sdRoundedBox = /* glsl */ `
  float sdRoundedBox(vec2 p, vec2 b, vec4 r) {
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p)-b+r.x;
    return min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
  }
`;

export const sdEquilateralTriangle = /* glsl */ `
  float sdEquilateralTriangle(vec2 p, float r) {
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0*r, 0.0 );
    return -length(p)*sign(p.y);
  }
`;

export const smoothUnionSDF = /* glsl */ `
  float smoothUnionSDF(float distA, float distB, float k ) {
    float h = clamp(0.5 + 0.5*(distA-distB)/k, 0., 1.);
    return mix(distA, distB, h) - k*h*(1.-h); 
  }
`;

export const smoothDifferenceSDF = /* glsl */ `
  float smoothDifferenceSDF(float distA, float distB, float k) {
    float h = clamp(0.5 - 0.5*(distB+distA)/k, 0., 1.);
    return mix(distA, -distB, h ) + k*h*(1.-h); 
  }
`;

export const smoothIntersectSDF = /* glsl */ `
  float smoothIntersectSDF(float distA, float distB, float k) {
    float h = clamp(0.5 - 0.5*(distA-distB)/k, 0., 1.);
    return mix(distA, distB, h ) + k*h*(1.-h); 
  }
`;

export const map = /* glsl */ `
  float map(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }
`;

export const zuc = /* glsl */ `
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
`;

export const getTime = /* glsl */ `
  float mapLinear(float value, float min1, float max1, float min2, float max2) {
    return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  }

  float getTime(float time, float loopDuration, float delay) {
    float t = 0.;
    if (time < delay) t = 0.; 
    else if (time < delay + loopDuration) t = mapLinear(time, delay, delay + loopDuration, 0., 1.);
    else t = 1.;
    return t;
  }
`;

export const rotate2d = /* glsl */ `
  mat2 rotate2d(float _angle) {
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
  }
`;

export const atan2 = /* glsl */ `
  float atan2(in float y, in float x){
      float s = abs(x) > abs(y) ? 1. : 0.;
      return mix(PI/2.0 - atan(x,y), atan(y,x), s);
  }
`;

export const easeInOutCubic = /* glsl */ `
  float easeInOutCubic(float x) {
    float inValue = 4.0 * x * x * x;
    float outValue = 1.0 -pow(-2.0 * x + 2.0 ,3.0) /2.0;
    return step(inValue , 0.5) * inValue + step(0.5,outValue) * outValue;
  }
`;

export const getTexUv = /* glsl */ `
  struct Tex {
    vec2 uv;
    vec2 size;
  };

  Tex getTexUv(vec2 screenRes, vec2 texRes, bool cover, float margin) {
    vec2 screen = screenRes;

    float screenAspect = screenRes.x/screenRes.y;
    float texAspect = texRes.x/texRes.y;
    bool fitWidth2 = screenAspect < texAspect;

    float scale = 1. - margin * 2. / (fitWidth2 ? screen.x : screen.y);
    if (cover) scale = texAspect/screenAspect;
  
    vec2 uv = vUv;
    vec2 uvF = vec2(
      texRes.x / screen.x,
      texRes.y / screen.y
    );
    uv /= uvF;

    float offside = fitWidth2 ? screen.x / texRes.x : screen.y / texRes.y;

    vec2 uvOff = vec2(
      (screen.x - texRes.x * offside * scale),
      (screen.y - texRes.y * offside * scale)
    );
    uvOff *= .5;
    uvOff /= texRes.xy;
    uv -= uvOff;
    uv *= fitWidth2 ? texRes.x / screen.x : texRes.y / screen.y;
    uv /= scale; 

    float w = fitWidth2 ? scale * screenAspect : scale * texAspect;
    float h = fitWidth2 ? w / texAspect : scale;

    return Tex(uv, vec2(w, h));
  }
`;
