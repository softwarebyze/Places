import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const subscriber = firestore()
  .collection("Users")
  .onSnapshot((querySnapshot) => {
    const users = [];

    querySnapshot.forEach((documentSnapshot) => {
      users.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
      });
    });
  });

export const fetchCities = async () => {
  //   const userId = auth().currentUser?.uid;
  //   const userSnap = await firestore().collection("cities").get();
  //   if (userSnap.exists) {
  //     const cities = userSnap.data().cities || [userSnap.data().location];
  //     return cities;
  //   } else {
  //     throw new Error("No user found");
  //   }
};

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useFirestoreCollection = (collectionPath: string) => {
  const queryClient = useQueryClient();

  const fetchCollection = () => {
    // This function doesn't fetch the data directly but returns a function that sets up the subscription
    return new Promise((resolve, reject) => {
      const unsubscribe = firestore()
        .collection(collectionPath)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          resolve(data);

          // Here we update the query cache whenever there's a change in the collection
          queryClient.setQueryData(["collection", collectionPath], data);
        }, reject);

      // Returning the unsubscribe function here allows React Query to call it when the component unmounts or the query is no longer used
      return unsubscribe;
    });
  };

  return useQuery(
    {
      queryKey: ["collection", collectionPath],
      queryFn: fetchCollection,
    },
    queryClient,
  );
  // return useQuery(["collection", collectionPath], fetchCollection, {
  //   // You might not need onSuccess here, depending on your use case
  //   onSuccess: (data) => {
  //     // Handle successful data synchronization
  //   },
  //   // The query will remain fresh, and background refetches will be disabled
  //   staleTime: Infinity,
  //   cacheTime: Infinity,
  // });
};

// from the react-native-firebase documentation
// useEffect(() => {
//   const subscriber = firestore()
//     .collection('Users')
//     .onSnapshot(querySnapshot => {
//       const users = [];

//       querySnapshot.forEach(documentSnapshot => {
//         users.push({
//           ...documentSnapshot.data(),
//           key: documentSnapshot.id,
//         });
//       });

//       setUsers(users);
//       setLoading(false);
//     });

//   // Unsubscribe from events when no longer in use
//   return () => subscriber();
// }, []);

export const useCities = () => {
  return useFirestoreCollection("cities");
};
