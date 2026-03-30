import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock AOS library
vi.mock('aos', () => ({
  default: {
    init: vi.fn(),
  },
}));

// Mock CSS imports
vi.mock('aos/dist/aos.css', () => ({}));

// Mock react-icons
vi.mock('react-icons/cg', () => ({
  CgChevronDoubleDown: () => null,
}));

// Mock ogl (WebGL library used by LightRays)
vi.mock('ogl', () => ({
  Renderer: vi.fn(() => ({
    gl: { canvas: document.createElement('canvas') },
    setSize: vi.fn(),
    render: vi.fn(),
  })),
  Program: vi.fn(() => ({})),
  Triangle: vi.fn(() => ({})),
  Mesh: vi.fn(() => ({})),
}));

// Mock gsap
const createTimeline = () => {
  const tl = {
    to: vi.fn(() => tl),
    from: vi.fn(() => tl),
    fromTo: vi.fn(() => tl),
    set: vi.fn(() => tl),
    add: vi.fn(() => tl),
    call: vi.fn(() => tl),
    pause: vi.fn(() => tl),
    play: vi.fn(() => tl),
    kill: vi.fn(),
  };
  return tl;
};

vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    to: vi.fn(),
    from: vi.fn(),
    fromTo: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(createTimeline),
    killTweensOf: vi.fn(),
  },
  SplitText: vi.fn(() => ({
    chars: [],
    words: [],
    lines: [],
    split: vi.fn(),
    revert: vi.fn(),
  })),
  ScrollTrigger: {
    create: vi.fn(),
    refresh: vi.fn(),
    killAll: vi.fn(),
  },
}));

// Mock framer-motion
const createMotionValue = (initialValue: number) => ({
  get: () => initialValue,
  set: vi.fn(),
  on: vi.fn(() => vi.fn()),
});

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    a: 'a',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  useScroll: () => ({
    scrollYProgress: createMotionValue(0),
  }),
  useTransform: () => createMotionValue(0),
  useSpring: () => createMotionValue(0),
  useMotionValue: (initial: number) => createMotionValue(initial),
}));

// Mock react-icon-cloud
vi.mock('react-icon-cloud', () => ({
  Cloud: ({ children }: { children: React.ReactNode }) => children,
  fetchSimpleIcons: vi.fn(() => Promise.resolve({ simpleIcons: {} })),
  renderSimpleIcon: vi.fn(() => null),
}));

// Mock axios
vi.mock('@/utils/request', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { data: { result: [] } } })),
    get: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

// Mock react-masonry-css
vi.mock('react-masonry-css', () => ({
  default: ({ children }: { children: React.ReactNode }) => {
    // eslint-disable-next-line react/react-in-jsx-scope
    return React.createElement('div', { 'data-testid': 'masonry-grid' }, children);
  },
}));

// Mock matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock navigator.userAgent for mobile detection tests
Object.defineProperty(window, 'navigator', {
  writable: true,
  value: {
    ...window.navigator,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
  },
});
