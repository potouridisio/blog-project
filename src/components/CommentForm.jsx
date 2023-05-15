/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

/**
 * A form for submitting comments.
 *
 * @typedef {object} Props
 * @property {string} initialValue - The initial value of the input.
 * @property {(comment: string) => void} onSubmit - The function that will be called with the comment when the form is submitted.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered CommentForm component.
 */
export default function CommentForm({ initialValue, onSubmit, onEscape }) {
  // το value είναι το περιεχόμενο του input
  const [value, setValue] = useState(initialValue ?? '');
  const [isFocused, setIsFocused] = useState(false)

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
    <div className="flex w-full flex-col">
      <form className="w-full rounded-lg bg-gray-100" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          autoFocus
          className="w-full bg-transparent p-2 text-sm text-inherit placeholder-gray-500 focus:outline-none"
          name="comment"
          onChange={(event) => setValue(event.target.value)}
          placeholder="Write a comment..."
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown = {onEscape}
        />
        <div className="flex items-center justify-end p-2 pt-0">
          <button className="-mb-1 -mr-1 rounded-full p-1.5 hover:bg-gray-200" type="submit">
            <AiOutlineSend className="fill-gray-500" size={20} />
          </button>
        </div>
      </form>
      {isEditing && isFocused? (
        <p className="mr-2 mt-0.5 text-xs text-gray-500">
          Press Esc to{' '}
          <a className="text-blue-500 hover:underline" href="#">
            cancel
          </a>
          .
        </p>
      ) :  <p className="mr-2 mt-0.5 text-xs text-gray-500">
      <a className="text-blue-500 hover:underline" href="#">
        cancel
      </a>
    </p>}
    </div>
  );
}
