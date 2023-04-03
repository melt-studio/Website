import { useMemo } from "react";
import { Color } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

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

  void main() {
    vec3 color = vec3(0.);
    gl_FragColor = vec4(mix(uColor1, uColor2, 1.-vUv.y), 1.);
  }
`;

const Background = ({ background, background1, background2 }) => {
  const uniforms = useMemo(() => {
    const uniforms = {
      uColor1: { value: new Color(0x000000) },
      uColor2: { value: new Color(0x000000) },
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

  useFrame(() => {
    if (background && background.current) {
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
