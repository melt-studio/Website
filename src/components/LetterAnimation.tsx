type LetterAnimationProps = {
  text: string | string[];
};

type BlockProps = {
  block: string[];
  blocks: string[][];
  index: number;
};

function Block({ block, index }: BlockProps) {
  // const prev = blocks[(index - 1 + blocks.length) % blocks.length];
  const duration = 4;
  // const unitDelay = 0;

  return (
    <div className="left-0 top-0 w-fit absolute overflow-hidden">
      {block.map((word, i) => (
        <>
          <span
            key={`${word}_${index}_${i}`}
            className="inline-block"
            style={{
              // animationDelay: `${i * unitDelay + ((duration / 2) * index + prev.length * unitDelay)}s`,
              animationDelay: `${index * duration}s`,
              animationDuration: `${duration}s`,
              animationTimingFunction: "ease",
              animationIterationCount: "infinite",
              animationName: "inOut",
              animationFillMode: "both",
            }}
          >
            {word}
          </span>
          <span>{"\u00A0"}</span>
        </>
      ))}
    </div>
  );
}

export default function LetterAnimation({ text }: LetterAnimationProps) {
  if (typeof text === "string" || (Array.isArray(text) && text.length === 1)) return <span>{text}</span>;

  const letters = text.map((block) => block.split(" "));

  console.log(letters);

  return (
    <div className="relative w-full">
      {letters.map((block, i) => (
        <Block key={block.join("")} blocks={letters} block={block} index={i} />
      ))}
    </div>
  );
}
