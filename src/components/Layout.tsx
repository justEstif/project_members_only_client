import tw from "tailwind-styled-components";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";

/**
 * @description page layout
 */
const SPageLayout = tw.main`container mx-auto grid grid-cols-page gap-4 mt-12`;
/**
 * @description react component to layout the page
 * @returns dashboard and page content wraped with pagelayout
 */
const Layout = () => {
  return (
    <SPageLayout>
      <Dashboard />
      <Outlet />
    </SPageLayout>
  );
};

export default Layout;
