// η getInitials επιστρέφει τα αρχικά ενός ονόματος
// π.χ. για τον χρήστη "John Doe" επιστρέφει "JD"
export function getInitials(name) {
  const [firstName, lastName] = name.split(' ');
  return `${firstName[0]}${lastName[0]}`;
}

// επιστρέφει μία τυχαία χρωματική τιμή
// ανάλογα με τα αρχικά του ονόματος
// https://stackoverflow.com/a/16348977/1825390
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

// truncate body to 240 characters, do not cut words
export function truncateBody(body) {
  if (body.length > 240) {
    return body.slice(0, 240).split(' ').slice(0, -1).join(' ') + '...';
  }
  return body;
}
