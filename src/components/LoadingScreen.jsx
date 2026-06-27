import { useState, useEffect } from 'react';

// Pre-generate raindrop positions (thin black lines)
const RAINDROPS = Array.from({ length: 25 }, (_, i) => ({
  left: `${(i * 4.2 + 1) % 100}%`,
  delay: `${(i * 0.12).toFixed(2)}s`,
  duration: `${(0.6 + (i % 4) * 0.08).toFixed(1)}s`,
  rotation: -15 + (i % 3) * 5,
}));

export default function LoadingScreen({ onLoaded }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // Progress bar animation
  useEffect(() => {
    const start = Date.now();
    const duration = 3200;

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => onLoaded?.(), 800);
        }, 200);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-800 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: '#181818',  // lookback 主色调（深色暖灰）
        transition: 'opacity 0.8s ease-in-out',
      }}
    >
      {/* Thin black line raindrops */}
      {RAINDROPS.map((drop, i) => (
        <div
          key={i}
          className="absolute animate-rain-line"
          style={{
            left: drop.left,
            top: '-40px',
            animationDelay: drop.delay,
            animationDuration: drop.duration,
            transform: `rotate(${drop.rotation}deg)`,
          }}
        >
          <svg width="3" height="50" viewBox="0 0 3 50">
            <line x1="1.5" y1="0" x2="1.5" y2="50" stroke="#f8f8f8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      {/* Running character - video */}
      <div className="relative z-10 mb-6">
        <video
          src="/loading_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          alt="Loading animation"
          style={{
            width: '300px',
            height: 'auto',
            filter: 'drop-shadow(0 0 20px rgba(232, 184, 104, 0.3))', // 暖色发光
          }}
        />
      </div>

      {/* Hand-drawn progress bar */}
      <div className="relative z-10 w-56 mt-2">
        {/* Label text */}
        <p
          className="text-center mb-2 text-sm tracking-wider"
          style={{
            fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", cursive',
            color: '#f8f8f8',  // 改为浅色（深色背景）
            fontWeight: 600,
            letterSpacing: '2px',
          }}
        >
          RUNNING...
        </p>

        {/* Progress track (hand-drawn wobble effect) */}
        <svg width="224" height="18" viewBox="0 0 224 18">
          {/* Track background - slightly irregular hand-drawn look */}
          <path
            d="M3,9 Q56,5 112,9 T221,9"
            fill="none"
            stroke="#383828"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Progress fill - hand-drawn style */}
          <clipPath id="progressClip">
            <rect x="0" y="0" width={`${progress * 2.18}`} height="18" />
          </clipPath>
          <path
            d="M3,9 Q56,5 112,9 T221,9"
            fill="none"
            stroke="#e8b868"  // 暖色进度条（lookback风格）
            strokeWidth="6"
            strokeLinecap="round"
            clipPath="url(#progressClip)"
          />
        </svg>

        {/* Percentage text */}
        <p
          className="text-center mt-1 text-xs opacity-60"
          style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive', color: '#e8e8e8' }}
        >
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
