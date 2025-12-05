import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [screen, setScreen] = useState("login"); // login | register | forgot
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { loginSuccess } = useContext(UserContext); // ✅ Context login update

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* --------------------- LOGIN API --------------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/login", form, {
        withCredentials: true,
      });

      // ✅ Update context instantly
      loginSuccess(res.data.user);

      alert("Login Successful!");
      navigate("/"); // redirect home
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  /* --------------------- REGISTER API --------------------- */
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/user/register", form);
      alert("Register Successful! Please Login.");
      setScreen("login");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  /* --------------------- FORGOT PASSWORD API --------------------- */
  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/user/forgot-password", {
        email: form.email,
      });
      alert("Reset email sent!");
      setScreen("login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* ---------------- LOGIN SCREEN ---------------- */}
        {screen === "login" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full border p-2 rounded mb-3"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full border p-2 rounded mb-3"
                onChange={handleChange}
                required
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded mt-2">
                Login
              </button>
            </form>

            <p
              className="text-sm mt-4 text-blue-600 cursor-pointer"
              onClick={() => setScreen("forgot")}
            >
              Forgot Password?
            </p>

            <p className="text-sm mt-2">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setScreen("register")}
              >
                Register
              </span>
            </p>
          </>
        )}

        {/* ---------------- REGISTER SCREEN ---------------- */}
        {screen === "register" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full border p-2 rounded mb-3"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border p-2 rounded mb-3"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border p-2 rounded mb-3"
                onChange={handleChange}
                required
              />
              <button className="w-full bg-green-600 text-white py-2 rounded mt-2">
                Register
              </button>
            </form>

            <p className="text-sm mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setScreen("login")}
              >
                Login
              </span>
            </p>
          </>
        )}

        {/* ---------------- FORGOT PASSWORD SCREEN ---------------- */}
        {screen === "forgot" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleForgot}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full border p-2 rounded mb-3"
                onChange={handleChange}
                required
              />
              <button className="w-full bg-purple-600 text-white py-2 rounded mt-2">
                Send Reset Email
              </button>
            </form>

            <p
              className="text-sm mt-4 text-blue-600 cursor-pointer"
              onClick={() => setScreen("login")}
            >
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
