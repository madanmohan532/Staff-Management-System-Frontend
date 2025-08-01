import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file
import { FaUsers } from "react-icons/fa6";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  // Handle changes for form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setLoginError("");
  };

  // Simple validation
  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required";
    else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(formData.email)
    )
      tempErrors.email = "Invalid email format";

    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.role) tempErrors.role = "Role is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setLoginError("");

    axios
      .post(
        "http://localhost:9999/registration-service/api/login/login",
        null,
        {
          params: {
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
        }
      )
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          const { user } = response.data;

          console.log(response.data);

          localStorage.setItem("userEmail", user.email);
          localStorage.setItem("userId", user.id);

          if (user.role === "hospital staff") {
            navigate(`/hospitalAdmin`, { state: { email: user.email } });
          } else {
            navigate(`/${user.role}`, { state: { email: user.email } });
          }

          // Pass only email to dashboard (change as needed)
        } else {
          setLoginError(
            response.data.message ||
              response.data ||
              "Login failed, please try again"
          );
        }
      })
      .catch((error) => {
        setLoginError(
          error.response.data.message ||
            error.response.data ||
            "Login failed,try again"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">User Login</h2>

        {loginError && <div className="login-error">{loginError}</div>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error-input" : ""}
            autoComplete="username"
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "error-input" : ""}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={errors.role ? "error-input" : ""}
          >
            <option value="admin">Admin</option>
            <option value="hospital staff">Hospital Admin</option>
            <option value="nurse">Nurse</option>
          </select>
          {errors.role && <span className="error-msg">{errors.role}</span>}
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
