import TagLink from "../../components/TagLink/TagLink.jsx";

const Tag = ({ tag }) => {
  if (tag.href) {
    return <TagLink tag={tag} />;
  }
  return <h3>{tag.text}</h3>;
};

export default Tag;
