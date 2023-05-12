/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

// η Popper δέχεται τα παρακάτω props:
// children: τα παιδιά του component
// className: το className του component
// content: το περιεχόμενο του popper
export default function Popper({ children, className, content }) {
  const popperRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (popperRef.current && !popperRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className={`relative${className ? ` ${className}` : ''}`} ref={popperRef}>
      <div
        onClick={() => {
          setShow(!show);
        }}
      >
        {children}
      </div>
      {show ? (
        <div
          className={`absolute left-1/2 z-10 mt-2${
            show ? '' : ' hidden'
          } w-32 -translate-x-1/2 transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          {content}
        </div>
      ) : null}
    </div>
  );
}
