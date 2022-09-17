import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UseUserRoles = () => {
  const currentUser = useSelector((store) => store.currentUser);
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    currentUser &&
      currentUser.roles?.includes("user") &&
      currentUser.roles.length <= 1 &&
      setIsUser(true);
    currentUser && currentUser.roles?.includes("admin") && setIsAdmin(true);
  }, [currentUser]);

  return { isUser, isAdmin };
};

export default UseUserRoles;
