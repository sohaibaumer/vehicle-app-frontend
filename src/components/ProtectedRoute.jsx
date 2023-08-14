import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]); // Access the 'jwt' cookie value

  useEffect(() => {
    if (!cookies.token) {
      navigate("/"); // Redirect to '/' if token cookie doesn't exist
    } else {
      navigate("/dashboard"); // Redirect to '/dashboard' if token cookie exists
    }
  }, [cookies.token, navigate]);

  return <div>{Component}</div>;
};

export default ProtectedRoute;
