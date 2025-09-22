import { AnimatePresence, motion } from "motion/react";
import { useLocation, useOutlet } from "react-router";
import Footer from "./Footer";

const AnimatedOutlet = () => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        console.log("EXIT");
        window.scrollTo({ top: 0 });
      }}
      // propagate
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        key={location.pathname}
        className="relative w-full h-fit flex flex-col"
      >
        <div className="min-h-screen w-full relative flex flex-col h-fit">{element}</div>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
