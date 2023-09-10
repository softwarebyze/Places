import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const fetchUsersCities = async () => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const cities = userSnap.data().cities || [userSnap.data().location];
      return cities;
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.error(error);
  }
};

const addUserCity = async (city) => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const userRef = doc(db, "users", userId);
    if (!city) throw new Error("No city selected");
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) throw new Error("No user found");
    const usersCities = userSnap.data().cities || [userSnap.data().location];
    if (usersCities.includes(city)) throw new Error("City already added");
    await updateDoc(userRef, {
      cities: arrayUnion(city),
    });
  } catch (error) {
    console.error(error);
  }
};

export { fetchUsersCities, addUserCity };