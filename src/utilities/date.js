export function getDate() {
    // Create a new Date object
    const currentDate = new Date();
  
    // Define options for formatting the date
    const options = { day: "2-digit", month: "short", year: "numeric" };
  
    // Format the date using the options
    const formattedDate = currentDate.toLocaleDateString("en-US", options);
  
    return formattedDate;
  }
  
