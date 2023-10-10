import { format } from "date-fns";

export const convertTimestampToDateAndTime = (timestamp) => {
  const dateObj = new Date(timestamp.seconds * 1000);
  return {
    date: format(dateObj, "MM/dd/yyyy"),
    time: format(dateObj, "h:mm a").toLocaleLowerCase(),
  };
};
