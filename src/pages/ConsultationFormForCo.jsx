import "../components/css/ConsultationForm.css";
import { useState } from "react";

import { FaCircleCheck } from "react-icons/fa6";

export default function ConsultationFormForCo() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        services: "",
        message: "",
        college: "",
        location: "",
    });

    const [errors, setErrors] = useState({});  // State to track form field errors
    const [successMessage, setSuccessMessage] = useState("");  // Success message state

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear the error for the field when user starts typing
        setErrors({ ...errors, [name]: "" });
    };

    // Validate form fields
    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = "Name is required.";
        if (!formData.email) formErrors.email = "Email is required.";
        if (!formData.phone) formErrors.phone = "Phone number is required.";
        if (!formData.college) formErrors.college = "College name is required.";
        if (!formData.location) formErrors.location = "Location is required.";
        if (!formData.services) formErrors.services = "Please select a service.";
        if (!formData.message) formErrors.message = "Message is required.";

        setErrors(formErrors);

        // Return true if no errors
        return Object.keys(formErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const emailPayload = {
                mailTo: "codechef@icl.today",
                name: formData.name,
                email: formData.email,
                college: formData.college,
                location: formData.location,
                phone: formData.phone,
                services: formData.services,
                message: formData.message,
                time: new Date().toLocaleString()
            };

            try {
                const response = await fetch("https://mailer-api-production-76e4.up.railway.app/send-email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(emailPayload)
                });

                if (response.ok) {
                    setSuccessMessage("Your request has been submitted successfully!");

                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        services: "",
                        message: "",
                        college: "",
                        location: "",
                    });

                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 5000);
                } else {
                    console.error("API response not OK:", await response.text());
                    alert("An error occurred while submitting your request. Please try again.");
                }
            } catch (err) {
                console.error("Failed to send email. Error:", err);
                alert("An error occurred while submitting your request. Please try again.");
            }
        }
    };

    return (
        <div className="consultation-section">
            <div className="consultation-container">

                <h1 className="form-title">Talk to our Experts</h1>
                <p className="form-desc">
                    Have questions or need help with any of our services? Our customer support team is here to assist you anytime.
                </p>
                {/* Success message display */}
                <div className="center-container flex justify-center">
                    {successMessage && (
                        <p className="flex items-center gap-2 text-green-600 text-base font-medium">
                            <FaCircleCheck className="w-5 h-5" />
                            <span>{successMessage}</span>
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="consultation-form">
                    <div className="form-row">
                        <div className="form-left">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name*"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="cf-inp"
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}

                                <input
                                    type="text"
                                    name="college"
                                    placeholder="College Name*"
                                    required
                                    value={formData.college}
                                    onChange={handleChange}
                                    className="cf-inp"
                                />
                                {errors.college && <p className="error-message">{errors.college}</p>}

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number*"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="cf-inp"
                                />
                                {errors.phone && <p className="error-message">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="form-right">
                            <div className="input-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email*"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="cf-inp"
                                />
                                {errors.email && <p className="error-message">{errors.email}</p>}

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location*"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="cf-inp"
                                />
                                {errors.location && <p className="error-message">{errors.location}</p>}

                                <input
                                    type="text"
                                    name="services"
                                    value={formData.services}
                                    placeholder="Services*"
                                    onChange={handleChange}
                                    required
                                    className="cf-inp"
                                />
                                {errors.services && <p className="error-message">{errors.services}</p>}
                            </div>
                        </div>
                    </div>
                    <textarea
                        name="message"
                        placeholder="Enter message*"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="cf-inp"
                    />
                    {errors.message && <p className="error-message">{errors.message}</p>}
                    <button type="submit" className="submit-button">Submit the Request</button>
                </form>
            </div>
        </div>
    );
}
