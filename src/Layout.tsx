import tw from "tailwind-styled-components";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";

const SPageLayout = tw.main`
  max-w-2xl
  mx-4
  my-10
  md:mx-auto
`;

const Layout = () => {
  return (
    <SPageLayout>
      <Dashboard />
      <Outlet />
    </SPageLayout>
  );
};

export default Layout;
