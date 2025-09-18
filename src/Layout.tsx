import Nav from "./components/Nav";
import Footer from "./components/Footer";
// import Page from "./components/Page";
import { useLocation, useOutlet } from "react-router";
import SubNav from "./components/SubNav";
import Scene from "./components/GL/Scene";
import { AnimatePresence, motion } from "motion/react";
// import { cloneElement } from "react";
// import AnimatedLayout from "./components/AnimatedLayout";
// import { motion } from "motion/react";

// Using the element from the useOutlet hook
// we can render the pages as direct children with their unique keys
const AnimatedOutlet = (): React.JSX.Element => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence
      mode="sync"
      // initial={true}
      onExitComplete={() => {
        console.log("EXIT");
        window.scrollTo({ top: 0 });
      }}
      // propagate
      // propagate
      // presenceAffectsLayout
    >
      {/* <AnimatedLayout key={location.pathname}> */}

      <motion.div
        // exit={{ opacity: 0 }}
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -0, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        key={location.pathname}
        className="relative w-full h-fit flex flex-col z-5"
      >
        {/* {element && cloneElement(element, { key: location.pathname })} */}
        {element}
        {/* </AnimatedLayout> */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

const Layout = () => {
  // const location = useLocation();

  return (
    <div className="flex flex-col grow w-full h-screen">
      <Nav />
      <AnimatedOutlet />
      {/* </AnimatePresence> */}
      {/* <Page /> */}
      <SubNav />
      <Scene />
    </div>
  );
};

export default Layout;
