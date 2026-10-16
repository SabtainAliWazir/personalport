import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, Link } from '../router/RouterContext';
import { supabase, isSupabaseConfigured, FALLBACK_BLOG_POSTS, getBlogCoverImage } from '../lib/supabase';
import { 
  ArrowLeft, Calendar, Clock, Lightbulb, Share2, 
  Terminal, Sparkles, CheckCircle2, MessageSquare, Check, Home
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
    // Force scroll to top on post change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

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
          const fallback = FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);
          const hasRichFallback = fallback && fallback.content && fallback.content.length > (data.content?.length || 0);

          setPost({
            ...data,
            title: hasRichFallback ? fallback.title : data.title,
            summary: hasRichFallback ? fallback.summary : data.summary,
            simple_analogy: hasRichFallback ? fallback.simple_analogy : data.simple_analogy,
            read_time: hasRichFallback ? fallback.read_time : data.read_time,
            content: hasRichFallback ? fallback.content : data.content,
            cover_image: data.cover_image || getBlogCoverImage(slug)
          });
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
    // Normalize literal escaped backslash-n into real newlines
    const normalized = post.content
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '  ');
    return marked.parse(normalized);
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
    <div className="min-h-screen bg-white text-zinc-950 pt-36 sm:pt-44 pb-24 selection:bg-[#f97316] selection:text-white">
      <article className="gutter mx-auto max-w-[52rem] w-full">
        
        {/* Navigation Breadcrumb & Share */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-100">
          <nav aria-label="Breadcrumb">
            <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-xs text-zinc-500">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="inline-flex items-center">
                <Link href="/" itemProp="item" className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-[#f97316] transition-colors">
                  <Home className="size-3 text-zinc-400" />
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-zinc-300 select-none">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="inline-flex items-center">
                <Link href="/blog" itemProp="item" className="text-zinc-600 hover:text-[#f97316] transition-colors">
                  <span itemProp="name">Blog</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-zinc-300 select-none">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="inline-flex items-center">
                <span itemProp="name" className="text-zinc-900 font-semibold truncate max-w-[14rem] sm:max-w-none">
                  {post.category}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

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
