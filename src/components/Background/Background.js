import { useMemo, useEffect, useRef } from "react";
import { Color } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import "./Background.css";
import { Perf } from "r3f-perf";

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
  uniform float uTime;

  uniform float uCount;
  uniform float uMultiple;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uC4;

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float f = 1. - vUv.y;
    // f = smoothstep(.35, 1., f);
    // f = smoothstep(.5, 1., f);
    vec2 vUv2 = vUv + sin(vUv.x * 4. + uTime * .25) - cos(-vUv.y * 3. + vUv.x * 0. - uTime * .333/2.);
    f = sin(length(vUv2) + uTime * .25) * .5 + .5;
    f += sin(-vUv.x * 4.- vUv.y * 2.+ length(vUv) * sin(uTime * .25) + sin(vUv.y * 4. + uTime * .125) + uTime * .25 + sin(-vUv.x * vUv.y + uTime * .25) * 2.) * .5 + .5;
    f /= 2.;
    // f = smoothstep(.3, .7, f);
    f = smoothstep(.15, .85, f * (.9 + .1 *rand(vec2(f))));
    // f = smoothstep(.45, .55, f);
    f = clamp(f, 0., 1.);
    // f = smoothstep(.3, .7, f);

    vec3 color = mix(uColor1, uColor2, f);

    if (uMultiple == 1.) {
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
    }

    gl_FragColor = vec4(color, 1.);
  }
`;

const Background = ({
  backgroundColor,
  multiple = false,
  multiColors = [0x000000, 0xffffff, 0xff0000, 0x0000ff, 0x00ff00],
}) => {
  const background = useRef();
  const background1 = useRef();
  const background2 = useRef();

  const uniforms = useMemo(() => {
    const uniforms = {
      uColor1: { value: new Color(0x000000) },
      uColor2: { value: new Color(0x000000) },
      uTime: { value: 0 },
      uCount: { value: 2 },
      uMultiple: { value: 0 },
      uC0: { value: new Color() },
      uC1: { value: new Color() },
      uC2: { value: new Color() },
      uC3: { value: new Color() },
      uC4: { value: new Color() },
    };

    return uniforms;
  }, []);

  useEffect(() => {
    const color = backgroundColor;
    let c = [];
    if (color && typeof color === "string" && color.length > 0) {
      c = color.split(",").map((hex) => hex.trim());
    }

    if (background1 && background1.current) {
      if (c[0]) {
        background1.current.style.backgroundColor = c[0];
      } else {
        background1.current.style.backgroundColor = "#000000";
      }
    }

    if (background2 && background2.current) {
      if (c[1]) {
        background2.current.style.backgroundColor = c[1];
      } else {
        background2.current.style.backgroundColor = background1.current.style.backgroundColor;
      }
    }
  }, [backgroundColor]);

  return (
    <>
      <div id="background">
        <div ref={background1}></div>
        <div ref={background2}></div>
      </div>
      <div
        id="background-container"
        // style={{
        //   width: "100%",
        //   height: "100vh",
        //   zIndex: -1,
        //   pointerEvents: "none",
        //   position: "fixed",
        //   left: 0,
        //   top: 0,
        // }}
      >
        <Canvas dpr={[1, 2]}>
          <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={-1} far={1} />
          <Mesh
            background={background}
            background1={background1}
            background2={background2}
            uniforms={uniforms}
            multiple={multiple}
            multiColors={multiColors}
          />
          <Perf />
        </Canvas>
      </div>
    </>
  );
};

const Mesh = ({ background, background1, background2, uniforms, multiColors, multiple }) => {
  const [styles1, styles2, color1, color2] = useMemo(() => {
    const styles1 = background1 && background1.current ? window.getComputedStyle(background1.current) : null;
    const styles2 = background2 && background2.current ? window.getComputedStyle(background2.current) : null;
    const color1 = new Color();
    const color2 = new Color();
    return [styles1, styles2, color1, color2];
  }, [background1, background2]);

  useEffect(() => {
    if (background.current) {
      multiColors.forEach((c, i) => {
        background.current.material.uniforms[`uC${i}`].value = new Color(c);
      });

      background.current.material.uniforms.uCount.value = multiColors.length;
      background.current.material.uniforms.uMultiple.value = multiple ? 1 : 0;
    }
  }, [multiColors, multiple, background]);

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

  useFrame((state, delta) => {
    if (background.current) {
      background.current.material.uniforms.uTime.value += delta;
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
