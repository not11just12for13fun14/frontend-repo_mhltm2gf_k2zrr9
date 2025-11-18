import { useMemo } from 'react'

function Countdown({ date }) {
  const target = useMemo(() => new Date(date), [date])
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target.getTime() - now)
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return (
    <span className="tabular-nums">
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  )
}

import { useEffect, useState } from 'react'

function EventCard({ event, onGetTickets }) {
  return (
    <div className="group relative bg-black border border-white/10 rounded-xl p-5 hover:border-white/25 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-medium text-white">{event.title}</h3>
          <p className="text-sm text-white/60 mt-1">{new Date(event.date).toLocaleString()}</p>
          {event.venue && (
            <p className="text-sm text-white/50">{event.venue}{event.city ? `, ${event.city}` : ''}</p>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-white/80 text-sm text-center">
            <div className="text-[10px] uppercase tracking-widest mb-1">Starts in</div>
            <div className="text-lg font-mono"><Countdown date={event.date} /></div>
          </div>

          <button
            onClick={() => onGetTickets(event)}
            className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard
