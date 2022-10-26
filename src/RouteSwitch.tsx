import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {AccountPage, HomePage, LoginPage, RegisterPage} from "./pages"
import Layout from "./components/Layout";
import useStore from "./store";

/**
 * @description react component to handle routes
 * @returns routes with redirect if user is active
 */
const RouteSwitch = () => {
  const auth = useStore((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={auth ? <Navigate replace to="/" /> : <RegisterPage />}
          />
          <Route
            path="login"
            element={auth ? <Navigate replace to="/" /> : <LoginPage />}
          />

          <Route
            path="account"
            element={auth ? <AccountPage /> : <Navigate replace to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
