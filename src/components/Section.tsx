import clsx from "clsx";
import { ReactNode } from "react";
import FadeScroll from "./FadeScroll";

// type SectionProps = {
//   title?: string;
//   content: string | string[];
//   type: "column" | "feature" | "team";
// };

type SectionProps = {
  title?: string;
  // column?: boolean;
  // content: string | string[];
  type?: "column" | "feature";
  children?: ReactNode;
};

function Section({ title, type, children }: SectionProps) {
  // const formatContent = () => {
  //   if (typeof content === "string") {
  //     return <Copy copy={content} feature={type === "feature"} />;
  //   } else if (Array.isArray(content)) {
  //     return <List items={content} />;
  //   }
  //   return null;
  // };

  return (
    <FadeScroll>
      <div
        // key={title}
        className={clsx("px-sm md:px-md", {
          column: type === "column",
          "flex w-full items-center justify-center grow": type === "feature",
        })}
      >
        {title && type !== "feature" && <div className="uppercase">{title}</div>}
        {/* {type !== "feature" ? <div className="uppercase">{title}</div> : null}
      {formatContent()} */}
        {children}
      </div>
    </FadeScroll>
  );
}

export default Section;
