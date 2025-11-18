import { motion } from 'framer-motion'

function Row({ label, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-28 shrink-0 text-xs uppercase tracking-widest text-white/50">{label}</div>
      <div className="text-white/90">{children}</div>
    </div>
  )
}

function Tag({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-white/10 border border-white/15 text-white/80 mr-2 mb-2">
      {children}
    </span>
  )
}

export default function EventDetails({ open, onClose, event, onGetTickets }) {
  if (!open || !event) return null
  const dt = new Date(event.date)

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="relative bg-black border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:w-[720px] max-h-[90vh] overflow-y-auto"
      >
        {event.image && (
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-t-2xl">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-90"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white">{event.title}</h3>
              <p className="text-white/70 mt-1 text-sm">{dt.toLocaleString()}</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white/90 text-sm">Close</button>
          </div>

          {event.description && (
            <p className="mt-4 text-white/80 leading-relaxed">{event.description}</p>
          )}

          <div className="mt-6 space-y-3">
            {(event.venue || event.city) && (
              <Row label="Location">
                <span>{event.venue}{event.city ? `, ${event.city}` : ''}</span>
              </Row>
            )}
            {typeof event.price === 'number' && (
              <Row label="Price">
                <span>{event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</span>
              </Row>
            )}
            {Array.isArray(event.tags) && event.tags.length > 0 && (
              <Row label="Tags">
                <div className="flex flex-wrap -m-1 mt-0">
                  {event.tags.map((t, i) => (
                    <Tag key={i}>{t}</Tag>
                  ))}
                </div>
              </Row>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onGetTickets?.(event)}
              className="inline-flex justify-center items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-medium hover:bg-white/90"
            >
              Get Tickets 🎁
            </motion.button>
            <a href="#events" className="inline-flex justify-center items-center gap-2 border border-white/20 hover:border-white/40 text-white px-5 py-3 rounded-full">
              View all tonight’s events
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
