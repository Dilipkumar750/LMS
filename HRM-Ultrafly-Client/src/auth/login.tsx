import "./style.css";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initSession } from "../store/sessionUserReducer";
import { environment } from "../environments/environment";
import Swal from "sweetalert2";
import { Spin } from "../common-components/spin";

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle login submission
  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${environment.apiPort}/auth/login`, {
        email,
        password,
      });

      if (data?.token) {
        // console.log(data.token)
        localStorage.setItem("userToken", data.token);
        dispatch(initSession() as any);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle reset password submission
  const handleSubmitResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Password match validation
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and confirm password do not match",
      });
      setLoading(false);
      return;
    }

    try {
       await axios.patch(
        `${environment.apiPort}/auth/reset-password`,
        {
          email,
          oldPassword,
          newPassword,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "Your password has been successfully updated",
      });
      setIsResetPassword(false); // Switch back to login form
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Reset failed";
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form
              className="space-y-4"
              onSubmit={isResetPassword ? handleSubmitResetPassword : handleSubmitLogin}
            >
              <div className="mb-8">
                <h3 className="text-gray-800 dark:text-gray-50 text-3xl font-extrabold">
                  {isResetPassword ? "Reset Password" : "Log in"}
                </h3>
                <p className="text-gray-500 dark:text-gray-200 text-sm mt-4 leading-relaxed">
                  {isResetPassword
                    ? "Please enter your old password, new password, and confirm your new password."
                    : "Sign in to your account and explore a world of possibilities. Your journey begins here."}
                </p>
              </div>

              {/* Common Email Field for both login and reset password */}
              <div>
                <label className="text-gray-800 dark:text-gray-50 text-sm mb-2 block">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                    placeholder="Enter your Email Address"
                  />
                </div>
              </div>

              {/* Login specific Password Field */}
              {!isResetPassword && (
                <div>
                  <label className="text-gray-800 dark:text-gray-50 text-sm mb-2 block">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>
              )}

              {/* Reset Password specific fields */}
              {isResetPassword && (
                <>
                  <div>
                    <label className="text-gray-800 dark:text-gray-50 text-sm mb-2 block">
                      Old Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                        placeholder="Enter Old Password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 dark:text-gray-50 text-sm mb-2 block">
                      New Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                        placeholder="Enter New Password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 dark:text-gray-50 text-sm mb-2 block">
                      Confirm New Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </div>
                </>
              )}

              <hr />
              <div className="!-mt-0">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {isResetPassword ? "Reset Password" : "Login"}
                  {loading && <Spin />}
                </button>
              </div>

              {/* Reset password link (only visible on login page) */}
              {!isResetPassword && (
                <p
                  className="text-blue-600 cursor-pointer text-sm mt-4 text-center"
                  onClick={() => setIsResetPassword(true)}
                >
                  Forgot your password? Reset here
                </p>
              )}

              {/* Go back to login from reset password page */}
              {isResetPassword && (
                <p
                  className="text-blue-600 cursor-pointer text-sm mt-4 text-center"
                  onClick={() => setIsResetPassword(false)}
                >
                  Back to Login
                </p>
              )}
            </form>
          </div>

          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover rounded-xl"
              alt="Login Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
