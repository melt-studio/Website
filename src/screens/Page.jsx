import { motion } from "framer-motion";

const Page = ({
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  transition = { duration: 1, ease: "easeInOut" },
  id,
  className = "page",
  style,
  onAnimationComplete,
  children,
}) => {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      onAnimationComplete={onAnimationComplete}
      id={id}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default Page;
