import { useEffect, useRef, useState, type CSSProperties } from 'react';

type FigureProps = { variant: string; className?: string };
type DashStyle = CSSProperties & { '--len'?: string };

const paths: Record<string, React.FC<{ visible: boolean }>> = {
  lattice: Lattice,
  candle: Candle,
  graph: Graph,
  stack: Stack,
  wave: Wave,
  grid: Grid,
};

export default function Figure({ variant, className = '' }: FigureProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Svg = paths[variant] ?? Lattice;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <Svg visible={visible} />
    </div>
  );
}

const frame = 'stroke-ink-700';
const strokeW = 1.1;

function Lattice({ visible }: { visible: boolean }) {
  const nodes = [
    [80, 60], [220, 40], [360, 80], [160, 150], [300, 170], [240, 240], [120, 280], [340, 260],
  ];
  const edges = [[0, 1], [0, 3], [1, 2], [1, 4], [2, 5], [3, 4], [3, 6], [4, 5], [4, 7], [5, 7], [6, 7], [3, 5]];
  return (
    <svg viewBox="0 0 440 320" className="h-full w-full">
      <g className={frame} fill="none" strokeWidth={strokeW}>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            className={visible ? 'draw-path' : ''}
            style={{ '--len': '220' } as DashStyle}
          />
        ))}
      </g>
      <g fill="var(--fig-fill, #1c1b17)">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.6} className={frame} fill={i % 3 === 0 ? '#1c1b17' : '#f7f7f5'} strokeWidth={1.1} />
        ))}
      </g>
    </svg>
  );
}

function Candle({ visible }: { visible: boolean }) {
  const bars = [
    { x: 50, o: 220, c: 180, h: 160, l: 250, up: true },
    { x: 90, o: 180, c: 120, h: 100, l: 200, up: true },
    { x: 130, o: 120, c: 150, h: 90, l: 170, up: false },
    { x: 170, o: 150, c: 90, h: 70, l: 170, up: true },
    { x: 210, o: 90, c: 130, h: 60, l: 150, up: false },
    { x: 250, o: 130, c: 70, h: 50, l: 140, up: true },
    { x: 290, o: 70, c: 110, h: 40, l: 130, up: false },
    { x: 330, o: 110, c: 60, h: 30, l: 130, up: true },
    { x: 370, o: 60, c: 100, h: 30, l: 120, up: false },
  ];
  return (
    <svg viewBox="0 0 440 320" className="h-full w-full">
      <g className={frame} fill="none" strokeWidth={strokeW}>
        <line x1="30" y1="280" x2="410" y2="280" />
        <line x1="30" y1="40" x2="30" y2="280" />
      </g>
      <g>
        {bars.map((b, i) => (
          <g
            key={i}
            className={visible ? 'draw-path' : ''}
            style={{ '--len': '180' } as DashStyle}
            stroke="#1c1b17"
            strokeWidth={1.2}
            fill={b.up ? 'none' : '#1c1b17'}
          >
            <line x1={b.x} y1={b.h} x2={b.x} y2={b.l} />
            <rect x={b.x - 11} y={b.o} width="22" height={Math.max(0, b.c - b.o)} fill={b.up ? 'none' : '#1c1b17'} stroke="#1c1b17" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Graph({ visible }: { visible: boolean }) {
  const nodes = [
    [120, 80], [320, 80], [220, 160], [80, 220], [360, 220], [220, 270],
  ];
  const labels = ['x', 'w', 'h', 'h₁', 'h₂', 'y'];
  const edges = [[0, 2], [1, 2], [2, 3], [2, 4], [2, 5], [0, 1], [3, 5], [4, 5]];
  return (
    <svg viewBox="0 0 440 320" className="h-full w-full">
      <g className={frame} fill="none" strokeWidth={strokeW}>
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            strokeDasharray="3 3"
            className={visible ? 'draw-path' : ''}
            style={{ '--len': '180' } as DashStyle}
          />
        ))}
      </g>
      <g>
        {nodes.map(([x, y], i) => (
          <g key={i} className={visible ? 'draw-path' : ''} style={{ '--len': '120' } as DashStyle}>
            <rect x={x - 28} y={y - 14} width="56" height="28" rx="2" fill="#f7f7f5" stroke="#1c1b17" strokeWidth={1.1} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="#1c1b17">
              {labels[i]}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Stack({ visible }: { visible: boolean }) {
  const layers = [
    { y: 70, label: 'client' },
    { y: 120, label: 'api' },
    { y: 170, label: 'auth' },
    { y: 220, label: 'db' },
    { y: 270, label: 'cache' },
  ];
  return (
    <svg viewBox="0 0 440 320" className="h-full w-full">
      <g>
        {layers.map((l, i) => (
          <g
            key={i}
            className={visible ? 'draw-path' : ''}
            style={{ '--len': '520' } as DashStyle}
            stroke="#1c1b17"
            strokeWidth={1.1}
            fill={i === 0 ? '#1c1b17' : 'none'}
          >
            <rect x="80" y={l.y - 18} width={280 - i * 24} height="32" fill={i === 0 ? '#1c1b17' : 'none'} />
            <text
              x={240 - i * 12}
              y={l.y + 3}
              textAnchor="middle"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              fill={i === 0 ? '#f7f7f5' : '#1c1b17'}
            >
              {l.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Wave({ visible }: { visible: boolean }) {
  const noisy = Array.from({ length: 120 }, (_, i) => {
    const x = (i / 119) * 400;
    const y = 160 + Math.sin(i * 0.25) * 38 + Math.sin(i * 0.07) * 18 + (i % 5) * 1.6 - 4;
    return `${i === 0 ? 'M' : 'L'}${x + 20},${y}`;
  }).join(' ');
  const clean = Array.from({ length: 80 }, (_, i) => {
    const x = (i / 79) * 400;
    const y = 160 + Math.sin(i * 0.22) * 40;
    return `${i === 0 ? 'M' : 'L'}${x + 20},${y}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 440 320" className="h-full w-full">
      <g className={frame} fill="none" strokeWidth={1}>
        <line x1="20" y1="160" x2="420" y2="160" strokeDasharray="2 4" />
      </g>
      <path
        d={noisy}
        fill="none"
        stroke="#b8b4a8"
        strokeWidth={1}
        className={visible ? 'draw-path' : ''}
        style={{ '--len': '1400' } as DashStyle}
      />
      <path
        d={clean}
        fill="none"
        stroke="#1c1b17"
        strokeWidth={1.6}
        className={visible ? 'draw-path' : ''}
        style={{ '--len': '900' } as DashStyle}
      />
    </svg>
  );
}

function Grid({ visible }: { visible: boolean }) {
  const cells = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      const hot = (r === 2 && c === 3) || (r === 2 && c === 4) || (r === 3 && c === 3);
      cells.push({ x: 40 + c * 48, y: 30 + r * 44, hot });
    }
  }
  return (
    <svg viewBox="0 0 440 320" className="h-full w-full">
      <g>
        {cells.map((cell, i) => (
          <rect
            key={i}
            x={cell.x}
            y={cell.y}
            width="44"
            height="40"
            fill={cell.hot ? '#1c1b17' : 'none'}
            stroke="#1c1b17"
            strokeWidth={0.9}
            className={visible ? 'draw-path' : ''}
            style={{ '--len': '180' } as DashStyle}
          />
        ))}
      </g>
    </svg>
  );
}
