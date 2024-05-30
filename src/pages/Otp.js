import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/userslice";
function Otp() {
  const setuser = useSelector((state) => state.user.user);
  const [email, setEmail] = useState("tanmaytrivedi57@gmail.com");
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const captchaRef = useRef(null);

  const [otp, setotp] = useState();
  const handleotp = async (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    console.log(token);
    // captchaRef.current.reset();
    console.log(token);
    if (!token) {
      toast.error("capcha not verified");
      return;
    } else {
      console.log(otp);
      if (!otp) {
        toast.error("please enter the otp!");
        navigate("/register/otp");
        return;
      }
      if (isNaN(otp)) {
        // If it's a valid number, update the state and clear error
        toast.error("please enter numbers only");
        setotp("");
        return;
      }
      const finaldata = {
        otp: otp,
        email: setuser.email,
        date: setuser.date,
        password: setuser.password,
        name: setuser.name,
      };
      console.log(finaldata.email)

      const response = await axios.post("/register", finaldata, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data.userData;
      if (response.data.success) {
        toast.success("otp verified successfully");
        dispatch(registerUser(finaldata));
        setotp("");
        navigate("/signin");
        return;
      } else if (!response.data.success) {
        toast.error("Invalid OTP");
        navigate("/register/otp");
        
      }
      else if(!response.data.user)
      {
         toast.error("Please register the user");
         navigate("/register");
      }
       else {
        toast.error("An error Occoured!");
        navigate("/register/otp");
        return;
      }
    }
  };
  return (
    <div className="flex flex-col items-center mt-5 align-middle h-screen gap-2">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtkNU7RX-ITa2l9wwipNqPJaxjVm3tfQD7BI9lrCIEmudVNfGWKmuu_2j4M68MpKVhL0&usqp=CAU"
        alt=""
        className="h-[80px] mx-auto mt-3"
      />
      <div className="flex flex-col border border-gray-250 rounded-lg p-10 gap-6 w-[25%]">
        <span className="text-[15px] italic font-semibold">
          otp sent successfully to your {setuser.email}
        </span>

        <div className="flex flex-col gap-2">
          <span className="username text-[15px] font-bold">Otp</span>
          <input
            type="text"
            onChange={(e) => {
              setotp(e.target.value);
            }}
            placeholder="please Enter the number"
            className=" border border-gray-500  focus:border-black transition-colors duration-300 rounded-sm"
          />
        </div>
        <ReCAPTCHA
          sitekey="6LdAApApAAAAABX6dgJMYrddYpySJS7JzN9oCYoI"
          ref={captchaRef}
        />
        <button
          onClick={handleotp}
          className="border  bg-blue-800 hover:bg-blue-900 text-white font-bold  rounded border border-yellow-500 hover:border-yellow-700"
        >
          Register
        </button>
        <hr class="border-t border-gray-200 "></hr>
        <span className="mx-auto ">
          Already have an account ?
          <Link to="/signin" className="text-blue-500 mx-2">
            Sign in
          </Link>
        </span>
      </div>
      <div className="flex flex-col my-5">
        <div className="footer-component footer flex justify-between">
          <a href="#" className="text-blue-500">
            Conditions of Use
          </a>
          <a href="#" className="text-blue-500">
            Privacy Notice
          </a>
          <a href="#" className="text-blue-500">
            Help
          </a>
        </div>
        <span className="my-5">
          © 1996-2024, Quantum.com, Inc. or its affiliates
        </span>
      </div>
    </div>
  );
}

export default Otp;
