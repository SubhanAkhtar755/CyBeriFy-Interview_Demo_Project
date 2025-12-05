import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";

const Approuter = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
           <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
  );
};

export default Approuter;