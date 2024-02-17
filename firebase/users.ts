import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const getUserData = async () => {
  const userId = auth().currentUser?.uid;
  if (!userId) throw new Error("No user ID found!");
  const userSnap = await firestore().collection("users").doc(userId).get();
  if (userSnap?.exists) {
    const userData = userSnap.data();
    console.log("userData :", userData);
    return userData;
  } else {
    console.log("No data for user!");
    return null;
  }
};

export const fetchUsersCities = async () => {
  try {
    const userId = auth().currentUser?.uid;
    const userSnap = await firestore().collection("users").doc(userId).get();
    if (userSnap.exists) {
      const cities = userSnap.data().cities || [userSnap.data().location];
      return cities;
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const addUserCity = async (city: string) => {
  try {
    const userId = auth().currentUser?.uid;
    return await firestore()
      .doc(`users/${userId}`)
      .update({
        cities: firestore.FieldValue.arrayUnion(city),
      });
  } catch (error) {
    console.error(error);
  }
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
