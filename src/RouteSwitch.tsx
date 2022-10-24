import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Account from "./Account";
import Home from "./Home";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
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
          <Route index element={<Home />} />
          <Route
            path="register"
            element={auth ? <Navigate replace to="/" /> : <Register />}
          />
          <Route
            path="login"
            element={auth ? <Navigate replace to="/" /> : <Login />}
          />

          <Route
            path="account"
            element={auth ? <Account /> : <Navigate replace to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
