import { useEffect } from "react";
import axios from "axios";

function Logout() {
  useEffect(() => {
    axios.get("/users/logout").then(() => (window.location.href = "/products"));
  }, []);

  return;
}

export default Logout;
