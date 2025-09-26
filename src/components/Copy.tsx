import clsx from "clsx";
import { Easing } from "motion";
import { motion } from "motion/react";

export default function Copy({
  copy,
  feature = false,
  className,
}: {
  copy: string;
  feature?: boolean;
  className?: string;
}) {
  const lines = copy.split("\n").filter((line) => line.trim() !== "");

  const variants = {
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
    <div
      className={clsx(
        "flex flex-col gap-4",
        {
          feature: feature,
          "max-w-[42em]": !feature,
        },
        className
      )}
    >
      {lines.map((line) => (
        <motion.p key={line} variants={variants}>
          {line}
        </motion.p>
      ))}
    </div>
  );
}
