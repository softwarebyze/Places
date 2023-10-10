import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";

import { db } from "../firebaseConfig";

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

const addUserDetails = async (userDetails) => {
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, userDetails, { merge: true });
};

const getUserData = async () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("No user ID found!");

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No data for user!");
    return null;
  }
};

export { fetchUsersCities, addUserCity, addUserDetails, getUserData };
