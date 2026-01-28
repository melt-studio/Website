import Audio from "../../Audio";
import Slider from "../../Slider";
import { useStore } from "../../../stores/store";
import { Easing, motion, stagger } from "motion/react";
import config from "../../../config.json";

const Controls = () => {
  const background = useStore((state) => state.background);
  const setValue = useStore((state) => state.setValue);
  const { colors, waves, distortion } = useStore((state) => state.controls);
  const viewport = useStore((state) => state.viewport);
  const pathname = useStore((state) => state.pathname);

  if (pathname !== "/dissolve") return null;

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

  const parentVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        duration: 0,
        delayChildren: stagger(0.333, { startDelay: 2.5 + 7.5 }),
        ease: "easeInOut" as Easing,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      transform:
        viewport.width < config.breakpoints.mobile ? "translate3d(0px, 25%, 0px)" : "translate3d(0px, 100%, 0px)",
    },
    show: {
      transform: "translate3d(0px, 0%, 0px)",
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      animate="show"
      className={
        "h-fit gap-1.5 xl:gap-2 justify-center items-center flex flex-col grow lg:flex-row text-xs relative md:-top-2 xl:-top-1.5"
      }
    >
      <motion.div variants={childVariants} className={controlStyle}>
        <Slider {...sliderColors} />
      </motion.div>
      <motion.div variants={childVariants} className={controlStyle}>
        <Slider {...sliderWaves} />
      </motion.div>
      <motion.div variants={childVariants} className={controlStyle}>
        <Slider {...sliderDistortion} />
      </motion.div>
      <motion.div variants={childVariants}>
        <Audio />{" "}
      </motion.div>
    </motion.div>
  );
};

export default Controls;
