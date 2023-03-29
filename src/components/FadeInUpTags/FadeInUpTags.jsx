import { useLayoutEffect, useEffect, useRef, useState } from "react";

export default function FadeInUpTags({ aboutInfo }) {
  const [tagsVisible, setTagsVisible] = useState(false);
  const tagsRef = useRef(null);
  const currentTagIndex = useRef(0);

  useLayoutEffect(() => {
    const tags = tagsRef.current.children;
    const delay = 3.3; // seconds
    const stagger = 0.09; // seconds

    let start;

    function step(timestamp) {
      if (start === undefined) start = timestamp;
      const elapsed = (timestamp - start) / 1000;

      const index = Math.floor((elapsed - delay) / stagger);

      if (index >= currentTagIndex.current && currentTagIndex.current < tags.length) {
        const tag = tags[currentTagIndex.current];
        tag.style.opacity = 1;
        tag.style.transform = "translateY(0)";
        currentTagIndex.current += 1;
      }

      if (currentTagIndex.current < tags.length) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (tagsRef.current.children.length === aboutInfo[0].fields.whatWeDo.length) {
      setTagsVisible(true);
    }
  }, [aboutInfo]);

  return (
    <div ref={tagsRef} className="tag-container">
      {aboutInfo[0].fields.whatWeDo.map((tag, index) => (
        <h3
          key={tag + index}
          style={{
            // marginTop: "5px",
            opacity: tagsVisible ? 0 : 1,
            transform: "translateY(10px)",
            transition: `opacity 0.5s ease ${0.1 + 0.2 * index}s, transform 0.5s ease ${0.1 + 0.2 * index}s`,
          }}
        >
          {tag}
        </h3>
      ))}
    </div>
  );
}
