import clsx from "clsx";
import { useStore } from "../stores/store";
import LogoDrippyDark from "../assets/drippy-dark.gif";
import LogoDrippyLight from "../assets/drippy-light.gif";

const Placeholder = ({ override = false, light = false }: { override?: boolean; light?: boolean }) => {
  const pathname = useStore((state) => state.pathname);
  const activeProject = useStore((state) => state.activeProject);
  const projects = useStore((state) => state.projects);
  const about = useStore((state) => state.about);
  const ready = useStore((state) => state.ready);

  if (!pathname) return null;

  const show =
    (pathname.includes("/work/") && !activeProject) ||
    (pathname === "/work" && projects.length === 0) ||
    (pathname === "/about" && about.length === 0) ||
    (pathname === "/dissolve" && !ready) ||
    override;

  return (
    <div
      className={clsx(
        "fixed w-full h-dvh flex items-center justify-center pointer-events-none transition-opacity duration-500",
        {
          "opacity-100": show,
          "opacity-0": !show,
        }
      )}
    >
      <img src={light ? LogoDrippyLight : LogoDrippyDark} className="w-15 h-15 animate-placeholder" />
    </div>
  );
};

export default Placeholder;
