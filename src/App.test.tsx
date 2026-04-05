import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders digital time', () => {
    const fixedDate = new Date('2026-04-06T12:30:45')
    vi.setSystemTime(fixedDate)
    render(<App />)
    expect(screen.getByText(/12:30:45/)).toBeTruthy()
  })

  it('renders date in Turkish', () => {
    const fixedDate = new Date('2026-04-06T12:30:45')
    vi.setSystemTime(fixedDate)
    render(<App />)
    expect(screen.getByText(/ Pazartesi/)).toBeTruthy()
  })

  it('renders settings button', () => {
    render(<App />)
    const settingsBtn = screen.getByRole('button', { name: 'Ayarlar' })
    expect(settingsBtn).toBeTruthy()
  })

  it('toggles settings panel', () => {
    render(<App />)
    const settingsBtn = screen.getByRole('button', { name: 'Ayarlar' })
    act(() => {
      settingsBtn.click()
    })
    expect(screen.getByRole('heading', { name: 'Ayarlar' })).toBeTruthy()
  })
})
