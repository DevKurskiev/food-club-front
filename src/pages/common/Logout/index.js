import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/users/logout").then(() => (window.location.href = "/products"));
  }, []);

  return;
}

export default Logout;
