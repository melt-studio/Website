import { AnimatePresence, motion } from "motion/react";
import { useLocation, useOutlet } from "react-router";
import Footer from "./Footer";
import { useStore } from "../stores/store";

const AnimatedOutlet = () => {
  const location = useLocation();
  const element = useOutlet();
  const setValue = useStore((state) => state.setValue);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        // console.log("EXIT");

        const current = useStore.getState().pathname;
        if (current !== location.pathname) {
          setValue("pathname", location.pathname);
        }

        window.scrollTo({ top: 0 });
      }}
      // propagate
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
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
