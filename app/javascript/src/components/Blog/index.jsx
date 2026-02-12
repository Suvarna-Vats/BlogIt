import React from "react";

import { Typography } from "@bigbinary/neetoui";
import Sidebar from "src/commons/Sidebar";

import Card from "./Card";

const POSTS = [
  {
    title: "Rails 8 introduces a basic authentication generator",
    date: "30 September 2024",
    excerpt:
      "Rails now include a fully building block needed to do basic authentication, but many new developers are still uncertain of how to put them together...",
  },
  {
    title: "Why we switched from Cypress to Playwright?",
    date: "25 August 2024",
    excerpt:
      "Until early 2024, Cypress used to be the most downloaded end-to-end (e2e) testing framework in JavaScript. Since then, it has seen a steep decline in popularity...",
  },
  {
    title:
      "Difference between dependencies, devDependencies and peerDependencies",
    date: "30 September 2024",
    excerpt:
      "In a JavaScript project, understanding the distinctions between dependencies, devDependencies and peerDependencies is crucial for effective package management...",
  },
  {
    title:
      "Rails 7.1 allows subscribing to Active Record transaction events for instrumentation",
    date: "30 September 2024",
    excerpt:
      "One of the recent additions to Rails is that it is triggered when Active Record managed transactions occurs. This is particularly useful if you want to build a monitoring system...",
  },
  {
    title: "React localization with i18next and react-i18next libraries",
    date: "30 September 2024",
    excerpt:
      "Localization is the process of designing and developing products that can adapt to various languages and regions without requiring a complete overhaul...",
  },
];

const Blog = () => (
  <div className="min-h-screen bg-white">
    <div className="flex">
      <Sidebar
        items={[
          { label: "Blog posts", to: "/blogs", icon: "ri-file-list-2-line" },
        ]}
      />
      <main className="flex-1 px-10 py-12">
        <div className="mx-auto w-full max-w-5xl">
          <Typography className="mb-10" component="h1" style="h1" weight="bold">
            Blog posts
          </Typography>
          <div className="divide-y divide-gray-200">
            {POSTS.map(post => (
              <Card key={post.title} {...{ post }} />
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default Blog;
