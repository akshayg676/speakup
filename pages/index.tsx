import type { NextPage } from "next";
import Image from "next/image";
import { Feed, Sidebar } from "../components";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-800 text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Feed */}
      <Feed />
      {/* Widgets */}
    </div>
  );
};

export default Home;
