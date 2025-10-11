import { Outlet } from "react-router";

const Page = () => {
  return (
    <div className="w-full grow z-3">
      <Outlet />
    </div>
  );
};

export default Page;
