function convertMS(milliseconds: number) {
  var year, day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  year = Math.floor(day / 365);
  return {
    year: year,
    day: day,
    hour: hour,
    minute: minute,
    seconds: seconds,
  };
}

const dateFormat = (epoch: string) => {
  const curTime = new Date().getTime();
  const diff = curTime - parseInt(epoch);
  const obj = convertMS(diff);
  if (obj.year) {
    return obj.year > 1 ? `${obj.year} years ago` : `One year ago`;
  } else if (obj.day) {
    return obj.day > 1 ? `${obj.day} days ago` : `yesterday`;
  } else if (obj.hour) {
    return obj.hour > 1 ? `${obj.hour} hours ago` : `An hour ago`;
  } else if (obj.minute) {
    return obj.minute > 1 ? `${obj.minute} minutes ago` : `A minute ago`;
  } else {
    return `a few seconds ago`;
  }
};

export default dateFormat;
