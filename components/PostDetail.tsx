import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import { Comment, Post } from "../typings";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";

interface Props {
  post: Post;
}

const PostDetail = ({ post }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const refreshComments = async () => {
      const comments: Comment[] = await fetchComments(post._id);
      setComments(comments);
    };
    refreshComments();
  }, []);

  return (
    <div className="flex flex-col space-x-3 border-y border-gray-300 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={post.profileImage}
          alt=""
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{post.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{post.username.replace(/\s+/g, "").toLowerCase()} ·
            </p>
            <TimeAgo className="text-sm text-gray-500" date={post._createdAt} />
          </div>
          <p className="pt-1">{post.text}</p>
          {post.image && (
            <img
              src={post.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex justify-between">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <SwitchHorizontalIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <UploadIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Comment Section */}
      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t border-gray-700 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-matteYellow/30" />
              <img
                src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjI4fHxhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline ">
                    @{comment.username.replace(/\s+/g, "").toLocaleLowerCase()}{" "}
                    ·
                  </p>
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
