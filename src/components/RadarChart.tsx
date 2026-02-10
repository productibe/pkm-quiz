"use client";

import { useEffect, useState } from "react";

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
  const [animated, setAnimated] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Data polygon (animated from 0 to actual value)
  const dataPoints = data.map((d, i) => {
    const animatedValue = animated ? d.value : 0;
    return getPoint(i, (animatedValue / 100) * radius);
  });
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Axis lines
  const axisLines = Array.from({ length: n }, (_, i) => getPoint(i, radius));

  // Gradient ID (unique per chart instance)
  const gradientId = `radarGradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Gradient definition */}
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </radialGradient>
          
          {/* Glow filter for data points */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

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

        {/* Data area with gradient */}
        <path 
          d={dataPath} 
          fill={`url(#${gradientId})`} 
          stroke="#22c55e" 
          strokeWidth={2}
          style={{
            transition: 'd 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Data points with glow */}
        {dataPoints.map((p, i) => (
          <g key={i}>
            {/* Outer glow ring */}
            <circle 
              cx={p.x} 
              cy={p.y} 
              r={animated ? 6 : 0} 
              fill={data[i].color}
              opacity={0.3}
              style={{
                transition: 'r 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${i * 0.1}s`,
              }}
            />
            {/* Main point */}
            <circle 
              cx={p.x} 
              cy={p.y} 
              r={animated ? 4 : 0} 
              fill={data[i].color}
              filter="url(#glow)"
              style={{
                transition: 'r 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${i * 0.1}s`,
              }}
            />
          </g>
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
              style={{
                opacity: animated ? 1 : 0,
                transition: 'opacity 0.5s ease-out',
                transitionDelay: `${i * 0.1 + 0.5}s`,
              }}
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
