import type { GetServerSideProps, NextPage } from "next";
import { Feed, Sidebar } from "../components";
import { Post } from "../typings";
import { fetchPosts } from "../utils/fetchPosts";

interface Props {
  posts: Post[];
}
const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden md:max-w-4xl ">
      <main className="grid grid-cols-8">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
};
