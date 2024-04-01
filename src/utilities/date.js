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

export function getCurrentDateTime() {
  const date = new Date();
  
  // Get day, month, year
  const day = String(date.getDate()).padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear();
  
  // Get time
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  
  // Determine AM/PM
  const meridiem = hour >= 12 ? 'PM' : 'AM';
  
  // Convert hour to 12-hour format
  const formattedHour = hour % 12 || 12;
  
  // Construct the formatted date and time string
  const formattedDateTime = `${day}-${month}-${year} ${formattedHour}:${minute} ${meridiem}`;

  return formattedDateTime;
}


