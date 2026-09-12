import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const VerifyOtp = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get email from Register page
    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();

        // Check OTP
        if (!otp) {
            alert("Please enter the OTP");
            return;
        }

        if (otp.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }

        // Check email
        if (!email) {
            alert("Email not found. Please register again.");
            navigate("/register");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "/api/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: otp,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Invalid OTP");
                return;
            }

            alert("Email verified successfully!");

            // Go to login after successful verification
            navigate("/login");

        } catch (error) {
            console.error("OTP verification error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleVerify} className="auth-form">

                <h2>Verify Your Email</h2>

                <p>
                    We have sent a 6-digit OTP to:
                </p>

                <strong>{email}</strong>

                <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => {
                        // Allow only numbers
                        const value = e.target.value.replace(/\D/g, "");
                        setOtp(value);
                    }}
                    maxLength={6}
                    required
                />

                <button
                    type="submit"
                    className="btn"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <p>
                    Didn't receive the OTP? Check your email or spam folder.
                </p>

            </form>
        </div>
    );
};

export default VerifyOtp;
