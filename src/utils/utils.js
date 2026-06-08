export const parseDDMMYYYY = (dateStr) => {
  const [day, month, year] = dateStr.trim().split(/[-/]/).map(Number);
  return new Date(year, month - 1, day);
}


