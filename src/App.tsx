import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnalogClock, DigitalClock, Settings, type ClockView } from './components'
import './App.css'

function Header({ currentView }: { currentView: ClockView }) {
  const location = useLocation()
  const isSettings = location.pathname === '/settings'
  
  return (
    <header className="app-header">
      <div className="logo">Chronos</div>
      <nav className="desktop-nav">
        <Link 
          to="/" 
          className={`nav-link ${currentView === 'digital' && !isSettings ? 'active' : ''}`}
        >
          Dijital
        </Link>
        <Link 
          to="/analog" 
          className={`nav-link ${currentView === 'analog' && !isSettings ? 'active' : ''}`}
        >
          Analog
        </Link>
      </nav>
      <div className="header-actions">
        <Link to="/settings" className={`settings-link ${isSettings ? 'active' : ''}`}>
          <span className="material-symbols-outlined">settings</span>
        </Link>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-links">
        <a href="#" className="footer-link">Hakkında</a>
        <a href="#" className="footer-link">Yardım</a>
        <a href="#" className="footer-link">Gizlilik</a>
      </div>
      <div className="footer-copy">© 2024 The Chronos Editorial</div>
    </footer>
  )
}

function AppContent() {
  const [time, setTime] = useState(new Date())
  const [currentView, setCurrentView] = useState<ClockView>('digital')

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="app">
      <Header currentView={currentView} />
      
      <main className="app-main">
        <Routes>
          <Route 
            path="/" 
            element={<DigitalClock time={time} />} 
          />
          <Route 
            path="/analog" 
            element={<AnalogClock time={time} />} 
          />
          <Route 
            path="/settings" 
            element={
              <Settings 
                currentView={currentView} 
                onViewChange={setCurrentView} 
              />
            } 
          />
        </Routes>
      </main>

      <Footer />
      
      {/* FAB Action */}
      <button className="fab-button" aria-label="Alarm ekle">
        <span className="material-symbols-outlined">add_alarm</span>
      </button>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
