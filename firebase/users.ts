import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const fetchUsersCities = async () => {
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

const addUserCity = async (city: string) => {
  try {
    const userId = auth().currentUser?.uid;
    return await firestore()
      .doc(`users/${userId}`)
      .update({
        fcmTokens: firestore.FieldValue.arrayUnion(city),
      });
  } catch (error) {
    console.error(error);
  }
};

export { fetchUsersCities, addUserCity };
