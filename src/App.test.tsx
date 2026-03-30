import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import AOS from 'aos'

describe('App', () => {
  const originalUserAgent = navigator.userAgent

  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
      configurable: true,
    })
    document.body.innerHTML = ''
  })

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
      configurable: true,
    })
  })

  it('should initialize AOS on mount', () => {
    render(<App />)
    expect(AOS.init).toHaveBeenCalledWith({
      duration: 2000,
      once: false,
    })
  })

  it('should render main components on desktop', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      writable: true,
      configurable: true,
    })

    render(<App />)

    expect(screen.getByText(/Hello/)).toBeDefined()
    expect(screen.getByText(/刘宇阳/)).toBeDefined()
  })

  it('should show mobile warning on mobile devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      writable: true,
      configurable: true,
    })

    render(<App />)

    const bodyText = document.body.textContent || ''
    expect(bodyText).toContain('电脑')
    expect(bodyText).toContain('访问')
  })

  it('should show mobile warning on Android devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 10; SM-G981F)',
      writable: true,
      configurable: true,
    })

    render(<App />)

    const bodyText = document.body.textContent || ''
    expect(bodyText).toContain('电脑')
  })

  it('should render navigation links on desktop', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      writable: true,
      configurable: true,
    })

    render(<App />)

    const blogLink = screen.getByText('个人博客')
    const githubLink = screen.getByText('GitHub')

    expect(blogLink).toBeDefined()
    expect(githubLink).toBeDefined()
    expect(blogLink.getAttribute('href')).toBe('https://liuyuyang.net')
    expect(githubLink.getAttribute('href')).toBe('https://github.com/LiuYuYang01')
  })
})
