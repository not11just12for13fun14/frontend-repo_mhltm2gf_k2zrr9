import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Tilt: A lightweight 3D hover tilt wrapper using motion values.
 * Props:
 * - max (number): max tilt degrees
 * - scale (number): scale on hover
 * - glare (boolean): adds a subtle moving light sheen
 */
export default function Tilt({ children, className = '', max = 14, scale = 1.02, glare = true }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -2 * max
    const ry = (px - 0.5) * 2 * max
    rotateX.set(rx)
    rotateY.set(ry)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: springX,
        rotateY: springY,
      }}
      whileHover={{ scale }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* content layer */}
      <div style={{ transform: 'translateZ(0.01px)' }}>
        {children}
      </div>

      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background:
              'radial-gradient(600px 160px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.08), transparent 60%)',
            mixBlendMode: 'screen',
          }}
        />
      )}
    </motion.div>
  )
}
