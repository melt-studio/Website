import LogoText from "./LogoText";

const Placeholder = () => {
  return (
    <div className="fixed w-full h-screen flex items-center justify-center">
      <LogoText className="w-auto h-10 animate-pulse" />
    </div>
  );
};

export default Placeholder;
