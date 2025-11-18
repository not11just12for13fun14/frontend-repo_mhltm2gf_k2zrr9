import { useMemo, useEffect, useState } from 'react'
import Tilt from './Tilt'
import { motion } from 'framer-motion'

function Countdown({ date }) {
  const target = useMemo(() => new Date(date), [date])
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target.getTime() - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return (
    <span className="tabular-nums">
      {days > 0 ? `${String(days).padStart(2, '0')}:` : ''}{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  )
}

function Info({ label, value }) {
  if (!value) return null
  return (
    <div className="text-xs text-white/70"><span className="uppercase tracking-widest text-[10px] mr-2 text-white/40">{label}</span>{value}</div>
  )
}

function Tag({ children }) {
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-white/10 border border-white/15 text-white/70 mr-2">{children}</span>
}

function EventCard({ event, onGetTickets, onSeeDetails }) {
  const isXmas = (d) => {
    const dt = new Date(d)
    return dt.getMonth() === 11 && dt.getDate() >= 1 && dt.getDate() <= 31
  }

  return (
    <Tilt className="group relative bg-black border border-white/10 rounded-xl p-5 hover:border-white/25 transition-colors overflow-hidden">
      {/* festive ribbon */}
      {isXmas(event.date) && (
        <div className="pointer-events-none absolute -right-10 -top-3 rotate-45 bg-white/10 border border-white/20 text-white text-xs tracking-widest uppercase px-16 py-1">
          Christmas
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white">{event.title}</h3>
          <p className="text-sm text-white/70 mt-1">{new Date(event.date).toLocaleString()}</p>
          <Info label="Location" value={`${event.venue || ''}${event.city ? `, ${event.city}` : ''}`.trim()} />
          {Array.isArray(event.tags) && event.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap">
              {event.tags.map((t, i) => (<Tag key={i}>{t}</Tag>))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="text-white/80 text-sm text-center">
            <div className="text-[10px] uppercase tracking-widest mb-1">Starts in</div>
            <div className="text-lg font-mono"><Countdown date={event.date} /></div>
          </div>

          <motion.button
            onClick={() => onSeeDetails?.(event)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-4 py-2 rounded-full"
          >
            See details
          </motion.button>

          <motion.button
            onClick={() => onGetTickets(event)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Get Tickets 🎁
          </motion.button>
        </div>
      </div>

      {/* subtle candy-cane border on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 8px, transparent 8px 16px)'
      }} />
    </Tilt>
  )
}

export default EventCard
