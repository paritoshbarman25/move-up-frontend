import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, fetchProfile, logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
