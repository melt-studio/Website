import Nav from "./components/Nav";
import Footer from "./components/Footer";
// import Page from "./components/Page";
import { Outlet } from "react-router";
import SubNav from "./components/SubNav";
import Scene from "./components/background/Scene";

const Layout = () => {
  return (
    <div className="flex flex-col grow w-full h-screen">
      <Nav />
      <div className="w-full grow">
        <Outlet />
      </div>
      {/* <Page /> */}
      <SubNav />
      <Footer />
      <Scene />
    </div>
  );
};

export default Layout;
