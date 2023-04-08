import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import AdminForm from "./AdminForm.jsx";
import Page from "../Page.jsx";
import "./Admin.css";

import ThumbnailLogo from "../../assets/images/ANIMATION_LOGO.jpg";
import ThumbnailWaterfall from "../../assets/images/ANIMATION_WATERFALL.jpg";

const Admin = ({ adminMessage }) => {
  // const [animationchoice, setAnimationChoice] = useState("waterfall");

  useEffect(() => {
    document.body.classList.add("admin-page");

    return () => {
      document.body.classList.remove("admin-page");
    };
  }, []);

  return (
    <Page transition={{ duration: 0.5, ease: "easeInOut" }}>
      <div className="page-container">
        {adminMessage && <div className="message">{adminMessage}</div>}
        <AdminDashboard />
      </div>
    </Page>
  );
};

const AdminDashboard = () => {
  const links = [
    { text: "Logo", href: "/admin/logo", thumb: ThumbnailLogo },
    { text: "Waterfall", href: "/admin/waterfall", thumb: ThumbnailWaterfall },
  ];

  return (
    <div>
      <div className="block">
        <h2>Animation Settings</h2>
        <ul>
          {links.map((link) => (
            <AnimationLink key={link.href} link={link} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const AnimationLink = ({ link }) => {
  const navigate = useNavigate();

  return (
    <li
      style={{ background: `#151515 url(${link.thumb}) no-repeat center center / cover` }}
      onClick={() => navigate(link.href)}
    >
      <span className="block__gradient"></span>
      <p>{link.text}</p>
    </li>
  );
};

export default Admin;
