
import React, { useState, useMemo } from 'react';
import { FOOD_ITEMS } from './constants';
import { Category, FoodItem } from './types';
import FunFactModal from './components/FunFactModal';

// Custom SVG Logo recreating the provided design
const CreatorBLogo = () => (
  <svg width="40" height="30" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-1">
    <text x="50" y="45" textAnchor="middle" fontSize="32" fontFamily="serif" fill="currentColor">creatorB</text>
    <rect x="10" y="52" width="80" height="4" fill="currentColor" />
    <text x="50" y="72" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="currentColor">B.A.D</text>
  </svg>
);

const App: React.FC = () => {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter(item => {
      return filter === 'All' || item.category === filter;
    });
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col items-center pb-20 px-4">
      {/* Header Section */}
      <header className="w-full max-w-4xl py-10 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-green-600 drop-shadow-sm flex items-center justify-center gap-4 mb-4">
          VeggieVenture <span>🥕</span>
        </h1>
        <p className="text-lg md:text-xl text-green-800 font-medium">
          Discover why fruits and veggies are your best friends!
        </p>
      </header>

      {/* Control Panel - Filters Only */}
      <section className="w-full max-w-4xl flex justify-center mb-10">
        <div className="flex gap-2 p-1.5 bg-white rounded-2xl shadow-lg border-b-4 border-green-100">
          {(['All', Category.FRUIT, Category.VEGETABLE] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-xl font-bold transition-all text-lg ${
                filter === cat 
                ? 'bg-green-500 text-white shadow-md scale-105' 
                : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Items Grid */}
      <main className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`p-6 rounded-3xl border-2 transition-all hover:shadow-xl cursor-pointer active:scale-95 flex flex-col h-full ${item.color}`}
          >
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className="text-5xl">{item.emoji}</span>
                <span className="bg-white/50 px-3 py-1 rounded-full text-sm font-bold opacity-80 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
              <h2 className="text-2xl font-black mb-2">{item.name}</h2>
              <p className="text-sm font-medium mb-4 opacity-90">{item.shortDesc}</p>
              
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase opacity-60">Health Powers:</p>
                <div className="flex flex-wrap gap-1">
                  {item.benefits.map((b, idx) => (
                    <span key={idx} className="text-[11px] bg-white/40 px-2 py-1 rounded-lg font-semibold">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Selected Item Modal */}
      {selectedItem && (
        <FunFactModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {/* Footer / Environmental Note */}
      <footer className="w-full max-w-4xl mt-20 pt-10 border-t border-green-100 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm font-medium">
        <p>© {new Date().getFullYear()} VeggieVenture</p>
        <div className="flex items-center gap-2 text-green-800">
          <span>🌿 Netlify Friendly</span>
          <span>•</span>
          <div className="flex items-center">
            <span>By</span>
            <CreatorBLogo />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
