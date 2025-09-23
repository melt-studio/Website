import clsx from "clsx";
import Markdown from "react-markdown";
// import { WordAnimation } from "./WordAnimation";

export default function Copy({
  copy,
  feature = false,
  className,
}: {
  copy: string;
  feature?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        {
          feature: feature,
          "max-w-[42em]": !feature,
        },
        className
      )}
    >
      {/* <WordAnimation text={copy} className={feature ? "justify-center" : ""} /> */}
      <Markdown>{copy}</Markdown>
    </div>
  );
}
