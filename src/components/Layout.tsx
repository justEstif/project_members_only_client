import tw from "tailwind-styled-components";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";

/**
 * @description page layout
 */
const SPageLayout = tw.main`
  max-w-2xl
  mx-4
  my-10
  md:mx-auto
`;

/**
 * @description react component to layout the page
 * @returns dashboard and page content wraped with pagelayout
 */
const Layout = () => {
  return (
    <>
      {/* <Dashboard /> */}
      <Outlet />
    </>
  );
};

export default Layout;
