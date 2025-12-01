"use client";

export default function AnalyticsChart({ data }) {
  // data: [{ label: 'Mon', value: 10 }, ...]
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="w-full h-64 flex items-end gap-2 sm:gap-4 mt-8">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100;
        return (
          <div key={index} className="flex-1 flex flex-col items-center group">
            <div className="relative w-full bg-purple-50 rounded-t-lg overflow-hidden flex flex-col justify-end transition-all hover:bg-purple-100 h-full">
              <div 
                className="w-full bg-brand-purple rounded-t-lg transition-all duration-1000 ease-out relative group-hover:bg-brand-dark"
                style={{ height: `${height}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {item.value} Sales
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-bold">{item.label}</p>
          </div>
        )
      })}
    </div>
  )
}
