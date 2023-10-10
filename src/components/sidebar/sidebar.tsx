import { TooltipProvider } from "@/components/ui/tooltip";

import React from "react";
import SidebarNavButton from "../buttons/sidebar-nav-button";

const Sidebar = () => {
  return (
    <div className="fixed flex h-screen w-20 flex-col justify-between border-r-[1px] bg-background p-4">
      <div className="flex flex-col items-center gap-6">
        <TooltipProvider delayDuration={200}>
          <SidebarNavButton title="Overview" path="/overview" />
          <span className="w-full border-b-[1px] border-gray-200"></span>
          <SidebarNavButton title="Requests" path="/requests" />
          <SidebarNavButton title="Prospects" path="/prospects" />
          <SidebarNavButton title="Interviews" path="/interviews" />
          <SidebarNavButton title="Offers" path="/offers" />
          <SidebarNavButton title="Admin" path="/admin" />
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
