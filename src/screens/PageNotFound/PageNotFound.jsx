import { Helmet } from "react-helmet";
import "./PageNotFound.css";
import Drippy from "../../assets/images/MELT__DRIPPY.svg";

const PageNotFound = () => {
  return (
    <div className="page not-found-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>MELLLLLLT</title>
      </Helmet>

      <div className="page-container">
        <h1>
          4<img src={Drippy} alt="MELT Logo" />4
        </h1>
        <p>Page not found</p>
      </div>
    </div>
  );
};

export default PageNotFound;