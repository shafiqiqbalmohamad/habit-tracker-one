// dateUtils.ts

// Importing the date-fns library for date manipulation. If you don't have it, you can install it with `npm install date-fns`.
import { format, parseISO, isValid, addDays, differenceInDays, startOfToday } from 'date-fns';

// Function to format a date in 'yyyy-MM-dd' format
export const formatDate = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, 'yyyy-MM-dd') : '';
};

// Function to get the current date formatted as 'yyyy-MM-dd'
export const getCurrentDate = (): string => {
  return format(startOfToday(), 'yyyy-MM-dd');
};

// Function to add days to a given date
export const addDaysToDate = (date: Date | string, daysToAdd: number): string => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  const newDate = addDays(parsedDate, daysToAdd);
  return format(newDate, 'yyyy-MM-dd');
};

// Function to calculate the difference in days between two dates
export const calculateDateDifference = (startDate: Date | string, endDate: Date | string): number => {
  const parsedStartDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const parsedEndDate = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInDays(parsedEndDate, parsedStartDate);
};

// Function to check if a given date is in the future
export const isFutureDate = (date: Date | string): boolean => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) && parsedDate > new Date();
};

// Function to check if a given date is in the past
export const isPastDate = (date: Date | string): boolean => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) && parsedDate < new Date();
};

// Function to check if a given date is today
export const isToday = (date: Date | string): boolean => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) && format(parsedDate, 'yyyy-MM-dd') === getCurrentDate();
};

// Function to convert a date string (e.g., "2024-12-28") to a Date object
export const convertToDate = (dateStr: string): Date => {
  return parseISO(dateStr);
};

