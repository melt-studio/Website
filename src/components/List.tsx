import { Easing, motion } from "motion/react";

export default function List({ items }: { items: string[] }) {
  // const variants = {
  //   initial: {
  //     opacity: 0,
  //     transform: "translate3d(0px, 100%, 0px)",
  //   },
  //   animate: (i: number) => ({
  //     opacity: 1,
  //     transform: "translate3d(0px, 0%, 0px)",
  //     transition: {
  //       duration: 1,
  //       delay: 1.5 + i * 0.25,
  //       ease: "easeInOut" as Easing,
  //     },
  //   }),
  // };

  // const motionProps = {
  //   variants,
  //   initial: "initial",
  //   animate: "animate",
  // };

  const childVariants = {
    hidden: { opacity: 0, transform: "translateY(40px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        ease: "easeInOut" as Easing,
      },
    },
  };

  return (
    <div className="flex flex-col uppercase">
      {items.map((item) => (
        <motion.div key={item} variants={childVariants} className={"w-full h-fit relative"}>
          {item}
        </motion.div>
      ))}
    </div>
  );
}
