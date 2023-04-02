import { useRef } from "react";
import { motion } from "framer-motion";

const FadeScroll = ({ viewport = { amount: 0.5 }, className, style, children }) => {
  const ref = useRef();

  const handleEntry = {
    onViewportEnter: () => {
      if (ref.current) {
        ref.current.classList.add("show");
      }
    },
    onViewportLeave: () => {
      if (ref.current) {
        ref.current.classList.remove("show");
      }
    },
  };

  return (
    <motion.div ref={ref} viewport={viewport} {...handleEntry} className={className} style={style}>
      {children}
    </motion.div>
  );
};

export default FadeScroll;
