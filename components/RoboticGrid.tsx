export default function RoboticGrid() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-gray-900" />
      <div className="relative h-full w-full">
        {/* Horizontal lines */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        {/* Vertical lines */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        {/* Diagonal lines */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(56,189,248,0.1),transparent)]" />
      </div>
    </div>
  )
}

