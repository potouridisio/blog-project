/* eslint-disable react/prop-types */
import { useEffect } from 'react';

import Portal from './Portal';

/**
 * A modal dialog component.
 *
 * @typedef {object} Props
 * @property {React.ReactNode} children - The content to display inside the dialog.
 * @property {string} className - The className of the dialog.
 * @property {boolean} open - True if the dialog is open, otherwise false.
 * @property {() => void} onClose - The function called when the dialog is closed.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered Dialog component.
 */
export default function Dialog({ children, className, open, onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, open]);

  // αν το open είναι false επιστρέφουμε null
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className="fixed left-0 top-0 z-50 h-full w-full bg-gray-700 opacity-75" onClick={onClose} />
      <div
        className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg${
          className ? ` ${className}` : ''
        }`}
      >
        {children}
      </div>
    </Portal>
  );
}
