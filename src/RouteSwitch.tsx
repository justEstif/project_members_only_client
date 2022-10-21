import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="register" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
