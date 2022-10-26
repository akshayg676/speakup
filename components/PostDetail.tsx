import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import { Comment, CommentBody, Post } from "../typings";
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
  post: Post;
}

const PostDetail = ({ post }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(post._id);
    setComments(comments);
  };
  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToast = toast.loading("Posting Comment...");
    // Comment logic
    const comment: CommentBody = {
      comment: input,
      postId: post._id,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://links.papareact.com/gll",
    };

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    });

    toast.success("Comment Posted!", {
      id: commentToast,
    });

    setInput("");
    setCommentBoxVisible(false);
    refreshComments();
  };

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
        <div
          onClick={() => session && setCommentBoxVisible((prev) => !prev)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
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

      {commentBoxVisible && (
        <form onSubmit={handleSubmitComment} className="mt-3 flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-900 flex-1 rounded-lg p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            type="submit"
            className="text-matteYellow border-2 border-matteYellow rounded-lg p-2 disabled:opacity-50 "
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div>
          <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll scrollbar-hide border-t border-gray-700 p-5">
            {comments.map((comment) => (
              <div key={comment._id} className="relative flex space-x-2">
                <hr className="absolute left-5 top-10 h-8 border-x border-matteYellow/30" />
                <img
                  src={comment.profileImg}
                  className="mt-2 h-7 w-7 rounded-full object-cover"
                  alt=""
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <p className="mr-1 font-bold">{comment.username}</p>
                    <p className="hidden text-sm text-gray-500 lg:inline ">
                      @
                      {comment.username.replace(/\s+/g, "").toLocaleLowerCase()}{" "}
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
          <p className=" flex justify-center text-gray-500">
            Scroll ⬇ for more comments
          </p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
