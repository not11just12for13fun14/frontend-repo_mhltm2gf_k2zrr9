import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Festive snowfall overlay */}
      <div className="snow pointer-events-none absolute inset-0 opacity-40" />

      {/* Gradient overlay for readability with festive tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-24 pb-16 flex flex-col items-start">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs tracking-widest uppercase text-white/70">
          🎄 Holiday Series
        </span>
        <h1 className="mt-4 text-4xl sm:text-6xl font-semibold leading-tight">
          12 Nights of Christmas Bonannza
        </h1>
        <p className="mt-4 text-white/80 max-w-xl">
          Festive shows, countdowns, and instant tickets—night after night. Cozy up and celebrate the season.
        </p>
        <a href="#events" className="mt-8 inline-flex items-center gap-3 border border-white/20 hover:border-white/40 text-white px-5 py-3 rounded-full transition-colors">
          See tonight’s events
          <span className="opacity-80">→</span>
        </a>
      </div>

      {/* Subtle red/green glow accents */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(220, 38, 38, 0.15), transparent 70%)' }} />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(34, 197, 94, 0.12), transparent 70%)' }} />
    </section>
  )
}

export default Hero
