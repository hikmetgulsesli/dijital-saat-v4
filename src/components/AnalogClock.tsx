import './AnalogClock.css'

interface AnalogClockProps {
  time: Date
}

export function AnalogClock({ time }: AnalogClockProps) {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  
  const hourDeg = (hours % 12) * 30 + minutes * 0.5
  const minuteDeg = minutes * 6
  const secondDeg = seconds * 6

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase()
  }

  return (
    <div className="analog-clock-view" data-testid="analog-clock">
      {/* Subtle Radial Background Glow */}
      <div className="analog-bg-glow"></div>
      
      {/* Analog Clock Container */}
      <div className="clock-container">
        {/* Glass Overlay/Shadow Effect */}
        <div className="glass-overlay"></div>
        
        {/* SVG Clock Face */}
        <svg className="clock-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {/* Clock Face */}
          <circle 
            cx="200" 
            cy="200" 
            r="180" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="clock-face-ring"
          />
          
          {/* Hour Markers */}
          <g className="hour-markers">
            <line x1="200" x2="200" y1="35" y2="55" strokeLinecap="round" strokeWidth="2" />
            <line x1="365" x2="345" y1="200" y2="200" strokeLinecap="round" strokeWidth="2" />
            <line x1="200" x2="200" y1="365" y2="345" strokeLinecap="round" strokeWidth="2" />
            <line x1="35" x2="55" y1="200" y2="200" strokeLinecap="round" strokeWidth="2" />
          </g>
          
          {/* Minute Markers (Subtle Dots) */}
          <g className="minute-markers">
            {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => (
              <circle 
                key={angle}
                cx="200" 
                cy="30" 
                r="1.5" 
                transform={`rotate(${angle} 200 200)`}
              />
            ))}
          </g>
          
          {/* Hour Hand */}
          <line 
            x1="200" 
            x2="200" 
            y1="200" 
            y2="120" 
            strokeLinecap="round" 
            strokeWidth="5"
            transform={`rotate(${hourDeg} 200 200)`}
            className="hour-hand"
          />
          
          {/* Minute Hand */}
          <line 
            x1="200" 
            x2="200" 
            y1="200" 
            y2="70" 
            strokeLinecap="round" 
            strokeWidth="3"
            transform={`rotate(${minuteDeg} 200 200)`}
            className="minute-hand"
          />
          
          {/* Second Hand */}
          <g transform={`rotate(${secondDeg} 200 200)`}>
            <line 
              x1="200" 
              x2="200" 
              y1="230" 
              y2="55" 
              strokeLinecap="round" 
              strokeWidth="1.5"
              className="second-hand"
            />
            <circle cx="200" cy="200" r="4" className="center-dot-outer" />
            <circle cx="200" cy="200" r="1.5" className="center-dot-inner" />
          </g>
        </svg>
      </div>
      
      {/* Date Display */}
      <div className="analog-date-display">
        <h1 className="analog-date-text">{formatDate(time)}</h1>
        <div className="location-info">
          <span className="location-text">İstanbul</span>
          <span className="location-dot"></span>
          <span className="timezone-text">GMT +3</span>
        </div>
      </div>
      
      {/* Active Info Section */}
      <div className="info-grid">
        <div className="info-card">
          <span className="info-label">Alarm</span>
          <span className="info-value">07:30</span>
        </div>
        <div className="info-card">
          <span className="info-label">Gün Doğumu</span>
          <span className="info-value">05:42</span>
        </div>
        <div className="info-card hidden-mobile">
          <span className="info-label">Sıcaklık</span>
          <span className="info-value">24°C</span>
        </div>
      </div>
    </div>
  )
}

export default AnalogClock
