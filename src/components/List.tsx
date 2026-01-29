import { Easing, motion, stagger } from "motion/react";

export default function List({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  const childVariants = {
    hidden: { opacity: 0, transform: "translateY(-40%)" },
    visible: {
      opacity: 1,
      transform: "translateY(0%)",
      transition: {
        duration: 1,
        ease: "easeInOut" as Easing,
      },
    },
  };

  const parentVariants = {
    hidden: { opacity: 0, transform: "translateY(-40px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        delayChildren: stagger(0.25, { startDelay: 0 }),
        ease: "easeInOut" as Easing,
      },
    },
  };

  return (
    <motion.div className="flex flex-col uppercase" variants={parentVariants}>
      {items.map((item) => (
        <motion.div key={item} variants={childVariants} className={"w-full h-fit relative"}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
