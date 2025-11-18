import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-24 pb-16 flex flex-col items-start">
        <p className="uppercase tracking-[0.35em] text-xs text-white/60 mb-4">Today’s Picks</p>
        <h1 className="text-4xl sm:text-6xl font-semibold leading-tight">
          Daily Events, Minimal Style
        </h1>
        <p className="mt-4 text-white/70 max-w-xl">
          Explore what’s happening today. Grab tickets in seconds and watch the countdown.
        </p>
        <a href="#events" className="mt-8 inline-flex items-center gap-3 border border-white/20 hover:border-white/40 text-white px-5 py-3 rounded-full transition-colors">
          See today’s events
          <span className="opacity-60">→</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
