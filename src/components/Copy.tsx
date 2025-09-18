import clsx from "clsx";
import Markdown from "react-markdown";

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
          "max-w-[50em]": !feature,
        },
        className
      )}
    >
      <Markdown>{copy}</Markdown>
    </div>
  );
}
