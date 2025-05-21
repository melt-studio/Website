import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { WebGLRenderer } from "three";
import { useStore } from "../store";
import Controls from "../Controls/Controls";
import Scene from "../components/Scene";
import Logo from "../components/Logo";

const debug = process.env.NODE_ENV === "debug";

const Landing = () => {
  const setValue = useStore((state) => state.setValue);
  const ready = useStore((state) => state.ready);

  const glSettings = {
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const created = ({ gl }: { gl: WebGLRenderer }) => {
    gl.setClearColor(0x000000, 1);
    setValue("ready", true);
  };

  return (
    <>
      <div className="flex justify-center items-center h-dvh w-full text-white">
        <Canvas dpr={[1, 2]} gl={glSettings} onCreated={created}>
          {debug && <Perf position="bottom-left" />}
          <Scene />
        </Canvas>
      </div>

      <Text ready={ready} intro />
      <Text ready={ready} />
      <Text ready={ready} overlay />

      <Controls />
    </>
  );
};

const Text = ({ ready, overlay, intro }: { ready: boolean; overlay?: boolean; intro?: boolean }) => {
  return (
    <div
      className={`flex flex-col gap-12 items-center justify-center fixed top-1/2 left-1/2 px-5 -translate-1/2 text-center [transition:opacity_2s_2s,color_0.5s_0s] w-full tracking-tight mt-16 md:mt-0 ${
        intro ? "animate-[fade_4s_ease-in-out_0.5s_forwards]" : ""
      } ${ready ? "" : "opacity-0"} ${overlay || intro ? "" : "mix-blend-overlay"}`}
    >
      <div className="uppercase flex flex-col items-center justify-center font-regular leading-[1] gap-[calc(0.25vw+1.25rem)] text-xl md:text-[calc(0.15vw+1.3rem)]">
        <div className={`pointer-events-none ${overlay ? "invisible" : ""}`}>
          <p>
            MELT IS A CREATIVE STUDIO <span className="relative -top-0.5">—</span>
          </p>
          <p>OUR NEW SITE DROPS SOON</p>
        </div>
        <div>
          <p className={`pointer-events-none ${overlay ? "invisible" : ""}`}>FOR INQUIRIES</p>
          <p className={overlay ? "transition-opacity duration-500 opacity-0 hover:opacity-50" : ""}>
            <a href="mailto:hello@melt.works">
              <span>HELLO@MELT.WORKS</span>
              <span className={`h-px w-full bg-white mt-0.5 block`}></span>
            </a>
          </p>
        </div>
      </div>
      <Logo fill={overlay ? "#ffffff00" : "#ffffff"} />
    </div>
  );
};

export default Landing;
