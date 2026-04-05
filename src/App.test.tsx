import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AnalogClock, DigitalClock, Settings } from './components'

describe('DigitalClock', () => {
  it('renders without crashing', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<DigitalClock time={time} />)
    expect(screen.getByTestId('digital-clock')).toBeInTheDocument()
  })

  it('displays the time', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<DigitalClock time={time} />)
    expect(screen.getByTestId('time-display')).toBeInTheDocument()
  })

  it('displays the date', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<DigitalClock time={time} />)
    expect(screen.getByTestId('date-text')).toBeInTheDocument()
  })
})

describe('AnalogClock', () => {
  it('renders without crashing', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<AnalogClock time={time} />)
    expect(screen.getByTestId('analog-clock')).toBeInTheDocument()
  })

  it('renders SVG clock face', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<AnalogClock time={time} />)
    expect(document.querySelector('svg')).toBeInTheDocument()
  })
})

describe('Settings', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Settings currentView="digital" onViewChange={() => {}} />
      </BrowserRouter>
    )
    expect(screen.getByTestId('settings-view')).toBeInTheDocument()
  })

  it('calls onViewChange when digital toggle clicked', () => {
    const mockChange = vi.fn()
    render(
      <BrowserRouter>
        <Settings currentView="analog" onViewChange={mockChange} />
      </BrowserRouter>
    )
    fireEvent.click(screen.getByTestId('digital-toggle'))
    expect(mockChange).toHaveBeenCalledWith('digital')
  })

  it('calls onViewChange when analog toggle clicked', () => {
    const mockChange = vi.fn()
    render(
      <BrowserRouter>
        <Settings currentView="digital" onViewChange={mockChange} />
      </BrowserRouter>
    )
    fireEvent.click(screen.getByTestId('analog-toggle'))
    expect(mockChange).toHaveBeenCalledWith('analog')
  })

  it('toggles seconds display', () => {
    render(
      <BrowserRouter>
        <Settings currentView="digital" onViewChange={() => {}} />
      </BrowserRouter>
    )
    const secondsToggle = screen.getByTestId('seconds-toggle')
    expect(secondsToggle).toBeInTheDocument()
    fireEvent.click(secondsToggle)
  })

  it('toggles 24h format', () => {
    render(
      <BrowserRouter>
        <Settings currentView="digital" onViewChange={() => {}} />
      </BrowserRouter>
    )
    const toggle24h = screen.getByTestId('24h-toggle')
    expect(toggle24h).toBeInTheDocument()
    fireEvent.click(toggle24h)
  })
})
