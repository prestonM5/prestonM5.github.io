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
};

export const projects: Project[] = [
  {
    id: 'p01',
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
    id: 'p02',
    index: '02',
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
    id: 'p03',
    index: '03',
    title: 'Full-Stack Paper Trading Website',
    subtitle: 'Real-time intraday data, authentication, and portfolio tracking',
    year: '2024',
    stack: ['React', 'MongoDB', 'Tailwind', 'Mailtrap', 'JWT'],
    abstract:
      'A full-stack paper trading platform with real-time intraday stock data, user authentication (login, register, email verification, and password reset via Mailtrap and JWT), and portfolio tracking. The frontend covers stock search, an informational dashboard, and a portfolio view with a pie-chart breakdown of holdings; the backend exposes REST routes for buying and selling, backed by MongoDB for accounts and positions.',
    figure: 'stack',
  },
  {
    id: 'p04',
    index: '04',
    title: 'Simple Neural Network for Classifying Pattern-Based Vectors',
    subtitle: 'A from-scratch neural network exploring pattern recognition and gradient-based learning',
    year: '2024',
    stack: ['PyTorch', 'CUDA', 'Matplotlib', 'Jupyter Notebook'],
    abstract:
      'A neural network implemented from scratch to demonstrate the core ideas of pattern recognition and gradient-based learning. Experiments varied batching, optimizer and loss function choice, epoch count, and hidden layer depth, with training loss plotted to visualize convergence. The results pointed to improved architectures and higher-quality data as the key levers for accuracy on more complex tasks.',
    figure: 'grid',
  },
  {
    id: 'p05',
    index: '05',
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
