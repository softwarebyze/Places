import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../components/contexts/AuthContext";
import { addUserCity } from "../users";

export const useAddCity = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.uid;
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
