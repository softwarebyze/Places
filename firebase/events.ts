import { collection, getDocs } from "firebase/firestore";

import { convertTimestampToDateAndTime } from "../components/helper/convertTimestampToDateAndTime";
import { db } from "../firebaseConfig";

const getEvents = async () => {
  try {
    const eventsCollection = collection(db, "events");
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsData = eventsSnapshot.docs.map((doc) => {
      const eventData = doc.data();
      return {
        ...eventData,
        location: {
          latitude: eventData.location._lat,
          longitude: eventData.location._long,
        },
        datetime: eventData?.datetime
          ? convertTimestampToDateAndTime(eventData.datetime)
          : undefined,
      };
    });
    return eventsData;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

export { getEvents };
