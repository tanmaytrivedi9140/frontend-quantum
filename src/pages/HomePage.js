import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DummyApiComponent from "../components/DummyApiComponent";
function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const token = await localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("/verify", config);

      // Assuming response.data contains the data you want to store
      const responseData = response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  return <DummyApiComponent />;
}

export default HomePage;
