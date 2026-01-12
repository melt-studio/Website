import ProjectHighlight from "./ProjectHighlight";
import { useStore } from "../stores/store";
import { Easing, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "./Link";
import { useState } from "react";

export type TileLayout = {
  w: number;
  w2: number;
  off: number;
  row: number;
  colStart: number;
  colEnd: number;
  marginTop: number;
  marginLeft: number;
  grid: number;
  orientation: "landscape" | "portrait";
};

export type ScrollDirection = "down" | "up";

const ProjectHighlights = () => {
  const allProjects = useStore((state) => state.projects);

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const prev = scrollYProgress.getPrevious();
    if (!prev) return;
    const diff = current - prev;
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  const projects = allProjects.filter(
    (project) =>
      project.fields.highlighted && project.fields.highlightThumbnail && project.fields.highlightThumbnail.length > 0
  );

  const variants = {
    hidden: { opacity: 0, transform: "translateY(20px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "some", once: false }}
      transition={{ duration: 2, ease: "easeInOut" as Easing, delay: 0 }}
      className="flex flex-col pt-60 md:pt-40 pb-20 w-full z-10 max-w-[2560px] mx-auto"
    >
      <div className="flex flex-col px-2 w-full">
        <div className="w-full h-auto flex flex-col gap-2 relative">
          {projects.map((project) => (
            <ProjectHighlight key={project.id} project={project} scrollDirection={scrollDirection} />
          ))}
        </div>
      </div>
      <motion.div
        variants={variants}
        transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
        viewport={{ amount: 0.1, once: false }}
        whileInView="visible"
        initial="hidden"
        className="px-sm md:px-md w-full flex flex-col gap-4 my-10"
      >
        <div className="uppercase w-fit ml-auto">
          <Link to="/work">More Projects</Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectHighlights;
