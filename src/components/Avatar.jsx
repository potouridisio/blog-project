/* eslint-disable react/prop-types */
import { getInitials, getInitialsColor } from '../lib/utils';

// το Avatar δέχεται τα παρακάτω props:
// children: το όνομα του χρήστη
// className: το className του component
// component: το component που θα χρησιμοποιηθεί
// size: το μέγεθος του component
export default function Avatar({ children, className, component: Component = 'div', size }) {
  if (typeof children !== 'string') {
    throw new Error('children must be a string!');
  }

  return (
    <Component
      className={`flex shrink-0 select-none items-center justify-center rounded-full bg-gray-500 text-center font-medium text-white ${
        size === 'small' ? 'h-8 w-8 text-xs' : 'h-10 w-10'
      }${className ? ` ${className}` : ''}`}
      style={{ backgroundColor: getInitialsColor(getInitials(children)) }}
    >
      {getInitials(children)}
    </Component>
  );
}
