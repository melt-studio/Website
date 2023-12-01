/* eslint-disable indent */
import Tag from "../Tag/Tag.jsx";
import FadeIn from "../../components/FadeIn/FadeIn.jsx";
import { keyframes } from "../../utils/keyframes.js";
import "./TagBlock.css";
import FadeScroll from "../FadeScroll/FadeScroll.jsx";

keyframes`
  @keyframes customAnimationTag {
    from {
      opacity: 0;
      transform: translate3d(0, 10px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`;

const TagBlock = ({
  title,
  tags,
  underlineColor,
  links = false,
  viewport = { amount: 0 },
  transition = false,
  delay,
  titleDelay = 2,
  row,
  rowDelimiter = ", ",
}) => {
  if (!tags || tags.length === 0) return null;

  console.log(title, transition);

  const fadeInTagTitle = {
    name: "customAnimationTag",
    duration: 1,
    delay: titleDelay,
    stagger: true,
    damping: 0.25,
  };

  const fadeInTag = {
    name: transition ? "customTransitionTag" : "customAnimationTag",
    duration: 1,
    delay: transition ? delay : delay !== undefined ? delay : 2.5,
    stagger: true,
    damping: links ? 0.15 : 0.1,
  };

  return (
    <FadeScroll viewport={viewport} className={`tag-block${links ? " tag-links" : ""}`}>
      {title && (
        <div className="tag-block__title">
          <FadeIn {...fadeInTagTitle}>
            <h1>{title}</h1>
            <hr
              className="tag-block__title__underline"
              style={underlineColor ? { backgroundColor: underlineColor } : null}
            />
          </FadeIn>
        </div>
      )}

      <div className={`tag-block__tags${row ? " tag-row" : ""}`}>
        <FadeIn {...fadeInTag} row={row}>
          {row
            ? tags.map((tag, i) => (
                <span key={tag.text}>
                  <Tag tag={tag} />
                  {i < tags.length - 1 && rowDelimiter}
                </span>
              ))
            : tags.map((tag) => <Tag key={tag.text} tag={tag} />)}
        </FadeIn>
      </div>
    </FadeScroll>
  );
};

export default TagBlock;
