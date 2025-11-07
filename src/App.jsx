import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

function App() {
  const [cards, setCards] = useState([])
  const [city, setCity] = useState('')
  const [temp, setTemp] = useState('')

  const addCard = () => {
    if (!city || !temp) {
      toast.error('Please fill city and temperature')
      return
    }
    setCards([...cards, { id: Date.now(), city, temp, timestamp: Date.now() }])
    toast.success(`${city} added!`)
    setCity('')
    setTemp('')
  }

  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id))
    toast.success('Card removed')
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8">Weather Cards Pro</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-10">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              placeholder="City" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 rounded-lg border-2 border-gray-300"
            />
            <input 
              type="number" 
              placeholder="Temperature" 
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="p-3 rounded-lg border-2 border-gray-300"
            />
          </div>
          <button 
            onClick={addCard}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:scale-105 transition"
          >
            Add Card
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <div key={card.id} className="bg-white rounded-3xl shadow-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-800">{card.city}</h3>
              <p className="text-6xl font-bold text-gray-800 mt-4">{card.temp}°</p>
              <button 
                onClick={() => removeCard(card.id)}
                className="mt-4 w-full bg-red-500 text-white rounded-lg py-2 hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App
