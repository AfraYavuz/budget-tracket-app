import * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GiReceiveMoney } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";
import NavMain from "./nav-main";

const data = {
  user: {
    name: "Afra Yavuz",
    email: "m@example.com",
  },
  navMain: [
    {
      title: "Finances",
      url: "#",
      icon: GiReceiveMoney,
      isActive: true,
      items: [
        {
          title: "Add Revenue",
          url: "/addRevenue",
        },
        {
          title: "Add Expense",
          url: "/addExpense",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: TbCategory,
      items: [
        {
          title: "Revenues",
          url: "/revenue",
        },
        {
          title: "Expenses",
          url: "/expense",
        },
      ],
    },
    {
      title: "Reporting and Analysis",
      url: "#",
      icon: HiOutlineDocumentReport,
      items: [
        {
          title: "Revenue Reports",
          url: "/revenueReports",
        },
        {
          title: "Expense Reports",
          url: "/expenseReports",
        },
      ],
    },
  ],
};

export function AppSidebar({ props }) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GiReceiveMoney className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">My Budget</span>
                  <span className="truncate text-xs">
                    Revenues and Expenses
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
export default AppSidebar;
