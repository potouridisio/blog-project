/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMore } from 'react-icons/ai';

import { useAuth } from '../lib/auth';
import { timeAgo, truncate } from '../lib/utils';
import Avatar from './Avatar';
import CommentForm from './CommentForm';

// η PostCard δέχεται τα παρακάτω props:
// body: το κείμενο του post
// comments: τα σχόλια του post
// likes: τα likes του post
// onComment: η συνάρτηση που καλείται με το σχόλιο όταν γίνεται submit της φόρμας
// onDeleteComment: η συνάρτηση που καλείται όταν διαγράφεται ένα σχόλιο
// onLike: η συνάρτηση που καλείται όταν γίνεται like στο post
// title: ο τίτλος του post
// userId: το id του χρήστη που έκανε το post
// users: οι χρήστες της εφαρμογής
export default function PostCard({
  body,
  comments,
  createdAt,
  likes,
  onComment,
  onDeleteComment,
  onLike,
  title,
  userId,
  users,
}) {
  // το session είναι το session του χρήστη που έχει κάνει login
  const session = useAuth();
  // το expandedBody είναι true αν έχει γίνει κλικ στο "See more"
  const [expandedBody, setExpandedBody] = useState(false);
  // το expandedComments είναι true αν έχει γίνει κλικ στο "x comments"
  const [expandedComments, setExpandedComments] = useState(false);
  // το isOpen είναι το id του σχολίου που είναι ανοιχτό το μενού του διαφορετικά είναι false
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (commentId) => {
    onDeleteComment(commentId);
    setIsOpen(false);
  };

  // // η handleXComments καλείται όταν γίνεται κλικ στο "x comments"
  const handleXComments = (event) => {
    event.preventDefault();
    setExpandedComments(!expandedComments);
  };

  // η handleSeeMore καλείται όταν γίνεται κλικ στο "See more"
  const handleSeeMore = (event) => {
    event.preventDefault();
    setExpandedBody(true);
  };

  // βρίσκουμε τον χρήστη που έκανε το post
  const postUser = users.find((user) => user.id === userId);

  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-center">
          <Avatar className="mr-2">{postUser.name}</Avatar>
          <div>
            <h3 className="text-sm font-semibold">{postUser.name}</h3>
            <p className="text-xs text-gray-500">{timeAgo(new Date(createdAt))}</p>
          </div>
        </div>
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">
          {expandedBody ? body : truncate(body)}&nbsp;
          {!expandedBody ? (
            <a className="cursor-pointer font-medium hover:underline" href="#" onClick={handleSeeMore}>
              See more
            </a>
          ) : null}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <button className="inline-flex select-none items-center text-sm text-gray-500" onClick={onLike}>
            {likes.some((like) => like.userId === session.user.id) ? (
              <AiFillHeart className="shrink-0 fill-red-500" size={20} />
            ) : (
              <AiOutlineHeart className="shrink-0 fill-gray-500" size={20} />
            )}
            &nbsp;
            {likes.length}
          </button>
          <a
            className="cursor-pointer select-none text-sm text-gray-500 hover:underline"
            href="#"
            onClick={handleXComments}
          >
            {comments.length} comments
          </a>
        </div>
        {expandedComments ? (
          <>
            <hr className="mb-4 mt-6 border-t-gray-200" />
            <ul className="flex flex-col items-start space-y-3 py-4">
              {comments.map((comment) => {
                const commentUser = users.find((user) => user.id === comment.userId);

                // αν το σχόλιο έχει γίνει από τον χρήστη που έχει κάνει login
                // ή το post έχει γίνει από τον χρήστη που έχει κάνει login
                // ή αν ο χρήστης που έχει κάνει login είναι admin
                // τότε μπορεί να διαγράψει το σχόλιο
                const canDelete =
                  comment.userId === session.user.id || userId === session.user.id || session.user.type === 'admin';

                return (
                  <li className="group flex" key={comment.id}>
                    <Avatar className="mr-2" size="small">
                      {commentUser.name}
                    </Avatar>
                    <div className="flex flex-col items-end">
                      <div className="rounded-lg bg-gray-100 px-3 py-1.5">
                        {commentUser ? <h4 className="text-sm font-semibold">{commentUser.name}</h4> : null}
                        <p className="text-sm text-gray-500">{comment.body}</p>
                      </div>
                      <p className="mr-2 mt-0.5 text-xs text-gray-500">{timeAgo(new Date(comment.createdAt))}</p>
                    </div>
                    {canDelete ? (
                      <div className="relative -mt-[1.125rem] ml-0.5 self-center">
                        <button
                          className="rounded-full p-1.5 hover:bg-gray-100"
                          onClick={() => {
                            setIsOpen(comment.id);
                          }}
                          tabIndex={-1}
                        >
                          <AiOutlineMore
                            className="rotate-90 fill-gray-500 opacity-0 group-hover:opacity-100"
                            size={20}
                          />
                        </button>
                        <div
                          className={`absolute left-1/2 z-10 mt-2${
                            isOpen === comment.id ? '' : ' hidden'
                          } w-32 -translate-x-1/2 transform rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5`}
                        >
                          <div className="py-1.5">
                            <a
                              className="block cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
                              onClick={() => handleDelete(comment.id)}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              })}
              <li className="flex w-full">
                <Avatar className="mr-2" size="small">
                  {session.user.name}
                </Avatar>
                <CommentForm onSubmit={onComment} />
              </li>
            </ul>
          </>
        ) : null}
      </div>
    </>
  );
}
