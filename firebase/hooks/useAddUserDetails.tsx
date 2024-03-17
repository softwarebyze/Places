import { useQueryClient, useMutation } from "@tanstack/react-query";

import { useAuth } from "../../components/contexts/AuthContext";
import { saveUserDetails } from "../users";

export const useAddUserDetails = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.uid;
  return useMutation({
    mutationFn: saveUserDetails,
    onSuccess: () => {
      console.log("User details added");
      queryClient.invalidateQueries({
        queryKey: ["collection", "users", userId],
      });
    },
  });
};
