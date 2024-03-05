import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { getUserData } from "../users";

// const client = StreamChat.getInstanc

// export const useAuth = () => {
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
//     setUser(user);
//     if (loading) {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber;
//   }, []);

//   return { user, loading };
// };

export const useUserData = () => {
  const queryClient = useQueryClient();
  const userId = auth().currentUser?.uid;
  // const { loading, user } = useAuth();
  // const userId = user?.uid;

  return useQuery(
    {
      queryKey: ["collection", "users", userId],
      queryFn: getUserData,
    },
    queryClient,
  );
};
