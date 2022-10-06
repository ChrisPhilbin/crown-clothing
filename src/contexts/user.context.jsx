import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//wraps children to give them access to state
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
