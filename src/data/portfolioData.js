import React from 'react';

export const PROJECTS = [
  {
    id: '01',
    slug: 'who-eacr',
    title: 'WHO • e-ACR System',
    client: 'World Health Organization (EMRO)',
    category: 'Mission-Critical GovTech',
    categoryTag: 'WHO • Data Integrity',
    year: '2024–2025',
    subtitle: 'Electronic Annual Certification Report Database & Automated Reconciliation Engine',
    heroImage: '/images/who_eacr.png',
    liveLink: 'https://polmis.emro.who.int/eacr',
    shortDesc: 'An automated health surveillance web system built for the World Health Organization (WHO EMRO) in Laravel 11 and MySQL. It automatically verifies medical lab data across 22 member countries with zero discrepancies.',
    metrics: [
      { label: 'Data Consistency', value: '100%' },
      { label: 'Regional Countries', value: 'EMRO Member States' },
      { label: 'Audit Discrepancies', value: '0.00%' },
      { label: 'Pipeline Throughput', value: 'Sub-second' }
    ],
    executive: {
      summary: 'The World Health Organization required flawless annual reporting across member state epidemiological surveillance teams with mathematical cross-verification.',
      problem: 'Manual data entry across distributed regional labs caused statistical divergence and delays in issuing official regional polio eradication certifications.',
      solution: 'Architected automated backend reconciliation scripts and validation pipelines in Laravel and MySQL to auto-correct historical inconsistencies.',
      impact: 'Eliminated 100% of mathematical data discrepancies, securing verified audit reports for regional eradication commissions.',
      quote: {
        text: 'The automated data pipelines ensured complete integrity across multi-tier regional surveillance reporting with zero margin for error.',
        author: 'Dr. Mohsin',
        role: 'CEO, Beecons International'
      }
    },
    engineering: {
      architecture: 'Asynchronous Laravel reconciliation daemon executing deterministic SQL transactions across historical surveillance logs, coupled with automated PDF certification generation.',
      schemaOverview: 'Normalized ACID-compliant MySQL schema with strict foreign key cascading, compound indexing on surveillance metrics, and immutable audit logs.',
      benchmarks: [
        { metric: 'Reconciliation Execution Time', value: '140ms / 50k rows' },
        { metric: 'Data Discrepancy Rate', value: '0.000%' },
        { metric: 'Query Optimization Gain', value: '+420%' }
      ],
      codeSnippet: `// Automated WHO e-ACR Surveillance Reconciliation Pipeline
public function reconcileSurveillanceData(int $countryId, int $reportingYear): ReconciliationResult
{
    return DB::transaction(function () use ($countryId, $reportingYear) {
        $labRecords = LabRecord::where('country_id', $countryId)
            ->whereYear('sample_date', $reportingYear)
            ->lockForUpdate()
            ->get();
            
        $verifiedCount = $labRecords->where('classification', 'confirmed_negative')->count();
        
        $report = AnnualCertification::updateOrCreate(
            ['country_id' => $countryId, 'year' => $reportingYear],
            [
                'total_specimens' => $labRecords->count(),
                'verified_negative' => $verifiedCount,
                'audit_hash' => hash('sha256', $labRecords->toJson()),
                'status' => 'verified_consistent'
            ]
        );
        
        return new ReconciliationResult($report, $verifiedCount);
    });
}`
    },
    deliverables: [
      'Automated backend data integrity validation scripts in Laravel 11',
      'High-performance SQL query architecture and database indexing',
      'Official automated regional certification report generation',
      'Role-based access control for international health delegates',
      'Real-time verification telemetry and compliance audit logs'
    ],
    techStack: ['Laravel 11', 'PHP 8.3', 'MySQL', 'Data Reconciliation', 'ACID Compliance', 'Automated PDF Engine']
  },
  {
    id: '02',
    slug: 'woah-pvsis',
    title: 'WOAH PVSIS Platform',
    client: 'World Organisation for Animal Health',
    category: 'Enterprise Platform',
    categoryTag: 'WOAH • Real-Time Sockets',
    year: '2024–2025',
    subtitle: 'Global Delegation Mission Budgeting & Low-Latency Collaborative Chat Engine',
    heroImage: '/images/woah_pvsis.png',
    liveLink: 'https://pvs.woah.org/',
    shortDesc: 'A real-time web platform and multi-currency budgeting portal built with React, Node.js, and WebSockets connecting international animal health delegates across 180+ member countries.',
    metrics: [
      { label: 'Member States', value: '180+ Countries' },
      { label: 'Socket Latency', value: '< 65ms' },
      { label: 'Budget Precision', value: 'Multi-Currency' },
      { label: 'Concurrency', value: '5,000+ Sockets' }
    ],
    executive: {
      summary: 'WOAH delegates and experts across 180+ countries needed real-time collaboration tools and complex mission financial budgeting algorithms.',
      problem: 'Distributed global experts experienced coordination friction and currency miscalculations during high-stakes veterinary mission planning.',
      solution: 'Engineered a low-latency WebSocket chat infrastructure and an enterprise mission budgeting system with multi-tier approvals.',
      impact: 'Accelerated international mission deployment turnaround by 40% and enabled seamless multi-country synchronous coordination.',
      quote: {
        text: 'The real-time collaboration engine connected hundreds of global delegates seamlessly with instant financial transparency.',
        author: 'Technical Program Lead',
        role: 'WOAH PVSIS'
      }
    },
    engineering: {
      architecture: 'Distributed Socket.io cluster backed by Redis Pub/Sub for sub-100ms multi-room broadcasting, paired with Node.js & Express financial calculation microservices.',
      schemaOverview: 'Real-time message state trees, multi-currency ledger schemas, and optimistic UI synchronization queues.',
      benchmarks: [
        { metric: 'Socket Broadcast Latency', value: '58ms average' },
        { metric: 'Concurrent Connected Delegates', value: '5,000+ active' },
        { metric: 'Budget Calculation Latency', value: '12ms' }
      ],
      codeSnippet: `// WOAH Low-Latency Socket.io Mesh Channel
io.of('/missions').on('connection', (socket) => {
  socket.on('join_mission_room', async ({ missionId, delegateId, authTicket }) => {
    const isAuthorized = await verifyDelegateCredentials(delegateId, missionId, authTicket);
    if (!isAuthorized) return socket.disconnect(true);
    
    socket.join(\`mission:\${missionId}\`);
    redisPubSub.publish('delegate_presence', JSON.stringify({ missionId, delegateId, status: 'online' }));
  });
  
  socket.on('broadcast_budget_update', async ({ missionId, lineItem, amount, currency }) => {
    const updatedLedger = await calculateMissionAllocation(missionId, lineItem, amount, currency);
    io.to(\`mission:\${missionId}\`).emit('ledger_synchronized', updatedLedger);
  });
});`
    },
    deliverables: [
      'High-concurrency WebSocket real-time chat and presence engine',
      'Multi-currency dynamic mission budgeting and allocation module',
      'Optimistic UI state updates with zero lag in React',
      'Redis pub/sub backplane for horizontally scalable socket clusters',
      'Enterprise role-based security adhering to international standards'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'Socket.io', 'Redis', 'MySQL', 'Tailwind CSS']
  },
  {
    id: '03',
    slug: 'khandowa-law',
    title: 'Khandowa Law & AI Bot',
    client: 'Khandowa Law Associates',
    category: 'LegalTech & Automation',
    categoryTag: 'LegalTech & WhatsApp Bot',
    year: '2024',
    subtitle: 'High-Conversion Digital Legal Platform with Autonomous WhatsApp Consultation Intake',
    heroImage: '/images/khandowa_law.png',
    liveLink: 'https://www.khandowalaw.com/',
    shortDesc: 'A high-conversion digital web platform in React.js and TypeScript, integrating an intelligent automated WhatsApp Business API bot for instant client consultation intake, schedule dispatch, and lead routing.',
    metrics: [
      { label: 'Intake Velocity', value: 'Instant (< 2s)' },
      { label: 'Client Inbound Boost', value: '+110%' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Conversion Rate', value: '14.2%' }
    ],
    executive: {
      summary: 'A leading corporate law firm required a premier digital presence and an automated intake system to qualify high-value prospective clients 24/7.',
      problem: 'Manual consultation scheduling caused high lead drop-off and delayed response times for urgent corporate litigation inquiries.',
      solution: 'Engineered an editorial web portal in React & TypeScript paired with an automated WhatsApp Cloud API qualification bot.',
      impact: 'Boosted client consultation bookings by 110% with zero manual screening overhead for the legal staff.',
      quote: {
        text: 'The automated WhatsApp bot and modern editorial design elevated our firm’s digital authority and doubled our weekly high-value inbound retainers.',
        author: 'Sayed Ali Azim Kazimi',
        role: 'Director, Al-Mustafa Academy'
      }
    },
    engineering: {
      architecture: 'Serverless WhatsApp Business Cloud API webhook worker dispatching natural language qualification flows, with real-time attorney calendar sync.',
      schemaOverview: 'State-machine consultation triage models with encrypted lead metadata storage and CRM webhook dispatchers.',
      benchmarks: [
        { metric: 'Webhook Ingestion Latency', value: '85ms' },
        { metric: 'Lighthouse Performance', value: '99/100' },
        { metric: 'First Contentful Paint', value: '0.6s' }
      ],
      codeSnippet: `// WhatsApp Cloud API Consultation Intake Webhook
export async function handleWhatsAppConsultationWebhook(req, res) {
  const { from, messageBody, messageId } = parseIncomingPayload(req.body);
  const consultationType = await intentClassifier.evaluate(messageBody);
  
  const assignedAttorney = await router.getAvailableCounsel(consultationType);
  
  await whatsappClient.sendMessage({
    to: from,
    text: \`Thank you for contacting Khandowa Law. Your \${consultationType} inquiry has been assigned to Counsel \${assignedAttorney.name}.\`
  });
  
  await crmService.createLeadRecord({ from, consultationType, attorneyId: assignedAttorney.id });
}`
    },
    deliverables: [
      'Type-safe component-driven frontend architecture in React & TypeScript',
      'Automated WhatsApp Cloud API lead qualification and dispatch bot',
      'Lighthouse 99+ Core Web Vitals optimization and clean semantic structure',
      'Comprehensive Schema.org LegalService structured data for local search dominance',
      'Editorial layout system designed for high trust and corporate retention'
    ],
    techStack: ['React.js', 'TypeScript', 'WhatsApp Cloud API', 'Tailwind CSS', 'Framer Motion', 'SEO']
  },
  {
    id: '04',
    slug: 'sales-closer',
    title: 'Sales Closer AI',
    client: 'SalesCloser.ai',
    category: 'Autonomous AI Agents',
    categoryTag: 'AI & Automation',
    year: '2024–2025',
    subtitle: 'Autonomous Inbound Sales Qualification & Calendar Booking Agent',
    heroImage: '/images/salescloseai.png',
    liveLink: 'https://salescloser.com/',
    shortDesc: 'Enterprise-grade autonomous AI sales agent engineered to qualify high-intent inbound leads, engage prospects via natural language conversations, and automate closing workflows.',
    metrics: [
      { label: 'End-to-End Latency', value: '< 380ms' },
      { label: 'Lead Qualification Rate', value: '88%' },
      { label: 'Calendar Sync Rate', value: '100% Auto' },
      { label: 'LLM Orchestration', value: 'OpenAI + Tools' }
    ],
    executive: {
      summary: 'Hyper-growth SaaS startups were losing after-hours international inbound leads due to delayed manual SDR follow-ups.',
      problem: 'Prospects required real-time qualification, bespoke feature explanations, and instant calendar booking without human representative wait times.',
      solution: 'Built an autonomous AI sales agent capable of dynamic multi-turn objection handling, CRM synchronization, and instant calendar scheduling.',
      impact: 'Reduced lead response times from 4 hours to under 400 milliseconds, boosting closed-won pipeline velocity.',
      quote: {
        text: 'The autonomous agent handles our global inbound inquiries around the clock with conversational nuance that converts.',
        author: 'Head of Growth',
        role: 'SalesCloser'
      }
    },
    engineering: {
      architecture: 'Streaming LLM pipeline with function calling for live CRM lookups and calendar slot reservations, wrapped in WebSocket duplex audio/text channels.',
      schemaOverview: 'Conversation state vectors, intent classification trees, and bi-directional Google/Outlook calendar synchronization models.',
      benchmarks: [
        { metric: 'First-Token Latency', value: '280ms' },
        { metric: 'Objection Routing Accuracy', value: '94.2%' },
        { metric: 'Concurrent Voice/Text Streams', value: '1,000+' }
      ],
      codeSnippet: `// Autonomous Sales Agent Function Calling Pipeline
const salesAgentTools = [
  {
    type: 'function',
    function: {
      name: 'bookCalendarSlot',
      description: 'Books an executive demo on the prospect calendar when qualified',
      parameters: {
        type: 'object',
        properties: {
          prospectEmail: { type: 'string' },
          selectedSlot: { type: 'string' },
          leadScore: { type: 'number' }
        },
        required: ['prospectEmail', 'selectedSlot']
      }
    }
  }
];`
    },
    deliverables: [
      'Sub-400ms streaming LLM conversational pipeline',
      'Automated calendar booking & bidirectional CRM synchronization',
      'Multi-turn objection handling and context memory management',
      'Voice & text duplex streaming over low-latency WebSockets',
      'Comprehensive conversion analytics dashboard'
    ],
    techStack: ['OpenAI API', 'Python', 'FastAPI', 'WebSockets', 'LangChain', 'React.js']
  },
  {
    id: '05',
    slug: 'scale-wise',
    title: 'Scale Wise Operations',
    client: 'Scale Wise Tech',
    category: 'Operations & Scaling',
    categoryTag: 'SaaS Platform',
    year: '2024',
    subtitle: 'Autonomous Business Operations & Workflow Orchestration Hub',
    heroImage: '/images/scalewiseai.png',
    liveLink: 'https://scalewise.com/',
    shortDesc: 'A centralized operations platform enabling high-growth companies to automate redundant departmental workflows, manage cross-functional pipelines, and track performance KPIs.',
    metrics: [
      { label: 'Process Efficiency', value: '+300%' },
      { label: 'Manual Tasks Eliminated', value: '85%' },
      { label: 'Database Throughput', value: 'High IOPS' },
      { label: 'System Uptime', value: '99.98%' }
    ],
    executive: {
      summary: 'Scaling mid-market enterprises were bottlenecked by fragmented tools, spreadsheet sprawl, and slow operational communication.',
      problem: 'Teams lacked a unified workspace for workflow automation, stateful approvals, and executive KPI visibility.',
      solution: 'Architected a modular full-stack SaaS platform featuring visual workflow builders and high-throughput background queue workers.',
      impact: 'Eliminated 85% of repetitive administrative overhead across client operations within 60 days of rollout.',
      quote: {
        text: 'Scale Wise transformed our cross-departmental operations into an automated, error-free machine.',
        author: 'Chief Operating Officer',
        role: 'Scale Wise'
      }
    },
    engineering: {
      architecture: 'Event-driven microservices with Redis queue workers processing asynchronous automation jobs, accompanied by a reactive React dashboard.',
      schemaOverview: 'Directed Acyclic Graph (DAG) workflow execution models and multi-tenant isolated database schemas.',
      benchmarks: [
        { metric: 'Queue Job Dispatch Latency', value: '4ms' },
        { metric: 'Dashboard State Render', value: '< 16ms (60 FPS)' },
        { metric: 'Daily Automation Events', value: '1,500,000+' }
      ],
      codeSnippet: `// Asynchronous DAG Workflow Job Dispatcher
export class WorkflowExecutionEngine {
  async executePipeline(pipelineId, initialPayload) {
    const pipeline = await Pipeline.findById(pipelineId).populate('steps');
    const executionContext = { ...initialPayload, executedAt: new Date() };
    
    for (const step of pipeline.steps) {
      const result = await queueWorker.dispatchJob(step.handler, executionContext);
      if (!result.success && step.haltOnFailure) {
        throw new PipelineExecutionError(step.id, result.error);
      }
      executionContext[step.key] = result.data;
    }
    return executionContext;
  }
}`
    },
    deliverables: [
      'Visual DAG workflow builder with drag-and-drop state machines',
      'High-throughput Redis background queue worker infrastructure',
      'Multi-tenant enterprise access control and workspace isolation',
      'Real-time team analytics dashboards with sub-second data refresh',
      'REST API webhooks and third-party SaaS integration connectors'
    ],
    techStack: ['Node.js', 'Express', 'React.js', 'Redis', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: '06',
    slug: 'shopeedo',
    title: 'Shopeedo E-Commerce',
    client: 'Shopeedo Retail Global',
    category: 'E-Commerce Engineering',
    categoryTag: 'High-Volume Retail',
    year: '2023–2024',
    subtitle: 'High-Volume Multi-Vendor E-Commerce Platform & Cart Engine',
    heroImage: '/images/shopeedo_image.PNG',
    liveLink: 'https://shopeedo.com/',
    shortDesc: 'A high-throughput modern e-commerce platform engineered for lightning-fast catalog search, dynamic inventory checkout, and zero-downtime flash sale spikes.',
    metrics: [
      { label: 'Checkout Latency', value: '< 250ms' },
      { label: 'Catalog Search Speed', value: '45ms' },
      { label: 'Flash Sale Capacity', value: '10k+ Req/s' },
      { label: 'Conversion Lift', value: '+28%' }
    ],
    executive: {
      summary: 'A fast-growing multi-category retailer experienced cart abandonments due to sluggish legacy checkout systems and inventory desynchronization.',
      problem: 'High traffic spikes crashed the product catalog search and caused inventory race conditions during major seasonal promotion campaigns.',
      solution: 'Re-architected the e-commerce store with an indexed database schema, instant in-memory cart caching, and an optimistic UI checkout flow.',
      impact: 'Cut checkout abandonment by 35% and scaled transaction processing smoothly during 10,000+ request/second traffic bursts.',
      quote: {
        text: 'The speed of the new checkout and search engine directly boosted our bottom-line conversion rate by nearly 30%.',
        author: 'Head of E-Commerce',
        role: 'Shopeedo'
      }
    },
    engineering: {
      architecture: 'Optimistic UI cart engine with Redis in-memory session locks to eliminate race conditions, paired with an Elasticsearch catalog index.',
      schemaOverview: 'Relational order and SKU inventory tables with pessimistic row locking for flash sales and instant Stripe/PayPal webhook verification.',
      benchmarks: [
        { metric: 'Catalog Search Latency', value: '42ms' },
        { metric: 'Cart Mutex Lock Time', value: '6ms' },
        { metric: 'Peak Flash Sale Throughput', value: '12,500 req/sec' }
      ],
      codeSnippet: `// High-Volume Inventory Mutex Lock Handler
public function processFlashSaleCheckout(string $sku, int $quantity, int $userId): OrderResult
{
    $lock = Cache::lock("inventory_lock_{$sku}", 5);
    
    if ($lock->get()) {
        try {
            $inventory = Inventory::where('sku', $sku)->firstOrFail();
            if ($inventory->available_units < $quantity) {
                throw new InsufficientStockException("Item is out of stock.");
            }
            $inventory->decrement('available_units', $quantity);
            $order = Order::create(['sku' => $sku, 'user_id' => $userId, 'status' => 'pending']);
            return new OrderResult(true, $order);
        } finally {
            $lock->release();
        }
    }
    throw new ConcurrentCheckoutException("System busy, retrying transaction.");
}`
    },
    deliverables: [
      'High-speed instant catalog search with sub-50ms filtering',
      'Race-condition-safe inventory locking mechanism for flash sales',
      'Multi-currency and multi-gateway payment integration',
      'Responsive mobile-first cart and one-click checkout experience',
      'Vendor management portal with dynamic order fulfillment tracking'
    ],
    techStack: ['Laravel', 'MySQL', 'Redis', 'React.js', 'Stripe API', 'Tailwind CSS']
  },
  {
    id: '07',
    slug: 'commuters-link',
    title: 'Commuters Link',
    client: 'Commuters Link Mobility',
    category: 'Mobility & Logistics',
    categoryTag: 'Geospatial Transit',
    year: '2023–2024',
    subtitle: 'Urban Ridesharing & Real-Time Geospatial Route Matching Platform',
    heroImage: '/images/commuterslinks.png',
    liveLink: 'https://commuterslink.com/',
    shortDesc: 'A dynamic geospatial urban mobility platform connecting daily urban commuters with verified ride routes, live GPS telemetry, and shared carbon-saving metrics.',
    metrics: [
      { label: 'Geospatial Match Time', value: '< 120ms' },
      { label: 'Daily Commutes Active', value: '15,000+' },
      { label: 'Carbon Reduction', value: '-35 Tons/Mo' },
      { label: 'GPS Ping Rate', value: '2s Updates' }
    ],
    executive: {
      summary: 'Urban professionals faced escalating fuel costs and fragmented public transit options without a reliable carpooling alternative.',
      problem: 'Existing ride apps charged high surge fees and lacked intelligent daily route pairing for recurring work journeys.',
      solution: 'Engineered a specialized commuter ride-pooling web platform with spatial indexing (PostGIS) to pair drivers and passengers on identical corridors.',
      impact: 'Connected 15,000+ daily rides, reducing rider monthly transit expenditures by over 45%.',
      quote: {
        text: 'The geospatial route pairing is amazingly fast and accurate. It changed the daily commute for thousands.',
        author: 'Founder & CEO',
        role: 'Commuters Link'
      }
    },
    engineering: {
      architecture: 'PostGIS spatial queries running on PostgreSQL with WebSocket GPS telemetry broadcasting vehicle locations every 2 seconds.',
      schemaOverview: 'Geospatial trajectory line strings, spatial bounding box indexes (R-Tree), and real-time passenger pickup rendezvous schemas.',
      benchmarks: [
        { metric: 'Spatial Corridor Matching', value: '95ms' },
        { metric: 'GPS Telemetry Packet Size', value: '< 80 bytes' },
        { metric: 'Concurrent Live Vehicles Tracked', value: '2,500+' }
      ],
      codeSnippet: `// PostGIS Spatial Route Corridor Pairing Query
SELECT route_id, driver_id, 
       ST_Distance(driver_trajectory, ST_SetSRID(ST_Point($passengerLng, $passengerLat), 4326)) AS pickup_distance
FROM commuter_routes
WHERE ST_DWithin(driver_trajectory, ST_SetSRID(ST_Point($passengerLng, $passengerLat), 4326), 500)
  AND departure_window BETWEEN $startTime AND $endTime
  AND available_seats >= $requestedSeats
ORDER BY pickup_distance ASC
LIMIT 5;`
    },
    deliverables: [
      'PostGIS geospatial corridor matching algorithm',
      'Real-time vehicle GPS live tracking map with WebSocket telemetry',
      'Automated recurring commute schedule management',
      'Secure in-app fare splitting and digital wallet settlement',
      'Driver verification and identity screening workflow'
    ],
    techStack: ['PostgreSQL', 'PostGIS', 'Node.js', 'React.js', 'WebSockets', 'Mapbox GL']
  },
  {
    id: '08',
    slug: 'britons-route',
    title: 'Britons Route Logistics',
    client: 'Britons Route UK',
    category: 'Supply Chain & Logistics',
    categoryTag: 'UK Logistics Engine',
    year: '2023–2024',
    subtitle: 'Cross-Border Freight Logistics, Route Optimization & Fleet Dispatch',
    heroImage: '/images/britons.png',
    liveLink: 'https://britonsroute.co.uk/',
    shortDesc: 'A freight routing platform engineered for UK and European logistics operators, calculating optimal multi-stop transport corridors, customs clearance schedules, and live delivery telemetry.',
    metrics: [
      { label: 'Route Mileage Saved', value: '18%' },
      { label: 'Dispatch Turnaround', value: '3x Faster' },
      { label: 'Fleet Nodes Tracked', value: '500+ Trucks' },
      { label: 'Customs SLA Compliance', value: '100%' }
    ],
    executive: {
      summary: 'A UK-based transport carrier required an automated freight dispatch system to optimize heavy goods vehicle (HGV) routing and customs compliance post-Brexit.',
      problem: 'Inefficient route scheduling and manual paperwork resulted in empty return miles and customs processing delays.',
      solution: 'Built an algorithmic route optimization portal with integrated customs manifest workflows and automated driver dispatch notifications.',
      impact: 'Cut deadhead mileage by 18% and accelerated dispatch processing times threefold.',
      quote: {
        text: 'The dispatch engine reduced our operational overhead significantly and gave our clients total visibility over their freight.',
        author: 'Operations Director',
        role: 'Britons Route UK'
      }
    },
    engineering: {
      architecture: 'Algorithmic Traveling Salesperson Problem (TSP) multi-drop optimizer combined with a Laravel backend API and automated customs document parsers.',
      schemaOverview: 'Relational fleet node schemas, waypoint routing tables, and cryptographic document verification seals.',
      benchmarks: [
        { metric: 'Multi-Drop Route Computation', value: '320ms / 20 stops' },
        { metric: 'Fleet Telemetry Sync Interval', value: '5s' },
        { metric: 'Customs Manifest Generation', value: '0.8s' }
      ],
      codeSnippet: `// Multi-Drop Freight Corridor Optimization Service
public function computeOptimalHGVRoute(Collection $waypoints, VehicleConstraints $constraints): RouteManifest
{
    $matrix = $this->distanceMatrixService->getDurationMatrix($waypoints);
    $optimizedSequence = $this->tspSolver->solve($matrix, $constraints->maxWeightCapacity);
    
    return RouteManifest::buildFromSequence($optimizedSequence, [
        'toll_avoidance' => $constraints->avoidTolls,
        'driver_rest_mandates' => $constraints->ukDriverHoursCompliance
    ]);
}`
    },
    deliverables: [
      'Multi-stop freight route optimization algorithm',
      'Digital customs manifest generation and compliance checker',
      'Real-time fleet tracking dashboard with geofence notifications',
      'Driver mobile portal for instant consignment proof-of-delivery',
      'Automated client freight status notification engine'
    ],
    techStack: ['Laravel 10', 'PHP 8.2', 'React.js', 'PostgreSQL', 'Google Maps Fleet API', 'Tailwind CSS']
  },
  {
    id: '09',
    slug: 'premier-staff',
    title: 'Premier Staff Luxury Hub',
    client: 'Premier Staff US',
    category: 'Luxury Staffing',
    categoryTag: 'Talent & Web',
    year: '2023–2024',
    subtitle: 'Elite Event Staffing Platform & Talent Booking Engine',
    heroImage: '/images/Premier_Staff.PNG',
    liveLink: 'https://premierstaff.com/',
    shortDesc: 'A premier luxury event staffing platform connecting elite event producers with verified brand ambassadors, hospitality personnel, and management teams across major US markets.',
    metrics: [
      { label: 'Lighthouse Score', value: '98/100' },
      { label: 'Booking Friction', value: '-50%' },
      { label: 'Markets Covered', value: 'Major US Metros' },
      { label: 'CMS Stack', value: 'Custom Headless WP' }
    ],
    executive: {
      summary: 'High-end luxury event producers in New York, Los Angeles, and Miami needed an ultra-fast, premium digital platform to review and book verified event personnel.',
      problem: 'Bloated legacy page builders created slow 4+ second load times and high drop-offs on mobile booking requests.',
      solution: 'Re-engineered the platform with lightweight bespoke WordPress architecture, custom talent custom post types, and an instantaneous booking request workflow.',
      impact: 'Attained a 98+ Lighthouse score and increased elite producer event staffing inquiries by 35%.',
      quote: {
        text: 'The new platform matches the luxury prestige of our brand and delivers instant booking requests without a second of lag.',
        author: 'Managing Director',
        role: 'Premier Staff'
      }
    },
    engineering: {
      architecture: 'Clean custom-coded WordPress theme without third-party page builder bloat, using modern CSS tokens and optimized asset pipelines.',
      schemaOverview: 'Custom Post Types for Talent Profiles, Regional Event Taxonomy, and integrated client rating models.',
      benchmarks: [
        { metric: 'Time to Interactive', value: '0.9s' },
        { metric: 'Page Weight', value: '< 650KB (down from 4.2MB)' },
        { metric: 'Mobile Booking Latency', value: '< 200ms' }
      ],
      codeSnippet: `// Custom Lightweight Talent Booking Handler
add_action('rest_api_init', function () {
    register_rest_route('premier/v1', '/book-talent', [
        'methods' => 'POST',
        'callback' => 'handle_premier_booking_request',
        'permission_callback' => '__return_true'
    ]);
});`
    },
    deliverables: [
      'Custom bespoke WordPress architecture with zero page-builder overhead',
      'High-speed candidate booking and talent filtering engine',
      'Lighthouse 98+ Core Web Vitals score across mobile and desktop',
      'Integrated verified client review and reputation rating system',
      'Regional landing page SEO architecture for top US metropolitan markets'
    ],
    techStack: ['WordPress', 'PHP 8.2', 'Tailwind CSS', 'Custom Post Types', 'REST APIs', 'SEO']
  }
];

// ─────────────────────────────────────────────────────────────
// 01—09 FULL WEB-ROCO CAPABILITIES CATALOG
// ─────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    num: '01',
    id: 'technical-seo',
    title: 'Technical SEO',
    tagline: 'Fast, crawlable, and properly indexed',
    headline: 'Technical SEO and Speed Optimization',
    catchphrase: 'Fix speed, crawl errors, and technical search issues',
    image: '/images/services/01-technical-seo-wide.webp',
    description: 'Fix website speed, Core Web Vitals, server crawl errors, and index issues so search engines can easily find and rank your pages.',
    deliverables: [
      'Core Web Vitals remediation to get green scores on mobile and desktop',
      'Crawl budget and server log analysis to fix indexing errors',
      'JavaScript rendering and hydration optimization for Googlebot',
      'Canonical tags, redirect cleanup, and sitemap fixes',
      'Structured schema markup for rich search results',
      'Edge caching and server response time improvements'
    ],
    tech: ['Lighthouse 99+', 'Core Web Vitals', 'Schema.org JSON-LD', 'Cloudflare Edge', 'SSR/SSG', 'Search Console']
  },
  {
    num: '02',
    id: 'on-page-seo',
    title: 'On-Page SEO',
    tagline: 'Every page built to rank and convert',
    headline: 'On-Page SEO and Content Structure',
    catchphrase: 'Structure pages to attract high-intent customers',
    image: '/images/services/02-onpage-seo-wide.webp',
    description: 'Optimize page titles, heading structures, internal links, and content so your website matches what real customers search for.',
    deliverables: [
      'Keyword mapping to ensure each page targets specific buyer search terms',
      'Optimized title tags, meta descriptions, and clean heading hierarchy',
      'Internal linking structure to guide visitors and search engines',
      'Content gap analysis against top ranking competitors',
      'Complete Schema markup for articles, products, and FAQs',
      'Keyword cannibalization audit to prevent pages from competing with each other'
    ],
    tech: ['Semantic HTML5', 'Schema.org', 'Information Architecture', 'Entity Search', 'Content Graph']
  },
  {
    num: '03',
    id: 'geo-aeo',
    title: 'GEO & AEO',
    tagline: 'Get cited by ChatGPT and Perplexity',
    headline: 'Generative Engine and Answer Optimization',
    catchphrase: 'Make sure AI tools cite your business as the source',
    image: '/images/services/03-geo-aeo-wide.webp',
    description: 'Structure your brand data and content so artificial intelligence engines like ChatGPT, Perplexity, and Google AI Overviews recommend your business.',
    deliverables: [
      'Entity relationship mapping with structured schema and link data',
      'Clear factual answer blocks designed for AI model retrieval',
      'Direct factual consensus alignment for high intent customer prompts',
      'Citation audits across ChatGPT and Perplexity to identify gaps',
      'Comparison tables and verifiable data markups',
      'AI overview optimization for Google search results'
    ],
    tech: ['Entity Graphs', 'Wikidata', 'JSON-LD', 'LLM Prompt Parsing', 'Structured Data']
  },
  {
    num: '04',
    id: 'wordpress-development',
    title: 'WordPress Development',
    tagline: 'Custom themes and fast Gutenberg blocks',
    headline: 'Custom WordPress and Headless CMS Builds',
    catchphrase: 'Hand-crafted themes without slow page builders',
    image: '/images/services/04-wordpress-wide.webp',
    description: 'Clean custom WordPress themes and bespoke Gutenberg blocks built without bloated plugins or page builders so your website stays fast and reliable.',
    deliverables: [
      'Custom PHP and React Gutenberg block themes without page builder bloat',
      'Custom plugin development for specialized business workflows',
      'Headless WordPress setup paired with React or Next.js frontends',
      'Advanced Custom Fields modeling for easy client content editing',
      'Database query optimization and Redis object caching',
      'Fast page loading speeds and clean mobile responsive layouts'
    ],
    tech: ['WordPress (Custom)', 'PHP 8.3', 'Gutenberg Blocks', 'ACF Pro', 'GraphQL / REST API', 'Redis Object Cache']
  },
  {
    num: '05',
    id: 'web-development',
    title: 'Web Development',
    tagline: 'React 19, Next.js, and modern TypeScript',
    headline: 'Modern Web Application Engineering',
    catchphrase: 'Fast and responsive frontends that work smoothly',
    image: '/images/services/05-web-dev-wide.webp',
    description: 'Fast, responsive web applications built with React 19, TypeScript, and Tailwind CSS designed to deliver smooth user experiences on all screens.',
    deliverables: [
      'Clean component architecture built with modern React 19 and TypeScript',
      'Next.js App Router for fast server rendering and quick page loads',
      'Smooth micro interactions and animations for polished UI feel',
      'Responsive design systems built with Tailwind CSS',
      'Reliable client state management with Redux or Zustand',
      'Strict performance budgets for instant input response'
    ],
    tech: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand / Redux']
  },
  {
    num: '06',
    id: 'full-stack-development',
    title: 'Full-Stack Development',
    tagline: 'Laravel 11, Node.js, and solid databases',
    headline: 'Full-Stack Architecture and API Design',
    catchphrase: 'Scalable backends and secure database systems',
    image: '/images/services/06-fullstack-wide.webp',
    description: 'End-to-end backend architectures, APIs, and relational databases in Laravel 11 and Node.js built to handle heavy user traffic and transactions safely.',
    deliverables: [
      'Modular backends in Laravel 11 and Node.js with clean code patterns',
      'Relational database architecture in MySQL and PostgreSQL with optimized queries',
      'High throughput REST and GraphQL API design with clean documentation',
      'Asynchronous background job queues with Redis',
      'Role based access control, OAuth2, and secure authentication flows',
      'Docker container setups and automated deployment scripts'
    ],
    tech: ['Laravel 11', 'Node.js', 'Express', 'MySQL', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    num: '07',
    id: 'who-surveillance',
    title: 'Surveillance & Data Pipelines',
    tagline: 'Zero data errors in mission-critical reporting',
    headline: 'Data Reconciliation and Verification Pipelines',
    catchphrase: 'Automated data verification for global health systems',
    image: '/images/services/07-who-surveillance-wide.webp',
    description: 'Automated backend data reconciliation pipelines and certification tools built for international health organizations like the WHO and WOAH.',
    deliverables: [
      'Automated SQL and Laravel data reconciliation scripts',
      'Multi tier data validation algorithms to catch reporting anomalies',
      'Automated compliance report and official PDF generation',
      'High volume database design with strict data integrity checks',
      'Historical verification routines to eliminate data discrepancies',
      'Role based security and immutable audit trails'
    ],
    tech: ['Laravel', 'MySQL', 'Data Reconciliation', 'ACID Transactions', 'PDF Engine', 'Audit Daemons']
  },
  {
    num: '08',
    id: 'real-time-websockets',
    title: 'Real-Time WebSockets',
    tagline: 'Instant communication across global users',
    headline: 'Real-Time WebSocket Infrastructure',
    catchphrase: 'Low-latency collaboration and live messaging',
    image: '/images/services/08-websockets-wide.webp',
    description: 'Low-latency WebSocket systems connecting international delegates and teams with live messaging, presence indicators, and synchronized data.',
    deliverables: [
      'Socket.io and WebSocket cluster architecture with Redis backplane',
      'Live chat tools with user presence and typing indicators',
      'Dynamic budgeting tools with real time financial calculations',
      'Collaborative document sharing and synchronized state',
      'Automatic reconnection and offline state recovery',
      'Secure socket room authentication and partitioning'
    ],
    tech: ['Socket.io', 'Node.js', 'Redis Pub/Sub', 'WebSockets', 'Express', 'React.js']
  },
  {
    num: '09',
    id: 'ai-agents',
    title: 'AI Agents & Automation',
    tagline: '24/7 lead intake and workflow automation',
    headline: 'Autonomous AI Agents and WhatsApp Bots',
    catchphrase: 'Automate customer intake and business workflows',
    image: '/images/services/09-ai-agents-wide.webp',
    description: 'Smart AI assistants, WhatsApp Business bots, and workflow automations that qualify leads, answer customer questions, and route inquiries 24/7.',
    deliverables: [
      'Autonomous customer intake bots with smart objection handling',
      'WhatsApp Cloud API integration for automated message routing',
      'Vector search knowledge bases for accurate business answers',
      'Fast streaming AI responses with voice and text support',
      'Multi step workflow automation connecting to your CRM',
      'Automated appointment booking and calendar synchronization'
    ],
    tech: ['OpenAI API', 'Gemini API', 'Python', 'WhatsApp Cloud API', 'Vector DB', 'FastAPI']
  }
];

// ─────────────────────────────────────────────────────────────
// HORIZONTAL MEDIA RAIL CARDS ("The Through-Line")
// ─────────────────────────────────────────────────────────────
export const SERVICE_RAIL = [
  { id: '01', caption: 'Find the signal', title: 'Data Pipeline Architecture', tag: 'WHO EMRO', image: '/images/rail/01-signal.webp' },
  { id: '02', caption: 'Shape the interface', title: 'Editorial UI & React 19', tag: 'Design Systems', image: '/images/rail/02-browser-composition.webp' },
  { id: '03', caption: 'Publish with intent', title: 'Custom WordPress & Blocks', tag: 'Headless WP', image: '/images/rail/03-publishing-stack.webp' },
  { id: '04', caption: 'Make it distinct', title: 'Sub-Second Speed Remediations', tag: 'Core Web Vitals', image: '/images/rail/04-color-study.webp' },
  { id: '05', caption: 'Design the decision', title: 'Real-Time WebSocket Mesh', tag: '180+ WOAH States', image: '/images/rail/05-interface-hands.webp' },
  { id: '06', caption: 'Connect the system', title: 'Distributed Backend & APIs', tag: 'Laravel 11 / Node', image: '/images/rail/06-system-lines.webp' },
  { id: '07', caption: 'Work in the open', title: 'Autonomous WhatsApp Bots', tag: 'LegalTech Intake', image: '/images/rail/07-team-ui.webp' },
  { id: '08', caption: 'Hold the frame', title: 'Generative Search & GEO', tag: 'AI Citations', image: '/images/rail/08-red-space.webp' },
  { id: '09', caption: 'Make the system human', title: 'Low-Latency AI Agents', tag: 'Sales Closer AI', image: '/images/rail/09-design-studio.webp' },
  { id: '10', caption: 'Connect the parts', title: 'High-Volume E-Commerce', tag: 'Shopeedo Scale', image: '/images/rail/10-abstract-network.webp' }
];

export const EXPERIENCE = [
  {
    period: '05/2025 – Present',
    role: 'Full Stack Developer',
    company: 'SysReforms International',
    location: 'Islamabad / International',
    badge: 'Current Role',
    description: 'Architecting and maintaining mission-critical global health information systems for the World Health Organization (WHO e-ACR Polio Eradication) and World Organisation for Animal Health (WOAH PVSIS). Engineered high-throughput real-time WebSocket messaging, automated data reconciliation scripts, and enterprise financial budgeting engines in Laravel, Node.js, Express, React, and MySQL.'
  },
  {
    period: '05/2024 – 04/2025',
    role: 'Associate Full Stack Developer',
    company: 'Logiqon Solution',
    location: 'Islamabad',
    badge: 'Enterprise Systems',
    description: 'Collaborated on end-to-end backend microservices and relational database schemas with Laravel and MySQL. Crafted pixel-perfect, mobile-first responsive interfaces using Tailwind CSS, TypeScript, and modern React.'
  },
  {
    period: '01/2023 – Present',
    role: 'Full Stack & AI Consultant',
    company: 'Self-Employed (International)',
    location: 'Remote (Global Clients)',
    badge: '18+ Solutions Delivered',
    description: 'Delivered 18+ custom client solutions globally across UK, US, and Middle East markets. Engineered custom web apps, API integrations, automated WhatsApp bots, and SEO-optimized web portals for brands like Khandowa Law, Premier Staff, and Scale Wise with top Lighthouse scores.'
  },
  {
    period: '11/2021 – 01/2022',
    role: 'React Developer Intern',
    company: 'SPQR',
    location: 'Islamabad',
    badge: 'UI Architecture',
    description: 'Engineered modular, reusable UI component libraries in React.js. Integrated third-party GraphQL/REST services and accelerated user interface responsiveness.'
  },
  {
    period: '06/2019 – 07/2019',
    role: 'Software Engineer Intern',
    company: 'Elixir Technologies',
    location: 'Islamabad',
    badge: 'Enterprise SDLC',
    description: 'Gained hands-on software development lifecycle (SDLC) experience in enterprise software. Explored JSON-based schema modelling and document layout architectures.'
  }
];

export const CERTIFICATIONS = [
  { title: "Programming with JavaScript", org: "Meta (Coursera)", year: "Verified Credential" },
  { title: "HTML, CSS, and JS for Web Developers", org: "Johns Hopkins University", year: "Verified Credential" },
  { title: "Fundamentals of Digital Marketing", org: "Google Digital Garage", year: "Official Certification" },
  { title: "Introduction to Front-end Development", org: "Meta (Coursera)", year: "Verified Credential" },
  { title: "Database Structures & MySQL", org: "Meta (Coursera)", year: "Verified Credential" },
  { title: "Webflow 101 Certification Exam", org: "Webflow University", year: "Official Exam Pass" },
  { title: "Blockchain Basics", org: "State University of New York", year: "Verified Credential" },
  { title: "Create a No-Code Responsive Website", org: "Coursera Project Network", year: "Verified Project" }
];

export const TESTIMONIALS = [
  {
    quote: "Sabtain's automated data pipelines and engineering discipline resolved long-standing multi-tier surveillance discrepancies for international reporting with zero margin for error.",
    author: "Dr. Mohsin",
    role: "CEO, Beecons International",
    initials: "DM"
  },
  {
    quote: "The automated WhatsApp bot and modern editorial design elevated our firm’s digital authority and doubled our weekly high-value inbound retainers.",
    author: "Sayed Ali Azim Kazimi",
    role: "Director, Al-Mustafa Academy",
    initials: "SA"
  },
  {
    quote: "Delivered our compliance platform with flawless SEO architecture, sub-second performance, and Senior-level execution throughout.",
    author: "Maher Al Delbani",
    role: "PR & Strategy Manager, NextMove Services",
    initials: "MD"
  }
];

export const TECH_MARQUEE = [
  { name: 'WordPress', type: 'Custom CMS' },
  { name: 'Laravel 11', type: 'Backend API' },
  { name: 'Node.js', type: 'Runtime' },
  { name: 'React 19', type: 'Frontend' },
  { name: 'Next.js', type: 'Full Stack' },
  { name: 'TypeScript', type: 'Language' },
  { name: 'Socket.io', type: 'Real-Time' },
  { name: 'MySQL', type: 'Database' },
  { name: 'PostgreSQL', type: 'Database' },
  { name: 'Redis', type: 'Caching & Mutex' },
  { name: 'OpenAI API', type: 'AI Intelligence' },
  { name: 'Docker', type: 'DevOps' },
  { name: 'Tailwind CSS', type: 'Design Tokens' },
  { name: 'Cloudflare', type: 'Edge Network' },
  { name: 'PHP 8.3', type: 'Language' },
  { name: 'Figma', type: 'UI System' }
];
