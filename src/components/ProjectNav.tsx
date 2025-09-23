import Link from "./Link";
import { useStore } from "../stores/store";
import { Easing, motion } from "motion/react";

const ProjectNav = () => {
  const activeProject = useStore((state) => state.activeProject);

  if (!activeProject) return null;

  const variants = {
    hidden: { opacity: 0, transform: "translateY(20px)" },
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
    <div className="footer bg-light relative z-5">
      <motion.div
        whileInView="visible"
        viewport={{ amount: 0.5, once: true }}
        initial="hidden"
        variants={variants}
        className="flex flex-col p-sm md:p-md uppercase gap-4 pt-10 md:pt-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-4">
          {activeProject.prev && (
            <Link to={`/work/${activeProject.prev}`} invertUnderline>
              {`< Previous Project`}
            </Link>
          )}
          <div className="flex justify-between items-center w-full">
            <Link to="/" invertUnderline className="hidden md:block">
              Close
            </Link>
            {activeProject.next && (
              <div className="ml-auto">
                <Link to={`/work/${activeProject.next}`} invertUnderline>
                  {`Next Project >`}
                </Link>
              </div>
            )}
          </div>
        </div>
        <Link to="/" invertUnderline className="block md:hidden">
          Close
        </Link>
      </motion.div>
    </div>
  );
};

export default ProjectNav;
