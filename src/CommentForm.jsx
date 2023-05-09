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
    <form className="w-full rounded-lg bg-gray-100 py-0.5" onSubmit={handleSubmit}>
      <input
        autoComplete="new-comment"
        className="w-full bg-transparent px-3 py-1.5 text-sm text-gray-500 placeholder-gray-500 focus:outline-none"
        name="comment"
        placeholder="Write a comment..."
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <div className="flex items-center justify-end px-3 pb-2">
        <button className="-mb-1.5 -mr-2 rounded-full p-1.5" type="submit">
          <AiOutlineSend className="fill-gray-500" size={20} />
        </button>
      </div>
    </form>
  );
}
