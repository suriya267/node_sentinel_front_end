import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/sessionStorage";

interface FormData {
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  mobile_number: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    mobile_number: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const BACKEND_BASE_URL = "https://node-seltinel.onrender.com";
      const res = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful!");
        setFormData({
          first_name: "",
          last_name: "",
          dob: "",
          gender: "",
          mobile_number: "",
          email: "",
          password: "",
        });
        setToken(data.token);
        navigate("/user");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow p-6 rounded mt-10"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

      {["first_name", "last_name", "mobile_number", "email", "password"].map(
        (field) => (
          <div key={field}>
            <label className="block text-gray-700 font-medium capitalize text-left">
              {field.replace("_", " ")}
            </label>
            <input
              type={
                field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : "text"
              }
              name={field}
              value={(formData as any)[field]}
              onChange={handleChange}
              className="w-full mt-1 mb-3 px-4 py-2 border border-gray-300 rounded"
            />
          </div>
        )
      )}

      <label className="block text-gray-700 font-medium text-left">
        Date of Birth
      </label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full mt-1 mb-3 px-4 py-2 border border-gray-300 rounded"
      />

      <label className="block text-gray-700 font-medium text-left">
        Gender
      </label>
      <div className="flex gap-4 mb-3">
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
            className="mr-2"
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
            className="mr-2"
          />
          Female
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
      >
        Register
      </button>

      <div className="flex justify-end mt-4 cursor-pointer text-blue-500">
        <div onClick={() => navigate("/login")}>Already Have Account?</div>
      </div>
    </form>
  );
};

export default Register;
