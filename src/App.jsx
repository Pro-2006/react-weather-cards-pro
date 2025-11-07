import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

function App() {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem('weatherCards')
    return saved ? JSON.parse(saved) : []
  })
  const [form, setForm] = useState({
    city: '', country: '', unit: '°C', temp: '', feels: '', 
    condition: '', humidity: '', wind: '', windUnit: 'km/h'
  })

  useEffect(() => {
    localStorage.setItem('weatherCards', JSON.stringify(cards))
  }, [cards])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addCard = (e) => {
    e.preventDefault()
    if (!form.city || !form.temp) {
      toast.error('City and Temperature are required!')
      return
    }
    const newCard = {
      id: Date.now(),
      timestamp: Date.now(),
      city: form.city,
      country: form.country || 'XX',
      unit: form.unit,
      temp: parseFloat(form.temp),
      feels: form.feels ? parseFloat(form.feels) : null,
      condition: form.condition || 'Clear',
      humidity: form.humidity ? parseInt(form.humidity) : null,
      wind: form.wind ? parseFloat(form.wind) : null,
      windUnit: form.windUnit
    }
    setCards([...cards, newCard])
    toast.success(`${form.city} added!`)
    setForm({ city: '', country: '', unit: '°C', temp: '', feels: '', condition: '', humidity: '', wind: '', windUnit: 'km/h' })
  }

  const removeCard = (id) => {
    const card = cards.find(c => c.id === id)
    setCards(cards.filter(c => c.id !== id))
    toast.success(`${card.city} removed!`)
  }

  const clearAll = () => {
    if (confirm('Clear all weather cards?')) {
      setCards([])
      toast.success('All cards cleared!')
    }
  }

  const timeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 60000)
    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff} min ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }

  const getIcon = (condition) => {
    const c = condition.toLowerCase()
    if (c.includes('sun') || c.includes('clear')) return '☀️'
    if (c.includes('cloud')) return '☁️'
    if (c.includes('rain')) return '🌧️'
    if (c.includes('snow')) return '❄️'
    if (c.includes('storm')) return '⛈️'
    return '🌤️'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-white text-center mb-12 drop-shadow-lg">Weather Cards Pro</h1>
        
        <form onSubmit={addCard} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City *</label>
              <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Tokyo" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Country Code</label>
              <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="JP" maxLength="2" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Unit</label>
              <select name="unit" value={form.unit} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition">
                <option>°C</option>
                <option>°F</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Temperature *</label>
              <input type="number" step="0.1" name="temp" value={form.temp} onChange={handleChange} placeholder="23" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Feels Like</label>
              <input type="number" step="0.1" name="feels" value={form.feels} onChange={handleChange} placeholder="25" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Condition</label>
              <input type="text" name="condition" value={form.condition} onChange={handleChange} placeholder="Sunny" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Humidity %</label>
              <input type="number" name="humidity" value={form.humidity} onChange={handleChange} placeholder="65" min="0" max="100" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Wind Speed</label>
              <input type="number" step="0.1" name="wind" value={form.wind} onChange={handleChange} placeholder="12" className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Wind Unit</label>
              <select name="windUnit" value={form.windUnit} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition">
                <option>km/h</option>
                <option>mph</option>
                <option>m/s</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex gap-4 justify-center">
            <button type="submit" className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transform transition shadow-lg">
              Add Card
            </button>
            <button type="button" onClick={clearAll} className="px-10 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition">
              Clear All
            </button>
          </div>
        </form>

        {cards.length === 0 ? (
          <div className="text-center py-20 text-white">
            <div className="text-8xl mb-6">🌤️</div>
            <h2 className="text-4xl font-bold mb-4">No Weather Cards Yet</h2>
            <p className="text-xl opacity-90">Add your first city above to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map(card => (
              <div key={card.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:-translate-y-2 transition transform">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800">{card.city}</h3>
                      <p className="text-lg text-gray-500">{card.country}</p>
                    </div>
                    <div className="text-6xl">{getIcon(card.condition)}</div>
                  </div>

                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-7xl font-bold text-gray-800">{Math.round(card.temp)}</span>
                    <span className="text-4xl text-gray-600 pb-3">{card.unit}</span>
                  </div>

                  <p className="text-xl font-semibold text-purple-600 capitalize mb-6">{card.condition}</p>

                  <div className="space-y-3 text-gray-700">
                    {card.feels !== null && (
                      <div className="flex justify-between">
                        <span>Feels Like</span>
                        <span className="font-bold">{Math.round(card.feels)}{card.unit}</span>
                      </div>
                    )}
                    {card.humidity !== null && (
                      <div className="flex justify-between">
                        <span>Humidity</span>
                        <span className="font-bold">{card.humidity}%</span>
                      </div>
                    )}
                    {card.wind !== null && (
                      <div className="flex justify-between">
                        <span>Wind</span>
                        <span className="font-bold">{card.wind.toFixed(1)} {card.windUnit}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-8 py-5 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">{timeAgo(card.timestamp)}</span>
                  <button onClick={() => removeCard(card.id)} className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold transition transform hover:scale-110">
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default App
