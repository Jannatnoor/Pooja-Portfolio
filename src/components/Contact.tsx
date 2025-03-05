import React, { useState } from "react";
import { SectionProps } from "../types/Section.types";
import { FormData, FormErrors, SubmitStatus } from "../types/Contact.types";
// import { Mail } from "lucide-react";

const Contact: React.FC<SectionProps> = ({ setActiveSection, darkMode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Show loading state
      setSubmitStatus({
        loading: true,
        message: "Sending your message...",
      });

      // Get API URL from environment variable or use default
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: window.location.href, // Track where the form was submitted from
          timestamp: new Date().toISOString(), // Add timestamp for tracking
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || "Message sent successfully!",
          previewUrl: data.previewUrl, // This will be present if using Ethereal
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message:
            data.message ||
            "There was an error sending your message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus({
        success: false,
        message:
          "There was an error connecting to the server. Please try again later.",
      });
    } finally {
      // Clear loading state
      setSubmitStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    // Clear previous submit status when user makes changes
    if (submitStatus.message) {
      setSubmitStatus({});
    }
  };

  return (
    <section
      id="contact"
      className={`py-16 ${darkMode ? "bg-[#1a1f2e]" : "bg-white"}`}
      onMouseEnter={() => setActiveSection("contact")}
    >
      <div className="section-content max-w-2xl mx-auto">
        <h2
          className={`section-heading ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Get in Touch
        </h2>

        {/* Contact Information - Centered above the form */}
        <div className="text-center mb-10">
          <p
            className={`text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </div>

        {/* Contact Form - Now centered */}
        <div
          className={`rounded-lg p-6 ${
            darkMode ? "bg-white/5 backdrop-blur-sm" : "bg-white shadow-lg"
          }`}
        >
          {submitStatus.success ? (
            <div className="space-y-4">
              <div
                className={`rounded-md p-4 ${
                  darkMode
                    ? "bg-green-400/10 text-green-400"
                    : "bg-green-50 text-green-800"
                }`}
              >
                <p className="font-medium">{submitStatus.message}</p>
              </div>

              {submitStatus.previewUrl && (
                <div className="mt-4">
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    View your message preview (development mode only):
                  </p>
                  <a
                    href={submitStatus.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${
                      darkMode
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    Open email preview
                  </a>
                </div>
              )}

              <button
                onClick={() => setSubmitStatus({})}
                className={`mt-4 w-full py-3 px-6 rounded-lg ${
                  darkMode
                    ? "bg-teal-600 hover:bg-teal-700"
                    : "bg-teal-600 hover:bg-teal-700"
                } text-white font-medium transition-colors duration-200`}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-white/10 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p
                    className={`mt-1 text-sm ${
                      darkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-white/10 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p
                    className={`mt-1 text-sm ${
                      darkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-white/10 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Subject of your message"
                />
                {errors.subject && (
                  <p
                    className={`mt-1 text-sm ${
                      darkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-white/10 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Your message"
                />
                {errors.message && (
                  <p
                    className={`mt-1 text-sm ${
                      darkMode ? "text-red-400" : "text-red-600"
                    }`}
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status message for non-success states */}
              {submitStatus.message && !submitStatus.success && (
                <div
                  className={`rounded-md p-4 ${
                    darkMode
                      ? "bg-red-400/10 text-red-400"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  <p>{submitStatus.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitStatus.loading}
                className={`w-full py-3 px-6 rounded-lg ${
                  darkMode
                    ? "bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50"
                    : "bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50"
                } text-white font-medium transition-colors duration-200 flex justify-center items-center`}
              >
                {submitStatus.loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
