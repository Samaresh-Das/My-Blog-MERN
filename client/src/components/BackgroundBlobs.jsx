function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Magenta blob top-left */}
      <div className="absolute top-[120px] left-[-80px] w-[300px] h-[300px] bg-[#c71585] rounded-full mix-blend-screen opacity-20 blur-3xl animate-blob animation-delay-2000" />

      {/* Blue glow bottom-right */}
      <div className="absolute bottom-[120px] right-[-80px] w-[350px] h-[350px] bg-[#5c1eae] rounded-full mix-blend-screen opacity-25 blur-3xl animate-blob" />

      {/* Faint pinkish center glow */}
      <div className="absolute top-[45%] left-[15%] w-[280px] h-[280px] bg-[#6a40bf] rounded-full mix-blend-screen opacity-15 blur-3xl animate-blob animation-delay-4000" />
      {/* Faint bluish center rigth glow */}
      <div className="absolute top-[55%] right-[15%] w-[180px] h-[180px] bg-[#4075bf] rounded-full mix-blend-screen opacity-15 blur-3xl animate-blob animation-delay-4000" />
    </div>
  );
}
export default BackgroundBlobs;
