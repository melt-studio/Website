import { ReactNode } from "react";
import { Link as LinkRouter } from "react-router";

type LinkProps = {
  to: string;
  target?: string;
  underline?: boolean;
  fixUnderline?: boolean;
  children: ReactNode;
};

const Link = ({ to, target, underline = true, fixUnderline = false, children }: LinkProps) => {
  return (
    <LinkRouter to={to} target={target}>
      <div className="group relative w-fit">
        {children}
        {underline && (
          <span
            className={`w-full h-px absolute bottom-px flex bg-underline in-[footer]:bg-dark transition-transform duration-300 ${
              fixUnderline ? "scale-x-100 group-hover:scale-x-0" : "scale-x-0 group-hover:scale-x-100"
            }`}
          ></span>
        )}
      </div>
    </LinkRouter>
  );
};

export default Link;
