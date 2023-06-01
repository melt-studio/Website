// import { useEffect, useMemo, useRef } from "react";
// import { Vector2, Vector4 } from "three";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrthographicCamera, useTexture } from "@react-three/drei";
import FadeIn from "../../components/FadeIn/FadeIn.jsx";
import { keyframes } from "../../utils/keyframes.js";
import "./TextFeature.css";

// // import Archivo from "../../assets/fonts/Archivo-Regular.ttf";
// import image from "../../assets/images/TEXT.png";
// // import { Perf } from "r3f-perf";

// const vertexShader = /* glsl */ `
//   varying vec2 vUv;

//   uniform vec4 resolution;
//   uniform vec2 uMouse;
//   uniform float uTime;
//   uniform float uMobile;

//   float cubicInOut(float t) {
//     return t < 0.5 ? 4. * t * t * t : (t - 1.) * (2. * t - 2.) * (2. * t - 2.) + 1.;
//   }

//   void main() {
//     vec3 pos = position;

//     // pos.x *= resolution.y / resolution.x;
//     vec2 m = uMouse;
//     // m.x *= resolution.y / resolution.x;

//     // if (uMobile == 0.) {

//     //   vec2 dir = pos.xy - m;
//     //   float d = length(dir);
//     //   // dir = normalize(dir);
//     //   float r = .5;
//     //   float f = 0.;
//     //   if (d < r) f = 1. - d / r;
//     //   else f = 0.;
//     //   // f = sin(f * 3.14159 / 2.);
//     //   f = cubicInOut(f);
//     //   f *= .1;
//     //   pos.y += sin(uTime + pos.x * 10.) * f;
//     //   pos.x += sin(uTime + pos.y * 10.) * f;
//     // }

//     vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     vec4 projectionPosition = projectionMatrix * viewPosition;

//     gl_Position = projectionPosition;

//     vUv = uv;
//   }
// `;

// const fragmentShader = /* glsl */ `
//   varying vec2 vUv;

//   uniform vec4 resolution;
//   uniform float uTime;
//   uniform sampler2D uImage;
//   uniform vec2 uMouse;
//   uniform float uMobile;

//   float cubicInOut(float t) {
//     return t < 0.5 ? 4. * t * t * t : (t - 1.) * (2. * t - 2.) * (2. * t - 2.) + 1.;
//   }

//   void main() {
//     vec2 uv = vUv;
//     vec2 m = uMouse;

//     if (uMobile == 0.) {

//       vec2 dir = (uv * 2. - 1.) - m;
//       float d = length(dir);
//       // dir = normalize(dir);
//       float r = .5;
//       float f = 0.;
//       if (d < r) f = 1. - d / r;
//       else f = 0.;
//       // f = sin(f * 3.14159 / 2.);
//       f = cubicInOut(f);
//       f *= .1;
//       uv.y += sin(uTime + uv.x * 10.) * f;
//       uv.x += sin(uTime + uv.y * 10.) * f;
//     }

//     vec3 color = vec3(0.);
//     gl_FragColor = vec4(vec3(1., 1., 1.), 1.);
//     vec4 c = texture2D(uImage, uv);
//     gl_FragColor = vec4(c.rgb, c.r);
//   }
// `;

// const Mesh = ({ mobile }) => {
//   const tex = useTexture(image);

//   const mesh = useRef();

//   const uniforms = useMemo(() => {
//     const uniforms = {
//       uTime: { value: 0 },
//       uMobile: { value: 0 },
//       uMouse: { value: new Vector2() },
//       resolution: { value: new Vector4() },
//       uImage: { value: null },
//     };
//     return uniforms;
//   }, []);

//   const mouse = new Vector2();

//   const { viewport, size } = useThree();

//   useEffect(() => {
//     if (mesh.current) {
//       mesh.current.material.uniforms.resolution.value.set(viewport.width, viewport.height, size.width, size.height);
//     }
//   }, [viewport, size]);

//   useEffect(() => {
//     if (mesh.current) {
//       mesh.current.material.uniforms.uMobile.value = mobile ? 1 : 0;
//     }
//   }, [mobile]);

//   useEffect(() => {
//     if (mesh.current) {
//       mesh.current.material.uniforms.uImage.value = tex;
//     }
//   }, [tex]);

//   useFrame((state, delta) => {
//     if (mesh.current) {
//       mesh.current.material.uniforms.uTime.value += delta;

//       mouse.x += (state.mouse.x - mouse.x) * delta * 5;
//       mouse.y += (state.mouse.y - mouse.y) * delta * 5;

//       // mesh.current.material.uniforms.uMouse.value.set(state.mouse.x, state.mouse.y);
//       mesh.current.material.uniforms.uMouse.value.set(mouse.x, mouse.y);
//     }
//   });

//   return (
//     <>
//       <mesh ref={mesh}>
//         <planeGeometry args={[2, 2]} />
//         <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
//       </mesh>
//       {/* <Text
//         text={"WE'RE MELT"}
//         ref={mesh}
//         font={Archivo}
//         characters="WERMLT'"
//         glyphGeometryDetail={mobile ? 1 : 64}
//         fontSize={2}
//         letterSpacing={-0.05}
//         // maxWidth={viewport.width}

//         // textAlign="left"
//       >
//         <shaderMaterial
//           vertexShader={vertexShader}
//           fragmentShader={fragmentShader}
//           uniforms={uniforms}
//           // side={DoubleSide}
//         />
//       </Text> */}
//     </>
//   );
// };

keyframes`
  @keyframes customAnimationText {
    from {
      opacity: 0;
      transform: translate3d(0, 40px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const fadeInText = {
  name: "customAnimationText",
  duration: 2,
  delay: 0.5,
  // stagger: true,
  damping: 0.125,
};

const TextFeature = ({ mobile }) => {
  // const created = ({ gl }) => {
  //   // gl.setClearColor(0x0000ff);
  // };

  const strs = ["WE BRING", "STORIES", "TO LIFE"];
  const text = [];
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    text[i] = [];
    for (let j = 0; j < str.length; j++) {
      const s = str[j];
      text[i].push(
        <FadeIn key={`${s}_${i}_${j}`} {...fadeInText} delay={fadeInText.delay + fadeInText.damping * (j + i * 2)}>
          {s === " " ? <span>&nbsp;</span> : <span>{s}</span>}
        </FadeIn>
      );
    }
  }

  return (
    <>
      <div id="textFeature-container">
        {text.map((line, i) => (
          <div key={`about_line_${i}`}>{line}</div>
        ))}
        {/* <Canvas dpr={[1, 2]} onCreated={created}>
          <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={-1} far={1} />
          <Mesh mobile={mobile} />
        </Canvas> */}
      </div>
    </>
  );
};

export default TextFeature;
