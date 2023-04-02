import { useEffect, useMemo } from "react";
import { Color } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

// export const setBackground = (color, ref) => {
//   let c = [];
//   if (color && typeof color === "string" && color.length > 0) {
//     c = color.split(",").map((hex) => hex.trim());
//   }

//   console.log("c", c);

//   if (ref && ref.current) {
//     if (c[0]) {
//       ref.current.material.uniforms.uColor5.value = ref.current.material.uniforms.uColor3.value;
//       ref.current.material.uniforms.uColor3.value = ref.current.material.uniforms.uColor1.value;
//       ref.current.material.uniforms.uColor1.value = new Color(c[0]).convertLinearToSRGB();
//     }

//     if (c[1]) {
//       ref.current.material.uniforms.uColor6.value = ref.current.material.uniforms.uColor4.value;
//       ref.current.material.uniforms.uColor4.value = ref.current.material.uniforms.uColor2.value;
//       ref.current.material.uniforms.uColor2.value = new Color(c[1]).convertLinearToSRGB();
//     } else {
//       ref.current.material.uniforms.uColor6.value = ref.current.material.uniforms.uColor4.value;
//       ref.current.material.uniforms.uColor4.value = ref.current.material.uniforms.uColor2.value;
//       ref.current.material.uniforms.uColor2.value = new Color(c[0]).convertLinearToSRGB();
//     }

//     ref.current.material.uniforms.uFadeLast.value = ref.current.material.uniforms.uFade.value;
//     ref.current.material.uniforms.uFade.value = ref.current.material.uniforms.uTime.value;

//     console.log(ref.current.material.uniforms.uFade.value);

//     // console.log(
//     //   ref.current.material.uniforms.uColor1.value,
//     //   ref.current.material.uniforms.uColor2.value,
//     //   ref.current.material.uniforms.uColor3.value,
//     //   ref.current.material.uniforms.uColor4.value
//     // );
//   }
// };

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform vec3 uColor1;
  uniform vec3 uColor2;
  // uniform vec3 uColor2;
  // uniform vec3 uColor3;
  // uniform vec3 uColor4;
  // uniform vec3 uColor5;
  // uniform vec3 uColor6;
  // uniform float uTime;
  // uniform float uFade;
  // uniform float uFadeLast;

  // float quadraticInOut(float t) {
  //   float p = 2.0 * t * t;
  //   return t < 0.5 ? p : -p + (4.0 * t) - 1.0;
  // }

  // float map(float value, float min1, float max1, float min2, float max2) {
  //   return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
  // }

  void main() {
    vec3 color = vec3(0.);

    // float ld = 1.; // 1s ease
    // float t = 0.;
 
    // // float tLast = 1.;
    // // if (uFadeLast >= 0. && (uFade - uFadeLast) < ld) {
    // //   // float uTime2 = uTime - (uFade - uFadeLast);
    // //   // if (uTime2 < uFadeLast) tLast = 0.;
    // //   // else if (uTime2 < uFadeLast + ld) tLast = map(uTime2, uFadeLast, uFadeLast + ld, 0., 1.);
    // //   // else tLast = 1.;

    // //   tLast = map(uFade, uFadeLast, uFadeLast + ld, 0., 1.);
    // // }
    // // tLast = clamp(tLast, 0., 1.);



    // float tLast = clamp(map(uFade, uFadeLast, uFadeLast + ld, 0., 1.), 0., 1.);

    // // if (uFadeLast >= 0. && (uFade - uFadeLast) < ld && (uTime - uFade) < ld) {
    // //   float ts0 = tLast; // last t value
    // //   float fd0 = (1.-ts0) * ld; //
    // //   if (uTime < uFade) t = ts0;
    // //   else if (uTime < uFade + fd0) t = map(uTime, uFade, uFade + fd0, ts0, 1.);
    // //   else t = 1.;
    // // } else {
    // //   // do normal fade
    // //   if (uTime < uFade) t = 0.;
    // //   else if (uTime < uFade + ld) {
    // //     // t = (uFade + ld - uTime) / ld;
    // //     t = map(uTime, uFade, uFade + ld, 0., 1.);
    // //   }
    // //   else t = 1.;
    // // }

    // if (uTime < uFade) t = 0.;
    // else if (uTime < uFade + ld) {
    //   // t = (uFade + ld - uTime) / ld;
    //   t = map(uTime, uFade, uFade + ld, 0., 1.);
    // }
    // else t = 1.;

    // // t = quadraticInOut(t);

    // vec3 uColor1P = mix(uColor5, uColor3, tLast);
    // vec3 uColor2P = mix(uColor6, uColor4, tLast);

    // color = mix(mix(uColor1P, uColor1, t), mix(uColor2P, uColor2, t), 1.-vUv.y);
    // gl_FragColor = vec4(pow(color, vec3(1./2.2)), 1.);
    gl_FragColor = vec4(mix(uColor1, uColor2, 1.-vUv.y), 1.);
  }
`;

const Background = ({ background, background1, background2 }) => {
  // const ref = useRef();

  const uniforms = useMemo(() => {
    const uniforms = {
      uColor1: { value: new Color(0x000000) },
      uColor2: { value: new Color(0x000000) },
      // uColor1: { value: new Color(0x000000) },
      // uColor2: { value: new Color(0x000000) },
      // uColor3: { value: new Color(0x000000) },
      // uColor4: { value: new Color(0x000000) },
      // uColor5: { value: new Color(0x000000) },
      // uColor6: { value: new Color(0x000000) },
      // uTime: { value: 0 },
      // uFade: { value: 0 },
      // uFadeLast: { value: -1 },
    };
    return uniforms;
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Canvas dpr={[1, 2]}>
        <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={-1} far={1} />
        <Mesh background={background} background1={background1} background2={background2} uniforms={uniforms} />
        {/* <mesh ref={background}>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
        </mesh> */}
      </Canvas>
    </div>
  );
};

const Mesh = ({ background, background1, background2, uniforms }) => {
  const [styles1, styles2, color1, color2] = useMemo(() => {
    // console.log(background1);
    const styles1 = background1 && background1.current ? window.getComputedStyle(background1.current) : null;
    const styles2 = background2 && background2.current ? window.getComputedStyle(background2.current) : null;
    const color1 = new Color();
    const color2 = new Color();
    return [styles1, styles2, color1, color2];
  }, [background1, background2]);

  useFrame((_state, delta) => {
    if (background && background.current) {
      // background.current.material.uniforms.uTime.value += delta;

      if (styles1) {
        const c = styles1.getPropertyValue("background-color");
        const rgb = c
          .replace("rgb(", "")
          .replace(")", "")
          .split(",")
          .map((s) => Number(s.trim()) / 255);
        background.current.material.uniforms.uColor1.value = color1.setRGB(...rgb);
        // console.log(background.current.material.uniforms.uColor1.value);
      }
      if (styles2) {
        const c = styles2.getPropertyValue("background-color");
        const rgb = c
          .replace("rgb(", "")
          .replace(")", "")
          .split(",")
          .map((s) => Number(s.trim()) / 255);
        background.current.material.uniforms.uColor2.value = color2.setRGB(...rgb);
        // console.log(background.current.material.uniforms.uColor2.value);
      }
    }
  });

  return (
    <mesh ref={background}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
};

export default Background;
