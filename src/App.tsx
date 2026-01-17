import { ChevronDown, Image, Link, LogOut, NotebookPen } from "lucide-react";
import React, { useState, useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Mock User & Initial Posts
const USER = { name: "Elite" };

const App: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);
  const [makePost, setMakePost] = useState({
    title: "",
    content: "",
  });
  const [myPosts, setMyPosts] = useState([]);

  function getPosts() {
    api
      .get("/blogapi/posts/")
      .then((res: any) => {
        console.log(res.data);
        setMyPosts(res.data);
      })
      .catch((err: any) => {
        alert(err);
      });
  }

  useEffect(() => {
    getPosts();
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New Post Created:", {
      title: makePost.title,
      content: makePost.content,
    });
    // Reset form after submission
    setMakePost({ title: "", content: "" });
  };

  const openNavFunc = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation / Header */}
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
                href="/rants"
                className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2"
              >
                <NotebookPen />
                View all Rants
              </a>

              <a
                href="/"
                className="flex items-center gap-2 px-5 py-2 border rounded-lg hover:border-red-600 hover:text-red-600 transition-colors"
                onClick={function () {
                  localStorage.clear();
                  return <Navigate to="/login" />;
                }}
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

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Good Morning, {USER.name}!
          </h1>
          <p className="text-gray-500 mt-1">
            What's on your mind today? Your readers are waiting.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Create Post */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <NotebookPen />
                </span>
                Create New Post
              </h2>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <input
                  type="text"
                  placeholder="Post Title"
                  className="w-full text-xl font-semibold border-none focus:ring-0 placeholder:text-gray-300"
                  value={makePost.title}
                  onChange={(e) =>
                    setMakePost({ ...makePost, title: e.target.value })
                  }
                  required
                />
                <textarea
                  rows={4}
                  placeholder="Tell your story..."
                  className="w-full border-none focus:ring-0 resize-none text-gray-600 placeholder:text-gray-300"
                  value={makePost.content}
                  onChange={(e) =>
                    setMakePost({ ...makePost, content: e.target.value })
                  }
                  required
                />
                <div className="pt-4 border-t flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <Image />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <Link />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                  >
                    Publish Post
                  </button>
                </div>
              </form>

              {/* <div className="">
                {myPosts
                  ? myPosts.map((post: any) => (
                      <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                      </div>
                    ))
                  : "No posts"}
              </div> */}
            </section>

            {/* Activity Feed */}
          </div>

          {/* Sidebar: Stats & Suggestions */}
          <div className="space-y-6">
            <section className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-bold text-indigo-200 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">1.2k</p>
                  <p className="text-xs text-indigo-300">Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">48</p>
                  <p className="text-xs text-indigo-300">Comments</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-sm">
                Drafts in progress
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
                  <p className="text-sm text-gray-600 truncate">
                    How to scale React apps...
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
                  <p className="text-sm text-gray-600 truncate">
                    The future of Web3...
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
