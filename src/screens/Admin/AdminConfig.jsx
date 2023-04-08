import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WaterfallAnimation from "../../components/WaterfallAnimation/index.js";
import LogoAnimation from "../../components/LogoAnimation/index.js";
import Page from "../Page.jsx";
import "./Admin.css";

const AdminConfig = ({ mobile, config, setAdminMessage }) => {
  const navigate = useNavigate();
  const { mode } = useParams();

  useEffect(() => {
    document.body.classList.add("admin-page", "config");

    return () => {
      document.body.classList.remove("admin-page", "config");
    };
  }, []);

  useEffect(() => {
    if (!config || !config[mode]) {
      console.log("navigating to admin - config");
      setAdminMessage("Animation config not found on Airtable");
      setTimeout(() => {
        setAdminMessage(null);
      }, 5000);
      return navigate("/admin");
    }
  }, [config, mode, navigate, setAdminMessage]);

  if (mobile) {
    return <div>Please view on desktop</div>;
  }

  return (
    <Page transition={{ duration: 0.5, ease: "easeInOut" }}>
      <div className="page-container">
        <div style={{ width: "100%", height: "100%", backgroundColor: "#000000" }}>
          {mode === "logo" ? (
            <LogoAnimation serverConfig={config} effectRef={null} controls />
          ) : mode === "waterfall" ? (
            <WaterfallAnimation serverConfig={config} controls />
          ) : null}
        </div>
      </div>
    </Page>
  );
};

export default AdminConfig;
