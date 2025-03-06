import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginStatus, setloginStatus] = useState(false);
  const [orderIDs, setorderIDs] = useState([]);
  const [nearestTrucks, setnearestTrucks] = useState([]);
  // const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzMyOTQ4NzgzLCJleHAiOjE3MzI5NTIzODN9.veNgpb4svES4usBanVQ181srcv8YLasIs5qW8vgdf6I");
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://127.0.0.1:3005/auth/login", credentials);
      setToken(response.data.AccessToken);
      localStorage.setItem("token", response.data.AccessToken);
      setloginStatus(true);
      navigate("/profile");
      // console.log("redirect to the profile page")
    } catch (error) {
      console.error("Login failed", error);
      console.log("Error from login page");
    }
  };

  const register = async (details) => {
    try {
      await axios.post("http://127.0.0.1:3005/auth/register", details);
      navigate("/login");
      // console.log("redirect to the login page")

    } catch (error) {
      console.error("Registration failed", error);
      console.log("This is error message from registation page");
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3005/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      console.log(response.data.user)
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const findNearestTrucks = async (longitude, latitude, maxDistance = 5000) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3005/truck/find-truck",
        { longitude, latitude, maxDistance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);
      setnearestTrucks(response.data.data)
      return response.data.data; // Returns the list of nearest trucks
    } catch (error) {
      console.error("Failed to find nearest trucks", error);
      setnearestTrucks();
      return null;
    }
  };

  

  const logout = () => {
    setUser(null);
    setToken(null);
    setloginStatus(false);
    localStorage.removeItem("token");
    navigate("/login");
    console.log("redirect to the login page")

  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, fetchProfile, logout, loginStatus, orderIDs, setorderIDs, findNearestTrucks, nearestTrucks ,setnearestTrucks}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
