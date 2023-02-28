export const getTime = ()=>{

  let currentDate = new Date();

  // Get the date and time components
  let date = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // January is 0
  let year = currentDate.getFullYear();

  
  // Format the date and time string
  return `${month}/${date}/${year}`;

  
}