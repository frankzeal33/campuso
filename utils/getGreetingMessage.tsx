export const getGreetingMessage = (firstName?: string) => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday
  const date = now.getDate();
  const month = now.getMonth(); // 0 = January

  let message = "";

  // New Year (Highest Priority)
  if (month === 0 && date === 1) {
    message = "Happy New Year! 🎆";
  }

  // New Month
  else if (date === 1) {
    message = "Happy New Month! ✨";
  }

  // Christmas Example
  else if (month === 11 && date === 25) {
    message = "Merry Christmas! 🎄";
  }

  // Friday
  else if (day === 5) {
    message = "Happy Friday! 🎉";
  }

  // Weekend
  else if (day === 0 || day === 6) {
    message = "Happy Weekend! 🌞";
  }

  // Default → Time Greeting
  else {
    if (hour < 12) {
      message = "Good Morning! ☀️";
    } else if (hour < 16) {
      message = "Good Afternoon! 🌞";
    } else if (hour < 19) {
      message = "Good Evening! 🌙";
    } else {
      message = "Good Night! 🌙";
    }

    if (firstName) {
      message += `, ${firstName}`;
    }
  }

  return message;
};