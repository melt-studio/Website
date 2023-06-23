import WaterfallAnimation from "../../components/WaterfallAnimation";
import "./TempLandingPage.css";

export default function TempLandingPage({ config }) {
  return (
    <div className="temporary-page">
      <WaterfallAnimation serverConfig={config} />
    </div>
  );
}
