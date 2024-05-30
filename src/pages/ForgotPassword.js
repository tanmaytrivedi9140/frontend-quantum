import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mail } from "../redux/emailslice";
const ForgotPassword = () => {
const useremail = useSelector((state)=>state.email.email)
  const [verify, setverify] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [newpass, setnewpass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { z } = require("zod");
  const handleverify = async () => {
    const data = {
      email: email,
    };
    const emailschema = z.object({
      email: z.string().email(),
     });
  const emailpass = emailschema.safeParse(data)
    if(emailpass.success)
    {
 const response = await axios.post("/verifyemail", data, {
   headers: {
     "Content-Type": "application/json",
   },
 });
  console.log(response.data)
 if (response.data.success) {
   toast.success("Email verified");
   dispatch(mail(email));
   setverify(false);
 } else {
   toast.error(response.data.message);
 }
    }
    else
    {
        toast.error('please enter valid input')
    }

   
  };
  const changepass = async()=>{
    try {
        const data = {
            email: useremail,
            password: password
        }
        const response = await axios.post("/changepass", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(response.data.success)
        {
            dispatch(mail(""));
            toast.success(response.data.message)
            navigate('/signin')
        }
    } catch (error) {
        toast.error('Error')
    }
  }
  return (
    <div className="h-screen flex flex-col items-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtkNU7RX-ITa2l9wwipNqPJaxjVm3tfQD7BI9lrCIEmudVNfGWKmuu_2j4M68MpKVhL0&usqp=CAU"
        alt=""
        className="h-[80px] mx-auto mt-3"
      />
      <div
        className={`flex flex-col justify-center p-5 gap-1 border-2 rounded-[10px] w-[25%] ${
          verify ? "h-[30%]" : "h-[70%"
        }`}
      >
        <h3 className="text-[30px]">Forgot password</h3>
        <div className="class flex flex-col my-2">
          {verify ? (
            <div className="flex flex-col gap-1">
              <span className="username text-[15px] font-bold">Email</span>
              <input
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="text"
                className="name border border-gray-500 focus:border-black transition-colors duration-300"
                placeholder="Enter your email"
              />
              <button
                className="border my-2 bg-blue-800 hover:bg-blue-900 text-white font-bold  rounded border border-yellow-500 hover:border-yellow-700 my-2 w-[40%]"
                onClick={handleverify}
              >
                verify
              </button>
            </div>
          ) : (
            <div>
              <div className="class flex flex-col my-2">
                <span className="username text-[15px] font-bold">
                  New password
                </span>
                <input
                  type="text"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className="name border border-gray-500 focus:border-black transition-colors duration-300"
                  placeholder="password"
                />
              </div>
              <div className="class flex flex-col my-2">
                <span className="username text-[15px] font-bold">
                  Re Enter password
                </span>
                <input
                  type="text"
                  onChange={(e) => {
                    setnewpass(e.target.value);
                  }}
                  className="name border border-gray-500 focus:border-black transition-colors duration-300"
                  placeholder="re enter new password"
                />
              </div>
              <button
                className="border  bg-blue-800 hover:bg-blue-900 text-white font-bold  rounded  my-2 mx-auto w-[40%]"
                onClick={changepass}
              >
                submit
              </button>
            </div>
          )}
        </div>
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
          © 1996-2024, quantum.com, Inc. or its affiliates
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;
