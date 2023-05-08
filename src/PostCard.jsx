/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import CommentForm from './CommentForm';
import { getInitials, getInitialsColor, timeAgo, truncateBody } from './utils';

export default function PostCard({ user, title, body, likes, comments, users, onClickLike, onSubmitComment }) {
  const [expandedBody, setExpandedBody] = useState(false);
  const [expandedComments, setExpandedComments] = useState(false);

  const handleClickSeeMore = (event) => {
    event.preventDefault();
    setExpandedBody(!expandedBody);
  };

  const handleToggleComment = (event) => {
    event.preventDefault();
    setExpandedComments(!expandedComments);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="font-semibold text-lg mb-3">{title}</h2>
      <p className="text-sm text-gray-500">
        {expandedBody ? body : truncateBody(body)}&nbsp;
        <a className="font-medium hover:underline" href="#" onClick={handleClickSeeMore}>
          See {expandedBody ? 'less' : 'more'}
        </a>
      </p>
      <div className="flex items-center justify-between mt-6">
        <button className="inline-flex items-center text-sm text-gray-500" onClick={onClickLike}>
          {likes.some((like) => like.userId === user.id) ? (
            <AiFillHeart className="shrink-0 fill-red-500" size={20} />
          ) : (
            <AiOutlineHeart className="shrink-0 fill-gray-500" size={20} />
          )}
          &nbsp;
          {likes.length}
        </button>

        <a className="text-sm text-gray-500 hover:underline" href="#" onClick={(event) => handleToggleComment(event)}>
          {comments.length} comments
        </a>
      </div>
      {expandedComments ? (
        <>
          <hr className="border-t-gray-200 mb-4 mt-6" />
          <ul className="flex flex-col items-start space-y-3 py-3">
            {comments.map((comment) => {
              const commentUser = users.find((user) => user.id === comment.userId);
              const commentUserInitials = commentUser ? getInitials(commentUser.name) : '';

              return (
                <li className="relative flex flex-col items-end pl-10" key={comment.id}>
                  <div
                    className="absolute flex items-center justify-center text-center text-xs left-0 top-0 h-8 w-8 text-white rounded-full font-medium select-none"
                    style={{ backgroundColor: getInitialsColor(commentUserInitials) }}
                  >
                    {commentUserInitials}
                  </div>
                  <div className="bg-gray-100 px-3 py-1.5 rounded-lg">
                    {commentUser ? <h3 className="text-sm font-semibold">{commentUser.name}</h3> : null}
                    <p className="text-sm text-gray-500">{comment.body}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{timeAgo(new Date(comment.createdAt))}</p>
                </li>
              );
            })}
            <li className="relative flex flex-col items-end pl-10 w-full">
              <div
                className="absolute flex items-center justify-center text-center text-xs left-0 top-0 h-8 w-8 text-white rounded-full font-medium select-none"
                style={{ backgroundColor: getInitialsColor(getInitials(user.name)) }}
              >
                {getInitials(user.name)}
              </div>
              <CommentForm onSubmit={onSubmitComment} />
            </li>
          </ul>
        </>
      ) : null}
    </div>
  );
}
