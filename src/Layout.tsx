import Nav from "./components/Nav";
import AnimatedOutlet from "./components/AnimatedOutlet";
import SubNav from "./components/SubNav";
import CanvasBackground from "./components/GL/Background/Wrapper";
// import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col grow w-full h-screen">
      <Nav />
      <CanvasBackground />
      <AnimatedOutlet />
      <SubNav />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
