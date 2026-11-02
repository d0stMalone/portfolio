export default function RoboticGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[#050807]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(52,211,153,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(52,211,153,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_340px_at_50%_0px,rgba(52,211,153,0.12),transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
    </div>
  )
}
