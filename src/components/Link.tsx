import clsx from "clsx";
import { ReactNode } from "react";
import { Link as LinkRouter, useLocation } from "react-router";

type LinkProps = {
  to: string;
  target?: string;
  underline?: boolean;
  className?: string;
  onClick?: () => void;
  invertUnderline?: boolean;
  hideSelected?: boolean;
  viewTransition?: boolean;
  children: ReactNode;
};

const Link = ({
  to,
  target,
  underline = true,
  className,
  invertUnderline = false,
  onClick,
  hideSelected = false,
  viewTransition = false,
  children,
}: LinkProps) => {
  const location = useLocation();

  if (!children) return null;

  const dissolve = location.pathname === "/dissolve";
  const docs = location.pathname.includes("/docs/");

  const light = dissolve;
  const mid = docs;

  return (
    <LinkRouter
      to={to}
      target={target}
      className={clsx(className, {}, "w-fit")}
      viewTransition={viewTransition}
      onClick={onClick}
    >
      <div className="group relative w-fit">
        {children}
        {underline && (
          <span
            className={clsx("w-full h-px absolute bottom-px flex [transition:background-color_2s,_scale_.3s] bg-dark", {
              "scale-x-100 group-hover:scale-x-0": invertUnderline,
              "scale-x-0 group-hover:scale-x-100": !invertUnderline,
              "scale-x-100": location.pathname === to && !hideSelected,
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
