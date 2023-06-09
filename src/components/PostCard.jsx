/* eslint-disable react/prop-types */
import { useState } from 'react';

import { Dialog, Menu } from '@headlessui/react';
import { EllipsisHorizontalIcon as EllipsisHorizontalIcon24 } from '@heroicons/react/24/solid';
import { EllipsisHorizontalIcon as EllipsisHorizontalIcon20, HeartIcon } from '@heroicons/react/20/solid';

import { timeAgo, truncate } from '../lib/utils';
import Avatar from './Avatar';
import Button from './Button';
import CommentForm from './CommentForm';

/**
 * A component that displays a post with its body, comments, likes, title and user information.
 *
 * @typedef {object} Props
 * @property {string} body - The body text of the post.
 * @property {object[]} comments - An array of comments associated with the post.
 * @property {string} comments[].id - The ID of the comment.
 * @property {string} comments[].text - The text of the comment.
 * @property {string} comments[].createdAt - The creation date of the comment.
 * @property {string} comments[].updatedAt - The last update date of the comment.
 * @property {string} createdAt - The creation date of the post.
 * @property {number} likes - The number of likes the post has received.
 * @property {(comment: string) => void} onAddComment - A function that is called when the comment form is submitted.
 * @property {() => void} onDelete - A function that is called when the post is deleted.
 * @property {(commentId: string) => void} onDeleteComment - A function that is called when a comment is deleted.
 * @property {(commentId: string, newText: string) => void} onEditComment - A function that is called when a comment is edited.
 * @property {() => void} onToggleLike - A function that is called when the like button is clicked.
 * @property {object} session - The session object.
 * @property {string} title - The title of the post.
 * @property {string} userId - The ID of the user who made the post.
 * @property {object[]} users - An array of users in the application.
 * @property {string} users[].id - The ID of the user.
 * @property {string} users[].name - The name of the user.
 *
 * @param {Props} props - The props object.
 *
 * @returns {JSX.Element} - The rendered PostCard component.
 */
