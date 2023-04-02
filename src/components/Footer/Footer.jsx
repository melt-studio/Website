import Tag from "../Tag/Tag";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <Tag tag={{ text: "Sweat the Details" }} />
      <Tag tag={{ text: "2023 © MELT STUDIO" }} />
    </div>
  );
}
