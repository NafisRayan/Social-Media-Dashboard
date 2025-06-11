import React from 'react';

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  showGrid?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  height = 200, 
  color = '#3B82F6',
  showGrid = true 
}) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  const width = 100; // percentage
  const padding = 10;

  const getX = (index: number) => (index / (data.length - 1)) * (width - 2 * padding) + padding;
  const getY = (value: number) => ((maxValue - value) / range) * (height - 2 * padding) + padding;

  const pathData = data.map((point, index) => {
    const x = getX(index);
    const y = getY(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <svg 
        width="100%" 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {showGrid && (
          <defs>
            <pattern id="grid\" width="10\" height="10\" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10\" fill="none\" stroke="#f1f5f9\" strokeWidth="1"/>
            </pattern>
          </defs>
        )}
        
        {showGrid && (
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5" />
        )}
        
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {data.map((point, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(point.value)}
            r="3"
            fill={color}
            className="hover:r-4 transition-all duration-200"
          />
        ))}
      </svg>
    </div>
  );
};

export default LineChart;