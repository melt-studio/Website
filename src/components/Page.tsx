import { Outlet } from "react-router";

const Page = () => {
  return (
    <div className="w-full grow z-2">
      <Outlet />
    </div>
  );
};

export default Page;
