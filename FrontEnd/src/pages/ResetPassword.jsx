// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get token & email from query params
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/user/reset-password", {
        email,
        token,
        newPassword: form.newPassword,
      });

      alert(res.data.message || "Password reset successful");
      navigate("/login"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Set New Password</h2>

        <form onSubmit={handleReset}>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="w-full border p-2 rounded mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded mb-3"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded mt-2"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
