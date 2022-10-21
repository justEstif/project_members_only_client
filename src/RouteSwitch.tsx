import { BrowserRouter, Route, Routes } from "react-router-dom";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
};
