import React, { SVGProps } from "react";

type Props = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
};

const SidebarRow = ({ Icon, title }: Props) => {
  return (
    <div className=" group max-w-fit flex cursor-pointer rounded-full px-4 py-3 items-center space-x-2 transition-all duration-200 hover:bg-gray-600 ">
      <Icon className="h-6 w-6 " />
      <p className="group-hover:text-matteYellow">{title}</p>
    </div>
  );
};

export default SidebarRow;
