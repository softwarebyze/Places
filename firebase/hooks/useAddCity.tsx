import auth from "@react-native-firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addUserCity } from "../users";

export const useAddCity = () => {
  const queryClient = useQueryClient();
  const userId = auth().currentUser?.uid;
  return useMutation({
    mutationFn: addUserCity,
    onSuccess: () => {
      console.log("City added");
      queryClient.invalidateQueries({
        queryKey: ["collection", "users", userId, "cities"],
      });
    },
  });
};
