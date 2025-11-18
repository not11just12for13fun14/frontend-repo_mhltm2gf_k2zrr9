import Spline from '@splinetool/react-spline'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

function Hero() {
  // mouse reactive parallax for holographic glows
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const glowX = useTransform(mx, [0, 1], ['-30%', '30%'])
  const glowY = useTransform(my, [0, 1], ['-30%', '30%'])

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mx.set(x)
      my.set(y)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section className="relative min-h-[80vh] w-full bg-black text-white overflow-hidden">
      {/* 3D Spline scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Festive snowfall overlay */}
      <div className="snow pointer-events-none absolute inset-0 opacity-35" />

      {/* Gradient overlay for readability with festive tint */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Interactive holographic glows that follow the cursor */}
      <motion.div
        className="pointer-events-none absolute w-[60vmin] h-[60vmin] rounded-full blur-3xl"
        style={{ left: glowX, top: glowY, background: 'radial-gradient(closest-side, rgba(220,38,38,0.18), transparent 70%)' }}
      />
      <motion.div
        className="pointer-events-none absolute w-[60vmin] h-[60vmin] rounded-full blur-3xl"
        style={{ right: glowX, bottom: glowY, background: 'radial-gradient(closest-side, rgba(34,197,94,0.15), transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-24 pb-20 flex flex-col items-start">
        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs tracking-widest uppercase text-white/70 backdrop-blur-sm"
        >
          🎄 Holiday Series
        </motion.span>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-4xl sm:text-6xl font-semibold leading-tight"
        >
          12 Nights of Christmas Bonannza
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-white/80 max-w-xl"
        >
          Festive shows, countdowns, and instant tickets—night after night. Cozy up and celebrate the season.
        </motion.p>

        <motion.a
          href="#events"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 inline-flex items-center gap-3 border border-white/20 hover:border-white/40 text-white px-5 py-3 rounded-full transition-colors bg-white/5 backdrop-blur-sm"
        >
          See tonight’s events
          <span className="opacity-80">→</span>
        </motion.a>
      </div>

      {/* Subtle red/green glow accents (fallback) */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(220, 38, 38, 0.12), transparent 70%)' }} />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(34, 197, 94, 0.1), transparent 70%)' }} />

      {/* Subtle perspective grid for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[35vh] opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 90%, transparent)'
        }}
      />
    </section>
  )
}

export default Hero
