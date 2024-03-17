import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

type UserData = {
  details_completed?: boolean;
  birth_date?: FirebaseFirestoreTypes.Timestamp;
  first_name?: string;
  gender?: string;
  interests?: string[];
  last_name?: string;
  phone?: string;
  cities?: string[];
  [key: string]: any;
};

export const getUserData = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) return null;
  const userSnap = await firestore().collection("users").doc(userId).get();
  if (userSnap?.exists) {
    const userData = userSnap.data(); // as UserData;
    console.log("userData :", userData);
    return userData;
  } else {
    console.log("No data for user!");
    return null;
  }
};

export const fetchUserCities = async () => {
  const userId = auth().currentUser?.uid;
  const userSnap = await firestore().collection("users").doc(userId).get();
  if (userSnap.exists) {
    const cities = userSnap.data().cities || [userSnap.data().location];
    console.log(cities);
    return cities as string[];
  } else {
    throw new Error("No user found");
  }
};

export const addUserCity = async (city: string) => {
  const userId = auth().currentUser?.uid;
  return await firestore()
    .doc(`users/${userId}`)
    .update({
      cities: firestore.FieldValue.arrayUnion(city),
    })
    .then(fetchUserCities);
};

type UserDetails = {
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  birth_date: Date;
  details_completed: true;
  cities: string[];
  interests: string[];
};

export const saveUserDetails = async (userDetails: Partial<UserDetails>) => {
  try {
    const userId = auth().currentUser?.uid;
    return await firestore()
      .doc(`users/${userId}`)
      .set(userDetails, { merge: true });
  } catch (error) {
    console.error(error);
  }
};
