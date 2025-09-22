import clsx from "clsx";
import { ReactNode } from "react";
import FadeScroll from "./FadeScroll";

type SectionProps = {
  title?: string;
  type?: "column" | "feature";
  children?: ReactNode;
};

function Section({ title, type, children }: SectionProps) {
  return (
    <FadeScroll>
      <div
        className={clsx("px-sm md:px-md", {
          column: type === "column",
          "flex w-full items-center justify-center grow": type === "feature",
        })}
      >
        {title && type !== "feature" && <div className="uppercase">{title}</div>}
        {children}
      </div>
    </FadeScroll>
  );
}

export default Section;
