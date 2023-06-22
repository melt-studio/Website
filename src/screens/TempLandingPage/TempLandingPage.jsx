import WaterfallAnimation from "../../components/WaterfallAnimation";
import "./TempLandingPage.css";

export default function TempLandingPage({ config }) {
  return (
    <div className="temp-page__container">
      <WaterfallAnimation serverConfig={config} />
    </div>
  );
}
