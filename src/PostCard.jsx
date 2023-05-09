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
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-500">
        {expandedBody ? body : truncateBody(body)}&nbsp;
        <a className="font-medium hover:underline" href="#" onClick={handleClickSeeMore}>
          See {expandedBody ? 'less' : 'more'}
        </a>
      </p>
      <div className="mt-6 flex items-center justify-between">
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
          <hr className="mb-4 mt-6 border-t-gray-200" />
          <ul className="flex flex-col items-start space-y-3 py-3">
            {comments.map((comment) => {
              const commentUser = users.find((user) => user.id === comment.userId);
              const commentUserInitials = commentUser ? getInitials(commentUser.name) : '';

              return (
                <li className="relative flex flex-col items-end pl-10" key={comment.id}>
                  <div
                    className="absolute left-0 top-0 flex h-8 w-8 select-none items-center justify-center rounded-full text-center text-xs font-medium text-white"
                    style={{
                      backgroundColor: getInitialsColor(commentUserInitials),
                    }}
                  >
                    {commentUserInitials}
                  </div>
                  <div className="rounded-lg bg-gray-100 px-3 py-1.5">
                    {commentUser ? <h3 className="text-sm font-semibold">{commentUser.name}</h3> : null}
                    <p className="text-sm text-gray-500">{comment.body}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">{timeAgo(new Date(comment.createdAt))}</p>
                </li>
              );
            })}
            <li className="relative flex w-full flex-col items-end pl-10">
              <div
                className="absolute left-0 top-0 flex h-8 w-8 select-none items-center justify-center rounded-full text-center text-xs font-medium text-white"
                style={{
                  backgroundColor: getInitialsColor(getInitials(user.name)),
                }}
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
