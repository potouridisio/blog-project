/* eslint-disable react/prop-types */
import { cloneElement, useEffect, useRef, useState } from 'react';

/**
 * A component that displays a pop-up box next to a trigger element.
 *
 * @typedef {object} Props
 * @property {React.ReactNode} children - The children of the component.
 * @property {string} className - The className of the component.
 * @property {React.ReactNode} trigger - The component that will be used as the trigger.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered Popper component.
 */
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
          } min-w-max -translate-x-1/2 transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
