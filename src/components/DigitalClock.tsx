import './DigitalClock.css'

interface DigitalClockProps {
  time: Date
}

export function DigitalClock({ time }: DigitalClockProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { hour12: false })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase()
  }

  return (
    <div className="digital-clock" data-testid="digital-clock">
      {/* Background Decorative Element */}
      <div className="digital-bg-glow"></div>
      
      {/* Digital Clock Display */}
      <div className="digital-glow">
        <h1 className="time-display" data-testid="time-display">
          {formatTime(time)}
        </h1>
      </div>
      
      {/* Date Display */}
      <div className="date-display">
        <h2 className="date-text" data-testid="date-text">
          {formatDate(time)}
        </h2>
      </div>

      {/* Pulse Indicator */}
      <div className="pulse-indicator">
        <div className="pulse-dot"></div>
        <span className="pulse-text">Canlı Senkronizasyon</span>
      </div>
    </div>
  )
}

export default DigitalClock
