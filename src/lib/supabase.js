import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_SUPABASE_URL) || (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_URL : '');
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta?.env?.VITE_SUPABASE_ANON_KEY) || (typeof process !== 'undefined' ? process.env?.VITE_SUPABASE_ANON_KEY : '');

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Cover image mapping for blog posts
export const BLOG_IMAGES = {
  'what-is-an-api-restaurant-waiter': '/images/blog/api-restaurant-waiter.png',
  'why-databases-need-indexes-the-book-secret': '/images/blog/database-indexes-library.png',
  'websockets-walkie-talkie-vs-letters': '/images/blog/websockets-walkie-talkie.png',
};

export const getBlogCoverImage = (slug) => {
  return BLOG_IMAGES[slug] || '/images/blog/api-restaurant-waiter.png';
};

// Comprehensive educational starter posts explained simply (Child-friendly analogies + Deep SEO Architecture)
export const FALLBACK_BLOG_POSTS = [
  {
    id: '1',
    slug: 'what-is-an-api-restaurant-waiter',
    title: 'What is an API? The Restaurant Waiter Analogy (Full-Stack Guide)',
    summary: 'Learn how APIs work in modern software engineering through the simple restaurant waiter analogy. Covers HTTP methods (GET, POST, PUT, DELETE), status codes, JSON payloads, and how frontend apps talk to backend databases.',
    category: 'System Architecture',
    read_time: '6 min read',
    published_at: '2026-10-14',
    cover_image: '/images/blog/api-restaurant-waiter.png',
    simple_analogy: 'An API is like a 5-star restaurant waiter who takes your order from the dining table, carries it safely to the kitchen chefs, and brings back your steaming meal.',
    content: `# What is an API? The Restaurant Waiter Analogy

Have you ever wondered how your phone’s weather app knows it is raining outside? 

The weather app did not launch its own satellite into space. It did not build radar stations across the globe. Instead, it sent a digital courier to ask the National Weather Service: *"Hey, what is the temperature in London right now?"* In less than a fraction of a second, the answer was delivered to your screen.

That digital courier is called an **API** (**Application Programming Interface**).

In modern software engineering, APIs are the connective tissue of the entire internet. Every time you book an Uber ride, pay with PayPal, log into a website using Google, or stream music on Spotify, dozens of APIs are exchanging messages behind the scenes.

Let's break down how APIs actually work using an everyday real-world analogy: **A 5-Star Restaurant**.

---

## 1. The 5-Star Restaurant Analogy

Imagine walking into a bustling, high-end Italian restaurant on a Friday evening:

### The Diner (The Client / Frontend)
You sit down at a table with an appetite. In web development, **you are the Client** - this can be a user's web browser running React, an iPhone app, or an Apple Watch. You want information (or food), but you don’t have direct access to the ingredients.

### The Kitchen & Chefs (The Server & Database)
Behind the double doors is the restaurant kitchen. The kitchen has industrial ovens, sharp knives, raw ingredients, and proprietary recipes. In software, this is the **Backend Server and Database** (like PostgreSQL or Node.js). 

> **Important Security Rule**: Customers are never allowed to walk directly into the kitchen. If any random customer could wander into the pantry, they might steal the secret sauce, drop an ingredient on the floor, or burn the kitchen down. Similarly, mobile apps and browsers must never touch databases directly - that would expose confidential user data and invite hackers.

### The Waiter (The API)
So how does food travel from the kitchen to your table? **The Waiter**.

1. The waiter walks over and hands you a **Menu** (in software, this is the **API Documentation** listing all available endpoints like \`/menu\` or \`/orders\`).
2. You make an **API Request**: *"I would like one thin-crust Margherita pizza, please."*
3. The waiter writes down your order, checks that it is valid, and carries it back to the kitchen chef.
4. The chef prepares the meal and hands it to the waiter.
5. The waiter brings an **API Response** back to your table: a steaming hot pizza served on a clean plate.

---

## 2. The 4 Golden Verbs: HTTP Methods

When your browser or mobile app talks to an API, it uses standardized verbs known as **HTTP Methods**. In our restaurant, these are the different things you can ask the waiter to do:

| HTTP Method | Restaurant Action | Technical Meaning | Example Endpoint |
| :--- | :--- | :--- | :--- |
| **GET** | *"Can I look at the dessert menu?"* | Fetch and read data without changing anything on the server. | \`GET /api/v1/menu\` |
| **POST** | *"I would like to place an order for table 4."* | Create brand new data on the server. | \`POST /api/v1/orders\` |
| **PUT / PATCH** | *"Please change my order from cow's milk to oat milk."* | Update or modify an existing record. | \`PATCH /api/v1/orders/42\` |
| **DELETE** | *"I have an emergency and must cancel my order."* | Remove a record from the database. | \`DELETE /api/v1/orders/42\` |

---

## 3. Secret Waiter Hand Signals: HTTP Status Codes

When the waiter returns from the kitchen, they don’t just bring food; they also give you a status report. In web development, these are three-digit **HTTP Status Codes**:

- **\`200 OK\`**: *"Your pizza is served! Bon appetit."* The request succeeded, and data is returned.
- **\`201 Created\`**: *"Your order has been recorded into the chef's queue."* Successfully created a new database entry.
- **\`400 Bad Request\`**: *"Excuse me sir, you ordered 'purple dragon steak' which is not on our menu."* The client sent malformed or invalid data.
- **\`401 Unauthorized\`**: *"Excuse me, this is the VIP lounge. Please show your reservation pass (Bearer Token)."* You forgot to include authentication credentials.
- **\`404 Not Found\`**: *"The chef looked everywhere in the pantry, but that dish does not exist."* The requested URL or ID was not found.
- **\`500 Internal Server Error\`**: *"The kitchen oven caught fire!"* An unexpected crash happened on the server side. The problem is on the backend, not your fault.

---

## 4. What Does an API Message Actually Look Like?

When the waiter delivers your order, they speak in a universal digital language called **JSON** (**JavaScript Object Notation**). It is lightweight, human-readable, and supported by every programming language on earth.

Here is what the waiter’s receipt looks like when you order a meal:

\`\`\`json
{
  "order_id": 1042,
  "status": "baking",
  "table_number": 4,
  "items": [
    {
      "name": "Margherita Pizza",
      "price": 14.50,
      "customizations": ["extra basil", "crispy crust"]
    }
  ],
  "estimated_delivery_minutes": 12,
  "chef_assigned": "Marco"
}
\`\`\`

---

## 5. How Frontend Code Talks to the Waiter

In modern JavaScript and React development, sending the waiter to the kitchen takes only a few lines of clean code using the native \`fetch()\` API:

\`\`\`javascript
// Step 1: Call the digital waiter
async function fetchMenu() {
  try {
    const response = await fetch('https://api.restaurant.com/v1/menu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-secret-dining-pass'
      }
    });

    // Step 2: Check if the waiter brought back a 200 OK
    if (!response.ok) {
      throw new Error(\`Kitchen error: \${response.status}\`);
    }

    // Step 3: Open the hot food container (parse JSON)
    const data = await response.json();
    console.log("Today's delicious menu:", data);
  } catch (error) {
    console.error("The waiter couldn't reach the kitchen:", error);
  }
}
\`\`\`

---

## 6. Real-World Engineering: How I Used APIs for the World Health Organization

When I engineered the data synchronization engine for the **World Health Organization (WHO e-ACR)**, health delegates from over 180 countries were uploading national surveillance reports, laboratory specimen tests, and immunization tallies.

If each delegate had direct access to the database, one bad SQL query could freeze the entire global health registry. 

Instead, we built strict **REST APIs**:
1. When a delegate submits laboratory results from their clinic, their browser sends an authenticated \`POST /api/v1/surveillance/specimen\` request.
2. The API layer immediately checks their credentials, verifies that the specimen IDs match ISO standards, sanitizes the inputs against SQL injection, and only then saves the record to the database.
3. The API replies with a clean \`201 Created\` status in **under 120 milliseconds**.

---

## Key Takeaways

1. **APIs are Messengers**: They let two different software systems communicate without knowing how the other system is built internally.
2. **Security by Default**: APIs protect sensitive databases from being touched directly by public web browsers.
3. **Universal Standards**: By using HTTP methods (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`) and JSON formatting, any phone, computer, or AI bot can talk to any server anywhere on Earth.`
  },
  {
    id: '2',
    slug: 'why-databases-need-indexes-the-book-secret',
    title: 'Why Databases Need Indexes: The Library Secret (Database Optimization)',
    summary: 'Discover why database indexes are essential for high-performance software. Learn how B-Tree indexes turn slow linear scans into sub-millisecond queries, complete with real SQL examples and case studies.',
    category: 'Database Engineering',
    read_time: '7 min read',
    published_at: '2026-10-13',
    cover_image: '/images/blog/database-indexes-library.png',
    simple_analogy: 'A database index is like the alphabetical index at the very back of a 1,000-page encyclopedia that tells you the exact page number in 2 seconds.',
    content: `# Why Databases Need Indexes: The Library Secret

Imagine your school teacher hands you an enormous 1,000-page encyclopedia of animals. She sets a stopwatch on her desk, looks you in the eyes, and says:

> *"Find the exact page that talks about the Bengal Tiger. You have 5 seconds. Go!"*

What would you do?

If you started at **Page 1**, reading every single animal name one by one (*Aardvark, Albatross, Alligator...*), it would take you 20 minutes to reach page 842. The stopwatch would have run out long ago.

Instead, you do what every smart human does: **You flip straight to the alphabetical index at the very back of the book**.

You jump to the letter **T**, find *"Tiger, Bengal"*, read the number **Page 842**, and turn directly to that page in under 3 seconds.

That index at the back of the book is **exactly how a Database Index works**.

---

## 1. The Nightmare of the Full Table Scan

In software engineering, when a database has to search through rows without an index, it performs what is called a **Full Table Scan** (or sequential scan).

Imagine an e-commerce website with **10,000,000 registered users**. A user types their email into the login box:
\`alex.turner@example.com\`

Without an index, the database software has no choice but to start at User ID #1:
- Row 1: \`john@gmail.com\` (Nope)
- Row 2: \`sarah@outlook.com\` (Nope)
- Row 3: \`mohammed@yahoo.com\` (Nope)
- ...
- Row 8,419,203: \`alex.turner@example.com\` (Found it!)

To find Alex, the database had to read **8.4 million rows from disk into RAM**.
- In computer science terms, this is **O(N) linear time complexity**.
- If the database grows from 10 million to 20 million users, the search takes **twice as long**.
- When hundreds of people try to log in at the same second, the server’s CPU spikes to 100%, database connections queue up, and the website crashes.

---

## 2. How a Database Index Saves the Day

When you tell a database like PostgreSQL or MySQL:
\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
\`\`\`
The database creates a specialized companion data structure alongside your main table. 

Instead of an unsorted pile of users, this companion structure stores every email in **strict sorted order** pointing directly to where the full user row lives on disk:

\`\`\`
[aaron@...]    --> Disk Block #104
[alex.turner] --> Disk Block #842  <-- Instant pointer!
[beatrice@..]  --> Disk Block #210
...
[zoe@...]      --> Disk Block #912
\`\`\`

Now, when Alex logs in, the database doesn't read 8.4 million rows. It looks up Alex in the sorted index and jumps directly to disk block #842 in **under 1 millisecond**.

---

## 3. The Magic Under the Hood: B-Trees (Balanced Trees)

How does the computer search a sorted index so quickly? It uses a data structure called a **B-Tree** (**Balanced Tree**).

You already know how a B-Tree works from childhood. Have you ever played the game:
> *"I'm thinking of a number between 1 and 100. Guess what it is!"*

You don't guess 1, then 2, then 3. 
Your very first guess is **50**!
- If your friend says *"Higher!"*, you instantly throw away all numbers from 1 to 50. You just cut your problem in half!
- Next, you guess **75**.
- If your friend says *"Lower!"*, you test between 51 and 74.

In just **7 guesses**, you can find any number from 1 to 100.
In just **20 guesses**, you can find one specific item out of **1,000,000 items**!

This is **O(log N) logarithmic time complexity**. A B-Tree organizes database records into branching nodes so that every comparison eliminates half the remaining search space.

---

## 4. The Hidden Catch: Why Can't We Index Every Column?

Beginner programmers often ask:
> *"If indexes make queries 1,000x faster, why don't we just index every single column in the table?"*

Because there is no free lunch in computer science. Indexes come with two major trade-offs:

### 1. Slower Writes (INSERT, UPDATE, DELETE)
Every time a new user registers on your site, the database must write the user to the main table **AND** insert their email into the sorted B-Tree index. If you put 10 indexes on a table, every single \`INSERT\` must update 10 different index trees!

### 2. Disk Space Storage
An index is a copy of your column data organized in a tree. On huge tables with 50 million rows, an index can easily take **5 to 20 Gigabytes** of expensive RAM and solid-state drive space.

---

## 5. Real-World Engineering: Speeding up WHO Global Surveillance by 380x

At **SysReforms International**, I was tasked with optimizing the reporting dashboard for the **World Health Organization (WHO e-ACR)** and the **World Organisation for Animal Health (WOAH)**.

The system contained over 400,000 epidemiological surveillance records. When an international delegate filtered records by \`country_code = 'PK'\` and \`report_year = 2025\`, the dashboard was spinning for **9.2 seconds** before displaying the results.

Delegates were complaining that the site felt broken.

### The Diagnosis
Using PostgreSQL's query diagnostic tool:
\`\`\`sql
EXPLAIN ANALYZE 
SELECT * FROM surveillance_records 
WHERE country_code = 'PK' AND report_year = 2025;
\`\`\`
The output showed:
\`Seq Scan on surveillance_records (cost=0.00..18450.00 rows=1250 width=480)\`
The database was scanning all 400,000 rows sequentially on every single click!

### The Solution: A Composite Index
We added a two-column **Composite Index**:
\`\`\`sql
CREATE INDEX idx_surveillance_country_year 
ON surveillance_records(country_code, report_year);
\`\`\`

### The Result
The next time we ran \`EXPLAIN ANALYZE\`:
\`Index Scan using idx_surveillance_country_year (cost=0.42..8.45 rows=1250 width=480)\`
- Query execution time dropped from **9,200ms down to 24ms**.
- That is a **383x speed improvement**, accomplished with a single line of SQL!

---

## The Golden Rules of Database Indexing

1. **Index Columns Used in \`WHERE\` Clauses**: If you frequently query \`WHERE email = ?\` or \`WHERE status = 'active'\`, that column needs an index.
2. **Index Columns Used in \`JOIN\` Conditions**: Foreign keys (like \`user_id\` inside an \`orders\` table) should almost always be indexed.
3. **Be Selective with Write-Heavy Tables**: Do not add unnecessary indexes to high-speed logging tables where you insert 10,000 events per second.
4. **Inspect with \`EXPLAIN ANALYZE\`**: Never guess whether your query is fast; ask your database engine to show you the execution plan.`
  },
  {
    id: '3',
    slug: 'websockets-walkie-talkie-vs-letters',
    title: 'WebSockets vs HTTP: Walkie-Talkies vs Mailing Letters (Real-Time Architecture)',
    summary: 'Discover why live chat, collaborative tools, and financial tickers rely on WebSockets instead of standard HTTP. Learn the difference between request-response polling and full-duplex socket communication.',
    category: 'Real-Time Systems',
    read_time: '6 min read',
    published_at: '2026-10-12',
    cover_image: '/images/blog/websockets-walkie-talkie.png',
    simple_analogy: 'Standard HTTP is like mailing paper envelopes back and forth through the post office. WebSockets keep a live walkie-talkie channel open between you and the server.',
    content: `# WebSockets vs HTTP: Walkie-Talkies vs Mailing Letters

Have you ever used WhatsApp, Slack, or Discord and wondered:
> *"How does my friend's message appear on my screen the exact millisecond they hit send, without me ever pressing refresh?"*

To understand why this is a revolutionary feat of engineering, you have to understand how the traditional web was built.

For decades, the entire internet was powered by a protocol called **HTTP** (**HyperText Transfer Protocol**). While HTTP is fantastic for reading news articles and buying shoes online, trying to build a modern real-time application with HTTP alone is like trying to have a phone conversation by sending handwritten letters in the mail!

Let's explore the difference between **HTTP** and **WebSockets** using a classic everyday analogy.

---

## 1. The Analogy: Mailing Paper Letters vs. A Live Walkie-Talkie

### The Traditional Web: HTTP (The Postal Service)
When you browse normal websites, your computer acts like someone writing and mailing a paper letter:

1. **You write a letter**: *"Dear Server, please mail me the latest front page news."*
2. **You put it in the mailbox**: The request travels over the internet.
3. **The server receives the letter**: It reads your request, writes a response, packs the HTML and images into an envelope, and mails it back to your house.
4. **The mailbox slams shut**: **The connection is terminated.** The server immediately forgets who you are.

If you want to know if there is breaking news 5 seconds later, the server cannot reach out and tap you on the shoulder. You must write a brand new letter, put a new stamp on it, and mail it all over again.

### The Real-Time Web: WebSockets (The Live Walkie-Talkie)
Now imagine you and your friend both hold high-powered **Walkie-Talkies**:

1. **You establish a link**: You click the power switch and tune to Channel 7.
2. **The connection stays open**: The radio waves remain active between both devices.
3. **Instant Two-Way Talk (Full-Duplex)**:
   - You can speak whenever you want: *"Incoming weather update!"*
   - Your friend hears your voice in real time with zero delay.
   - Your friend can talk back instantly without dialing a phone number or mailing an envelope.

That live, persistent, two-way communication channel is a **WebSocket**.

---

## 2. The Flaw of HTTP Polling: The "Are We There Yet?" Kid

Before WebSockets were standardized in 2011, developers who wanted to build live chat rooms were forced to use a hack called **Short Polling**.

Imagine taking a road trip with a 6-year-old child in the backseat who asks:
- *"Are we there yet?"* -> *"No."*
- *"Are we there yet?"* -> *"No."*
- *"Are we there yet?"* -> *"No."*
- *"Are we there yet?"* -> *"Yes!"*

In code, the browser was sending an HTTP request every 1,000 milliseconds:
- Browser: *"Any new messages?"* -> Server: *"No."* (Empty response)
- Browser: *"Any new messages?"* -> Server: *"No."* (Empty response)
- Browser: *"Any new messages?"* -> Server: *"No."* (Empty response)
- Browser: *"Any new messages?"* -> Server: *"Yes! Here is one message."*

### Why Polling Destroys Servers:
Every single HTTP request includes headers containing cookies, user-agent tokens, and security metadata (often 1 to 2 Kilobytes of data per ping). 

If **50,000 users** have your website open in browser tabs:
- That is **50,000 HTTP requests every single second**!
- Gigabytes of bandwidth wasted on empty *"No"* answers.
- Mobile phone batteries drain rapidly, and servers require costly cloud scaling.

---

## 3. The WebSocket Handshake: Upgrading the Connection

WebSockets solve this elegantly through a process called the **HTTP Upgrade Handshake**:

1. The client sends an initial HTTP request with a special header:
   \`\`\`http
   GET /chat HTTP/1.1
   Host: server.example.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   \`\`\`
2. The server responds with:
   \`\`\`http
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   \`\`\`
3. From that exact millisecond onward, the HTTP protocol is put aside. The underlying TCP socket stays open indefinitely.
4. Messages now travel back and forth as lightweight binary or text frames with only **2 to 10 bytes of overhead** instead of thousands of bytes!

---

## 4. HTTP vs. WebSockets: Quick Comparison

| Feature | Traditional HTTP | Modern WebSockets |
| :--- | :--- | :--- |
| **Connection Model** | Request / Response (Half-Duplex) | Persistent Bidirectional (Full-Duplex) |
| **Initiator** | Client must always initiate | Either Client or Server can push data |
| **Connection Lifespan** | Opens, transfers data, closes immediately | Stays open continuously until closed |
| **Protocol Overhead** | Heavy (~1KB to 2KB headers per request) | Ultra-light (2 to 10 bytes per frame) |
| **Best Used For** | Blogs, Search engines, E-commerce checkouts | Live chat, Multiplayer games, Stock trading, GPS tracking |

---

## 5. How to Connect to a WebSocket in 5 Lines of JavaScript

Modern web browsers support WebSockets natively without needing external libraries:

\`\`\`javascript
// 1. Establish the persistent walkie-talkie link
const socket = new WebSocket('wss://api.example.com/live-feed');

// 2. Listen for the channel opening
socket.onopen = () => {
  console.log('Walkie-talkie connected to server!');
  // Send an instant message
  socket.send(JSON.stringify({ type: 'subscribe', channel: 'finance' }));
};

// 3. Listen for incoming messages pushed from the server
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Live update received from server:', data);
};

// 4. Handle unexpected disconnections
socket.onclose = () => {
  console.log('Walkie-talkie channel closed.');
};
\`\`\`

---

## 6. Real-World Engineering: The WOAH 180-Country Delegate Platform

When I engineered the international collaboration platform for the **World Organisation for Animal Health (WOAH PVSIS)**, country delegates across Europe, Asia, Africa, and the Americas needed to negotiate multi-million-dollar veterinary budgets live.

If two delegates edited the same budget line at the same time using normal HTTP forms, they would overwrite each other’s calculations without warning.

### The Real-Time Architecture We Built:
1. We engineered a **WebSocket server cluster** backed by a **Redis Pub/Sub backplane**.
2. Whenever a delegate in Paris adjusted a funding slider, their browser pushed a 40-byte WebSocket packet to the server.
3. Redis broadcasted the event to every other connected delegate across 180+ countries.
4. All delegates saw the totals re-calculate across their screens in **under 65 milliseconds**.
5. Result: Zero data conflicts, zero manual page reloads, and seamless international consensus.

---

## Key Takeaways

1. **HTTP is for Transactions**: Use HTTP when you need a single answer to a specific question (loading a page, submitting a contact form, authenticating a password).
2. **WebSockets are for Conversations**: Use WebSockets when data changes unpredictably and both sides need to share information in real time with minimum latency.
3. **Efficiency at Scale**: By eliminating repetitive request headers, WebSockets save massive amounts of cloud server costs and preserve user device battery life.`
  }
];

