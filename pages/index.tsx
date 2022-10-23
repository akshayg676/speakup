import type { NextPage } from "next";
import Image from "next/image";
import { Feed, Sidebar } from "../components";

const Home: NextPage = () => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden md:max-w-5xl ">
      <main className="grid grid-cols-9">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
      </main>
    </div>
  );
};

export default Home;
