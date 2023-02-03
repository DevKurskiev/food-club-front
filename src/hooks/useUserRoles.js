import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UseUserRoles = () => {
  const currentUser = useSelector((store) => store.currentUser);
  const [isUser, setIsUser] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    currentUser &&
      currentUser.roles?.includes("user") &&
      currentUser.roles.length <= 1 &&
      setIsUser(true);
    // currentUser && currentUser.roles?.includes("admin") && setIsAdmin(true);
  }, [currentUser]);

  // return { isUser, isAdmin };
  return { isUser };
};

export default UseUserRoles;
