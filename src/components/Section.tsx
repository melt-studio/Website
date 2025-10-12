import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";
import { Easing, motion, stagger } from "motion/react";

type SectionProps = {
  title?: string;
  type?: "column" | "feature";
  style?: CSSProperties;
  children?: ReactNode;
};

function Section({ title, type, style, children }: SectionProps) {
  if (!children) return null;

  const parentVariants = {
    hidden: { opacity: 0, transform: "translateY(40px)" },
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
    <motion.div
      viewport={{ amount: 0.5, once: true }}
      initial="hidden"
      whileInView="visible"
      className="w-full h-fit relative max-w-[2560px] mx-auto"
      style={style}
      variants={parentVariants}
    >
      <div
        className={clsx("px-sm md:px-md", {
          column: type === "column",
          "flex w-full items-center justify-center grow": type === "feature",
        })}
      >
        {title && type !== "feature" && <div className="uppercase">{title}</div>}
        {children}
      </div>
    </motion.div>
  );
}

export default Section;
