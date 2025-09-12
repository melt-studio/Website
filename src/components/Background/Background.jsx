import { useMemo, useEffect, useRef } from "react";
import { Color, MathUtils, Vector2 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";
import "./Background.css";

import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";

const Background = ({
  backgroundColor,
  multiple = false,
  multiColors = [0xc1c1c1, 0xc1c1c1],
  multiLoaded = false,
  viewport,
  cursor = false,
}) => {
  const background = useRef();
  const background1 = useRef();
  const background2 = useRef();
  const backgroundContainer = useRef();

  // useEffect(() => {
  //   const updateCursorPos = (e) => {
  //     if (backgroundContainer && backgroundContainer.current && cursor) {
  //       backgroundContainer.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  //     }
  //   };

  //   document.addEventListener("mousemove", updateCursorPos);

  //   return () => {
  //     document.removeEventListener("mousemove", updateCursorPos);
  //   };
  // }, [cursor]);

  const uniforms = useMemo(() => {
    const uniforms = {
      uColor1: { value: new Color(0xc1c1c1) },
      uColor2: { value: new Color(0xc1c1c1) },
      uTime: { value: 0 },
      uCount: { value: 2 },
      uMultiple: { value: 0 },
      uC0: { value: new Color(0xc1c1c1) },
      uC1: { value: new Color(0xc1c1c1) },
      uC2: { value: new Color(0xc1c1c1) },
      uC3: { value: new Color(0xc1c1c1) },
      uC4: { value: new Color(0xc1c1c1) },
      uScroll: { value: 0 },
      uMultiLoaded: { value: new Vector2(0, 0) },
      uCursor: { value: cursor },
    };

    return uniforms;
  }, [cursor]);

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
        background1.current.style.backgroundColor = "#C1C1C1";
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
      <div ref={backgroundContainer} id="background-container">
        <Canvas dpr={cursor ? 1 : [1, 2]}>
          <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={-1} far={1} />
          <Mesh
            background={background}
            background1={background1}
            background2={background2}
            uniforms={uniforms}
            multiple={multiple}
            multiColors={multiColors}
            multiLoaded={multiLoaded}
            viewport={viewport}
            cursor={cursor}
            backgroundContainer={backgroundContainer}
          />
        </Canvas>
      </div>
    </>
  );
};

const Mesh = ({ background, background1, background2, uniforms, multiColors, multiple, multiLoaded }) => {
  const [styles1, styles2, color1, color2] = useMemo(() => {
    const styles1 = background1 && background1.current ? window.getComputedStyle(background1.current) : null;
    const styles2 = background2 && background2.current ? window.getComputedStyle(background2.current) : null;
    const color1 = new Color(0xc1c1c1);
    const color2 = new Color(0xc1c1c1);
    return [styles1, styles2, color1, color2];
  }, [background1, background2]);

  const { clock } = useThree();

  const scroll = useMemo(() => new Vector2(), []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    scroll.x = MathUtils.clamp(latest, 0, window.innerHeight / 2);
  });

  useFrame((state, delta) => {
    if (background.current) {
      scroll.y = MathUtils.damp(scroll.y, scroll.x, 2, delta);
      background.current.material.uniforms.uScroll.value = scroll.y / (window.innerHeight / 2);
    }
  });

  useEffect(() => {
    if (background.current) {
      multiColors.forEach((c, i) => {
        background.current.material.uniforms[`uC${i}`].value = new Color(c);
      });

      background.current.material.uniforms.uCount.value = multiColors.length;
      background.current.material.uniforms.uMultiple.value = multiple ? 1 : 0;
    }
  }, [multiColors, multiple, background]);

  useEffect(() => {
    if (background.current && multiLoaded) {
      background.current.material.uniforms.uMultiLoaded.value.set(1, clock.elapsedTime);
    }
  }, [multiLoaded, background, clock]);

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
      }
      if (styles2) {
        const c = styles2.getPropertyValue("background-color");
        const rgb = c
          .replace("rgb(", "")
          .replace(")", "")
          .split(",")
          .map((s) => Number(s.trim()) / 255);
        background.current.material.uniforms.uColor2.value = color2.setRGB(...rgb);
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
