// validation.ts

// Validate if the given string is a valid email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Validate if the given string is a valid password (at least 8 characters, 1 letter, and 1 number)
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Validate if the given date string is a valid date (in 'yyyy-MM-dd' format)
export const isValidDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

// Validate if the given value is a number
export const isNumber = (value: string): boolean => {
  const numberRegex = /^[0-9]+(\.[0-9]+)?$/;
  return numberRegex.test(value);
};

// Validate if a string is not empty
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

// Validate if the given value is a valid phone number (assuming a 10-digit number)
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

// Validate if the given string is a valid URL
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url); // Tries to construct a URL object, will throw error if invalid
    return true;
  } catch {
    return false;
  }
};

// Validate if the given input is a valid date in the past
export const isPastDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return parsedDate < new Date();
};

// Validate if the given input is a future date
export const isFutureDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return parsedDate > new Date();
};

// Function to check if a value is a valid numeric range
export const isInRange = (value: string, min: number, max: number): boolean => {
  const number = parseFloat(value);
  return !isNaN(number) && number >= min && number <= max;
};

// Function to check if a given value is a valid boolean ("true" or "false")
export const isBoolean = (value: string): boolean => {
  return value.toLowerCase() === "true" || value.toLowerCase() === "false";
};

