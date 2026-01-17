import { ChevronDown, House, LogOut } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Updated import
import toast, { Toaster } from "react-hot-toast";

const Rants: React.FC = () => {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [rants, setRants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1. Get User Profile from Supabase Auth Metadata
      const {
        data: { user: sbUser },
      } = await supabase.auth.getUser();
      if (sbUser) {
        setUser({
          name:
            sbUser.user_metadata?.username ||
            sbUser.email?.split("@")[0] ||
            "Writer",
        });
      }

      // 2. Fetch ALL Posts from the 'posts' table
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching rants:", error.message);
        toast.error("Could not load community rants.");
      } else {
        setRants(data || []);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    // Use Supabase official sign-out (handles token clearing for you)
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      navigate("/login");
    }
  };

  const userInitial = user?.name ? user.name[0].toUpperCase() : "?";

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />

      {/* Responsive Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span
            className="text-xl md:text-2xl font-bold text-indigo-600 cursor-pointer tracking-tight"
            onClick={() => navigate("/")}
          >
            Rants.
          </span>

          <div
            className="relative flex items-center gap-2 md:gap-4 border border-gray-100 rounded-lg p-1 md:p-2 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setOpenNav(!openNav)}
          >
            <div
              className={`absolute top-14 right-0 flex flex-col bg-white shadow-2xl px-6 py-6 rounded-xl gap-4 min-w-[220px] border border-gray-100 z-50 ${openNav ? "flex" : "hidden"}`}
            >
              <button
                onClick={() => navigate("/")}
                className="text-indigo-600 font-medium flex items-center gap-2 w-full text-left"
              >
                <House size={18} /> Back to Home
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:border-red-600 hover:text-red-600 transition-colors w-full text-left font-medium"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>

            <span className="hidden md:block text-sm font-medium text-gray-700">
              Welcome, {user?.name || "..."}
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

      {/* Responsive Header */}
      <header className="max-w-7xl mx-auto py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
          Community Rants
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-500 max-w-2xl">
          Every story from every voice in our database. Explore what the world
          is thinking.
        </p>
      </header>

      {/* Main Grid Feed */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium">
              Fetching the latest rants...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rants.map((post) => (
              <article
                key={post.id}
                className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em] mb-3 bg-indigo-50 w-fit px-2 py-1 rounded">
                    Public Feed
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-4 text-sm leading-relaxed mb-6">
                    {post.content}
                  </p>
                </div>

                <div className="pt-5 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                      {post.author_name?.[0] || "A"}
                    </div>
                    <span className="text-xs text-gray-400 font-semibold truncate max-w-[100px]">
                      {post.author_name || "Anonymous"}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/rants/${post.id}`)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                  >
                    Read More
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && rants.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium">
              No community rants found yet.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Rants;
