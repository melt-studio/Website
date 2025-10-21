import Nav from "./components/Nav";
import AnimatedOutlet from "./components/AnimatedOutlet";
import SubNav from "./components/SubNav";
import CanvasBackground from "./components/GL/Background/Wrapper";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useStore } from "./stores/store";
import Placeholder from "./components/Placeholder";

const Layout = () => {
  const location = useLocation();
  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    if (useStore.getState().pathname === undefined) {
      setValue("pathname", location.pathname);
    }
  }, [location.pathname, setValue]);

  return (
    <div className="flex flex-col grow w-full h-dvh">
      <Nav />
      <CanvasBackground />
      <AnimatedOutlet />
      <SubNav />
      <Placeholder />
    </div>
  );
};

export default Layout;
