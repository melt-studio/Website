import ProjectHighlight from "./ProjectHighlight";
import { useStore } from "../stores/store";
import { Easing, motion } from "motion/react";
import Link from "./Link";

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

const ProjectHighlights = () => {
  const allProjects = useStore((state) => state.projects);

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
      className={"flex flex-col pt-60 md:pt-40 pb-20 w-full z-10 max-w-[2560px] mx-auto"}
    >
      <div className="flex flex-col px-2 w-full">
        <div className="w-full h-auto flex flex-col gap-2 relative">
          {projects.map((project) => (
            <ProjectHighlight key={project.id} project={project} />
          ))}
        </div>
      </div>
      <motion.div
        variants={variants}
        transition={{ duration: 2, delay: 0, ease: "easeInOut" }}
        viewport={{ amount: 0.1, once: false }}
        whileInView="visible"
        initial="hidden"
        className="px-sm md:px-md w-full grid grid-cols-1 md:grid-cols-[1fr] gap-4 my-10"
      >
        <div></div>
        <div className="uppercase w-fit">
          <Link to="/work">More Projects</Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectHighlights;
