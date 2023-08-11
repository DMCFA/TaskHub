export const removeAfterUnderscore = (str: string): string => {
  const index = str.indexOf('_');
  return index !== -1 ? str.slice(0, index) : str;
};

export const removeSymbolsFromPath = (str: string): string => {
  const parts = str.split('/');
  const lastPart = parts[parts.length - 1];
  const withSpace = lastPart.replace(/-/g, ' ');
  const capitalized = withSpace.charAt(0).toUpperCase() + withSpace.slice(1);
  return capitalized;
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  return shuffledArray
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.value);
};

export const getTimeLeft = (dueDate: Date | string): string => {
  if (!dueDate) return '-';

  if (typeof dueDate === 'string') {
    dueDate = new Date(dueDate);
  }
  if (!(dueDate instanceof Date)) {
    console.error('Invalid date provided:', dueDate);
    return '-';
  }

  const currentDate = new Date();

  let difference = dueDate.getTime() - currentDate.getTime();

  if (difference <= 0) {
    return 'Overdue';
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  difference -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  difference -= hours * (1000 * 60 * 60);

  if (days > 30) {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} left`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours} hour${
      hours > 1 ? 's' : ''
    } left`;
  } else {
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  }
};
