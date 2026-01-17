import { ChevronDown, House, LogOut } from "lucide-react";
import React, { useState } from "react";

const USER = { name: "Elite" };

// Mock data for your blog posts
const MOCK_POSTS = [
  {
    id: 1,
    title: "The Future of Web Development in 2026",
    excerpt:
      "Exploring how AI-driven tools and edge computing are reshaping the way we build for the web.",
    author: "Alex Rivera",
    date: "Jan 12, 2026",
    readTime: "5 min read",
    category: "Technology",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS Transitions",
    excerpt:
      "A deep dive into creating smooth, high-performance animations using only utility classes.",
    author: "Jordan Smith",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    category: "Design",
  },
  {
    id: 3,
    title: "Why Minimalist Writing is Harder Than It Looks",
    excerpt:
      "How to cut the fluff and deliver powerful messages with fewer words on the screen.",
    author: "Sarah Chen",
    date: "Jan 08, 2026",
    readTime: "4 min read",
    category: "Writing",
  },
  // Add more items to see the grid in action
];

const Rants: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);

  const openNavFunc = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600 tracking-tight">
            Rants.
          </span>
          <div
            className=" relative flex items-center gap-4 border border-gray-100 rounded-lg p-2 cursor-pointer"
            onClick={openNavFunc}
          >
            <div
              className={`absolute top-15 right-0 flex flex-col bg-white shadow-2xl px-8 py-8 rounded-lg gap-4 items-start ${
                openNav ? "flex" : "hidden"
              }`}
            >
              <a
                href="/"
                className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2"
              >
                <House />
                Back to Home
              </a>

              <a
                href="/rants"
                className="flex items-center gap-2 px-5 py-2 border rounded-lg hover:border-red-600 hover:text-red-600 transition-colors"
              >
                <LogOut /> Logout
              </a>
            </div>
            <span className=" hidden sm:block text-sm font-medium text-gray-700">
              Welcome, {USER.name}
            </span>
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              <p>{USER.name[0]}</p>
            </div>

            <span>
              <ChevronDown />
            </span>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Latest Rants
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Insights, tutorials, and stories from our passionate community.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_POSTS.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Post Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-sm">
                {post.category}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-indigo-600">
                <a href={`/rants/${post.id}`}>{post.title}</a>
              </h2>

              <p className="mb-6 flex-1 text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center pt-4 border-t border-gray-100">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                  {post.author[0]}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {post.author}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Rants;
