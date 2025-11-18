import { useEffect, useState } from 'react'

function TicketModal({ open, onClose, event }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (!open) {
      setName(''); setEmail(''); setQuantity(1); setSuccess(null)
    }
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_id: event.id,
          name,
          email,
          quantity: Number(quantity)
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      setSuccess(data.id)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-black border border-white/10 rounded-2xl p-6 w-[90%] max-w-md text-white">
        <h3 className="text-2xl font-semibold">Get Tickets</h3>
        <p className="text-white/60 text-sm mt-1">{event.title}</p>

        {success ? (
          <div className="mt-6">
            <p className="text-white/80">Success! Your reservation id:</p>
            <p className="font-mono mt-2 bg-white/5 px-3 py-2 rounded">{success}</p>
            <button onClick={onClose} className="mt-6 w-full bg-white text-black py-2 rounded-full">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Name</label>
              <input value={name} onChange={(e)=>setName(e.target.value)} required className="w-full bg-transparent border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-white/40"/>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Email</label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full bg-transparent border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-white/40"/>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Quantity</label>
              <input type="number" min={1} max={10} value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="w-full bg-transparent border border-white/15 rounded-xl px-3 py-2 outline-none focus:border-white/40"/>
            </div>
            <button disabled={loading} className="w-full bg-white text-black py-2 rounded-full disabled:opacity-60">
              {loading ? 'Processing...' : 'Confirm'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default TicketModal
