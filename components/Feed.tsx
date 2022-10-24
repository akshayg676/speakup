import { RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import { Post } from "../typings";
import PostBox from "./PostBox";
import { PostDetail } from "../components";

interface Props {
  posts: Post[];
}

const Feed = ({ posts }: Props) => {
  return (
    <div className="col-span-6 border-x border-slate-600">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon className="h-8 w-8 mr-5 mt-5 cursor-pointer text-matteYellow transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>
      <div>
        <PostBox />
      </div>
      <div>
        {posts.map((post) => (
          <PostDetail key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
