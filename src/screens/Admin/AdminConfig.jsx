import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WaterfallAnimation from "../../components/WaterfallAnimation/index.js";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import Page from "../Page.jsx";
import "./Admin.css";

const AdminConfig = ({ mobile, config, setAdminMessage }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();
  const { mode } = useParams();

  useEffect(() => {
    document.body.classList.add("admin-page", "config");

    return () => {
      document.body.classList.remove("admin-page", "config");
    };
  }, []);

  useEffect(() => {
    const updateMessage = (text) => {
      setAdminMessage(text);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setTimeoutId(
        setTimeout(() => {
          setAdminMessage(null);
        }, 5000)
      );
    };

    if (!config || !config[mode]) {
      // console.log("navigating to admin - config");
      updateMessage("Animation config not found on Airtable");
      return navigate("/admin");
    }
  }, [config, mode, navigate, setAdminMessage, timeoutId]);

  if (mobile) {
    return <div>Please view on desktop</div>;
  }

  const modeComponent = () => {
    if (mode === "logo") return <LogoAnimation serverConfig={config} effectRef={null} controls />;
    else if (mode === "waterfall") return <WaterfallAnimation serverConfig={config} controls />;
    return null;
  };

  return (
    <Page transition={{ duration: 0.5, ease: "easeInOut" }}>
      <div className="page-container">
        <div style={{ width: "100%", height: "100%", backgroundColor: "#000000" }}>{modeComponent()}</div>
      </div>
    </Page>
  );
};

export default AdminConfig;
