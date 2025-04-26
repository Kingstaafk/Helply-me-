import React, { useState } from "react";
import firebase from "../utils/firebase"; // ⬅️ import from your file

const LoginFormModal = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignInSubmit = async (e) => {
    e.preventDefault();
    if (number.length !== 10 || isNaN(number)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    const phoneNumber = "+91" + number;

    try {
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) recaptchaContainer.innerHTML = "";

      const appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("✅ Recaptcha solved:", response);
          },
          "expired-callback": () => {
            console.log("❌ Recaptcha expired");
          },
        }
      );

      await appVerifier.render();

      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setShowOtp(true);
      console.log("✅ OTP sent");
    } catch (error) {
      console.error("❌ OTP not sent:", error.message);
      alert("Failed to send OTP: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      alert("Please enter the 6-digit OTP");
      return;
    }

    try {
      const result = await window.confirmationResult.confirm(otp);
      console.log("✅ User signed in:", result.user.phoneNumber);
      alert("Login successful!");
    } catch (error) {
      console.error("❌ Invalid OTP:", error.message);
      alert("Invalid OTP, please try again.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow-xl rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4">Login via Phone OTP</h2>

      {!showOtp ? (
        <form onSubmit={onSignInSubmit}>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter phone number"
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={verifyOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Verify OTP
          </button>
        </form>
      )}

      <div id="recaptcha-container" />
    </div>
  );
};

export default LoginFormModal;
