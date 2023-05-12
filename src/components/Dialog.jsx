/* eslint-disable react/prop-types */

import Portal from './Portal';

// το Dialog δέχεται τα παρακάτω props:
// children: τα παιδιά του component
// open: true αν είναι ανοιχτό το modal διαφορετικά false
// onClose: η συνάρτηση που καλείται όταν κλείνει το modal
export default function Dialog({ children, open, onClose }) {
  // αν το open είναι false επιστρέφουμε null
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className="fixed left-0 top-0 z-50 h-full w-full bg-gray-700 opacity-75" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg">
        {children}
      </div>
    </Portal>
  );
}
