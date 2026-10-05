import { motion } from 'framer-motion';
import type { TrendPoint, TrendSummary } from './trend';

export interface TrendChartProps {
  points: readonly TrendPoint[];
  summary: TrendSummary;
}

const MODE_COLOURS: Record<string, string> = {
  practice: 'fill-primary-500',
  mock: 'fill-secondary-500',
  mistakes: 'fill-warning-500',
  diagnostic: 'fill-info-500',
};

const MODE_BG_COLOURS: Record<string, string> = {
  practice: 'bg-primary-500',
  mock: 'bg-secondary-500',
  mistakes: 'bg-warning-500',
  diagnostic: 'bg-info-500',
};

const DIRECTION_LABEL: Record<TrendSummary['direction'], { text: string; tone: string }> = {
  improving: { text: 'Improving', tone: 'text-success-700' },
  declining: { text: 'Slipping', tone: 'text-error-700' },
  steady: { text: 'Steady', tone: 'text-neutral-600' },
};

/**
 * Accuracy over time. An SVG sparkline rather than a charting library: the data
 * is a single series of at most a few hundred points, and a dependency is not
 * worth 40 kB for that.
 */
const TrendChart = ({ points, summary }: TrendChartProps) => {
  if (points.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Your accuracy trend appears here once you have completed a session.
      </p>
    );
  }

  const width = 640;
  const height = 180;
  const padX = 32;
  const padY = 20;

  const plotW = width - padX * 2;
  const plotH = height - padY * 2;

  const x = (index: number) =>
    points.length === 1 ? padX + plotW / 2 : padX + (index / (points.length - 1)) * plotW;
  const y = (accuracy: number) => padY + plotH - (accuracy / 100) * plotH;

  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p.accuracy)}`).join(' ');
  const area = `${line} L ${x(points.length - 1)} ${padY + plotH} L ${x(0)} ${padY + plotH} Z`;

  const label = DIRECTION_LABEL[summary.direction];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
        <span className="text-muted-foreground">
          Average <span className="font-semibold text-foreground">{summary.average}%</span>
        </span>
        <span className={label.tone}>
          {label.text}
          {points.length >= 4 && summary.delta !== 0 ? (
            <span className="ml-1">
              ({summary.delta > 0 ? '+' : ''}
              {summary.delta} points)
            </span>
          ) : null}
        </span>
        <span className="text-muted-foreground">{points.length} sessions</span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Accuracy trend across ${points.length} sessions, averaging ${summary.average} percent`}
      >
        {/* Horizontal guides at 0 / 50 / 100 */}
        {[0, 50, 100].map((mark) => (
          <g key={mark}>
            <line
              x1={padX}
              x2={width - padX}
              y1={y(mark)}
              y2={y(mark)}
              className="stroke-neutral-200"
              strokeWidth={1}
            />
            <text
              x={padX - 8}
              y={y(mark) + 4}
              textAnchor="end"
              className="fill-neutral-400"
              fontSize={11}
            >
              {mark}
            </text>
          </g>
        ))}

        <motion.path
          d={area}
          className="fill-primary-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        <motion.path
          d={line}
          fill="none"
          className="stroke-primary-600"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {points.map((point, index) => (
          <circle
            key={point.id}
            cx={x(index)}
            cy={y(point.accuracy)}
            r={4}
            className={MODE_COLOURS[point.mode] ?? 'fill-primary-500'}
          >
            <title>
              {point.date} &middot; {point.mode} &middot; {point.accuracy}% ({point.total} items)
            </title>
          </circle>
        ))}
      </svg>

      <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
        {Object.entries(MODE_COLOURS).map(([mode, _colour]) => (
          <span key={mode} className="flex items-center gap-1.5">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${MODE_BG_COLOURS[mode] ?? 'bg-primary-500'}`} />
            <span className="capitalize">{mode}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendChart;
