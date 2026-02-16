import React from "react";

import Sidebar from "src/commons/Sidebar";

import { BLOG_NAV_ITEMS } from "./constants";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-white">
    <div className="flex">
      <Sidebar items={BLOG_NAV_ITEMS} />
      <main className="flex-1 px-10 py-12">{children}</main>
    </div>
  </div>
);

export default Layout;
