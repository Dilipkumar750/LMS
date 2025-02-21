import "./style.css";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import Swal from "sweetalert2";
import { Spin } from "../common-components/spin";
import { environment } from "../environments/environment";

interface FormData {
  name: string;
  businessName: string;
  email: string;
  mobile: string;
  businessType: string;
  businessRegistrationNumber: string;
  taxIdentificationNumber: string;
  businessLicenseNumber: string;
  websiteURL: string;
  registeredAddress: string;
  operationalAddress: string;
  productCategories: string;
  brandNames: string;
  [key: string]: string | File | null;
}

// businessRegistrationCertificate: File | null;
// taxDocuments: File | null;
// identityProof: File | null;
type FormDataKeys = keyof FormData;

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    businessName: "",
    email: "",
    mobile: "",
    businessType: "",
    businessRegistrationNumber: "",
    taxIdentificationNumber: "",
    businessLicenseNumber: "",
    websiteURL: "",
    registeredAddress: "",
    operationalAddress: "",
    productCategories: "",
    brandNames: "",
  });

  // businessRegistrationCertificate: null,
  // taxDocuments: null,
  // identityProof: null,
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  // const navigate = useNavigate()

  const steps = [
    [
      {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
      },
      {
        name: "businessName",
        label: "Business Name",
        type: "text",
        required: true,
      },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "mobile", label: "Phone", type: "text", required: true },
      {
        name: "businessType",
        label: "Business Type",
        type: "text",
        required: false,
      },
    ],
    [
      {
        name: "businessRegistrationNumber",
        label: "Business Registration Number",
        type: "text",
        required: true,
      },
      {
        name: "taxIdentificationNumber",
        label: "Tax Identification Number",
        type: "text",
        required: false,
      },
      {
        name: "businessLicenseNumber",
        label: "Business License Number",
        type: "text",
        required: true,
      },
      {
        name: "websiteURL",
        label: "Website URL",
        type: "url",
        required: false,
      },
      {
        name: "registeredAddress",
        label: "Registered Address",
        type: "text",
        required: true,
      },
    ],
    [
      {
        name: "operationalAddress",
        label: "Operational Address",
        type: "text",
        required: true,
      },
      {
        name: "productCategories",
        label: "Product Categories",
        type: "text",
        required: false,
      },
      {
        name: "brandNames",
        label: "Brand Names",
        type: "text",
        required: false,
      },
      // {
      //   name: "businessRegistrationCertificate",
      //   label: "Business Registration Certificate",
      //   type: "file",
      //   required: false,
      // },
      // {
      //   name: "taxDocuments",
      //   label: "Tax Documents",
      //   type: "file",
      //   required: false,
      // },
      // {
      //   name: "identityProof",
      //   label: "Identity Proof",
      //   type: "file",
      //   required: false,
      // },
    ],
  ];

  const validateStep = () => {
    const stepErrors: { [key: string]: string } = {};
    steps[currentStep].forEach(({ name, label, required }) => {
      if (required && !formData[name]) {
        stepErrors[name] = `${label} is required.`;
      }
    });

    setErrors(stepErrors);

    return Object.keys(stepErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as FormDataKeys]: value,
    });

    let error = "";

    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email address.";
      }
    } else if (name === "phone" && value) {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        error = "Invalid phone number. Must be 10 digits.";
      }
    }

    // Update errors
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) return;
    setLoading(true);

    try {
      await axios
        .post(`${environment.apiPort}/auth/register/vendor`, formData)
        .then((response) => {
          if (response?.data) {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              text: "Your account has been created.",
            });

            setFormData({
              name: "",
              businessName: "",
              email: "",
              mobile: "",
              businessType: "",
              businessRegistrationNumber: "",
              taxIdentificationNumber: "",
              businessLicenseNumber: "",
              websiteURL: "",
              registeredAddress: "",
              operationalAddress: "",
              productCategories: "",
              brandNames: "",
            });

            setErrors({});
            setCurrentStep(0);
          }
        });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong.",
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-md max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-3xl font-extrabold">
                  Sign Up
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Create an account and start your journey with us.
                </p>
              </div>

              {steps[currentStep].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="text-gray-800 text-sm mb-2 block">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={
                      type === "file" ? undefined : (formData[name] as string)
                    }
                    onChange={handleChange}
                    className={`w-full text-sm text-gray-800 border px-4 py-3 rounded-lg outline-green-600 ${
                      errors[name] ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={`Enter ${label}`}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div className="flex justify-between mt-4 gap-x-4">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                  >
                    Previous
                  </button>
                )}
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    disabled={loading}
                  >
                    Sign Up {loading && <Spin />}
                  </button>
                )}
              </div>

              <p className="text-black text-center mt-2">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-blue-600">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
          <div className="lg:h-[400px] md:h-[300px] max-md:mt-8">
            <img
              src="https://readymadeui.com/login-image.webp"
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover rounded-xl"
              alt="Business Registration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
