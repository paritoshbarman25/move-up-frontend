import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import OrderForm from "./OrderForm";

const Profile = () => {
  const { user, fetchProfile, logout } = useAuth();

  useEffect(() => {
    fetchProfile();
    console.log("Fetching profile data")
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <button onClick={logout}>Logout</button>
      <OrderForm />
    </div>
  );
};

export default Profile;
