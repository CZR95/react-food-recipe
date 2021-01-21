export const getCurrentMonth = () => {
  let date = new Date();
  return parseInt(date.getMonth()) + 1;
};

export const getCurrentYear = () => {
  let date = new Date();
  return date.getFullYear();
};

export const amountDisplayConverter = (amount) => {
  // Convert amount to display format
  let type = amount.toString().includes("-") ? "- " : "";
  let newAmount = amount.toString().replace("-", "");

  return (
    type +
    "RM " +
    parseFloat(newAmount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
  );
};

export const getDayOfWeek = (date) => {
  // Get day of the week
  let newDate = new Date(date);
  let day = newDate.getDay();

  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Satuday";
    default:
      return "";
  }
};
