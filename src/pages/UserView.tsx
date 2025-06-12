import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../utils/sessionStorage";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  mobile_number: string;
  dob: string;
}

const UserView: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }
    console.log("token---->", token);

    fetch(`${process.env.BACKEND_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or token expired");
        }
        const result = await res.json();
        setUser(result.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [navigate]);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 text-red-600 text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>

      <p>
        <strong>Name:</strong> {user.first_name} {user.last_name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Mobile:</strong> {user.mobile_number}
      </p>
      <p>
        <strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 mt-6 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default UserView;
