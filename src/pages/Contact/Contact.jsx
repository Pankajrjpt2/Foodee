import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Link,
} from "@mui/material";
import ContactImage from "../../assets/Images/contactpage.jpg";

// Extract constants
const HELP_OPTIONS = [
  { value: 0, label: "I need help with my Foodee online order." },
  { value: 1, label: "I found incorrect/outdated information on a page." },
  {
    value: 2,
    label:
      "There is a photo/review that is bothering me and I would like to report it.",
  },
  { value: 3, label: "The website/app are not working the way they should." },
  { value: 4, label: "I would like to give feedback/suggestions." },
  { value: 5, label: "Other" },
];

// Extract components
const ContactHero = () => (
  <div className="h-[45vh] w-full relative">
    <img
      className="w-full h-full object-cover"
      src={ContactImage}
      alt="Contact"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 flex items-center justify-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg text-center px-4">
        We would love to hear from you!
      </h1>
    </div>
  </div>
);

const InfoCard = ({ title, description, link }) => (
  <div className="w-full h-full rounded-3xl shadow-2xl p-8">
    <p className="text-[1.7rem] leading-[2.7rem] mb-4 font-okra">{title}</p>
    <p className="text-gray-600 font-okra text-md">{description}</p>
    {link && (
      <div className="mt-4 text-rose-900">
        <Link
          sx={{
            textDecoration: "none",
            fontWeight: "bold",
            color: "#B82132",
            fontSize: "1rem",
          }}
          href={link}
        >
          Report Here
        </Link>
      </div>
    )}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    helpType: "",
    fullName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.helpType) newErrors.helpType = "Please select an option";
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="overflow-auto scrollbar-hide">
      <ContactHero />

      <div className="min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
        <div className="w-full lg:flex-1 lg:max-w-[60%] py-6 lg:py-10">
          <form onSubmit={handleSubmit} className="w-full h-full p-4 lg:p-8">
            <FormControl fullWidth className="space-y-5">
              <FormControl fullWidth error={!!errors.helpType}>
                <InputLabel>
                  How can we help you? <span className="text-red-500">*</span>
                </InputLabel>
                <Select
                  name="helpType"
                  value={formData.helpType}
                  label="How can we help you? *"
                  onChange={handleChange}
                >
                  {HELP_OPTIONS.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label={
                  <>
                    Full Name <span className="text-red-500">*</span>{" "}
                  </>
                }
                variant="outlined"
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <TextField
                label={
                  <>
                    Email Address <span className="text-red-500">*</span>{" "}
                  </>
                }
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Mobile Number(Optional)"
                variant="outlined"
                fullWidth
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <TextField
                label={
                  <>
                    Type text <span className="text-red-500">*</span>{" "}
                  </>
                }
                multiline
                rows={8}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              <div className="w-full sm:w-[25%] mt-6">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#B82132",
                    "&:hover": { backgroundColor: "#2563eb" },
                    boxShadow: "0 10px 15px -3px rgb(59 130 246 / 0.5)",
                  }}
                  fullWidth
                >
                  Submit
                </Button>
              </div>
            </FormControl>
          </form>
        </div>

        <div className="w-full lg:flex-1 lg:max-w-[40%] flex flex-col items-center justify-center">
          <div className="w-full h-full pt-6 px-4 lg:pt-12 lg:px-12 pb-4 lg:pb-8 mt-4 lg:mt-10">
            <InfoCard
              title="Report a Safety Emergency"
              description="We are committed to the safety of everyone using Foodee."
              link="#"
            />
          </div>
          <div className="w-full h-full px-4 lg:px-12 pb-6 lg:pb-14 mb-6 lg:mb-12">
            <InfoCard
              title="Issue with your live order?"
              description="Click on the 'Support' or 'Online ordering help' section in your app to connect to our customer support team"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
