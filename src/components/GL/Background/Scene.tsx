import Gradient from "./Gradient";
import Blob from "./Blob";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useStore } from "../../../stores/store";
import { useLocation } from "react-router";

const Scene = () => {
  const { size } = useThree();
  const setValue = useStore((state) => state.setValue);
  const location = useLocation();

  const docs = location.pathname.includes("/docs/");

  useEffect(() => {
    setValue("viewport", {
      width: size.width,
      height: size.height,
      aspect: size.width / size.height,
    });
  }, [size, setValue]);

  if (docs) return null;

  return (
    <>
      <Gradient />
      <Blob />
    </>
  );
};

export default Scene;
