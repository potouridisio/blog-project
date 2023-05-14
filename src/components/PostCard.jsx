/* eslint-disable react/prop-types */
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMore } from 'react-icons/ai';

import { useAuth } from '../lib/auth';
import { timeAgo, truncate } from '../lib/utils';
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import Dialog from './Dialog';
import Popper from './Popper';

// η PostCard δέχεται τα παρακάτω props:
// body: το κείμενο του post
// comments: τα σχόλια του post
// likes: τα likes του post
// onComment: η συνάρτηση που καλείται με το σχόλιο όταν γίνεται submit της φόρμας
// onDelete: η συνάρτηση που καλείται όταν διαγράφεται το post
// onDeleteComment: η συνάρτηση που καλείται όταν διαγράφεται ένα σχόλιο
// onEditComment: η συνάρτηση που καλείται με το νέο σχόλιο όταν γίνεται edit ενός σχολίου
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
  onDelete,
  onDeleteComment,
  // onEditComment
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
  // το isEditingComment είναι το id του σχολίου που επεξεργάζεται ο χρήστης ή false αν δεν επεξεργάζεται κάποιο σχόλιο
  const [isEditingComment, setIsEditingComment] = useState(false);
  // το isDeletingComment είναι το id του σχολίου που θα διαγραφεί ή false αν δεν θα διαγραφεί κάποιο σχόλιο
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  // // το isDeletingPost είναι true αν έχει γίνει κλικ στο "Delete Post"
  const [isDeletingPost, setIsDeletingPost] = useState(false);

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

  // το canDeletePost είναι true αν ο χρήστης είναι ο δημιουργός του post ή είναι admin
  const canDeletePost = userId === session.user.id || session.user.role === 'admin';

  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-center">
          <Avatar className="mr-2">{postUser.name}</Avatar>
          <div className="grow">
            <p className="text-sm font-semibold">{postUser.name}</p>
            <p className="text-xs text-gray-500">{timeAgo(new Date(createdAt))}</p>
          </div>
          {canDeletePost ? (
            <Popper
              trigger={
                <button className="rounded-full p-1.5 hover:bg-gray-100">
                  <AiOutlineMore className="rotate-90 fill-gray-500" size={24} />
                </button>
              }
            >
              <div className="p-2">
                <a
                  className="block cursor-pointer rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                  onClick={() => setIsDeletingPost(true)}
                >
                  Delete
                </a>
              </div>
            </Popper>
          ) : null}
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
            <hr className="mb-4 mt-6 border-t-gray-400 border-opacity-50" />
            <ul className="flex flex-col items-start space-y-3 py-4">
              {comments
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((comment) => {
                  const commentUser = users.find((user) => user.id === comment.userId);
                  // το canDeleteComment είναι true αν ο χρήστης είναι ο δημιουργός του σχολίου ή του post ή είναι admin
                  const canDeleteComment =
                    comment.userId === session.user.id || userId === session.user.id || session.user.role === 'admin';
                  // το canEditComment είναι true αν ο χρήστης είναι ο δημιουργός του σχολίου
                  const canEditComment = comment.userId === session.user.id;

                  return (
                    <li className={`group flex${isEditingComment === comment.id ? ' w-full' : ''}`} key={comment.id}>
                      <Avatar className="mr-2" size="small">
                        {commentUser.name}
                      </Avatar>
                      {isEditingComment === comment.id ? (
                        <div className="flex w-full flex-col">
                          <CommentForm
                            initialValue={comment.body}
                            onSubmit={(newComment) => {
                              // καλούμε την onEditComment με το id του σχολίου και το νέο σχόλιο
                              console.log({ newComment });
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-end">
                          <div className="rounded-lg bg-gray-100 p-2">
                            {commentUser ? <p className="text-sm font-semibold">{commentUser.name}</p> : null}
                            <p className="text-sm text-gray-500">{comment.body}</p>
                          </div>
                          <p className="mr-2 mt-0.5 text-xs text-gray-500">{timeAgo(new Date(comment.createdAt))}</p>
                        </div>
                      )}
                      {!isEditingComment && (canDeleteComment || canEditComment) ? (
                        <Popper
                          className="-mt-[1.125rem] ml-0.5 self-center"
                          trigger={
                            <button
                              className="rounded-full p-1.5 opacity-0 hover:bg-gray-100 group-hover:opacity-100"
                              tabIndex={-1}
                            >
                              <AiOutlineMore className="rotate-90 fill-gray-500" size={20} />
                            </button>
                          }
                        >
                          <div className="p-2">
                            {canEditComment ? (
                              <a
                                className="block cursor-pointer rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                                onClick={() => setIsEditingComment(comment.id)}
                              >
                                Edit
                              </a>
                            ) : null}
                            {canDeleteComment ? (
                              <a
                                className="block cursor-pointer rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                                onClick={() => setIsDeletingComment(comment.id)}
                              >
                                Delete
                              </a>
                            ) : null}
                          </div>
                        </Popper>
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

      <Dialog className="w-full max-w-xl" onClose={() => setIsDeletingPost(false)} open={isDeletingPost}>
        <h3 className="border-b border-b-gray-400 border-opacity-50 p-6 font-semibold">Delete Post?</h3>
        <div className="p-6">
          <p className="text-sm text-gray-500">Are you sure you want to delete this post?</p>
        </div>
        <div className="flex justify-end p-6">
          <button
            className="min-w-[6rem] select-none rounded bg-transparent px-4 py-2 text-sm font-medium text-blue-500 hover:bg-gray-100"
            onClick={() => setIsDeletingPost(false)}
          >
            No
          </button>
          <button
            className="ml-2 min-w-[6rem] select-none rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            onClick={() => {
              // καλούμε την onDelete χωρίς παραμέτρους γιατί δεν χρειάζεται να ξέρουμε το id του post που θα διαγραφεί αφού έχουμε το post στο map του App
              onDelete();
              // κάνουμε reset το isDeletingComment για να κλείσει το modal
              setIsDeletingPost(false);
            }}
          >
            Delete
          </button>
        </div>
      </Dialog>

      <Dialog
        className="w-full max-w-xl"
        onClose={() => setIsDeletingComment(false)}
        open={isDeletingComment !== false}
      >
        <h3 className="border-b border-b-gray-400 border-opacity-50 p-6 font-semibold">Delete Comment?</h3>
        <div className="p-6">
          <p className="text-sm text-gray-500">Are you sure you want to delete this comment?</p>
        </div>
        <div className="flex justify-end p-6">
          <button
            className="min-w-[6rem] select-none rounded bg-transparent px-4 py-2 text-sm font-medium text-blue-500 hover:bg-gray-100"
            onClick={() => setIsDeletingComment(false)}
          >
            No
          </button>
          <button
            className="ml-2 min-w-[6rem] select-none rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
            onClick={() => {
              // καλούμε την onDeleteComment με το id του σχολίου που θα διαγραφεί
              onDeleteComment(isDeletingComment);
              // κάνουμε reset το isDeletingComment για να κλείσει το modal
              setIsDeletingComment(false);
            }}
          >
            Delete
          </button>
        </div>
      </Dialog>
    </>
  );
}
