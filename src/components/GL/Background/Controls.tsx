import Audio from "../../Audio";
import Slider from "../../Slider";
import { useStore } from "../../../stores/store";
import { motion } from "motion/react";

const Controls = () => {
  const background = useStore((state) => state.background);
  const setValue = useStore((state) => state.setValue);
  const { colors, waves, distortion } = useStore((state) => state.controls);
  const viewport = useStore((state) => state.viewport);

  const sliderColors = {
    label: "Color",
    value: colors,
    onChange: (value: number) => {
      setValue("controls", { waves, distortion, colors: value });
      if (background) {
        background.material.uniforms.uColors.value = value;
      }
    },
  };

  const sliderWaves = {
    label: "Drips",
    value: waves,
    onChange: (value: number) => {
      setValue("controls", { colors, distortion, waves: value });
      if (background) {
        background.material.uniforms.uWaves.value = value;
      }
    },
  };

  const sliderDistortion = {
    label: "Distort",
    value: distortion,
    onChange: (value: number) => {
      setValue("controls", { colors, waves, distortion: value });
      if (background) {
        background.material.uniforms.uDistortion.value = value;
      }
    },
  };

  const controlStyle = "control pl-6 md:pl-3 xl:pl-4 pr-1 md:pr-0 bg-white/10 hover:bg-white/40";

  return (
    <motion.div
      initial={{
        transform: viewport.width < 768 ? "translate3d(0px, 25%, 0px)" : "translate3d(0px, 100%, 0px)",
        opacity: 0,
      }}
      animate={{ transform: "translate3d(0px, 0%, 0px)", opacity: 1 }}
      transition={{ duration: 2, delay: 2 }}
      className={
        "h-fit gap-1.5 xl:gap-2 justify-center flex flex-col grow lg:flex-row items-start lg:items-center text-xs relative md:-top-2"
      }
    >
      <div className={controlStyle}>
        <Slider {...sliderColors} />
      </div>
      <div className={controlStyle}>
        <Slider {...sliderWaves} />
      </div>
      <div className={controlStyle}>
        <Slider {...sliderDistortion} />
      </div>
      <Audio />
    </motion.div>
  );
};

export default Controls;
