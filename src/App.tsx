import { useState, useEffect } from 'react'
import './App.css'

type ClockType = 'digital' | 'analog'
type ViewType = 'clock' | 'settings'

function App() {
  const [time, setTime] = useState(new Date())
  const [view, setView] = useState<ViewType>('clock')
  const [clockType, setClockType] = useState<ClockType>('digital')
  const [showSeconds, setShowSeconds] = useState(true)
  const [is24Hour, setIs24Hour] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour12: !is24Hour,
      hour: '2-digit',
      minute: '2-digit',
      second: showSeconds ? '2-digit' : undefined
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase()
  }

  // Analog clock calculations
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const hourDeg = (hours % 12) * 30 + minutes * 0.5
  const minuteDeg = minutes * 6
  const secondDeg = seconds * 6

  if (view === 'settings') {
    return (
      <div className="settings-page">
        <header className="settings-header">
          <button className="back-btn" onClick={() => setView('clock')} aria-label="Geri">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="logo">CHRONOS</div>
          <button className="settings-btn" aria-label="Ayarlar">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </header>

        <main className="settings-main">
          <section className="editorial-header">
            <h1 className="editorial-title">Ayarlar</h1>
            <p className="editorial-subtitle">Zamanı kontrol etme biçiminizi kişiselleştirin.</p>
          </section>

          <div className="settings-grid">
            {/* Clock Type Selection */}
            <div className="settings-section">
              <div className="settings-label">
                <h3>Görünüm Seçimi</h3>
                <p>Arayüzün temel görsel dilini belirleyin.</p>
              </div>
              <div className="toggle-group">
                <button 
                  className={`toggle-btn ${clockType === 'digital' ? 'active' : ''}`}
                  onClick={() => setClockType('digital')}
                >
                  Dijital
                </button>
                <button 
                  className={`toggle-btn ${clockType === 'analog' ? 'active' : ''}`}
                  onClick={() => setClockType('analog')}
                >
                  Analog
                </button>
              </div>
            </div>

            {/* Toggle Cluster */}
            <div className="toggle-cluster">
              {/* Show Seconds Toggle */}
              <div className="toggle-item">
                <div className="toggle-info">
                  <div className="toggle-icon">
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <div className="toggle-text">
                    <span>Saniye Göster</span>
                    <small>Gerçek zamanlı akış</small>
                  </div>
                </div>
                <label className="pill-toggle-label">
                  <input 
                    type="checkbox" 
                    className="pill-toggle-input"
                    checked={showSeconds}
                    onChange={(e) => setShowSeconds(e.target.checked)}
                  />
                  <div className="pill-toggle-track">
                    <div className="pill-toggle-thumb"></div>
                  </div>
                </label>
              </div>

              {/* 24 Hour Format Toggle */}
              <div className="toggle-item">
                <div className="toggle-info">
                  <div className="toggle-icon">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div className="toggle-text">
                    <span>24 Saat Formatı</span>
                    <small>Askeri standart</small>
                  </div>
                </div>
                <label className="pill-toggle-label">
                  <input 
                    type="checkbox" 
                    className="pill-toggle-input"
                    checked={is24Hour}
                    onChange={(e) => setIs24Hour(e.target.checked)}
                  />
                  <div className="pill-toggle-track">
                    <div className="pill-toggle-thumb"></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Info Card */}
            <div className="info-card">
              <div className="info-card-gradient"></div>
              <div className="info-card-content">
                <span className="info-card-label">Otomatik Senkronizasyon</span>
                <p className="info-card-text">Tercihleriniz anında bulut hesabınızla eşleşir ve tüm cihazlarınızda güncellenir.</p>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-links">
            <a href="#" className="footer-link">Hakkında</a>
            <a href="#" className="footer-link">Yardım</a>
            <a href="#" className="footer-link">Gizlilik</a>
          </div>
          <div className="footer-copy">© 2024 The Chronos Editorial</div>
        </footer>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="logo">CHRONOS</div>
        <div className="nav-links">
          <button 
            className={`nav-link ${clockType === 'digital' ? 'active' : ''}`}
            onClick={() => setClockType('digital')}
          >
            Dijital
          </button>
          <button 
            className={`nav-link ${clockType === 'analog' ? 'active' : ''}`}
            onClick={() => setClockType('analog')}
          >
            Analog
          </button>
        </div>
        <button className="settings-btn" onClick={() => setView('settings')} aria-label="Ayarlar">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="clock-stage">
          {clockType === 'analog' ? (
            <div className="analog-clock-container">
              <div className="analog-clock">
                <div className="clock-face">
                  <span className="clock-number clock-number-12">12</span>
                  <span className="clock-number clock-number-3">3</span>
                  <span className="clock-number clock-number-6">6</span>
                  <span className="clock-number clock-number-9">9</span>
                  {Array.from({ length: 12 }, (_, i) => (
                    <div 
                      key={i} 
                      className="clock-tick" 
                      style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
                    />
                  ))}
                </div>
                <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
                <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
                {showSeconds && (
                  <div className="hand second-hand" style={{ transform: `rotate(${secondDeg}deg)` }} />
                )}
                <div className="center-dot" />
              </div>
            </div>
          ) : (
            <div className="digital-view">
              <div className="digital-time">{formatTime(time)}</div>
            </div>
          )}
          
          <div className="date-display">
            <h2 className="date-text">{formatDate(time)}</h2>
          </div>
        </div>

        {/* Pulse Indicator */}
        <div className="pulse-indicator">
          <div className="pulse-dot"></div>
          <span className="pulse-text">Canlı Senkronizasyon</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#" className="footer-link">Hakkında</a>
          <a href="#" className="footer-link">Yardım</a>
          <a href="#" className="footer-link">Gizlilik</a>
        </div>
        <div className="footer-copy">© 2024 The Chronos Editorial</div>
      </footer>
    </div>
  )
}

export default App
