import { useEffect } from "react";
import axios from "axios";

function Logout() {
  useEffect(() => {
    localStorage.removeItem('foodClubUserId')
    window.location.href = "/products"
  }, []);

  return;
}

export default Logout;
