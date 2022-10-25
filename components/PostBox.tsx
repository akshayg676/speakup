import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { Post, PostBody } from "../typings";
import { fetchPosts } from "../utils/fetchPosts";
import toast from "react-hot-toast";

interface Props {
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

const PostBox = ({ setPosts }: Props) => {
  const { data: session } = useSession();
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToPost = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageUrlBoxIsOpen(false);
  };

  const publishPost = async () => {
    const postBody: PostBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      image: image,
      profileImage: session?.user?.image || "https://links.papareact.com/gll",
    };

    const result = await fetch(`/api/addPost`, {
      body: JSON.stringify(postBody),
      method: "POST",
    });

    const json = await result.json();

    const newPosts = await fetchPosts();
    setPosts(newPosts);

    toast("Post Published", {
      icon: "🚀",
    });
    return json;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    publishPost();

    setImage("");
    setInput("");
    setImageUrlBoxIsOpen(false);
  };
  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={session?.user?.image || "https://links.papareact.com/gll"}
        alt=""
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-inherit h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's Happening?"
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-matteYellow">
              <PhotographIcon
                onClick={() => setImageUrlBoxIsOpen((prev) => !prev)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="px-5 py-2 rounded-full bg-matteYellow font-bold disabled:opacity-50 tracking-wide"
            >
              Post
            </button>
          </div>
          {imageUrlBoxIsOpen && (
            <form className="mt-5 flex rounded-lg bg-matteYellow/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button
                type="submit"
                onClick={addImageToPost}
                className="font-bold "
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-2xl"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default PostBox;
