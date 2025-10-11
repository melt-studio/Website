import Gradient from "./Gradient";
import Blob from "./Blob";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useStore } from "../../../stores/store";

const Scene = () => {
  const { size } = useThree();
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    setValue("viewport", {
      width: size.width,
      height: size.height,
      aspect: size.width / size.height,
    });
  }, [size, setValue]);

  return (
    <>
      <Gradient />
      <Blob />
    </>
  );
};

export default Scene;
