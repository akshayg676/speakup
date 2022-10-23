import Head from "next/head";
import React, { ReactNode } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-slate-800 text-white min-h-screen">
      <Head>
        <title>Binary Bee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
