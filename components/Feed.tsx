import { RefreshIcon } from "@heroicons/react/outline";
import React from "react";
import PostBox from "./PostBox";

const Feed = () => {
  return (
    <div className="flex items-center justify-between col-span-6 border-x border-slate-600">
      <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
      <RefreshIcon className="h-8 w-8 mr-5 mt-5 cursor-pointer text-matteYellow transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      <PostBox />
    </div>
  );
};

export default Feed;
