import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';

interface ScrollAnimatedHeadingProps {
  children: React.ReactNode;
  minFontSize?: number; // 最小字体大小，默认16px
  maxFontSize?: number; // 最大字体大小，默认48px
  startOffset?: number; // 开始动画的偏移量，默认100
  className?: string;
  style?: React.CSSProperties;
}

const ScrollAnimatedHeading: React.FC<ScrollAnimatedHeadingProps> = ({
  children,
  minFontSize = 16,
  maxFontSize = 48,
  startOffset = 100,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 使用 framer-motion 的 useScroll 获取滚动进度
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 使用 useTransform 将滚动进度转换为各种动画值
  const fontSize = useTransform(
    scrollYProgress,
    [0, 1],
    [maxFontSize, minFontSize]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    [startOffset, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 1, 1]
  );

  // 监听 MotionValue 的变化并手动更新 DOM
  useEffect(() => {
    const unsubscribeFontSize = fontSize.on('change', (value) => {
      if (containerRef.current) {
        containerRef.current.style.fontSize = `${value}px`;
      }
    });

    const unsubscribeTranslateY = translateY.on('change', (value) => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${value}px)`;
      }
    });

    const unsubscribeOpacity = opacity.on('change', (value) => {
      if (containerRef.current) {
        containerRef.current.style.opacity = value.toString();
      }
    });

    return () => {
      unsubscribeFontSize();
      unsubscribeTranslateY();
      unsubscribeOpacity();
    };
  }, [fontSize, translateY, opacity]);

  return (
    <div
      ref={containerRef}
      className={`scroll-animated-heading ${className}`}
      style={{
        transformOrigin: 'center bottom',
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimatedHeading;
