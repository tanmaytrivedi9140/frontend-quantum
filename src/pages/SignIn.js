import axios from "axios";
import React, { useState } from "react";
import { NavLink, Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import {z} from "zod";
import toast from "react-hot-toast";
import { loginUser } from "../redux/userslice";
function SignIn() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userschema = z.object({
      email: z.string().email(),
      password: z.string().min(1)
    })
    const data = {
      email: email,
      password: password
    }
    const login = async()=>{
       const validateinput = userschema.safeParse(data)
       console.log(validateinput)
       if(validateinput.success)
       {
        const response = await axios.post("/signin", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(response.data.success)
        {
          toast.success(response.data.message);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          navigate('/');
        }
        else if(!response.data.password)
        {
           toast.error(response.data.message);
           navigate("/signin");
        }
        else
        {
             toast.error(response.data.message);
             navigate("/signin");
        }
       }
       else
       {
        toast.error('Please enter valid inputs')
       }
    }
  return (
    <div className="flex flex-col  items-center h-screen  overflow-y-hidden">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtkNU7RX-ITa2l9wwipNqPJaxjVm3tfQD7BI9lrCIEmudVNfGWKmuu_2j4M68MpKVhL0&usqp=CAU"
        alt=""
        className="h-[80px] mx-auto mt-3"
      />
      <div className="form-header flex flex-col justify-center  p-5 gap-1 border-2 rounded-[10px] w-[22%] h-[60%]">
        <h3 className="text-[30px]">Sign In</h3>
        <div className="class flex flex-col my-2">
          <span className="username text-[15px] font-bold">Email</span>
          <input
            type="text"
            className="name border border-gray-500 focus:border-black transition-colors duration-300"
            placeholder="enter your email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col my-2">
          <span className="password text-[15px] font-bold">password</span>
          <input
            type="text"
            className="password  border border-gray-500 focus:border-black transition-colors duration-300"
            placeholder="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-[-10px] flex-col">
          <button
            className="border my-2 bg-blue-800 hover:bg-blue-900 text-white font-bold  rounded border border-yellow-500 hover:border-yellow-700 my-2"
            onClick={login}
          >
            Log in
          </button>
          <span className="font-extrabold mx-auto">or</span>
          <Link
            to={"/signin/forgot-pass"}
            className="mx-auto text-blue-400 italic"
          >
            forgot password
          </Link>
        </div>

        <span className="text-[13px] italic">
          By continuing, you agree to Quantum's{" "}
          <span className="text-blue-300 mx-1">Conditions of Use</span>
          and <span className="text-blue-300 mx-1">Privacy Notice.</span>
        </span>
        <hr class="border-t border-gray-300 my-2"></hr>
        <span className="mx-auto ">
          New to Quantum ?
          <Link to="/register" className="text-blue-500 mx-2">
            Sign up
          </Link>
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
          © 1996-2024, Quantum.com, Inc. or its affiliates
        </span>
      </div>
    </div>
  );
}

export default SignIn;
