import { useRef } from "react";
import { motion } from "framer-motion";

const FadeScroll = ({
  viewport = { amount: 0.5 },
  onEnter = () => null,
  onExit = () => null,
  className,
  style,
  children,
}) => {
  const ref = useRef();

  const handleEntry = {
    onViewportEnter: () => {
      if (ref.current) {
        if (!ref.current.classList.contains("show")) {
          ref.current.classList.add("show");
        }
      }
      onEnter();
    },
    onViewportLeave: () => {
      if (ref.current) {
        ref.current.classList.remove("show");
      }
      onExit();
    },
  };

  return (
    <motion.div ref={ref} viewport={viewport} {...handleEntry} className={className} style={style}>
      {children}
    </motion.div>
  );
};

export default FadeScroll;
