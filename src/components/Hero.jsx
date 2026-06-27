import { useEffect, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Center Content */}
      <div
        className={`content-wrapper relative z-10 text-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Tag */}
        <div className="inline-block px-4 py-1.5 mb-8 border border-[var(--color-accent)]/20 rounded-full text-[var(--color-accent)] text-xs tracking-[3px] uppercase">
          Game · AI · Brand Designer
        </div>

        {/* Main Title */}
        <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight mb-6">
          <span className="text-white">Crafting </span>
          <span className="glow-text" style={{ color: 'var(--color-accent)' }}>
            Player
          </span>
          <br />
          <span className="text-white">Experiences</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          视觉设计师 / AI设计师 / 品牌设计师
          <br />
          用数据驱动设计，用设计赋能游戏体验
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-outline">
            Get in Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mt-20">
          <span className="text-[var(--color-text-secondary)] text-xs tracking-wider uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 border border-[var(--color-text-secondary)]/30 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-[var(--color-accent)] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
