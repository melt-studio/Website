import Tag from "../Tag/Tag";
import FadeScroll from "../FadeScroll/FadeScroll";
import "./Footer.css";

export default function Footer() {
  return (
    <FadeScroll viewport={{ amount: 0 }} className="footer">
      <div className="footer__tags">
        <Tag tag={{ text: "Sweat the Details" }} />
        <Tag tag={{ text: "2023 © MELT STUDIO" }} />
      </div>
    </FadeScroll>
  );
}
