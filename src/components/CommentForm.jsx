/* eslint-disable react/prop-types */
import { useState } from 'react';

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';

/**
 * A form for submitting comments.
 *
 * @typedef {object} Props
 * @property {string} initialValue - The initial value of the input.
 * @property {() => void} [onCancel] - The function that will be called when the form is cancelled.
 * @property {(comment: string) => void} onSubmit - The function that will be called with the comment when the form is submitted.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered CommentForm component.
 */
export default function CommentForm({ initialValue, onCancel, onSubmit }) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initialValue ?? '');

  /**
   * Handles the cancellation event for editing a comment.
   *
   * This function is triggered when the user cancels editing a comment.
   *
   * @param {Event} event - The cancellation event.
   *
   * @returns {void}
   */
  const handleCancel = (event) => {
    event.preventDefault();

    if (onCancel) {
      onCancel();
    }
  };

  /**
   * Handles the key down event.
   *
   * This function is triggered when a key is pressed down.
   *
   * If the pressed key is the escape key (keyCode 27), it cancels editing the comment.
   *
   * @param {Event} event - The key down event.
   *
   * @returns {void}
   */
  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      if (onCancel) {
        onCancel();
      }
    }
  };

  /**
   * Handles the submission of the edited comment.
   *
   * @param {Event} event - The submission event.
   *
   * @returns {void}
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(value);

    setValue('');
  };

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
        <button
          className={`absolute bottom-1 right-1 rounded-full p-1.5${
            value !== '' ? ' hover:bg-gray-200' : ''
          } disabled:cursor-not-allowed`}
          disabled={value === ''}
          type="submit"
        >
          <PaperAirplaneIcon
            className={`h-5 w-5 ${value === '' ? 'text-gray-400 text-opacity-50' : 'text-blue-500'}`}
          />
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
