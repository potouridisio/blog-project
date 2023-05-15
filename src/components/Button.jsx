/* eslint-disable react/prop-types */

/**
 * A button component.
 *
 * @typedef {object} Props
 * @property {React.ReactNode} children - The children of the component.
 * @property {string} className - The className of the component.
 * @property {'button' | 'submit' | 'reset'} [type='button'] - The type of the button.
 * @property {'text' | 'contained'} [variant='text'] - The variant of the button.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered Button component.
 *
 * @example
 * <Button variant="contained">Click me!</Button>
 * <Button variant="text">Click me!</Button>
 * <Button className="text-red-500" variant="text">Click me!</Button>
 */
export default function Button({ children, className, type = 'button', variant = 'text', ...props }) {
  return (
    <button
      className={`select-none rounded px-4 py-2 text-sm font-medium ${
        variant === 'contained'
          ? 'bg-blue-500  text-white hover:bg-blue-600'
          : 'bg-transparent text-blue-500 hover:bg-gray-100'
      }${className ? ` ${className}` : ''}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
