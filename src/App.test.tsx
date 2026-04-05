import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the clock view by default', () => {
    render(<App />)
    expect(screen.getByText('CHRONOS')).toBeInTheDocument()
  })

  it('displays digital time by default', () => {
    render(<App />)
    expect(document.querySelector('.digital-time')).toBeInTheDocument()
  })

  it('displays date in Turkish', () => {
    render(<App />)
    expect(document.querySelector('.date-text')).toBeInTheDocument()
  })

  it('shows pulse indicator', () => {
    render(<App />)
    expect(screen.getByText('Canlı Senkronizasyon')).toBeInTheDocument()
  })

  it('switches to analog clock when Analog nav clicked', () => {
    render(<App />)
    const analogBtn = screen.getByText('Analog')
    fireEvent.click(analogBtn)
    expect(document.querySelector('.analog-clock')).toBeInTheDocument()
  })

  it('switches back to digital when Dijital nav clicked', () => {
    render(<App />)
    const analogBtn = screen.getByText('Analog')
    fireEvent.click(analogBtn)
    const digitalBtn = screen.getByText('Dijital')
    fireEvent.click(digitalBtn)
    expect(document.querySelector('.digital-time')).toBeInTheDocument()
  })

  it('opens settings when settings button clicked', () => {
    render(<App />)
    const settingsBtn = screen.getByLabelText('Ayarlar')
    fireEvent.click(settingsBtn)
    expect(screen.getByText('Ayarlar')).toBeInTheDocument()
    expect(screen.getByText('Zamanı kontrol etme biçiminizi kişiselleştirin.')).toBeInTheDocument()
  })

  it('returns to clock from settings when back clicked', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    fireEvent.click(screen.getByLabelText('Geri'))
    expect(screen.getByText('CHRONOS')).toBeInTheDocument()
  })

  it('toggles clock type in settings', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    const analogToggle = screen.getByText('Analog')
    fireEvent.click(analogToggle)
    expect(analogToggle).toHaveClass('active')
  })

  it('toggles show seconds in settings', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    const secondsToggle = screen.getByLabelText('Saniye Göster')
    fireEvent.click(secondsToggle)
    expect(secondsToggle).toBeChecked()
  })

  it('toggles 24 hour format in settings', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    const formatToggle = screen.getByLabelText('24 Saat Formatı')
    fireEvent.click(formatToggle)
    expect(formatToggle).toBeChecked()
  })

  it('displays footer links', () => {
    render(<App />)
    expect(screen.getByText('Hakkında')).toBeInTheDocument()
    expect(screen.getByText('Yardım')).toBeInTheDocument()
    expect(screen.getByText('Gizlilik')).toBeInTheDocument()
  })

  it('displays copyright', () => {
    render(<App />)
    expect(screen.getByText('© 2024 The Chronos Editorial')).toBeInTheDocument()
  })
})
