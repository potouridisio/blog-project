/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

export function CommentForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <form className="bg-gray-100 rounded-lg py-0.5 w-full" onSubmit={handleSubmit}>
      <input
        autoComplete="new-password"
        className="bg-transparent px-3 py-1.5 text-sm text-gray-500 placeholder-gray-500 w-full focus:outline-none"
        name="comment"
        placeholder="Write a comment..."
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <div className="flex items-center justify-end pb-2 px-3">
        <button className="p-1.5 -mb-1.5 -mr-2 rounded-full" type="submit">
          <AiOutlineSend className="fill-gray-500" size={20} />
        </button>
      </div>
    </form>
  );
}
