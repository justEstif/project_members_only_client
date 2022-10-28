import tw from "tailwind-styled-components";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";

/**
 * @description site layout
 */
const SSiteLayout = tw.main`container mx-auto grid grid-cols-site gap-4 mt-12`;

/**
 * @description page layout
 */
const SPageLayout = tw.main`container mx-auto grid grid-cols-1 gap-4 lg:grid-cols-page`;

/**
 * @description react component to layout the page
 * @returns dashboard and page content wraped with pagelayout
 */
const Layout = () => {
  return (
    <SSiteLayout>
      <Dashboard />
      <SPageLayout>
        <Outlet />
      </SPageLayout>
    </SSiteLayout>
  );
};

export default Layout;
