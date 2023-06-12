import { useMemo, useEffect, useRef } from "react";
import { Color, MathUtils, Vector2 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";
import "./Background.css";
// import { Perf } from "r3f-perf";

import vertexShader from "./shaders/vertex";
import fragmentShader from "./shaders/fragment";

const Background = ({
  backgroundColor,
  multiple = false,
  multiColors = [0x000000, 0x333333],
  multiLoaded = false,
  viewport,
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
      uScroll: { value: 0 },
      uMultiLoaded: { value: new Vector2(0, 0) },
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
            multiLoaded={multiLoaded}
            viewport={viewport}
          />
          {/* <Perf /> */}
        </Canvas>
      </div>
    </>
  );
};

const Mesh = ({ background, background1, background2, uniforms, multiColors, multiple, multiLoaded, viewport }) => {
  const [styles1, styles2, color1, color2] = useMemo(() => {
    const styles1 = background1 && background1.current ? window.getComputedStyle(background1.current) : null;
    const styles2 = background2 && background2.current ? window.getComputedStyle(background2.current) : null;
    const color1 = new Color();
    const color2 = new Color();
    return [styles1, styles2, color1, color2];
  }, [background1, background2]);

  const { clock } = useThree();

  const scroll = useMemo(() => new Vector2(), []);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // if (mobile) return;

    // const sMax = document.body.offsetHeight - viewport.height;
    // const s = scrollCutOff > sMax ? sMax / 2 : scrollCutOff;

    // const s = 50;
    // console.log(latest, scrollCutOff, document.body.offsetHeight, sMax, s);

    scroll.x = MathUtils.clamp(latest, 0, window.innerHeight / 2);

    // console.log(l, window.innerHeight / l);

    // if (background.current) {
    //   background.current.material.uniforms.uScroll.value = l / (window.innerHeight / 2);
    // }

    // if (isVisible && latest >= s) {
    //   setIsVisible(false);
    // } else if (!isVisible && latest < s) {
    //   setIsVisible(true);
    // }
  });

  useFrame((state, delta) => {
    if (background.current) {
      // background.current.material.uniforms.uScroll.value = l / (window.innerHeight / 2);
      scroll.y = MathUtils.damp(scroll.y, scroll.x, 2, delta);
      // console.log(scroll.x);
      // scroll.y = MathUtils.clamp(scroll.y, 0, window.innerHeight / 2);
      // scroll.y += (scroll.x - scroll.y) * 0.9;
      // console.log(scroll.x, scroll.y);
      background.current.material.uniforms.uScroll.value = scroll.y / (window.innerHeight / 2);
    }
  });

  useEffect(() => {
    if (background.current) {
      multiColors.forEach((c, i) => {
        background.current.material.uniforms[`uC${i}`].value = new Color(c);
      });

      // console.log(background.current.material.uniforms);

      // console.log(multiColors.length);
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
