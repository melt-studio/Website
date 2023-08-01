import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../Page.jsx";
import Login from "../Login/Login.jsx";
import "./Admin.css";

import ThumbnailLogo from "../../assets/images/ANIMATION_LOGO.jpg";
import ThumbnailWaterfall from "../../assets/images/ANIMATION_WATERFALL.jpg";
import ThumbnailMelter from "../../assets/images/TOOL_MELTER.jpg";

const Admin = ({ loggedIn, setLoggedIn, adminMessage }) => {
  useEffect(() => {
    document.body.classList.add("admin-page");

    return () => {
      document.body.classList.remove("admin-page");
    };
  }, []);

  if (!loggedIn) return <AdminLogin setLoggedIn={setLoggedIn} />;

  return <AdminDashboard adminMessage={adminMessage} />;
};

const AdminLogin = ({ setLoggedIn }) => {
  return (
    <Page>
      <div className="page-container">
        <Login setLoggedIn={setLoggedIn} />
      </div>
    </Page>
  );
};

const AdminDashboard = ({ adminMessage }) => {
  const animationLinks = [
    { text: "Logo", href: "/admin/logo", thumb: ThumbnailLogo },
    { text: "Waterfall", href: "/admin/waterfall", thumb: ThumbnailWaterfall },
  ];

  const otherLinks = [{ text: "Melter", href: "/STGMelter/", thumb: ThumbnailMelter }];

  return (
    <Page transition={{ duration: 0.5, ease: "easeInOut" }}>
      <div className="page-container">
        {adminMessage && <div className="message">{adminMessage}</div>}
        <div>
          <div className="block">
            <h2>Animation Settings</h2>
            <ul>
              {animationLinks.map((link) => (
                <AnimationLink key={link.href} link={link} />
              ))}
            </ul>
          </div>
          <div className="block">
            <h2>Tools</h2>
            <ul>
              {otherLinks.map((link) => (
                <ToolLink key={link.href} link={link} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Page>
  );
};

const AnimationLink = ({ link }) => {
  const navigate = useNavigate();

  return (
    <li
      style={{ background: `#151515 url(${link.thumb}) no-repeat center center / cover` }}
      onClick={() => navigate(link.href)}
      className="animation-link"
    >
      <span className="block__gradient"></span>
      <p>{link.text}</p>
    </li>
  );
};

const ToolLink = ({ link }) => {
  return (
    <a href={link.href} className="admin-link">
      <li style={{ background: `#151515 url(${link.thumb}) no-repeat center center / cover` }}>
        <span className="block__gradient"></span>
        <p>{link.text}</p>
      </li>
    </a>
  );
};

export default Admin;
