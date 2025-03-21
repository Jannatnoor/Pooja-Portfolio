import React, { useState, useEffect } from "react";

const ContactVerification: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<{
    success: boolean;
    message: string;
    loading: boolean;
  }>({
    success: false,
    message: "Verifying your message...",
    loading: true,
  });

  useEffect(() => {
    const verifySubmission = async () => {
      try {
        // Extract token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (!token) {
          throw new Error("No verification token found");
        }

        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

        const response = await fetch(`${API_URL}/api/verify-contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.success) {
          setVerificationStatus({
            success: true,
            message: data.message,
            loading: false,
          });
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setVerificationStatus({
          success: false,
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
          loading: false,
        });
      }
    };

    verifySubmission();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div
        className={`p-8 rounded-lg shadow-md text-center ${
          verificationStatus.success
            ? "bg-green-50 dark:bg-green-900/30"
            : "bg-red-50 dark:bg-red-900/30"
        }`}
      >
        {verificationStatus.loading ? (
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-10 w-10 text-teal-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            <h2
              className={`text-2xl font-bold mb-4 ${
                verificationStatus.success
                  ? "text-green-800 dark:text-green-300"
                  : "text-red-800 dark:text-red-300"
              }`}
            >
              {verificationStatus.success
                ? "Verification Successful"
                : "Verification Failed"}
            </h2>
            <p
              className={`text-lg ${
                verificationStatus.success
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {verificationStatus.message}
            </p>
            {verificationStatus.success && (
              <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Your message has been sent to the portfolio owner.
                </p>
                <a
                  href="/"
                  className="mt-4 inline-block px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
                >
                  Return to Homepage
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContactVerification;
