import Nav, { SubNav } from "./components/Nav";
import Footer from "./components/Footer";
import Page from "./components/Page";
import Scene from "./components/Scene";

const Layout = () => {
  return (
    <div className="flex flex-col grow w-full h-screen">
      <Nav />
      <Page />
      <SubNav />
      <Footer />
      <Scene />
    </div>
  );
};

export default Layout;
