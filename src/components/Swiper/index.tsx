import React, { useState, useRef } from 'react';
import './index.css';

interface SwiperItem {
  id: number;
  src: string;
  title: string;
  url?: string;
}

const Swiper: React.FC = () => {
  // 定义图片数据
  const swiperItems: SwiperItem[] = [
    {
      id: 1,
      src: 'https://bu.dusays.com/2025/08/29/68b16f22981d4.jpg',
      title: 'ThriveX 博客管理系统 - 控制端（新版）',
      url: 'https://github.com/LiuYuYang01/ThriveX-Admin',
    },
    {
      id: 2,
      src: 'https://bu.dusays.com/2025/08/09/689624f3698af.jpg',
      title: 'ThriveX 博客管理系统 - 前端',
      url: 'https://github.com/LiuYuYang01/ThriveX-Blog',
    },
    {
      id: 3,
      src: 'https://bu.dusays.com/2024/09/17/66e96ca781d49.png',
      title: 'ThriveX 博客管理系统 - 控制端（旧版）',
      url: 'https://github.com/LiuYuYang01/Thrive-Admin',
    },
    {
      id: 4,
      src: 'https://bu.dusays.com/2024/09/18/66ea606eb5aa1.png',
      title: '云上校园项目 - 用户端',
      url: 'https://liuyuyang.net',
    },
    {
      id: 5,
      src: 'https://bu.dusays.com/2024/09/18/66ea605d89df7.png',
      title: '云上校园项目 - 控制端',
      url: 'https://liuyuyang.net',
    },
    {
      id: 6,
      src: 'https://bu.dusays.com/2025/08/29/68b16f22981d4.jpg',
      title: '占位图',
      url: 'https://liuyuyang.net',
    },
    {
      id: 7,
      src: 'https://bu.dusays.com/2025/08/09/689624f3698af.jpg',
      title: '占位图',
      url: 'https://liuyuyang.net',
    },
    {
      id: 8,
      src: 'https://bu.dusays.com/2025/08/09/689624f3698af.jpg',
      title: '占位图',
      url: 'https://liuyuyang.net',
    },
    {
      id: 9,
      src: 'https://bu.dusays.com/2025/08/09/689624f3698af.jpg',
      title: '占位图',
      url: 'https://liuyuyang.net',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(2);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理手动切换
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? swiperItems.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % swiperItems.length);
  };

  // 复制数组以实现无缝滚动效果
  const duplicatedItems = [...swiperItems, ...swiperItems];

  return (
    <div className="swiper-container">
      <h1 className="text-white text-3xl text-center relative top-32">我的作品 🥳</h1>

      <div className="banner" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div
          className="img-wrapper"
          ref={containerRef}
          style={{
            transform: `translateX(-${currentIndex * (25 + 1.78)}vw)`,
            transition: isHovering ? 'none' : 'transform 0.5s ease',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div className="img-box" key={`${item.id}-${index}`} onClick={() => window.open(item.url)}>
              <div className="info">
                <h3>{item.title}</h3>
              </div>
              <img src={item.src} alt={item.title} />
            </div>
          ))}
        </div>
      </div>

      <div className="btn-group">
        <button className="last btn" onClick={handlePrev}>
          <svg className="icon left" viewBox="0 0 1024 1024" width="128" height="128">
            <path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" />
          </svg>
        </button>

        <button className="next btn" onClick={handleNext}>
          <svg className="icon right" viewBox="0 0 1024 1024" width="128" height="128">
            <path d="M862.485 481.154H234.126l203.3-203.3c12.497-12.497 12.497-32.758 0-45.255s-32.758-12.497-45.255 0L135.397 489.373c-12.497 12.497-12.497 32.758 0 45.254l256.774 256.775c6.249 6.248 14.438 9.372 22.627 9.372s16.379-3.124 22.627-9.372c12.497-12.497 12.497-32.759 0-45.255l-203.3-203.301h628.36c17.036 0 30.846-13.81 30.846-30.846s-13.81-30.846-30.846-30.846z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Swiper;
