import { useEffect, useMemo, useRef } from "react";
import { Color, Vector2, Vector3, Vector4, VideoTexture } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { vertexShader } from "./shaders/vertex";
import { fragmentShader } from "./shaders/fragment";

import config from "../../config.json";

import { useStore } from "../../stores/store";
import { BackgroundMesh } from "../../types";
import { useLocation } from "react-router";
import { useTexture } from "@react-three/drei";
import logoImage from "../../assets/logo.png";
import logoImage2 from "../../assets/logo2.png";

useTexture.preload([logoImage, logoImage2]);

// type BackgroundProps = {
//   bg1: RefObject<HTMLDivElement | null>;
//   bg2: RefObject<HTMLDivElement | null>;
// };

const Background = () => {
  const location = useLocation();
  const setValue = useStore((state) => state.setValue);
  const activeProject = useStore((state) => state.activeProject);
  const gradient = useStore((state) => state.gradient);
  const video = useStore((state) => state.video);
  // const ready = useStore((state) => state.ready);
  const ref = useRef<BackgroundMesh>(null);

  useEffect(() => {
    if (ref.current) setValue("background", ref.current);
  }, [ref, setValue]);

  const [logo, logo2] = useTexture([logoImage, logoImage2]);

  const { size } = useThree();

  const mouse = useMemo(() => new Vector2(), []);

  useEffect(() => {
    console.log("adding listener");
    const listener = (e: MouseEvent) => {
      // console.log(e.screenX, e.screenY);
      const { width, height } = useStore.getState().viewport;
      const x = (e.clientX / width) * 2 - 1;
      const y = (1 - e.clientY / height) * 2 - 1;
      // console.log(x, y);
      // if (ref.current) {
      //   ref.current.material.uniforms.uMouse.value.x += (x - ref.current.material.uniforms.uMouse.value.x) * 0.05;
      //   ref.current.material.uniforms.uMouse.value.y += (y - ref.current.material.uniforms.uMouse.value.y) * 0.05;
      // }
      mouse.set(x, y);
    };
    window.addEventListener("mousemove", listener);

    return () => window.removeEventListener("mousemove", listener);
  }, [mouse]);

  // const videoTexture = useVideoTexture(video)
  const tex = useMemo(() => {
    if (video) {
      return new VideoTexture(video);
    }
    return null;
  }, [video]);

  useEffect(() => {
    if (tex && ref.current) {
      // console.log(tex);
      ref.current.material.uniforms.uVideo.value = tex;
    }
  }, [tex]);

  // const progress = useProgress();

  // console.log(progress);

  const [uniforms] = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uColors: { value: config.controls.colors },
      uTheme: { value: new Vector3() },
      uTheme0: { value: new Color() },
      uTheme1: { value: new Color() },
      uWaves: { value: config.controls.waves },
      uDistortion: { value: config.controls.distortion },
      uResolution: {
        value: new Vector4(0, 0, 1024, 1024),
      },
      PI: { value: Math.PI },
      uLogo: { value: null },
      uLogo2: { value: null },
      uVideo: { value: null },
      uVideoPlaying: { value: new Vector2() },
      uVideoResolution: { value: new Vector4() },
      uMode: {
        value: new Vector4(),
      },
      uMouse: {
        value: new Vector2(),
      },
      uScroll: {
        value: 0,
      },
    };

    return [uniforms];
  }, []);

  const style = useMemo(() => {
    // const style = gradient ? window.getComputedStyle(gradient) : null;
    // const s2 = bg2 ? window.getComputedStyle(bg2) : null;
    // const s3 = bg3 ? window.getComputedStyle(bg3) : null;
    // const color1 = new Color(0xc1c1c1);
    // const color2 = new Color(0xc1c1c1);
    // return { s1, s2, s3 };
    return gradient ? window.getComputedStyle(gradient) : null;
  }, [gradient]);

  useEffect(() => {
    if (logo && ref.current) {
      ref.current.material.uniforms.uLogo.value = logo;
    }
  }, [logo, ref]);

  useEffect(() => {
    if (logo2 && ref.current) {
      ref.current.material.uniforms.uLogo2.value = logo2;
    }
  }, [logo2, ref]);

  useEffect(() => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uResolution.value.x = size.width;
      ref.current.material.uniforms.uResolution.value.y = size.height;
    }

    setValue("viewport", {
      width: size.width,
      height: size.height,
    });
  }, [size, setValue]);

  // useEffect(() => {
  //   if (!ref.current || !ref.current.material || !gradient) return;

  //   if (activeProject && activeProject.theme) {
  //     // ref.current.material.uniforms.uTheme2.value.copy(ref.current.material.uniforms.uTheme0.value);
  //     // ref.current.material.uniforms.uTheme3.value.copy(ref.current.material.uniforms.uTheme1.value);
  //     // activeProject.theme.forEach((hex, i) => {
  //     //   if (ref.current && ref.current.material) ref.current.material.uniforms[`uTheme${i}`].value.set(hex);
  //     // });
  //     gradient.style.backgroundColor = activeProject.theme[0];
  //     gradient.style.borderColor = activeProject.theme[1];
  //     gradient.style.opacity = "100%";

  //     // ref.current.material.uniforms.uTheme.value.set(
  //     //   1,
  //     //   ref.current.material.uniforms.uTheme.value.x,
  //     //   ref.current.material.uniforms.uTime.value
  //     // );
  //   } else {
  //     // ref.current.material.uniforms.uTheme.value.set(
  //     //   0,
  //     //   ref.current.material.uniforms.uTheme.value.x,
  //     //   ref.current.material.uniforms.uTime.value
  //     // );

  //     gradient.style.backgroundColor = "#c1c1c1";
  //     gradient.style.borderColor = "#c1c1c1";
  //     gradient.style.opacity = "0%";
  //     // ref.current.material.uniforms.uTheme2.value.copy(ref.current.material.uniforms.uTheme0.value);
  //     // ref.current.material.uniforms.uTheme3.value.copy(ref.current.material.uniforms.uTheme1.value);
  //   }
  // }, [activeProject, gradient]);

  useEffect(() => {
    // console.log(location.pathname);
    if (ref.current && gradient) {
      // ref.current.material.uniforms.uMode.value.x = ref.current.material.uniforms.uMode.value.y;

      // if (location.pathname === "/") ref.current.material.uniforms.uMode.value.y = 0;
      // else ref.current.material.uniforms.uMode.value.y = 1;

      // uTheme.x / 0 = logo, 1 = gradient
      if (location.pathname === "/") {
        ref.current.material.uniforms.uTheme.value.x = 0;
        gradient.style.opacity = "0%";
        gradient.style.backgroundColor = "#c1c1c1";
        gradient.style.borderColor = "#c1c1c1";
      } else {
        ref.current.material.uniforms.uTheme.value.x = 1;
        gradient.style.opacity = "100%";

        if (location.pathname.includes("/work/") && activeProject) {
          gradient.style.backgroundColor = activeProject.theme[0];
          gradient.style.borderColor = activeProject.theme[1];
        }
      }

      // uTheme.z / 0 = default, 1 = project
      if (location.pathname === "/" || location.pathname.includes("/work/")) {
        gradient.style.scale = "1";
      } else {
        gradient.style.scale = "0";
        // gradient.style.backgroundColor = "#c1c1c1";
        // gradient.style.borderColor = "#c1c1c1";
      }

      // console.log(location.pathname, ref.current.material.uniforms.uTheme.value.x);

      // ref.current.material.uniforms.uMode.value.z = ref.current.material.uniforms.uTime.value;
      // if (location.pathname !== "/") ref.current.material.uniforms.uMode.value.w = 0;
    }
  }, [location.pathname, gradient, activeProject]);

  useFrame((_state, delta) => {
    if (ref.current && ref.current.material) {
      ref.current.material.uniforms.uTime.value += delta;

      if (location.pathname === "/") {
        // const s = Math.max(0, Math.min(window.scrollY / size.height, 1));
        const s = window.scrollY / size.height;
        // console.log(s);
        ref.current.material.uniforms.uScroll.value += (s - ref.current.material.uniforms.uScroll.value) * 0.05;

        ref.current.material.uniforms.uMouse.value.x += (mouse.x - ref.current.material.uniforms.uMouse.value.x) * 0.15;
        ref.current.material.uniforms.uMouse.value.y += (mouse.y - ref.current.material.uniforms.uMouse.value.y) * 0.15;
      }
    }

    // console.log(_state.pointer);

    if (ref.current && ref.current.material && style) {
      const c0 = style.getPropertyValue("background-color");
      const rgb0 = c0
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map((s) => Number(s.trim()) / 255);
      ref.current.material.uniforms.uTheme0.value.setRGB(rgb0[0], rgb0[1], rgb0[2]);

      const c1 = style.getPropertyValue("border-color");
      const rgb1 = c1
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map((s) => Number(s.trim()) / 255);
      ref.current.material.uniforms.uTheme1.value.setRGB(rgb1[0], rgb1[1], rgb1[2]);

      // uTheme.y = transition between project colors and logo color
      const o = style.getPropertyValue("opacity");
      ref.current.material.uniforms.uTheme.value.y = o;

      // uTheme.z = transition between project colors and drippy color
      const s = style.getPropertyValue("scale");
      ref.current.material.uniforms.uTheme.value.z = s;
      // console.log(s);
    }
  });

  return (
    <mesh ref={ref} visible={!location.pathname.includes("/docs/")}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
  );
};

export default Background;
