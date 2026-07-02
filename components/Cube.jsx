export default function Cube() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <div className="absolute inset-0 cube-scene">
          <div className="cube">
            {["front", "back", "right", "left", "top", "bottom"].map((face) => (
              <div key={face} className={`cube-face ${face}`}>
                <div className="cube-face-grid" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-amber-400/60 rounded-full shadow-[0_0_40px_20px_rgba(251,191,36,0.15)]" />
        </div>
      </div>
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="star-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