export default function PostCard({
  body,
  comments,
  createdAt,
  likes,
  onAddComment,
  onDelete,
  onDeleteComment,
  onEditComment,
  onToggleLike,
  session,
  title,
  userId,
  users,
}) {
  const [expandedBody, setExpandedBody] = useState(false);
  const [expandedComments, setExpandedComments] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  /**
   * Handles the request to delete a comment.
   *
   * This function informs the parent component to initiate the deletion of a comment.
   *
   * @returns {void}
   */
  const handleDeleteComment = () => {
    onDeleteComment(isDeletingComment);

    setIsDeletingComment(false);
  };

  /**
   * Handles the request to delete a post.
   *
   * This function informs the parent component to initiate the deletion of a post.
   *
   * @returns {void}
   */
  const handleDeletePost = () => {
    onDelete();

    setIsDeletingPost(false);
  };

  /**
   * Handles expanding the post body to see more content.
   *
   * @param {Event} event - The event triggering the expansion of the post body.
   *
   * @returns {void}
   */
  const handleSeeMore = (event) => {
    event.preventDefault();

    setExpandedBody(true);
  };

  /**
   * Handles expanding/collapsing the comments of a post.
   *
   * @param {Event} event - The event triggering the expansion/collapse of comments.
   *
   * @returns {void}
   */
  const handleXComments = (event) => {
    event.preventDefault();

    setExpandedComments(!expandedComments);
  };

  const postUser = users.find((user) => user.id === userId);
  const canDeletePost = userId === session.user.id || session.user.role === 'admin';
  const likesPost = likes.some((like) => like.userId === session.user.id);

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
            <Menu as="div" className="relative">
              <Menu.Button className="rounded-full p-1.5 hover:bg-gray-100">
                <EllipsisHorizontalIcon24 className="h-6 w-6 text-gray-500" />
              </Menu.Button>
              <Menu.Items className="absolute left-1/2 z-10 mt-2 min-w-max -translate-x-1/2 transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-2">
                  <Menu.Item>
                    {({ close }) => (
                      <a
                        className="block cursor-pointer rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();

                          setIsDeletingPost(true);

                          close();
                        }}
                      >
                        Delete
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
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
          <button className="inline-flex select-none items-center text-sm" onClick={onToggleLike} type="button">
            <HeartIcon className={`h-5 w-5 ${likesPost ? 'text-red-500' : 'text-gray-400 text-opacity-50'}`} />
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
                  const canDeleteComment =
                    comment.userId === session.user.id || userId === session.user.id || session.user.role === 'admin';
                  const canEditComment = comment.userId === session.user.id;

                  return (
                    <li className={`group flex${isEditingComment === comment.id ? ' w-full' : ''}`} key={comment.id}>
                      <Avatar className="mr-2" size="small">
                        {commentUser.name}
                      </Avatar>
                      {isEditingComment === comment.id ? (
                        <div className="flex w-full flex-col items-start">
                          <CommentForm
                            initialValue={comment.body}
                            onCancel={() => setIsEditingComment(false)}
                            onSubmit={(newComment) => {
                              onEditComment(comment.id, newComment);
                              setIsEditingComment(false);
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
                      {isEditingComment !== comment.id && (canDeleteComment || canEditComment) ? (
                        <Menu as="div" className="relative -mt-[1.125rem] ml-0.5 self-center">
                          <Menu.Button
                            className="rounded-full p-1.5 opacity-0 hover:bg-gray-100 group-hover:opacity-100"
                            tabIndex={-1}
                          >
                            <EllipsisHorizontalIcon20 className="h-5 w-5 text-gray-500" />
                          </Menu.Button>
                          <Menu.Items className="absolute left-1/2 z-10 mt-2 min-w-max -translate-x-1/2 transform rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-2">
                              {canEditComment ? (
                                <Menu.Item>
                                  {({ close }) => (
                                    <a
                                      className="block cursor-pointer rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                                      href="#"
                                      onClick={(event) => {
                                        event.preventDefault();

                                        setIsEditingComment(comment.id);

                                        close();
                                      }}
                                    >
                                      Edit
                                    </a>
                                  )}
                                </Menu.Item>
                              ) : null}
                              {canDeleteComment ? (
                                <Menu.Item>
                                  {({ close }) => (
                                    <a
                                      className="block cursor-pointer rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
                                      href="#"
                                      onClick={(event) => {
                                        event.preventDefault();

                                        setIsDeletingComment(comment.id);

                                        close();
                                      }}
                                    >
                                      Delete
                                    </a>
                                  )}
                                </Menu.Item>
                              ) : null}
                            </div>
                          </Menu.Items>
                        </Menu>
                      ) : null}
                    </li>
                  );
                })}
              <li className="flex w-full">
                <Avatar className="mr-2" size="small">
                  {session.user.name}
                </Avatar>
                <CommentForm onSubmit={onAddComment} />
              </li>
            </ul>
          </>
        ) : null}
      </div>

      <Dialog onClose={() => setIsDeletingPost(false)} open={isDeletingPost}>
        <div aria-hidden="true" className="fixed left-0 top-0 z-50 h-full w-full bg-gray-700 opacity-75" />
        <Dialog.Panel className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg">
          <Dialog.Title className="border-b border-b-gray-400 border-opacity-50 p-6 font-semibold">
            Delete Post?
          </Dialog.Title>
          <div className="p-6">
            <p className="text-sm text-gray-500">Are you sure you want to delete this post?</p>
          </div>
          <div className="flex justify-end p-6">
            <Button onClick={() => setIsDeletingPost(false)}>No</Button>
            <Button className="ml-2" onClick={handleDeletePost} variant="contained">
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>

      <Dialog onClose={() => setIsDeletingComment(false)} open={isDeletingComment !== false}>
        <div aria-hidden="true" className="fixed left-0 top-0 z-50 h-full w-full bg-gray-700 opacity-75" />
        <Dialog.Panel className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg">
          <Dialog.Title className="border-b border-b-gray-400 border-opacity-50 p-6 font-semibold">
            Delete Comment?
          </Dialog.Title>
          <div className="p-6">
            <p className="text-sm text-gray-500">Are you sure you want to delete this comment?</p>
          </div>
          <div className="flex justify-end p-6">
            <Button onClick={() => setIsDeletingComment(false)}>No</Button>
            <Button className="ml-2" onClick={handleDeleteComment} variant="contained">
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
