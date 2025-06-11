import React from 'react';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  height?: number;
  horizontal?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  height = 200, 
  horizontal = false 
}) => {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="w-full">
      {horizontal ? (
        <div className="space-y-3">
          {data.map((bar, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-gray-600 dark:text-gray-400 text-right">
                {bar.label}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"  
                  style={{
                    width: `${(bar.value / maxValue) * 100}%`,
                    backgroundColor: bar.color || colors[index % colors.length]
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-end pr-2">
                  <span className="text-xs font-medium text-white">
                    {bar.value.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <svg width="100%" height={height} className="overflow-visible">
          {data.map((bar, index) => {
            const barWidth = 100 / data.length - 2;
            const x = (index * 100) / data.length + 1;
            const barHeight = (bar.value / maxValue) * (height - 40);
            const y = height - barHeight - 20;

            return (
              <g key={index}>
                <rect
                  x={`${x}%`}
                  y={y}
                  width={`${barWidth}%`}
                  height={barHeight}
                  fill={bar.color || colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity duration-200"
                  rx="4"
                />
                <text
                  x={`${x + barWidth / 2}%`}
                  y={height - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                >
                  {bar.label}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};

export default BarChart;