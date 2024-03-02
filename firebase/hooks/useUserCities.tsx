import auth from "@react-native-firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchUserCities } from "../users";

export const useUserCities = () => {
  const queryClient = useQueryClient();
  const userId = auth().currentUser?.uid;

  return useQuery(
    {
      queryKey: ["collection", "users", userId, "cities"],
      queryFn: fetchUserCities,
    },
    queryClient,
  );
};
