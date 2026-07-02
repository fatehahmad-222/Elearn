export default function ParticleHero({ color = "#B89B5E" }) {
  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${color}11 0%, transparent 50%)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
