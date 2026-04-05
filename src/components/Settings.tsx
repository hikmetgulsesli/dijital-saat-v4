import { useState } from 'react'
import './Settings.css'

export type ClockView = 'digital' | 'analog'

interface SettingsProps {
  currentView: ClockView
  onViewChange: (view: ClockView) => void
}

export function Settings({ currentView, onViewChange }: SettingsProps) {
  const [showSeconds, setShowSeconds] = useState(true)
  const [use24Hour, setUse24Hour] = useState(true)

  return (
    <div className="settings-view" data-testid="settings-view">
      {/* Editorial Header */}
      <section className="settings-header">
        <h1 className="settings-title">Ayarlar</h1>
        <p className="settings-subtitle">Zamanı kontrol etme biçiminizi kişiselleştirin.</p>
      </section>

      {/* Settings List */}
      <div className="settings-list">
        {/* Görünüm Seçimi Section */}
        <div className="setting-item">
          <div className="setting-info">
            <h2 className="setting-name">Görünüm Seçimi</h2>
            <p className="setting-desc">Arayüzün temel görsel dilini belirleyin.</p>
          </div>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${currentView === 'digital' ? 'active' : ''}`}
              onClick={() => onViewChange('digital')}
              data-testid="digital-toggle"
            >
              Dijital
            </button>
            <button 
              className={`toggle-btn ${currentView === 'analog' ? 'active' : ''}`}
              onClick={() => onViewChange('analog')}
              data-testid="analog-toggle"
            >
              Analog
            </button>
          </div>
        </div>

        {/* Toggles Cluster */}
        <div className="toggles-cluster">
          {/* Saniye Göster Switch */}
          <div className="toggle-item">
            <div className="toggle-info">
              <div className="toggle-icon">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <div>
                <span className="toggle-label">Saniye Göster</span>
                <span className="toggle-sublabel">Gerçek zamanlı akış</span>
              </div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={showSeconds}
                onChange={(e) => setShowSeconds(e.target.checked)}
                data-testid="seconds-toggle"
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-divider"></div>

          {/* 24 Saat Formatı Switch */}
          <div className="toggle-item">
            <div className="toggle-info">
              <div className="toggle-icon">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <span className="toggle-label">24 Saat Formatı</span>
                <span className="toggle-sublabel">Askeri standart</span>
              </div>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={use24Hour}
                onChange={(e) => setUse24Hour(e.target.checked)}
                data-testid="24h-toggle"
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Visual Info Card */}
        <div className="info-card-settings">
          <div className="info-card-overlay"></div>
          <div className="info-card-content">
            <span className="info-card-label">Otomatik Senkronizasyon</span>
            <p className="info-card-text">Tercihleriniz anında bulut hesabınızla eşleşir ve tüm cihazlarınızda güncellenir.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
