import { render, cleanup } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import App from './App';
import AOS from 'aos';

// 必须在顶层使用 vi.mock，不能引用外部变量
vi.mock('aos', () => ({
  default: {
    init: vi.fn(),
  },
}));

// 模拟静态资源导入
vi.mock('aos/dist/aos.css', () => ({ default: '' }));
vi.mock('./components/Swiper/index.css', () => ({ default: '' }));

// 模拟图片资源
vi.mock('./components/Swiper/assets/images/1.png', () => ({ default: 'test-image-1' }));
vi.mock('./components/Swiper/assets/images/2.png', () => ({ default: 'test-image-2' }));
vi.mock('./components/Swiper/assets/images/3.png', () => ({ default: 'test-image-3' }));
vi.mock('./components/Swiper/assets/images/4.png', () => ({ default: 'test-image-4' }));
vi.mock('./components/Swiper/assets/images/5.png', () => ({ default: 'test-image-5' }));
vi.mock('./components/Swiper/assets/images/6.png', () => ({ default: 'test-image-6' }));

// 模拟字体文件
vi.mock('./assets/font/LXGWWenKai-Regular.ttf', () => ({ default: '' }));

describe('App Component', () => {
  const originalUserAgent = navigator.userAgent;
  const originalInnerHTML = Object.getOwnPropertyDescriptor(Document.prototype, 'innerHTML');

  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
    
    if (originalInnerHTML) {
      Object.defineProperty(document.body, 'innerHTML', originalInnerHTML);
    }
    
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      writable: true,
      configurable: true,
    });
  });

  it('should initialize AOS with correct configuration', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      writable: true,
      configurable: true,
    });

    render(<App />);

    expect(AOS.init).toHaveBeenCalledTimes(1);
    expect(AOS.init).toHaveBeenCalledWith({
      duration: 2000,
      once: false,
    });
  });

  it('should render main components on desktop devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      writable: true,
      configurable: true,
    });

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should display mobile prompt message on mobile devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
      writable: true,
      configurable: true,
    });

    render(<App />);
    expect(document.body.textContent).toMatch(/电脑端|访问|browser/i);
  });

  it('should display mobile prompt message on Android devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
      writable: true,
      configurable: true,
    });

    render(<App />);
    expect(document.body.textContent).toMatch(/电脑|browser/i);
  });

  it('should not modify body content on desktop devices', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      writable: true,
      configurable: true,
    });

    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/手机|移动|mobile/i);
  });

  it('should handle iPad user agent correctly', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
      writable: true,
      configurable: true,
    });

    render(<App />);
    expect(document.body.textContent).toMatch(/电脑端|访问|browser/i);
  });
});
