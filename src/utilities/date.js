export function getDate(dateString) {
  const dateObj = new Date(dateString);

  const formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

  return formattedDate;
}

export function getTime(timeString) {
  const convertedTime = Number(timeString);

  const dateObj = new Date(convertedTime);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  let formattedHours = hours % 12;
  formattedHours = formattedHours || 12;
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amPm}`;
  
  return formattedTime;
}
