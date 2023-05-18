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
 *
 * @example
 * <Popper trigger={<Button>Click me!</Button>}>
 *    <div className="p-2">Hello world!</div>
 * </Popper>
 */
export default function Popper({ children, className, trigger }) {
  const popperRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    /**
     * Handles the mouse down event.
     *
     * This function is triggered when a mouse button is pressed down.
     *
     * If the popperRef exists and the event target is not inside the popperRef, it sets the show state to false.
     *
     * @param {Event} event - The mouse down event.
     *
     * @returns {void}
     */
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
