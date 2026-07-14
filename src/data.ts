export type CaseStudyBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'figure'; images: { src: string; caption: string }[] };

export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  stack: string[];
  abstract: string;
  figure: 'lattice' | 'candle' | 'graph' | 'stack' | 'wave' | 'grid';
  link?: string;
  thumbnail?: string;
  thumbnailFit?: 'cover' | 'contain';
  caseStudy?: CaseStudyBlock[];
};

export const projects: Project[] = [
  {
    id: 'trading-suite',
    index: '01',
    title: 'Trading Suite',
    subtitle: 'A full-stack stock market analytics and portfolio dashboard',
    year: '2026',
    stack: ['React 19', 'TypeScript', 'Express 5', 'MongoDB', 'Finnhub API', 'Yahoo Finance'],
    abstract:
      'A faster, more intuitive alternative to traditional trading terminals. Users sign in with Google, build a custom dashboard from resizable widgets (charts, quotes, news, sector heatmap, watchlist, portfolio tracker), and track real holdings against live market data. Built on a custom binary-split-tree layout engine (no grid library) with drag-to-resize persistence, AES-256-GCM encrypted per-user API keys, a two-layer rate limiter (per-IP throttling plus atomic per-user daily quotas in MongoDB), and a client-side data layer with request deduplication and TTL caching across two market-data providers.',
    figure: 'candle',
    link: 'https://suitetrading.vercel.app',
    thumbnail: '/new_suitetrading_dashboard_2.png',
  },
  {
    id: 'gru',
    index: '02',
    title: 'Recurrence Quantification Analysis of a GRU Autoencoder\'s Learned Climate Embedding',
    subtitle: 'A GRU autoencoder\'s climate embedding, tested for genuine seasonal dynamics with joint recurrence plots and surrogate significance testing',
    year: '2026',
    stack: ['Pytorch', 'Matplotlib', 'Pandas', 'Kagglehub'],
    abstract:
      "A GRU autoencoder compresses 14-day windows of Delhi daily climate data (temperature, humidity, wind speed, pressure, and a cyclically-encoded date) into a 32-number embedding per day. The question is not whether it reconstructs well, but whether the embedding encodes real structure (the seasonal cycle) rather than arbitrary compression. Recurrence plots, joint recurrence, and Takens' delay-embedding theorem provide the analysis; surrogate testing and Bonferroni correction make the result defensible. Result: joint recurrence between the embedding and the raw inputs is significant for humidity, wind speed, and date, but not for the visually dominant pressure and temperature.",
    figure: 'candle',
    thumbnail: '/embeddings_pca.png',
    thumbnailFit: 'contain',
    caseStudy: [
      { kind: 'heading', text: 'Method' },
      {
        kind: 'p',
        text:
          '**Data and model.** Four climate variables plus a sin/cos encoding of day-of-year (so Dec 31 and Jan 1 sit next to each other) form a 14-day rolling window. A GRU encoder compresses each window to a 32-number hidden state; a GRU decoder has to reconstruct all 14 days from that state alone. Windows are stride-1 and chronological, so the day-by-day embeddings form a trajectory through 32-dimensional space (~1449 points).',
      },
      {
        kind: 'figure',
        images: [
          { src: '/features_over_time.png', caption: 'Raw daily climate series, 2013-2017, train/test split' },
          { src: '/date_encoding_circle.png', caption: 'Cyclical day-of-year encoding, colored by month' },
        ],
      },
      {
        kind: 'p',
        text:
          '**Why recurrence.** Recurrence plots (Eckmann et al., 1987) were used instead of Lyapunov exponents or full attractor reconstruction because they work on short, noisy real-world data without choosing an embedding dimension or delay; they just need pairwise distances.',
      },
      {
        kind: 'list',
        items: [
          '**Recurrence plot**: shows whether a trajectory revisits earlier states in a structured way (real dynamics) or randomly.',
          '**Joint recurrence plot**: checks whether two trajectories, the embedding and a raw variable, revisit similar states at the same time: evidence of a shared driver (the seasonal cycle). The statistic reported is **JRR/chance**, the joint recurrence rate divided by the rate expected under independence.',
          "**Takens' theorem**: motivates one experiment: a delayed view of the observed signals alone can, in principle, reconstruct a hidden driver like \"season.\" So the model was retrained with date removed, to check whether seasonal structure survives.",
        ],
      },
      { kind: 'p', text: '**Statistical controls.**' },
      {
        kind: 'list',
        items: [
          '**Theiler window (14 days)**: windows less than 14 days apart share raw input days and would look recurrent from overlap alone, so such pairs are excluded from every recurrence count.',
          '**Circular time-shift surrogates (n=200)**: each variable is time-shifted 200 ways to build a null distribution, giving a p-value and z-score. Shifts near one year are excluded, since they would reproduce the true seasonal alignment instead of a null case.',
          '**Bonferroni correction**: five variables tested, so α = 0.05/5 = 0.01.',
        ],
      },
      { kind: 'heading', text: 'Results' },
      {
        kind: 'p',
        text:
          '**1. PCA.** The embeddings trace a smooth annual loop in the first two principal components (~58% combined variance), colored cleanly by month, pictured above. Suggestive, not proof.',
      },
      {
        kind: 'p',
        text:
          "**2. Joint recurrence.** JRR/chance: date 7.25×, pressure 2.71×, temperature 2.47×, humidity 1.69×, wind speed 1.38×. Read on its own, this says date dominates the embedding's learned structure.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/cross_recurrence.png', caption: 'Joint recurrence grid for all 5 variables, with surrogate p-values' },
        ],
      },
      {
        kind: 'p',
        text:
          "**3. Date ablation.** Retrained without date as an input, the JRR/chance against true date drops from 7.25× to 4.91× (lower, but still far above chance). Season is recoverable from the climate dynamics alone, as Takens' theorem predicts.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/date_ablation_pca.png', caption: 'PCA, with vs. without date input' },
          { src: '/date_ablation_recurrence.png', caption: 'Joint recurrence vs. true date, with vs. without date input' },
        ],
      },
      {
        kind: 'p',
        text:
          "**4. Surrogate testing.** After Bonferroni correction, only humidity (z=5.88), wind speed (z=5.69), and date (z=2.15) stay significant (p<0.01). Pressure and temperature, despite larger raw ratios, don't survive: their own recurrence structure is patchy and event-clustered, which inflates their null variance. Date's strict periodicity means many shifted copies still partly phase-match, widening its null too.",
      },
      {
        kind: 'p',
        text:
          'Joint recurrence between the embedding and the raw inputs is significant for 3 of 5 variables: humidity, wind speed, date. Ratio size and statistical significance disagree here, and the "date is the standout" reading does not survive correction.',
      },
      { kind: 'heading', text: 'Robustness' },
      {
        kind: 'p',
        text:
          'An audit found the Theiler exclusion was one pixel wide instead of 14 days, inflating early numbers. Before fixing it, the window was swept across five sizes (0, 1, 14, 30, 60 days): rankings and rough magnitudes held at every size, only the exact values moved (date 7.81× → 7.26×). Two more bugs (a leap-year phase error in the date encoding, and an unseeded RNG) were fixed the same way, and every result was regenerated and reproduced bit-for-bit.',
      },
      { kind: 'heading', text: 'Summary' },
      {
        kind: 'p',
        text:
          "Recurrence plots, joint recurrence, and a Takens-motivated ablation show the embedding learned the seasonal cycle. Surrogate testing and Bonferroni correction make that claim defensible, and overturn the naive reading: humidity and wind speed hold up statistically where date and pressure, despite looking stronger, don't.",
      },
    ],
  },
  {
    id: 'rnn',
    index: '03',
    title: 'Sentence Generation with a Word-Level Vanilla RNN',
    subtitle: 'A word-level RNN trained on WikiText-103, extending character-level name prediction',
    year: '2025',
    stack: ['PyTorch', 'Python'],
    abstract:
      'A word-level vanilla RNN for sentence generation, including a custom tokenizer and vocabulary built from scratch over the Salesforce WikiText-103 dataset. A PyTorch dataset pipeline handles sliding windows and batching via a custom collate function, and the training loop covers loss computation, backpropagation, gradient clipping, and perplexity evaluation. Generation supports temperature scaling and top-k sampling, alongside an analysis of the overfitting challenges inherent to vanilla RNNs.',
    figure: 'graph',
    thumbnail: '/vanilla_rnn.jpg',
    thumbnailFit: 'contain',
  },
  {
    id: 'paper-trading',
    index: '04',
    title: 'Full-Stack Paper Trading Website',
    subtitle: 'Real-time intraday data, authentication, and portfolio tracking',
    year: '2024',
    stack: ['React', 'MongoDB', 'Tailwind', 'Mailtrap', 'JWT'],
    abstract:
      'A full-stack paper trading platform with real-time intraday stock data, user authentication (login, register, email verification, and password reset via Mailtrap and JWT), and portfolio tracking. The frontend covers stock search, an informational dashboard, and a portfolio view with a pie-chart breakdown of holdings; the backend exposes REST routes for buying and selling, backed by MongoDB for accounts and positions.',
    figure: 'stack',
  },
  {
    id: 'neural-net',
    index: '05',
    title: 'Simple Neural Network for Classifying Pattern-Based Vectors',
    subtitle: 'A from-scratch neural network exploring pattern recognition and gradient-based learning',
    year: '2024',
    stack: ['PyTorch', 'CUDA', 'Matplotlib', 'Jupyter Notebook'],
    abstract:
      'A neural network implemented from scratch to demonstrate the core ideas of pattern recognition and gradient-based learning. Experiments varied batching, optimizer and loss function choice, epoch count, and hidden layer depth, with training loss plotted to visualize convergence. The results pointed to improved architectures and higher-quality data as the key levers for accuracy on more complex tasks.',
    figure: 'grid',
  },
  {
    id: 'genai',
    index: '06',
    title: 'Generative AI and Synthetic Media',
    subtitle: 'A technical history presentation, from backpropagation to transformers',
    year: '2025',
    stack: ['Research', 'Presentation'],
    abstract:
      'A presentation researching and covering the full technical history of generative AI and synthetic media for a broad audience — from the Dartmouth Conference and the origins of neural networks through backpropagation, CNNs, RNNs, and transformers.',
    figure: 'lattice',
    thumbnail: '/genAI_pp.png',
  },
];
