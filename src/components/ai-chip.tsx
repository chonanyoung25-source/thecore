'use client';

const AiChip = () => {
    return (
      <div className="relative w-24 h-24 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse"></div>
        <div className="relative w-full h-full bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
                background: 'linear-gradient(135deg, hsla(180, 80%, 60%, 0.25) 0%, hsla(220, 80%, 60%, 0.25) 100%)',
            }}
          />
          <span className="relative text-white font-bold text-4xl" style={{textShadow: '0 0 10px hsl(190 100% 80% / 0.9)'}}>AI</span>
        </div>
      </div>
    );
  };
  
export default AiChip;
