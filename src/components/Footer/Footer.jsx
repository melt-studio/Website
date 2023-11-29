import Tag from "../Tag/Tag";
import FadeScroll from "../FadeScroll/FadeScroll";
import "./Footer.css";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const excludes = ["/", "/project/", "/other/", "/admin", "/login", "/animations", "/about"];
  if (excludes.some((ex) => location.pathname.includes(ex))) return null;

  return (
    <FadeScroll viewport={{ amount: 0 }} className="footer">
      <div className="footer__tags">
        <Tag tag={{ text: "Sweat the Details" }} />
        <Tag tag={{ text: "2023 © MELT STUDIO" }} />
      </div>
    </FadeScroll>
  );
}
