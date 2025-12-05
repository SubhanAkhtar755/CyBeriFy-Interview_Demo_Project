import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user profile (optional, page load ke liye)
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/user/my-profile", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.error(
        "Failed to fetch user profile:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error);
    }
  };

  // ✅ Optional: load user on page load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ✅ New function: Login ke turant baad context update
  const loginSuccess = (userData) => {
    setUser(userData); // turant context update
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loginSuccess, loading, fetchUserProfile, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
