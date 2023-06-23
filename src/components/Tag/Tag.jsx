import TagLink from "../../components/TagLink/TagLink.jsx";

const Tag = ({ tag }) => {
  if (tag.href) {
    return <TagLink tag={tag} nav={tag.nav} />;
  }

  return (
    <div className="tag">
      <h3>{tag.text}</h3>
    </div>
  );
};

export default Tag;
