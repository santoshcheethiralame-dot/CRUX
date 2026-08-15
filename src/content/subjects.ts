// ============================================================================
//  SUBJECT REGISTRY  —  the ONE place to register subjects & their unit titles.
//  Topic bodies, quizzes, flashcards and PYQs are auto-discovered from files
//  (see src/lib/registry.ts). To add a new subject or unit, just add an entry
//  here and drop the matching content files under src/content/<subject>/unitN/.
// ============================================================================

export interface UnitMeta {
  unit: number
  title: string
  subtitle?: string
}

export interface SubjectMeta {
  id: string
  name: string
  code?: string
  color: string // accent used across the UI for this subject
  icon?: string // emoji
  description?: string
  units: UnitMeta[]
}

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'ml',
    name: 'Machine Learning',
    code: 'UE24CS352A',
    color: '#818cf8',
    icon: 'ML',
    description:
      'Modern ML: well-posed learning problems, concept learning, decision trees, KNN, bias–variance and performance metrics.',
    units: [
      {
        unit: 1,
        title: 'Introduction, Performance Metrics, Decision Trees & KNN',
        subtitle:
          'P-T-E & well-posed problems · supervised/unsupervised/RL · generative vs discriminative · concept, hypothesis & version space · Find-S · decision trees & ID3 (entropy, gain) · inductive bias · overfitting & pruning · continuous/missing/costly attributes · bias–variance · logistic regression · eager vs lazy · KNN & weighted KNN · curse of dimensionality · confusion matrix & metrics · ROC/AUC',
      },
      { unit: 2, title: 'ANN, SVM, Boosting', subtitle: 'MP neuron & perceptron · XOR and multilayer networks · sigmoid & loss · forward prop · gradient descent & backpropagation · activations · optimizers (momentum, RMSProp, Adam) · SVM margin, dual & KKT · kernels & soft margin · ensembles, bagging, boosting & random forest' },
      { unit: 3, title: 'Bayesian Learning, HMM', subtitle: 'Bayes theorem · MLE · Bayes optimal · Naïve Bayes · EM & GMM · Hidden Markov Models' },
      { unit: 4, title: 'Unsupervised Learning, Dimensionality Reduction & Intro to Deep Learning', subtitle: 'Clustering · K-means · PCA & SVD · RL · CNNs · Transformers · LLMs' },
    ],
  },
  {
    id: 'se',
    name: 'Software Engineering',
    code: 'UE23CS341A',
    color: '#6fc6f5',
    icon: 'SE',
    description:
      'Engineering software at scale: SDLCs, agile, requirements engineering, architecture & design, testing, SCM and DevOps.',
    units: [
      {
        unit: 1,
        title: 'Introduction to Software Engineering & Requirements Engineering',
        subtitle:
          'what is SE · software crisis · SDLCs (waterfall/V/spiral) · Security DLC · agile & Scrum · XP · requirements (FR/NFR/security) · SRS · RTM · UML use cases · testing & test planning',
      },
      { unit: 2, title: 'Software Project Management, Architecture, Design & Quality', subtitle: 'PM role · estimation · scheduling · risk · architecture views · design patterns · modularity · TDD · technical debt' },
      { unit: 3, title: 'AI, Implementation, SCM & DevOps', subtitle: 'AI for SE · secure/testable coding · code reviews · CI/CD · DevSecOps · testing types · SCM · versioning · defect & release management' },
      { unit: 4, title: 'Quality, System Validation, Security & Ethics', subtitle: 'quality metrics & ISO 9126 · function points · open source & licensing · software patents · system & acceptance testing · penetration testing · fuzzing · security & privacy (LINDDUN) · code coverage · ethics' },
    ],
  },
  {
    id: 'dbms',
    name: 'Database Management Systems',
    code: 'UE24CS351A',
    color: '#34d399',
    icon: 'DB',
    description:
      'Designing and querying databases: the relational model, ER design, relational algebra, SQL, normalization, transactions, and modern NoSQL/graph/vector databases.',
    units: [
      {
        unit: 1,
        title: 'Introduction to Database Management and SQL',
        subtitle:
          'data & DBMS · file-system problems · data abstraction & 3-schema architecture · E-R model · reducing ER to relational · relational algebra · SQL (DDL, constraints, DML)',
      },
      { unit: 2, title: 'Relational Model and Database Design', subtitle: 'the decks call this "Advanced SQL" · SELECT/FROM/DISTINCT · WHERE, ORDER BY & LIKE · set operations · NULL & three-valued logic · aggregates · GROUP BY & HAVING · natural & inner joins · outer & cross joins · nested subqueries · ANY/ALL/SOME · subqueries in FROM · correlated subqueries & EXISTS · relational division · CTEs & recursion · CASE · views · users, roles & privileges · triggers · stored functions & procedures · window functions · full-text search' },
      { unit: 3, title: 'Advanced Design Concepts and Implementation', subtitle: 'query processing & optimization strategies · functional dependencies · inference rules · normal forms based on primary keys (1NF/2NF/3NF) · general definitions of 2NF & 3NF · BCNF · higher normal forms' },
      { unit: 4, title: 'Advanced Databases', subtitle: 'database transactions · concurrency control & locking · NoSQL · key-value (Redis) · graph databases (Neo4j) · vector databases · vector search with relational and NoSQL · web app development with Next.js and SQL' },
    ],
  },
  {
    id: 'iot',
    name: 'Internet of Things',
    code: 'UE23CS342AA3',
    color: '#fb923c',
    icon: 'IoT',
    description:
      'Connecting the physical world: IoT architecture & verticals, sensors & embedded systems, wired/wireless/cellular connectivity, application protocols (MQTT/CoAP), and edge/fog/cloud analytics, security & privacy.',
    units: [
      {
        unit: 1,
        title: 'Introduction to IoT & Architecture',
        subtitle:
          'what is IoT · history · traffic model · connectivity & gateways · digitization · verticals & use cases · challenges · architecture drivers · 3/5-layer · oneM2M · Cisco IoTWF · core functional stack · edge/fog/cloud · value chain & standards',
      },
      {
        unit: 2,
        title: 'IoT Sensors & Embedded Systems',
        subtitle:
          'sensors & metrics · selection · smart sensors · MEMS · sensor fusion · self-calibration · embedded C & MicroPython · STM32 · ESP32 · ARM Cortex-A/M · I²C/SPI/UART & interrupts',
      },
      {
        unit: 3,
        title: 'IoT Protocols & Connectivity',
        subtitle:
          'wired (Ethernet, TSN, PoE, PLC) · wireless (Zigbee, BLE, WiFi, LoRaWAN, Matter/Thread) · cellular (NB-IoT, LTE-M) · CoAP & MQTT · SCADA · lightweight crypto (ASCON) · network obfuscation',
      },
      {
        unit: 4,
        title: 'IoT Analytics, Security & Privacy',
        subtitle:
          'analytics & data pipeline · ML, decision trees & TinyML · InfluxDB/Grafana · predictive maintenance · cloud (AWS/Azure, ThingSpeak/thinger.io) · security: OWASP Top 10, Zero Trust, threat modelling, firmware/Binwalk, X.509/PKI · privacy · blockchain',
      },
    ],
  },
  {
    id: 'arvr',
    name: 'Augmented and Virtual Reality',
    code: 'UE24CS342AA5',
    color: '#f472b6',
    icon: 'AR',
    description:
      'The maths and machinery of mixed reality: geometric objects and transformations, graphics programming and 3D modelling, AR/VR hardware, tracking and sensor fusion, and the AI that drives behaviour in virtual worlds.',
    units: [
      {
        unit: 1,
        title: 'Geometric Objects and Transformations',
        subtitle:
          'AR history & applications · scalars, points, vectors · vector/affine/Euclidean spaces · coordinate systems & frames · change of basis · homogeneous coordinates · coordinate-free geometry · the OpenGL frame pipeline · affine sums · convexity & convex hull · affine and homogeneous transformations · concatenation · rotation about an arbitrary axis · quaternions',
      },
      {
        unit: 2,
        title: 'Graphical System and Programming and 3D Modelling',
        subtitle:
          "Sierpinski gasket · programming 2D applications · API categories · the OpenGL API, primitives & attributes · polygons & the coloured cube · parallel and perspective projection · the programmer's interface · camera, lights & materials · graphics architectures · the pipeline & programmable shaders · Three.js scenes, materials, animation & physics · Blender · Three.js with React and WebXR",
      },
      {
        unit: 3,
        title: 'Augmented and Virtual Reality',
        subtitle:
          'AR definition, scope & milestones · requirements & characteristics of augmentation · VR and the modern VR experience · presence & interactivity · spatial display models (OST/VST/projection) · sensors & computing platforms · the Virtual World Generator · eye movement and its implications for VR · tracking technologies · mobile sensors · virtual-world physics · drift, noise & filtering · sensor fusion',
      },
      {
        unit: 4,
        title: 'IO Modalities, AI and Behaviour in VR',
        subtitle:
          'computer vision for AR · marker tracking · multi-camera infrared tracking · natural feature tracking by detection · incremental tracking · SLAM · visual odometry & PTAM · outdoor tracking · 3D scanning of environments · interaction design · input & output modalities · haptics & multimodal interaction · physics of sound & auditory perception · reactive and deliberative AI · reinforcement and imitation learning',
      },
    ],
  },
  // ── Add the remaining subjects here as their material arrives ──
  // { id: 'xxx', name: '...', code: '...', color: '#...', icon: '...', units: [...] },
]

export const subjectById = (id: string) => SUBJECTS.find((s) => s.id === id)
