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
  /** Featured projects render with a thumbnail in the main grid; everything
   * else is tucked under the collapsed "Additional Work" list (no thumbnail). */
  featured: boolean;
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
    featured: true,
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
    featured: true,
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
          'An audit found the Theiler exclusion was one pixel wide instead of 14 days, inflating early numbers. Before fixing it, the window was swept across five sizes (0, 1, 14, 30, 60 days): rankings and rough magnitudes held at every size, only the exact values moved (date 7.81× → 7.25×). Two more bugs (a leap-year phase error in the date encoding, and an unseeded RNG) were fixed the same way, and every result was regenerated and reproduced bit-for-bit.',
      },
      { kind: 'heading', text: 'Summary' },
      {
        kind: 'p',
        text:
          "Recurrence plots, joint recurrence, and a Takens-motivated ablation show the embedding learned the seasonal cycle. Surrogate testing and Bonferroni correction make that claim defensible, and overturn the naive reading: humidity, wind speed, and date hold up statistically where pressure and temperature, despite looking stronger, don't.",
      },
    ],
  },
  {
    id: 'koopman-pendulum',
    index: '03',
    title: 'Koopman Structure in a Reconstruction-Trained Embedding',
    subtitle: 'A post-hoc Dynamic Mode Decomposition analysis of whether a video autoencoder secretly learns pendulum physics',
    year: '2026',
    stack: ['PyTorch', 'pydmd', 'NumPy', 'SciPy', 'Matplotlib'],
    abstract:
      "A convolutional autoencoder is trained, five times independently, to compress 64×64 video frames of a simulated pendulum into an 8-number latent code and reconstruct them, never told about gravity, velocity, or time. Dynamic Mode Decomposition then asks whether that latent trajectory is secretly linear (Koopman-predictable) once a handful of consecutive frames are stacked together. Result: real, shuffle-test-significant structure appears in every seed at the physics-predicted minimum delay, but only 1 of 5 recovers the true oscillation frequency there, a mismatch that a bit more delay resolves for all 5, unless the pendulum's swing is pushed into a genuinely nonlinear regime, where it isn't.",
    figure: 'wave',
    thumbnail: '/ksiarte/x1_freq_vs_delay.png',
    thumbnailFit: 'contain',
    featured: true,
    caseStudy: [
      { kind: 'heading', text: 'Method' },
      {
        kind: 'p',
        text:
          "A convolutional autoencoder (five independently-trained seeds) compresses each 64×64 frame of a rendered, physically-simulated pendulum down to an 8-number latent code and reconstructs the frame from it, graded only on pixel-level reconstruction quality. It is never given gravity, velocity, or a timestamp. Dynamic Mode Decomposition (DMD) is then run on the resulting latent trajectories to ask a separate question: once translated into the network's own internal numbers, does the pendulum's motion become **linearly predictable**, one frame's code mapping to the next by a single fixed matrix? This is the Koopman-operator idea: some nonlinear systems admit a change of coordinates under which their dynamics turn linear, and the question is whether a network trained purely on pixels stumbles onto such coordinates by accident. The DMD implementation was first validated against a published fluid-dynamics benchmark (cylinder-wake flow, Re=100) to ≥6 significant figures before being trusted on the pendulum.",
      },
      {
        kind: 'p',
        text:
          "A single frame can't tell a pendulum swinging left from one swinging right (both look identical mid-arc), so DMD is run not on individual latent codes but on short stacks of **q** consecutive codes (a delay embedding), letting the trajectory implicitly recover velocity the way two consecutive photos can. How large q needs to be before the trajectory becomes DMD-predictable, and separately, before DMD recovers the *correct* frequency, turns out to be the project's central question.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/f2_latent_trajectory_phase.png', caption: 'Latent trajectories retrace a phase-ordered arc, not a loop (top-2 PCs, all 5 seeds)' },
        ],
      },
      { kind: 'heading', text: 'Results' },
      {
        kind: 'p',
        text:
          "All 5 seeds first cleared the one-step predictability threshold (VAF ≥ 0.90) at **q\\*=2**, the minimum consistent with Takens' theorem for a single scalar observation of a 2-D state (position and velocity), and saturated to VAF ≈ 1.0000 by q=3.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/f5_vaf_vs_delay.png', caption: 'Latent VAF vs. delay count, against the pixel-DMD baseline' },
        ],
      },
      {
        kind: 'p',
        text:
          "Predictability alone isn't proof: a slow, smooth video can look predictable purely because consecutive frames resemble each other, with no real structure behind it. Each latent trajectory was tested against 200 randomly shuffled versions of itself. Every seed's observed VAF sat at the extreme edge of its own null distribution (raw p = 1/201, Holm-Bonferroni corrected p = 0.0249 for all 5): the temporal structure is real, not an artifact of slowness.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/f4_surrogate_null_vaf.png', caption: 'Observed VAF sits far outside the surrogate null (5 seeds, q*=2)' },
          { src: '/ksiarte/f3_eigenvalue_significance.png', caption: "Observed eigenvalues sit near the unit circle, far from the surrogate null: only 2/5 seeds land on f0's target angle" },
        ],
      },
      {
        kind: 'p',
        text:
          "By the project's pre-registered test (exact_dmd), **only 1 of 5 seeds** recovered the pendulum's true oscillation frequency (f₀ = 0.498488 Hz, from the exact pendulum equations) within the pre-committed 1% tolerance at q\\*=2; the other four locked onto real, statistically significant structure oscillating at the wrong speed, most often exactly the first harmonic, 2×f₀. A second, independent frequency estimator (BOP-DMD, plotted below) agrees on which seeds are harmonic-dominated, but resolves the fundamental more precisely: seed 1 lands at 0.06% off f₀ under BOP-DMD versus 2.57% off (just outside tolerance) under exact_dmd, a known precision bias in plain DMD that BOP-DMD exists to correct. That precision difference, not a contradiction, is why the figure below reads 2 of 5.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/f6_frequency_forest.png', caption: 'BOP-DMD frequency matches f0 for 2/5 seeds; rest land on the 1st harmonic' },
        ],
      },
      { kind: 'heading', text: 'Extension: a little more delay fixes it' },
      {
        kind: 'p',
        text:
          "Giving each network more delay (no retraining, same weights) resolved the mismatch. By q=5, all 5 seeds' recovered frequency fell inside the tolerance band; by q=8, all 5 converged to within 0.06% of f₀ and stayed there through q=21.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/x1_freq_vs_delay.png', caption: 'All 5 seeds converge to f0 by q=8, unlike at the minimal q*=2' },
        ],
      },
      {
        kind: 'p',
        text:
          "Re-running the complete test (shuffle test, Holm-Bonferroni correction, and an independent uncertainty-quantification method, BOP-DMD) at q=8 confirmed it formally: all 5 seeds now land in the fully-expected outcome, real structure *and* the correct physical speed, not just 1 of 5.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/x2_frequency_forest_q8.png', caption: 'Extension 2 (q=8): BOP-DMD frequency matches f0 for 5/5 seeds' },
        ],
      },
      { kind: 'heading', text: 'Extension: does network size matter?' },
      {
        kind: 'p',
        text:
          "The same pattern held across a 16× range of latent capacity (d = 2 to d = 32, five fresh seeds trained at each size). The minimum delay for one-step predictability (q\\*=2) never moved, evidence it's set by the pendulum's physics, not the network's size. The delay needed to resolve the *correct* frequency did vary: 24 of 25 (d, seed) combinations converged by q=8, with one exception (d=4) needing q=13, and that exception fully confirmed once given the delay it actually needed.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/x3_freq_vs_delay_by_d.png', caption: 'Frequency convergence across latent dimension d = [2, 4, 8, 16, 32]: 24/25 (d, seed) pairs within tolerance by q=8' },
        ],
      },
      { kind: 'heading', text: 'Extension: pushing into the nonlinear regime' },
      {
        kind: 'p',
        text:
          "Every result above used a small, ~5.7° swing, where a pendulum behaves almost like a linear spring. Repeating everything at a much wider, genuinely nonlinear 28.6° swing broke the pattern for good: no seed, at any tested delay, ever recovered the true frequency. Every network's dominant oscillation locked onto a harmonic (2× or 3× f₀) and stayed there through q=21.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/x5_freq_vs_delay_large_amplitude.png', caption: 'Extension 5 (theta0=0.5): recovered frequency stays on a harmonic, never the true f0' },
        ],
      },
      {
        kind: 'p',
        text:
          "A supplementary check ruled out the renderer as the cause: DMD run directly on the exact, uncompressed pixel trajectory (no autoencoder involved) recovers the true frequency to near machine precision. Whatever locks the network onto the wrong harmonic happens inside the trained latent space itself, not upstream of it. Escalating this negative result to the full shuffle test confirmed it's real, not noise: the wrong-speed structure is exactly as statistically significant as every correct-speed result elsewhere in the project.",
      },
      {
        kind: 'figure',
        images: [
          { src: '/ksiarte/x7_frequency_forest_large_amp_q13.png', caption: 'Extension 7 (q=13): BOP-DMD frequency matches exact f0 for 0/5 seeds' },
        ],
      },
      { kind: 'heading', text: 'Summary' },
      {
        kind: 'p',
        text:
          "A network never told anything about physics, trained only to compress and rebuild pendulum video, organizes its latent code so that DMD can correctly read the true motion back out (surviving a real shuffle-based significance test, not just eyeballing it), once given a small amount of delay rather than a single frame. That story holds regardless of the network's internal memory size, and a separate check (feeding the encoder two consecutive frames instead of stacking delay) confirmed the same q≥2 requirement and converged to the correct frequency slightly faster once real structure appeared. It breaks down cleanly, not ambiguously, once the swing amplitude is large enough that the pendulum's true physics stops being linear: the one finding in the project that more patience doesn't fix, and one that survived the same rigor as everything else.",
      },
    ],
  },
  {
    id: 'rnn',
    index: '04',
    title: 'Sentence Generation with a Word-Level Vanilla RNN',
    subtitle: 'A word-level RNN trained on WikiText-103, extending character-level name prediction',
    year: '2025',
    stack: ['PyTorch', 'Python'],
    abstract:
      'A word-level vanilla RNN for sentence generation, including a custom tokenizer and vocabulary built from scratch over the Salesforce WikiText-103 dataset. A PyTorch dataset pipeline handles sliding windows and batching via a custom collate function, and the training loop covers loss computation, backpropagation, gradient clipping, and perplexity evaluation. Generation supports temperature scaling and top-k sampling, alongside an analysis of the overfitting challenges inherent to vanilla RNNs.',
    figure: 'graph',
    thumbnail: '/vanilla_rnn.jpg',
    thumbnailFit: 'contain',
    featured: false,
  },
  {
    id: 'paper-trading',
    index: '05',
    title: 'Full-Stack Paper Trading Website',
    subtitle: 'Real-time intraday data, authentication, and portfolio tracking',
    year: '2024',
    stack: ['React', 'MongoDB', 'Tailwind', 'Mailtrap', 'JWT'],
    abstract:
      'A full-stack paper trading platform with real-time intraday stock data, user authentication (login, register, email verification, and password reset via Mailtrap and JWT), and portfolio tracking. The frontend covers stock search, an informational dashboard, and a portfolio view with a pie-chart breakdown of holdings; the backend exposes REST routes for buying and selling, backed by MongoDB for accounts and positions.',
    figure: 'stack',
    featured: false,
  },
  {
    id: 'neural-net',
    index: '06',
    title: 'Simple Neural Network for Classifying Pattern-Based Vectors',
    subtitle: 'A from-scratch neural network exploring pattern recognition and gradient-based learning',
    year: '2024',
    stack: ['PyTorch', 'CUDA', 'Matplotlib', 'Jupyter Notebook'],
    abstract:
      'A neural network implemented from scratch to demonstrate the core ideas of pattern recognition and gradient-based learning. Experiments varied batching, optimizer and loss function choice, epoch count, and hidden layer depth, with training loss plotted to visualize convergence. The results pointed to improved architectures and higher-quality data as the key levers for accuracy on more complex tasks.',
    figure: 'grid',
    featured: false,
  },
  {
    id: 'genai',
    index: '07',
    title: 'Generative AI and Synthetic Media',
    subtitle: 'A technical history presentation, from backpropagation to transformers',
    year: '2025',
    stack: ['Research', 'Presentation'],
    abstract:
      'A presentation researching and covering the full technical history of generative AI and synthetic media for a broad audience — from the Dartmouth Conference and the origins of neural networks through backpropagation, CNNs, RNNs, and transformers.',
    figure: 'lattice',
    thumbnail: '/genAI_pp.png',
    featured: false,
  },
];
