
import React, { useState, useEffect } from 'react';
import { FoodItem, FunFact } from '../types';
import { getFunFact } from '../services/geminiService';

interface FunFactModalProps {
  item: FoodItem;
  onClose: () => void;
}

const FunFactModal: React.FC<FunFactModalProps> = ({ item, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FunFact | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      const fact = await getFunFact(item.name);
      if (isMounted) {
        setData(fact);
        setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [item]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        <div className={`p-6 ${item.color.split(' ')[0]} flex justify-between items-center`}>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{item.emoji}</span>
            <h3 className="text-2xl font-bold">{item.name} Facts</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-2xl font-bold hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>
        
        <div className="p-8 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium animate-pulse">Asking the AI Squirrel for facts...</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-green-700 flex items-center gap-2">
                  ✨ Fun Fact
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "{data?.fact}"
                </p>
              </div>
              
              <div className="space-y-2 bg-yellow-50 p-4 rounded-2xl border border-yellow-100">
                <h4 className="text-lg font-bold text-orange-600 flex items-center gap-2">
                  😂 Silly Joke
                </h4>
                <p className="text-gray-800 text-lg">
                  {data?.joke}
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={onClose}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors shadow-lg active:scale-95"
                >
                  Got it, thanks!
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunFactModal;
