import { motion, AnimatePresence } from "framer-motion";

const FadeInOut = ({
  isVisible,
  transition = { duration: 1, delay: 0, ease: "easeInOut" },
  keyframes = { enter: { opacity: 1 }, exit: { opacity: 0 } },
  initial = "exit",
  className,
  style,
  containerRef,
  children,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          transition={transition}
          key={className}
          variants={keyframes}
          initial={initial}
          animate="enter"
          exit="exit"
          className={className}
          style={style}
          ref={containerRef}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeInOut;
