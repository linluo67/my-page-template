import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  // 保存原始的 document.body.innerHTML 以便恢复
  let originalBodyHTML: string;

  beforeEach(() => {
    originalBodyHTML = document.body.innerHTML;
    // 重置 userAgent 为桌面端
    Object.defineProperty(window, 'navigator', {
      writable: true,
      value: {
        ...window.navigator,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
      },
    });
  });

  afterEach(() => {
    // 恢复 body 内容
    document.body.innerHTML = originalBodyHTML;
    vi.clearAllMocks();
  });

  describe('Desktop Environment', () => {
    it('should render main layout components', () => {
      const { container } = render(<App />);

      // 验证 Header 组件渲染（通过检查页面标题或关键元素）
      expect(screen.getByText(/Hello, 我叫刘宇阳/i)).toBeInTheDocument();

      // 验证 Wall 区域的评价标题
      expect(screen.getByText(/来自诸多网友对我的评价/i)).toBeInTheDocument();

      // 验证固定背景容器存在
      const fixedContainer = container.querySelector('.fixed.top-0.left-0');
      expect(fixedContainer).toBeInTheDocument();
    });

    it('should render rotating text component with career titles', () => {
      render(<App />);

      // 验证职业身份文本存在
      expect(screen.getByText(/我是一名 02 年的/i)).toBeInTheDocument();
    });

    it('should render personal description using document body text', () => {
      render(<App />);

      // 由于 SplitText 组件将文本拆分成单个字符，使用 body.textContent 进行验证
      const bodyText = document.body.textContent || '';
      expect(bodyText).toContain('架构师');
      expect(bodyText).toContain('梦想');
    });

    it('should render external links', () => {
      render(<App />);

      // 验证外部链接存在
      const blogLink = screen.getByText(/个人博客/i);
      const githubLink = screen.getByText(/GitHub/i);

      expect(blogLink).toBeInTheDocument();
      expect(blogLink.closest('a')).toHaveAttribute('href', 'https://liuyuyang.net');
      expect(blogLink.closest('a')).toHaveAttribute('target', '_blank');

      expect(githubLink).toBeInTheDocument();
      expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/LiuYuYang01');
      expect(githubLink.closest('a')).toHaveAttribute('target', '_blank');
    });

    it('should render project showcase section', () => {
      render(<App />);

      // 验证项目展示区域标题
      expect(screen.getByText(/我的作品/i)).toBeInTheDocument();
    });

    it('should render tech stack section', () => {
      render(<App />);

      // 验证技术栈描述文本 - 使用实际存在的文本
      expect(screen.getByText(/毕生所学/i)).toBeInTheDocument();
    });

    it('should render location information', () => {
      render(<App />);

      // 验证位置信息
      expect(screen.getByText(/浙江/i)).toBeInTheDocument();
      expect(screen.getByText(/宁波/i)).toBeInTheDocument();
    });

    it('should render passion quote', () => {
      render(<App />);

      // 验证热爱引言
      expect(screen.getByText(/热爱/i)).toBeInTheDocument();
      expect(screen.getByText(/是所有的理由与解释/i)).toBeInTheDocument();
    });

    it('should render open source author section', () => {
      render(<App />);

      // 验证开源作者身份
      expect(screen.getByText(/开源项目作者/i)).toBeInTheDocument();
    });
  });

  describe('Mobile Environment', () => {
    it('should show mobile warning message and prevent main content rendering', () => {
      // 模拟移动端 userAgent
      Object.defineProperty(window, 'navigator', {
        writable: true,
        value: {
          ...window.navigator,
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
        },
      });

      render(<App />);

      // 验证移动端提示信息存在（使用更宽松的断言方式）
      const bodyText = document.body.textContent || '';
      expect(bodyText).toContain('电脑');
      expect(bodyText).toContain('访问');

      // 验证主内容未被渲染（通过检查桌面端特有的元素不存在）
      expect(screen.queryByText(/Hello, 我叫刘宇阳/i)).not.toBeInTheDocument();
    });

    it('should handle Android mobile devices', () => {
      // 模拟 Android userAgent
      Object.defineProperty(window, 'navigator', {
        writable: true,
        value: {
          ...window.navigator,
          userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36',
        },
      });

      render(<App />);

      // 验证移动端提示信息
      const bodyText = document.body.textContent || '';
      expect(bodyText).toContain('电脑');
    });

    it('should handle iPad as mobile device', () => {
      // 模拟 iPad userAgent
      Object.defineProperty(window, 'navigator', {
        writable: true,
        value: {
          ...window.navigator,
          userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
        },
      });

      render(<App />);

      // 验证移动端提示信息
      const bodyText = document.body.textContent || '';
      expect(bodyText).toContain('电脑');
    });
  });

  describe('Component Integration', () => {
    it('should initialize AOS animation library on mount', () => {
      const { container } = render(<App />);

      // 验证带有 data-aos 属性的元素存在（AOS 动画元素）
      const aosElements = container.querySelectorAll('[data-aos]');
      expect(aosElements.length).toBeGreaterThan(0);
    });

    it('should render fixed background container', () => {
      const { container } = render(<App />);

      // 验证固定定位的背景容器存在
      const fixedContainer = container.querySelector('.fixed.top-0.left-0');
      expect(fixedContainer).toBeInTheDocument();
    });
  });
});
