import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import logo from "../public/logo1.png";
import SidebarRow from "./SidebarRow";
const Sidebar = () => {
  return (
    <div className="flex flex-col col-span-2 items-center px-4 sm:items-start">
      <img className="m-3 h-10 w-10" src={logo.src} alt="" />
      <SidebarRow Icon={UserIcon} title="Sign In" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
    </div>
  );
};

export default Sidebar;
