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
  mobile,
}) => {
  if (!tags || tags.length === 0) return null;

  const fadeInTagTitle = {
    name: "customAnimationTag",
    duration: 1,
    delay: 2,
    stagger: true,
    damping: 0.25,
  };

  const fadeInTag = {
    name: transition ? "customTransitionTag" : "customAnimationTag",
    duration: 1,
    delay: transition ? (links ? (mobile ? 1.5 : 2.5) : 1) : 2.5,
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

      <div className="tag-block__tags">
        <FadeIn {...fadeInTag}>
          {tags.map((tag) => (
            <Tag key={tag.text} tag={tag} />
          ))}
        </FadeIn>
      </div>
    </FadeScroll>
  );
};

export default TagBlock;
