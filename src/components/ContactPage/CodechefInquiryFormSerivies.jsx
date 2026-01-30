import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import "../../components/css/InquiryForm.css"
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function InquiryFormSerivies({ closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.email) formErrors.email = "Email is required.";
    if (!formData.services) formErrors.services = "Please select a service.";
    if (!formData.message) formErrors.message = "Message is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitConfirmation(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e1459ab6-c1ba-4ea4-87c4-c3795e27add5", // ✅ Web3Forms key
          subject: "New CodeChef Inquiry",
          from_name: "ICL Website",

          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          services: formData.services,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Submission failed");
      }

      setSuccessMessage("Your request has been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        services: "",
        message: "",
      });
    } catch (err) {
      console.error("Web3Forms error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitConfirmation(false);
    }
  };



  // Logic to close the form
  const closeForm = () => {
    setIsVisible(false);
    if (closeModal) {
      closeModal(); // Close from parent
    }
  };

  if (!isVisible) return null;

  return (
    <div className="consultation-section-i">
      <div className="consultation-container-i">
        <button className="close-button-i" onClick={closeForm}>
          <FaTimes />
        </button>
        <h1 className="form-title-i">Get in Touch</h1>
        <p className="form-desc-i">
           Reach out to us for CodeChef-powered training programs.
        </p>
        <p className="support-note-i text-center">
          For technical support, contact:
          <br />

          <a
            href="mailto:codechef@icl.today"
            className="support-email-i flex items-center justify-center gap-2 mt-1"
          >
            <FaEnvelope className="text-blue-600" />
            codechef@icl.today
          </a>

          <div className="flex items-center justify-center gap-2 mt-2 text-blue-600">
            {/* Phone icon */}
            <FaPhoneAlt />

            {/* First number */}
            <a href="tel:+918667214326" className="font-medium">
              +91 86672 14326
            </a>

            {/* Slash in same blue color */}
            <span>/</span>

            {/* Second number */}
            <a href="tel:+919176771711" className="font-medium">
              +91 91767 71711
            </a>
          </div>


        </p>




        {/* Success message display */}
        <div className="center-container-i">
          {successMessage && <p className="success-message-i"><FaCircleCheck /> {successMessage}</p>}
        </div>

        <form onSubmit={handleSubmit} className="consultation-form-i">
          <div className="form-row-i text-gray-800">
            <div className="form-left-i">
              <div className="input-group-i">
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field-i"
                />
                {errors.name && <p className="error-message-i">{errors.name}</p>}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field-i"
                />
              </div>
            </div>
            <div className="form-right-i">
              <div className="input-group-i">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field-i"
                />
                {errors.email && <p className="error-message-i">{errors.email}</p>}
                <input
                  type="text"

                  name="services"
                  value={formData.services}
                  placeholder="Services*"
                  onChange={handleChange}
                  required
                  className="input-field-i"
                />

                {errors.services && <p className="error-message-i">{errors.services}</p>}
              </div>
            </div>
          </div>
          <textarea
            name="message"
            placeholder="Enter message*"
            required
            value={formData.message}
            onChange={handleChange}
            className="input-field-i"
          />
          {errors.message && <p className="error-message-i">{errors.message}</p>}
          <button type="submit" className="submit-button-i">{submitConfirmation ? "Submitting..." : "Submit"}</button>
        </form>


      </div>
    </div>
  );
}
