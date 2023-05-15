/* eslint-disable react/prop-types */
import { getInitials, getInitialsColor } from '../lib/utils';

/**
 * A component that displays a user avatar.
 *
 * @typedef {object} Props
 * @property {React.ReactNode} children - The name of the user.
 * @property {string} className - The className of the component.
 * @property {React.ElementType} [component='div'] - The component that will be used to wrap the avatar.
 * @property {string} [size='small'] - The size of the avatar.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered Avatar component.
 *
 * @example
 * <Avatar>John Doe</Avatar>
 * <Avatar size="large">John Doe</Avatar>
 */
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
