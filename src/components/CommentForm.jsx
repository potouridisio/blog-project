/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

/**
 * A form for submitting comments.
 *
 * @typedef {object} Props
 * @property {string} initialValue - The initial value of the input.
 * @property {() => void} onCancel - The function that will be called when the form is cancelled.
 * @property {(comment: string) => void} onSubmit - The function that will be called with the comment when the form is submitted.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered CommentForm component.
 */
export default function CommentForm({ initialValue, onCancel, onSubmit }) {
  // το isFocused είναι true αν το input έχει focus
  const [isFocused, setIsFocused] = useState(false);
  // το value είναι το περιεχόμενο του input
  const [value, setValue] = useState(initialValue ?? '');

  // η handleCancel καλείται όταν πατιέται το cancel
  const handleCancel = (event) => {
    event.preventDefault();
    onCancel();
  };

  // η handleKeyDown καλείται όταν πατιέται ένα πλήκτρο
  // αν το πλήκτρο είναι το Esc τότε καλούμε την onCancel
  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      onCancel();
    }
  };

  // η handleSubmit καλείται όταν γίνεται submit της φόρμας
  const handleSubmit = (event) => {
    event.preventDefault();
    // καλούμε την onSubmit με το value
    onSubmit(value);
    // κάνουμε reset το value
    setValue('');
  };

  // το isEditing είναι true αν υπάρχει initialValue που σημαίνει ότι ο χρήστης επεξεργάζεται ένα σχόλιο
  const isEditing = initialValue !== undefined;

  return (
    <>
      <form className="relative w-full" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          autoFocus
          className="w-full rounded-lg bg-gray-100 p-2 pb-11 pr-10 text-sm text-inherit placeholder-gray-500 focus:outline-none"
          name="comment"
          onBlur={() => setIsFocused(false)}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          value={value}
        />
        <button className="absolute bottom-1 right-1 rounded-full p-1.5 hover:bg-gray-200" type="submit">
          <AiOutlineSend className="fill-gray-500" size={20} />
        </button>
      </form>
      {isEditing ? (
        isFocused ? (
          <p className="ml-2 mt-0.5 text-xs text-gray-500">
            Press Esc to{' '}
            <a className="text-blue-500 hover:underline" href="#" onMouseDown={onCancel}>
              cancel
            </a>
            .
          </p>
        ) : (
          <a className="ml-2 mt-0.5 text-xs text-blue-500 hover:underline" href="#" onClick={handleCancel}>
            Cancel
          </a>
        )
      ) : null}
    </>
  );
}
