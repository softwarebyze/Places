import { useQuery } from "@tanstack/react-query";

import { fetchUsersCities } from "../../firebase/users";

export const useUserCities = () =>
  useQuery({ queryKey: ["user", "cities"], queryFn: fetchUsersCities });
