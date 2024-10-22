import { INITIAL_AUTH_CONTEXT } from "@/constants";
import { auth, db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { AuthContextType, CurrentUserDataType } from "@/types";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>(INITIAL_AUTH_CONTEXT);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { setCurrentUserData } = useData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log("Auth state is changed: LoggedOut");
        return;
      }
      setCurrentUser(user);

      const accessToken = await user.getIdToken();

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Auth state is changed: loggedIn");
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      const documentRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const userData = documentSnapshot.data() as CurrentUserDataType;
          setCurrentUserData(userData);
          console.log("Current user data fetched successfully");
        } else {
          console.log("Document does not exist.");
        }
      });
      return unsubscribe;
    } else {
      console.log("currentUser is not available.");
    }
  }, [currentUser, setCurrentUserData]);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
