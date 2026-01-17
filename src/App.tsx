import {
  ChevronDown,
  Image,
  Link,
  LogOut,
  NotebookPen,
  Trash2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import api from "./api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [makePost, setMakePost] = useState({ title: "", content: "" });
  const [myPosts, setMyPosts] = useState<any[]>([]);

  const getUserProfile = () => {
    api
      .get("/blogapi/user-profile/")
      .then((res: any) =>
        setUser({ name: res.data.username || res.data.name || "User" }),
      )
      .catch(() => setUser({ name: "Writer" }));
  };

  const getPosts = () => {
    api
      .get("/blogapi/posts/")
      .then((res: any) => setMyPosts(res.data))
      .catch((err: any) => console.error("Error fetching posts:", err));
  };

  const createPost = () => {
    api
      .post("/blogapi/posts/", makePost)
      .then(() => {
        getPosts();
        setMakePost({ title: "", content: "" });
        toast.success("Post published!");
      })
      .catch(() => toast.error("Failed to publish post."));
  };

  useEffect(() => {
    getUserProfile();
    getPosts();
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    createPost();
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };

  const deletePost = (id: number) => {
    if (window.confirm("Are you sure you want to delete this rant?")) {
      api
        .delete(`/blogapi/posts/delete/${id}/`)
        .then((res) => {
          if (res.status === 204) {
            setMyPosts(myPosts.filter((post) => post.id !== id));
            toast.success("Rant deleted successfully!");
          }
        })
        .catch(() => toast.error("Unauthorized to delete this post."));
    }
  };

  const userInitial = user?.name ? user.name[0].toUpperCase() : "?";

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span
            className="text-xl md:text-2xl font-bold text-indigo-600 tracking-tight cursor-pointer"
            onClick={() => navigate("/")}
          >
            Rants.
          </span>

          <div
            className="relative flex items-center gap-2 md:gap-4 border border-gray-100 rounded-lg p-1 md:p-2 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setOpenNav(!openNav)}
          >
            <div
              className={`absolute top-14 right-0 flex flex-col bg-white shadow-2xl px-6 py-6 rounded-xl gap-4 items-start min-w-[220px] border border-gray-100 ${openNav ? "flex" : "hidden"}`}
            >
              <button
                onClick={() => navigate("/rants")}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2 w-full text-left"
              >
                <NotebookPen size={18} /> View all Rants
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:border-red-600 hover:text-red-600 transition-colors w-full text-left font-medium"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>

            <span className="hidden md:block text-sm font-medium text-gray-700">
              Welcome, {user ? user.name : "..."}
            </span>
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold uppercase text-sm">
              {userInitial}
            </div>
            <ChevronDown
              size={16}
              className={`transition-transform ${openNav ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 md:py-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Good Morning, {user ? user.name : "Writer"}!
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            What's on your mind today? Your readers are waiting.
          </p>
        </header>

        {/* Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            {/* Form Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <NotebookPen size={20} />
                </span>
                Create New Post
              </h2>
              <form onSubmit={handleCreatePost} className="space-y-5">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Give your rant a name..."
                    className="w-full text-lg md:text-xl font-semibold border-none focus:ring-0 placeholder:text-gray-300 p-0"
                    value={makePost.title}
                    onChange={(e) =>
                      setMakePost({ ...makePost, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-bold text-gray-700 mb-1"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows={5}
                    placeholder="Tell your story..."
                    className="w-full border-none focus:ring-0 resize-none text-gray-600 placeholder:text-gray-300 p-0 text-base"
                    value={makePost.content}
                    onChange={(e) =>
                      setMakePost({ ...makePost, content: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="pt-5 border-t flex flex-row justify-between items-center gap-4">
                  <div className="flex gap-1 md:gap-3">
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Image size={20} />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Link size={20} />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </section>

            {/* Posts Feed Section */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 px-1">
                Your Recent Rants
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {myPosts.length > 0 ? (
                  myPosts.map((post: any) => (
                    <div
                      key={post.id}
                      className="relative group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                    >
                      <button
                        onClick={() => deletePost(post.id)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all md:opacity-0 md:group-hover:opacity-100"
                        title="Delete Rant"
                      >
                        <Trash2 size={18} />
                      </button>

                      <h3 className="text-lg font-bold text-indigo-600 pr-8 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mt-3 line-clamp-4 leading-relaxed text-sm">
                        {post.content}
                      </p>

                      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => navigate(`/posts/${post.id}`)}
                          className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          Read More →
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-gray-400">
                    <p className="font-medium">
                      No posts yet. Start writing your first rant!
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            <section className="bg-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-indigo-200 mb-6 uppercase tracking-widest text-xs">
                  Analytics Dashboard
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-3xl md:text-4xl font-black">
                      {myPosts.length}
                    </p>
                    <p className="text-xs text-indigo-200 mt-1 font-medium">
                      Total Rants
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-3xl md:text-4xl font-black">1.2k</p>
                    <p className="text-xs text-indigo-200 mt-1 font-medium">
                      Reader Views
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
