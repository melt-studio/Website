import clsx from "clsx";
import Markdown from "react-markdown";

export default function Copy({ copy, feature = false }: { copy: string; feature?: boolean }) {
  return (
    <div
      className={clsx("flex flex-col gap-4", {
        feature: feature,
        "max-w-[50em]": !feature,
      })}
    >
      <Markdown>{copy}</Markdown>
    </div>
  );
}
