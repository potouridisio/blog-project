export function getInitials(name) {
  const [firstName, lastName] = name.split(' ');
  return `${firstName[0]}${lastName[0]}`;
}

export function getInitialsColor(initials) {
  const colors = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
  ];
  const charCodeSum = initials
    .split('')
    .map((char) => char.charCodeAt(0))
    .reduce((sum, charCode) => sum + charCode, 0);
  return colors[charCodeSum % colors.length];
}

export function truncate(str) {
  if (str.length > 240) {
    return str.slice(0, 240).split(' ').slice(0, -1).join(' ') + '...';
  }
  return str;
}

export function getRandomNumber() {
  return Math.floor(Math.random() * 5000) + 1000;
}

export function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const months = Math.floor(seconds / 2592000);
  const years = Math.floor(seconds / 31536000);

  if (seconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 30) {
    return `${days}d`;
  } else if (months < 12) {
    return `${months}m`;
  } else {
    return `${years}y`;
  }
}
