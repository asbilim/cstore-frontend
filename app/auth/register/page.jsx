"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    // Simulate a successful login
    console.log("Login data:", data);
    toast.success("Login successful!");
  };

  const onError = () => {
    toast.error("Login failed. Please check your input.");
  };

  return (
    <div className="container login-container">
      <div className="login-form">
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="username"
              id="username"
              {...register("username", { required: "username is required" })}
            />
            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="username">email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "email is required" })}
            />
            {errors.username && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <button type="submit">Create Account</button>
          <p>
            Already have an account? <a href="/auth/login">Login</a>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
