import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext({ user: null, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  const logout = () => auth().signOut();
  useEffect(() => {
    const unsubsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
