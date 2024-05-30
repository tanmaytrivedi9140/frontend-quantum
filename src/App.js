import "./App.css";
import SignUp from "./pages/signup";
import { Route, Routes } from "react-router-dom";
import Otp from "./pages/Otp";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./pages/Footer";

function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/register/otp" element={<Otp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signin/forgot-pass" element={<ForgotPassword />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
