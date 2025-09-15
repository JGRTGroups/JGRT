import React, { useState } from "react";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";
import { useForm } from '@formspree/react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  message?: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  
  // Replace your form ID here
  const [state, handleSubmit] = useForm("xjkezzvd");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us how we can help you";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form first
    if (!validateForm()) return;
    
    // If validation passes, submit to Formspree
    handleSubmit(e);
  };

  // Clear form when submission is successful
  React.useEffect(() => {
    if (state.succeeded) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        message: "",
      });
    }
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl border border-white/30">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-white/90 text-lg mb-6">
            Your message has been sent successfully. We'll get back to you soon!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 lg:gap-40 gap-8 min-h-screen items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                CONTACT US
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Do you have any doubts regarding your dream project?
              </p>
            </div>
            
            {/* "You can also reach us directly" text - ADDED THIS */}
            <div className="text-center lg:text-left">
              <p className="text-lg text-white/90 font-medium mb-6">
                You can also reach us directly:
              </p>
            </div>

            {/* Map & Contact Buttons */}
            <div className="relative group">
              <div
                className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 sm:px-0 cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/BxukQ9fKCjgVeY949",
                    "_blank"
                  )
                }
              >
                <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg">
                  <img
                    src="map.png"
                    alt="Map Image"
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6">
                    <button
                      onClick={() =>
                        (window.location.href = "tel:+919042527576")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full shadow-lg transition-all duration-200 text-sm sm:text-base hover:shadow-xl transform hover:scale-105 active:scale-95 w-full max-w-xs text-center"
                    >
                      📞 <span className="hidden sm:inline">Call us: </span>
                      <span className="sm:hidden">Call: </span>
                      +91-9042527576
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = "mailto:jgrtgroups@gmail.com")
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full shadow-lg transition-all duration-200 text-sm sm:text-base hover:shadow-xl transform hover:scale-105 active:scale-95 w-full max-w-xs text-center break-all sm:break-normal"
                    >
                      ✉️{" "}
                      <span className="hidden sm:inline">Email: </span>
                      <span className="sm:hidden">✉️ </span>
                      <span className="text-xs sm:text-sm md:text-base">
                        jgrtgroups@gmail.com
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                GET IN TOUCH
              </h2>
              <p className="text-gray-600 font-medium">REACH US AT ANY TIME</p>
            </div>

            <form
              onSubmit={onSubmit}
              className="no-style-form space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="FIRST NAME"
                    className={`text-black w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 font-medium ${
                      errors.firstName ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="LAST NAME"
                    className={`text-black w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 font-medium ${
                      errors.lastName ? "border-red-400" : "border-gray-200"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="EMAIL ID"
                  className={`text-black w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 font-medium ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="CONTACT NUMBER"
                  className={`text-black w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 font-medium ${
                    errors.contactNumber ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="HOW CAN WE HELP YOU?"
                  rows={4}
                  className={`text-black w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 font-medium resize-none ${
                    errors.message ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                {state.submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    SUBMIT
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;