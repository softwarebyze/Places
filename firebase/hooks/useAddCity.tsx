import { useMutation } from "@tanstack/react-query";

import { addUserCity } from "../users";

// const handleAddCity = async (city: string) => {
//     try {
//       setLoadingStatus("Adding city");
//       await addUserCity(city);
//       const newCities = await fetchUsersCities();
//       setCities(newCities);
//       setShowAddCitySheet(false);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingStatus(null);
//     }
//   };

export const useAddCity = () => useMutation({ mutationFn: addUserCity });
