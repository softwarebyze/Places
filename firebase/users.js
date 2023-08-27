import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const fetchUsersCities = async (setStateFunction) => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setStateFunction(() => {
        const cities = userSnap.data().cities || [userSnap.data().location];
        return cities.map((city, i) => ({
          city: city,
          id: Date.now() + i + Math.random(),
        }));
      });
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.error(error);
  }
};

const addUserCity = async (city, usersCities) => {
  try {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    const userRef = doc(db, "users", userId);
    if (!city) throw new Error("No city selected");
    if (usersCities.find((userCity) => userCity.city === city))
      throw new Error("City already added");
    await updateDoc(userRef, {
      cities: arrayUnion(city),
    });
  } catch (error) {
    console.error(error);
  }
};

export { fetchUsersCities, addUserCity };
