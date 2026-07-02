const faces = [
  { name: "front", delay: 0 },
  { name: "back", delay: 0.1 },
  { name: "right", delay: 0.2 },
  { name: "left", delay: 0.3 },
  { name: "top", delay: 0.4 },
  { name: "bottom", delay: 0.5 },
];

export default function Cube() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <div className="absolute inset-0 cube-scene">
          <div className="cube">
            {faces.map(({ name, delay }) => (
              <div key={name} className={`cube-face ${name}`}>
                <div
                  className="cube-face-inner"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div className="cube-face-grid" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-amber-400/60 rounded-full shadow-[0_0_40px_20px_rgba(251,191,36,0.15)]" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360;
            return (
              <div
                key={`burst-${i}`}
                className="burst-particle"
                style={{
                  "--angle": `${angle}deg`,
                  "--distance": `${160 + (i % 3) * 80}px`,
                  "--delay": `${(i % 6) * 0.08}s`,
                  "--size": `${1.5 + (i % 3) * 1.5}px`,
                }}
              />
            );
          })}
        </div>
      </div>
      {Array.from({ length: 60 }).map((_, i) => (
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
