import React, { useState, useEffect } from 'react';
import { Link } from '../router/RouterContext';
import { supabase, isSupabaseConfigured, FALLBACK_BLOG_POSTS, getBlogCoverImage } from '../lib/supabase';
import { 
  BookOpen, Sparkles, Clock, Calendar, ArrowRight, 
  Search, Lightbulb, Compass, Database, Terminal 
} from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState(FALLBACK_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      if (!isSupabaseConfigured || !supabase) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const enriched = data.map((item) => {
            const fallback = FALLBACK_BLOG_POSTS.find((p) => p.slug === item.slug);
            const hasRichFallback = fallback && fallback.content && fallback.content.length > (item.content?.length || 0);
            return {
              ...item,
              title: hasRichFallback ? fallback.title : item.title,
              summary: hasRichFallback ? fallback.summary : item.summary,
              simple_analogy: hasRichFallback ? fallback.simple_analogy : item.simple_analogy,
              read_time: hasRichFallback ? fallback.read_time : item.read_time,
              cover_image: item.cover_image || getBlogCoverImage(item.slug)
            };
          });
          setPosts(enriched);
        }
      } catch (err) {
        console.error('Error loading Supabase posts:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.simple_analogy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-zinc-950 pt-36 sm:pt-44 pb-24 selection:bg-[#f97316] selection:text-white">
      
      {/* ─────────────────────────────────────────────────────────────
          1. BLOG HERO: THE SIMPLE HUMAN COMMUNICATION PROMISE
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] pb-12 border-b border-zinc-200">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow flex items-center gap-2 text-[#f97316] font-semibold">
            <Lightbulb className="size-3.5" />
            <span>Tech Concepts Explained Simply</span>
          </p>
          <h1 className="display-h1 text-zinc-950">
            Software ideas explained for humans.
          </h1>
          <p className="text-lead font-sans text-zinc-600 leading-relaxed">
            I believe that if you cannot explain a technical concept to a 10-year-old child, you do not truly understand it yet. Every day, I break down software architecture, databases, and APIs using everyday real-life analogies.
          </p>

          {!isSupabaseConfigured && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 border border-zinc-200 px-3 py-1.5 font-mono text-[0.68rem] text-zinc-500 shadow-sm">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Showing sample daily stories · Connect Supabase in .env to publish live posts</span>
            </div>
          )}
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-zinc-200">
          
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'border border-[#f97316] bg-[#f97316]/10 text-zinc-950 font-semibold shadow-sm'
                    : 'border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search concepts or analogies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-4 text-xs font-sans text-zinc-950 placeholder:text-zinc-400 focus:border-[#f97316] focus:bg-white focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. POSTS GRID
      ───────────────────────────────────────────────────────────── */}
      <section className="gutter mx-auto max-w-[78rem] mt-12">
        {filteredPosts.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-12 text-center space-y-3 shadow-sm">
            <Compass className="size-8 text-[#f97316] mx-auto opacity-70" />
            <h3 className="font-display text-lg font-semibold text-zinc-950">No articles found</h3>
            <p className="text-xs text-zinc-500 font-sans">
              Try a different search word or category filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.slug || post.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-[#f97316]/50 hover:shadow-xl shadow-sm"
              >
                <div>
                  {/* Card Cover Image */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block overflow-hidden rounded-2xl bg-zinc-100 aspect-[16/9] mb-5 relative group/img border border-zinc-100"
                  >
                    <img
                      src={post.cover_image || getBlogCoverImage(post.slug)}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-white/95 backdrop-blur-sm border border-zinc-200/80 px-2.5 py-1 text-[0.68rem] text-zinc-900 font-semibold shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </Link>

                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-3 border-b border-zinc-100">
                    <span className="flex items-center gap-1.5 text-[0.68rem]">
                      <Calendar className="size-3 text-zinc-400" />
                      {post.published_at}
                    </span>
                    <span className="flex items-center gap-1.5 text-[0.68rem]">
                      <Clock className="size-3 text-zinc-400" />
                      {post.read_time}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-zinc-950 mt-4 tracking-[-0.02em] group-hover:text-[#f97316] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Simple Analogy Highlight Callout */}
                  <div className="mt-4 rounded-2xl border border-[#f97316]/25 bg-[#f97316]/5 p-3.5 space-y-1">
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[#f97316] font-semibold flex items-center gap-1.5">
                      <Sparkles className="size-3 text-[#f97316]" />
                      <span>The Everyday Analogy</span>
                    </p>
                    <p className="text-xs text-zinc-800 font-sans leading-relaxed italic">
                      "{post.simple_analogy}"
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="mt-4 text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="font-mono text-[0.68rem] text-zinc-400 flex items-center gap-1">
                    <Calendar className="size-3 text-zinc-400" />
                    {post.published_at}
                  </span>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#f97316] hover:text-zinc-950 transition-colors"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
