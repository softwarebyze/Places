import firestore from "@react-native-firebase/firestore";
import { useMutation, useQuery } from "@tanstack/react-query";

import { addUserCity } from "../users";

const fetchCities = async () => {
  const querySnapshot = await firestore().collection("cities").get();
  const data = querySnapshot.docs.map((doc) => doc.data().name as string);
  console.log("fetchCities resuts: ", data);
  return data;
};

// export const useFirestoreCollection = (collectionPath: string) => {
//   const queryClient = useQueryClient();

//   const fetchCollection = () => {
//     return new Promise<FirebaseFirestoreTypes.DocumentData[]>(
//       (resolve, reject) => {
//         const unsubscribe = firestore()
//           .collection(collectionPath)
//           .onSnapshot((querySnapshot) => {
//             const data = querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             resolve(data);

//             queryClient.setQueryData(["cities"], data);
//           }, reject);

//         return unsubscribe;
//       },
//     );
//   };

//   return useQuery(
//     {
//       queryKey: ["cities"],
//       queryFn: fetchCollection,
//     },
//     queryClient,
//   );
// };

// export const useCities = () => {
//   return useFirestoreCollection("cities");
// };

export const useCities = () =>
  useQuery({ queryKey: ["cities"], queryFn: fetchCities });
