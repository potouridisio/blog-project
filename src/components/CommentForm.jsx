/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

// η CommentForm δέχεται το παρακάτω prop:
// initialValue: το αρχικό περιεχόμενο του input
// onSubmit: η συνάρτηση που καλείται με το σχόλιο όταν γίνεται submit της φόρμας
export default function CommentForm({ initialValue, onSubmit }) {
  // το value είναι το περιεχόμενο του input
  const [value, setValue] = useState(initialValue ?? '');

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
        />
        <div className="flex items-center justify-end p-2 pt-0">
          <button className="-mb-1 -mr-1 rounded-full p-1.5 hover:bg-gray-200" type="submit">
            <AiOutlineSend className="fill-gray-500" size={20} />
          </button>
        </div>
      </form>
      {isEditing ? (
        <p className="mr-2 mt-0.5 text-xs text-gray-500">
          Press Esc to{' '}
          <a className="text-blue-500 hover:underline" href="#">
            cancel
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
