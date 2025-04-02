import { ChangeEvent } from "react";

type SliderProps = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

const Slider = ({ label, value, onChange, step = 0.01, min = 0, max = 1 }: SliderProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center grow justify-between md:justify-around">
      {label && <label>{label}</label>}
      <div className="flex items-center relative h-10 w-40">
        <div className="h-px absolute left-5 right-5 bg-white pointer-events-none"></div>
        <div className="h-10 absolute left-5 right-5 pointer-events-none">
          <div
            className="w-10 h-10 flex items-center justify-center absolute"
            style={{
              left: `${value * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <input
          type="range"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className={`
            relative
            appearance-none 
            w-full
            [&::-webkit-slider-runnable-track]:appearance-none 
            [&::-webkit-slider-runnable-track]:h-10
            [&::-webkit-slider-thumb]:w-10
            [&::-webkit-slider-thumb]:h-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:invisible
            [&::-moz-range-track]:appearance-none 
            [&::-moz-range-track]:h-10
            [&::-moz-range-thumb]:w-10
            [&::-moz-range-thumb]:h-10
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:invisible
          `}
        />
      </div>
    </div>
  );
};

export default Slider;
