import moment from "moment";

const dateFormat = (epoch: string) => {
  const formatted = moment(parseInt(epoch)).format(
    "dddd, MMMM Do, YYYY h:mm:ss A"
  );
  const hours = moment(parseInt(epoch)).startOf("hour").fromNow();
  const minutes = moment(parseInt(epoch)).startOf("minute").fromNow();
  const days = moment(parseInt(epoch)).startOf("day").fromNow();
  if (
    minutes === "a minute ago" ||
    minutes === "a few seconds ago" ||
    parseInt(minutes.split(" ")[0]) < 60
  ) {
    return minutes;
  } else if (hours === "an hour ago" || parseInt(hours.split(" ")[0]) < 24) {
    return hours;
  } else if (days === "a day ago" || parseInt(days.split(" ")[0]) < 7) {
    return days;
  }
  return formatted;
};

export default dateFormat;
