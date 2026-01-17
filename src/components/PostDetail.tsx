import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { supabase } from "../supabaseClient"; // Updated import

const PostDetail: React.FC = () => {
  const { pk } = useParams(); // 'pk' matches the :pk in your main.tsx router
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      // Fetch a single row where the ID matches the URL parameter
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", pk)
        .single(); // Returns one object instead of an array

      if (error) {
        console.error("Error fetching post:", error.message);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    if (pk) fetchPost();
  }, [pk]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium animate-pulse">
            Fetching the rant...
          </p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h2 className="text-2xl font-bold text-gray-800">Post not found.</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-indigo-600 font-bold hover:underline"
        >
          Return to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-indigo-600 font-bold text-sm md:text-base group"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Rants
          </button>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 mt-8 md:mt-12">
        <header className="mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.15] mb-8 tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-gray-500 border-y py-6 border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                {post.author_name?.[0] || "C"}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Author
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {post.author_name || "Community Member"}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                Published
              </span>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <Calendar size={14} className="text-indigo-400" />
                {new Date(post.created_at).toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                Read Time
              </span>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <Clock size={14} className="text-indigo-400" />
                <span>
                  {Math.max(1, Math.ceil(post.content.split(" ").length / 200))}{" "}
                  min read
                </span>
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg md:text-xl font-serif">
            {post.content}
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center">
            <h4 className="font-bold text-gray-900 mb-2">Enjoyed this rant?</h4>
            <p className="text-gray-500 text-sm mb-6">
              Join the conversation and share your thoughts with the community.
            </p>
            <a href="/">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-md">
                Share Rant
              </button>
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;
