// import Audio from "../components/Audio";
import Slider from "../../components/Slider";
import { useStore } from "../../store";

const Controls = () => {
  const ready = useStore((state) => state.ready);
  const background = useStore((state) => state.background);
  const setValue = useStore((state) => state.setValue);
  const { colors, waves, distortion } = useStore((state) => state.controls);

  const sliderColors = {
    label: "Color",
    value: colors,
    onChange: (value) => {
      setValue("controls", { waves, distortion, colors: value });
      if (background) {
        background.material.uniforms.uColors.value = value;
      }
    },
  };

  const sliderWaves = {
    label: "Drips",
    value: waves,
    onChange: (value) => {
      setValue("controls", { colors, distortion, waves: value });
      if (background) {
        background.material.uniforms.uWaves.value = value;
      }
    },
  };

  const sliderDistortion = {
    label: "Distort",
    value: distortion,
    onChange: (value) => {
      setValue("controls", { colors, waves, distortion: value });
      if (background) {
        background.material.uniforms.uDistortion.value = value;
      }
    },
  };

  const controlStyle = "control pl-6 md:pl-4.5 pr-1 md:pr-0 bg-white/10 hover:bg-white/40";

  return (
    <div
      className={`top-0 left-4 right-4 h-fit gap-2 justify-center flex flex-col md:flex-row flex-wrap items-center font-light text-xs pt-0 md:pt-0 transition-transform duration-2000 delay-2000 md:gap-4 ${
        ready ? "" : "-translate-y-[200%]"
      }`}
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
      {/* <Audio /> */}
    </div>
  );
};

export default Controls;
