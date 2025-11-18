import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import EventCard from './components/EventCard'
import TicketModal from './components/TicketModal'

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/events/today`)
        const data = await res.json()
        setEvents(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <section id="events" className="max-w-5xl mx-auto px-6 sm:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">Today’s Events</h2>
          <a href="/test" className="text-xs uppercase tracking-widest text-white/50 hover:text-white/80">Status</a>
        </div>

        {loading ? (
          <p className="text-white/60">Loading...</p>
        ) : events.length === 0 ? (
          <div className="border border-white/10 rounded-xl p-8 text-white/60">
            No events for today yet. Add some via the API.
          </div>
        ) : (
          <div className="space-y-4">
            {events.map(ev => (
              <EventCard key={ev.id} event={ev} onGetTickets={(e)=>setSelected(e)} />
            ))}
          </div>
        )}
      </section>

      <TicketModal open={!!selected} onClose={()=>setSelected(null)} event={selected || {}} />

      <footer className="border-t border-white/10 py-10 mt-8">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 flex items-center justify-between text-white/50 text-sm">
          <p>Events — Minimal Black & White</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
