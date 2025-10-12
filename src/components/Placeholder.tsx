import clsx from "clsx";
import { useStore } from "../stores/store";
import LogoDrippy from "./LogoDrippy";

const Placeholder = ({ override = false }: { override?: boolean }) => {
  const pathname = useStore((state) => state.pathname);
  const activeProject = useStore((state) => state.activeProject);
  const about = useStore((state) => state.about);
  const ready = useStore((state) => state.ready);

  if (!pathname) return null;

  const show =
    (pathname.includes("/work/") && !activeProject) ||
    (pathname === "/about" && about.length === 0) ||
    (pathname === "/dissolve" && !ready) ||
    override;

  return (
    <div
      className={clsx(
        "fixed w-full h-screen flex items-center justify-center pointer-events-none transition-opacity duration-500",
        {
          "opacity-100": show,
          "opacity-0": !show,
        }
      )}
    >
      <LogoDrippy className="w-15 h-15 animate-loading" />
    </div>
  );
};

export default Placeholder;
