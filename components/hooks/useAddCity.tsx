import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addUserCity } from "../../firebase/users";

export const useAddCity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserCity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "cities"] });
    },
  });
};
