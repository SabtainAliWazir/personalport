-- ==============================================================================
-- Sabtain Ali Portfolio · Daily Educational Blog Database Schema (Supabase)
-- ==============================================================================
-- Run this in your Supabase project's SQL Editor (https://app.supabase.com)

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  simple_analogy TEXT NOT NULL,
  category TEXT DEFAULT 'Fundamentals',
  read_time TEXT DEFAULT '3 min read',
  published_at DATE DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts (for portfolio visitors & Google Search Console)
CREATE POLICY "Allow public read access to published posts" 
ON public.posts 
FOR SELECT 
USING (is_published = true);

-- Sample initial posts (Explained for a 10-year-old)
INSERT INTO public.posts (slug, title, summary, simple_analogy, category, read_time, published_at, content)
VALUES
(
  'what-is-an-api-restaurant-waiter',
  'What is an API? The Restaurant Waiter Analogy',
  'Imagine you are hungry at a table. You cannot walk directly into the kitchen and cook food yourself. That is where the waiter comes in.',
  'An API is like a restaurant waiter who takes your order to the kitchen and brings back your meal.',
  'Fundamentals',
  '3 min read',
  '2026-10-14',
  '# What is an API? Explained for a 10-Year-Old\n\nHave you ever wondered how weather apps know if it is raining outside? The weather app does not have its own satellites in space. So how does it know?\n\nThe answer is an API (Application Programming Interface).\n\n### The Restaurant Story\n1. You are the Customer (The User)\n2. The Kitchen is the System (The Database/Server)\n3. The Waiter is the API'
),
(
  'why-databases-need-indexes-the-book-secret',
  'Why Databases Need Indexes: The Library Secret',
  'What happens when a computer has to find one person out of 10 million records? Without an index, it reads every single page one by one.',
  'A database index is like the index at the back of a thick school textbook.',
  'Backend & Data',
  '4 min read',
  '2026-10-13',
  '# Why Databases Need Indexes (The Book Secret)\n\nImagine your teacher hands you a huge 1,000-page encyclopedia and says: Find the page that talks about Tigers in 5 seconds!\n\nIf you start at page 1 and read every page, it will take hours. That is called a Full Table Scan.\n\nInstead, you flip to the back of the book, look up T for Tigers, and see: Page 412. You jump straight to page 412 instantly. That is a Database Index!'
),
(
  'websockets-walkie-talkie-vs-letters',
  'WebSockets vs HTTP: Walkie-Talkies vs Mailing Letters',
  'Why does live chat feel instant while refreshing a web page takes time? The difference between mailing paper letters and holding a live walkie-talkie.',
  'Normal websites send paper letters through the post office. WebSockets keep a live walkie-talkie open between you and the server.',
  'Real-Time Systems',
  '3 min read',
  '2026-10-12',
  '# WebSockets vs HTTP: The Walkie-Talkie Story\n\nWhen you visit a normal website, your browser behaves like someone sending a letter:\n1. You write a letter: Dear Server, please send me your homepage.\n2. You mail the letter.\n3. The server receives it, writes a reply, and mails it back.\n4. The connection closes.\n\nIf you want an update 5 seconds later, you have to write a whole new letter.\n\nA WebSocket is like holding a live Walkie-Talkie: you turn it on once, and both sides can speak instantly with zero delay!'
);
