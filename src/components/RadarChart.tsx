"use client";

interface RadarData {
  label: string;
  value: number; // 0-100
  color: string;
}

export default function RadarChart({ data }: { data: RadarData[] }) {
  const size = 280;
  const center = size / 2;
  const radius = 110;
  const levels = 4;
  const n = data.length;

  const getPoint = (index: number, r: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Grid lines
  const gridPaths = Array.from({ length: levels }, (_, i) => {
    const r = (radius * (i + 1)) / levels;
    const points = Array.from({ length: n }, (_, j) => getPoint(j, r));
    return points.map((p, j) => `${j === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  });

  // Data polygon
  const dataPoints = data.map((d, i) => getPoint(i, (d.value / 100) * radius));
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Axis lines
  const axisLines = Array.from({ length: n }, (_, i) => getPoint(i, radius));

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {gridPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={1}
            opacity={0.6}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="var(--color-border)"
            strokeWidth={1}
            opacity={0.4}
          />
        ))}

        {/* Data area */}
        <path d={dataPath} fill="#22c55e" fillOpacity={0.15} stroke="#22c55e" strokeWidth={2} />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill={data[i].color} />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const labelR = radius + 28;
          const point = getPoint(i, labelR);
          return (
            <text
              key={i}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--color-text-muted)"
              fontSize={11}
              fontWeight={500}
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
