import clsx from "clsx";
import { ReactNode } from "react";
import { Link as LinkRouter, useLocation } from "react-router";
import useProject from "../helpers/useProject";

type LinkProps = {
  to: string;
  target?: string;
  underline?: boolean;
  className?: string;
  invertUnderline?: boolean;
  children: ReactNode;
};

const Link = ({ to, target, underline = true, className, invertUnderline = false, children }: LinkProps) => {
  const location = useLocation();

  const dissolve = location.pathname === "/dissolve";
  const docs = location.pathname.includes("/docs/");

  const project = useProject();

  const light = project?.contrast.label === "light" || dissolve;
  const mid = project?.contrast.label === "mid" || docs;

  return (
    <LinkRouter to={to} target={target} className={clsx(className, {}, "w-fit")}>
      <div className="group relative w-fit">
        {children}
        {(underline || location.pathname === to) && (
          <span
            className={clsx("w-full h-px absolute bottom-px flex [transition:background-color_2s,_scale_.3s] bg-dark", {
              "scale-x-100 group-hover:scale-x-0": invertUnderline,
              "scale-x-0 group-hover:scale-x-100": !invertUnderline,
              "scale-x-100": location.pathname === to,
              "in-[.nav]:bg-light": light,
              "in-[.nav]:bg-mid": mid,
            })}
          ></span>
        )}
      </div>
    </LinkRouter>
  );
};

export default Link;
