import Tag from "../Tag/Tag.jsx";
import FadeIn from "../../components/FadeIn/FadeIn.jsx";
import { keyframes } from "../../utils/keyframes.js";
import "./TagBlock.css";

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

const fadeInTagTitle = {
  name: "customAnimationTag",
  duration: 1,
  delay: 2,
  stagger: true,
  damping: 0.25,
};

const fadeInTag = {
  name: "customAnimationTag",
  duration: 1,
  delay: 2.5,
  stagger: true,
  damping: 0.1,
};

const TagBlock = ({ title, tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="tag-block">
      {title && (
        <div className="tag-block__title">
          <FadeIn {...fadeInTagTitle}>
            <h1>{title}</h1>
            <hr className="tag-block__title__underline" />
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
    </div>
  );
};

export default TagBlock;
