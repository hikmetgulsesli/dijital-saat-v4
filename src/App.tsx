import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [showSettings] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { hour12: false })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const hourDeg = (hours % 12) * 30 + minutes * 0.5
  const minuteDeg = minutes * 6
  const secondDeg = seconds * 6

  return (
    <div className="container">
      <div className="clock-wrapper">
        <div className="analog-clock">
          <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
          <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
          <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
          <div className="center-dot" />
        </div>
        <div className="digital-time">{formatTime(time)}</div>
        <div className="date">{formatDate(time)}</div>
      </div>
      <button className="settings-btn">
        ⚙️
      </button>
      {showSettings && (
        <div className="settings-panel">
          <h3>Ayarlar</h3>
          <p>24 saat formatı aktif</p>
        </div>
      )}
    </div>
  )
}

export default App