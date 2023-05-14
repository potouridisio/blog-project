/* eslint-disable react/prop-types */
import { cloneElement, useEffect, useRef, useState } from 'react';

// η Popper δέχεται τα παρακάτω props:
// children: τα παιδιά του component
// className: το className του component
// trigger: το component που θα χρησιμοποιηθεί ως trigger
export default function Popper({ children, className, trigger }) {
  const popperRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event) => {
      // αν δεν έχει γίνει κλικ στο trigger ή στο popper τότε κλείνουμε το popper
      if (popperRef.current && !popperRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    // προσθέτουμε το event listener στο document
    document.addEventListener('mousedown', handleMouseDown);

    // καθαρίζουμε το event listener όταν το component καταστραφεί
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className={`relative${className ? ` ${className}` : ''}`} ref={popperRef}>
      {cloneElement(trigger, { onClick: () => setShow(!show) })}
      {show ? (
        <div
          className={`absolute left-1/2 z-10 mt-2${
            show ? '' : ' hidden'
          } w-32 -translate-x-1/2 transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
