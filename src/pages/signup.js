import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userslice";
function SignUp() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [date, setdate] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
    const dispatch = useDispatch();
  const userschema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(8),
    date: z.string().min(8),
    password: z.string().min(6),
  });
  const userData = {
    name: name,
    email: email,
    date: date,
    password: password,
  };
  const registeruser = async () => {
    const Userdataparse = userschema.safeParse(userData);
    if (Userdataparse.success) {
      const response = await axios.post("/otp", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        toast.success(`Otp sent to ${userData.email}`);
        dispatch(registerUser(userData));
        navigate("/register/otp");
       
      } 
      else if(response.data.user)
      {
        toast.error('user already registered')
      }
      else {
        toast.error(response.data.message);
      }
    } else {
      console.log(Userdataparse.error);
      toast.error("please enter valid input feilds");
      navigate("/register");
    }
  };

  return (
    <div className="flex flex-col  items-center h-screen  overflow-y-hidden">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtkNU7RX-ITa2l9wwipNqPJaxjVm3tfQD7BI9lrCIEmudVNfGWKmuu_2j4M68MpKVhL0&usqp=CAU"
        alt=""
        className="h-[80px] mx-auto mt-3"
      />
      <div className="form-header flex flex-col justify-center  p-5 gap-1 border-2 rounded-[10px] w-[25%] h-[75%]">
        <h3 className="text-[30px]">Create Account</h3>
        <div className="class flex flex-col my-2">
          <span className="username text-[15px] font-bold">Your Name</span>
          <input
            type="text"
            onChange={(e) => {
              setname(e.target.value);
            }}
            className="name border border-gray-500 focus:border-black transition-colors duration-300"
            placeholder="first name and last name"
          />
        </div>
        <div className="flex flex-col">
          <span className="number text-[15px] font-bold">Date of Birth</span>
          <div className="mobile flex gap-2">
            <input
              type="date"
              onChange={(e) => {
                setdate(e.target.value);
              }}
              className="mobile-number  border border-gray-500 focus:border-black transition-colors duration-300"
            />
          </div>
        </div>
        <div className="flex flex-col my-2">
          <span className="password text-[15px] font-bold">password</span>
          <input
            type="text"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="password  border border-gray-500 focus:border-black transition-colors duration-300"
            placeholder="password"
          />
          <div className="flex items-center gap-2">
            <svg
              class="h-4 w-4 text-blue-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span className="italic text-[13px]">
              password must include 6 characters
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="email text-[15px] font-bold">Email</span>
          <input
            type="email"
            className="email  border border-gray-500  focus:border-black transition-colors duration-300"
            placeholder="enter your email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <div className="flex items-center gap-2">
            <svg
              class="h-8 w-8 text-blue-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="my-1 italic text-[13px]">
              To verify your email, we will send you a text message with a
              temporary code. Message and data rates may apply.
            </span>
          </div>
        </div>

        <button
          className="border my-2 bg-blue-800 hover:bg-blue-900 text-white font-bold  rounded border border-yellow-500 hover:border-yellow-700 my-2"
          onClick={registeruser}
        >
          verify your email
        </button>
        <hr class="border-t border-gray-300 my-2"></hr>
        <span className="mx-auto ">
          Already have an account ?
          <NavLink to="/signin" className="text-blue-500 mx-2">
            Sign in
          </NavLink>
        </span>
      </div>

      <hr class="border-t border-gray-500 "></hr>
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
          © 1996-2024, Quamtum.com, Inc. or its affiliates
        </span>
      </div>
    </div>
  );
}

export default SignUp;
