/**
 * Convert date string from input[type="date"] to ISO 8601 UTC format
 * @param dateString - Date string in format "YYYY-MM-DD"
 * @returns ISO 8601 UTC string like "1988-07-20T00:00:00Z"
 */
export const toISODateUTC = (dateString: string): string => {
  if (!dateString) return '';
  
  // Parse the date string and create a Date object at midnight UTC
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  
  return date.toISOString();
};

/**
 * Convert ISO 8601 date string to input[type="date"] format
 * @param isoString - ISO 8601 date string
 * @returns Date string in format "YYYY-MM-DD"
 */
export const fromISODateUTC = (isoString: string): string => {
  if (!isoString) return '';
  
  return isoString.split('T')[0];
};
