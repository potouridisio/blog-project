/* eslint-disable react/prop-types */
import { getInitials, getInitialsColor } from '../lib/utils';

export default function Avatar({ component: Component = 'div', children, className, size }) {
  if (typeof children !== 'string') {
    throw new Error('children must be a string!');
    // return null;
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
