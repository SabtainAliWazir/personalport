import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { supabase, isSupabaseConfigured, FALLBACK_BLOG_POSTS, getBlogCoverImage } from '../lib/supabase';
import { 
  ArrowLeft, Calendar, Clock, Lightbulb, Share2, 
  Terminal, Sparkles, CheckCircle2, MessageSquare, Check
} from 'lucide-react';
import { marked } from 'marked';

export default function BlogPost() {
  const { params } = useRouter();
  const slug = params?.slug;

  const [post, setPost] = useState(() => {
    return FALLBACK_BLOG_POSTS.find((p) => p.slug === slug) || FALLBACK_BLOG_POSTS[0];
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPost() {
      if (!isSupabaseConfigured || !supabase || !slug) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (!error && data) {
          setPost(data);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  const htmlContent = useMemo(() => {
    if (!post?.content) return '';
    return marked.parse(post.content);
  }, [post?.content]);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-zinc-950 pt-36 pb-24 text-center gutter">
        <h1 className="font-display text-2xl font-semibold text-zinc-950">Article not found</h1>
        <p className="mt-2 text-xs text-zinc-500 font-sans">The story you are looking for does not exist.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-[#f97316]">
          <ArrowLeft className="size-3.5" />
          <span>Back to All Stories</span>
        </Link>
      </div>
    );
  }

  const coverSrc = post.cover_image || getBlogCoverImage(post.slug);

  return (
    <div className="min-h-screen bg-white text-zinc-950 pt-28 sm:pt-36 pb-24 selection:bg-[#f97316] selection:text-white">
      <article className="gutter mx-auto max-w-[52rem] w-full">
        
        {/* Navigation Breadcrumb & Share */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 font-mono text-xs text-zinc-700 hover:border-[#f97316] hover:text-zinc-950 transition-all shadow-sm"
          >
            <ArrowLeft className="size-3.5 text-[#f97316]" />
            <span>Back to All Stories</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 font-mono text-xs text-zinc-600 hover:border-zinc-300 hover:text-zinc-950 transition-all shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="size-3.5 text-zinc-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Header Metadata */}
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="rounded-full bg-[#f97316]/10 border border-[#f97316]/25 px-3 py-1 text-[#f97316] font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {post.published_at}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.read_time}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-zinc-950 leading-[1.1]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 font-sans leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Featured Cover Image */}
        <div className="my-8 overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-100 shadow-md">
          <img
            src={coverSrc}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>

        {/* The Child-Friendly Analogy Spotlight Banner */}
        <div className="my-8 rounded-3xl border border-[#f97316]/30 bg-[#f97316]/5 p-6 sm:p-8 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#f97316] font-semibold">
            <Sparkles className="size-4" />
            <span>The Quick Everyday Analogy</span>
          </div>
          <p className="font-display text-lg sm:text-xl font-medium text-zinc-900 leading-relaxed italic">
            "{post.simple_analogy}"
          </p>
        </div>

        {/* Main Article Body (Rendered Markdown) */}
        <div
          className="blog-markdown pt-2 border-b border-zinc-200 pb-12"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Author Bio Box */}
        <div className="mt-12 rounded-3xl border border-zinc-200 bg-zinc-50/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
          <img
            src="/images/sabtain-image.png"
            alt="Sabtain Ali"
            className="size-20 rounded-2xl object-cover border border-[#f97316]/30 shrink-0 shadow-sm"
          />
          <div className="space-y-2 text-center sm:text-left">
            <p className="font-mono text-xs uppercase tracking-wider text-[#f97316] font-semibold">
              Written by Sabtain Ali
            </p>
            <h3 className="font-display text-lg font-semibold text-zinc-950">
              Senior Full-Stack Software Engineer
            </h3>
            <p className="text-xs text-zinc-600 font-sans leading-relaxed">
              I build web platforms for organizations like the World Health Organization and write daily lessons breaking down software concepts in plain human language.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[#f97316] hover:text-zinc-950 transition-colors"
              >
                <span>Have a question or project idea? Let's talk →</span>
              </Link>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
