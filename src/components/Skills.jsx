import { useEffect, useRef, useState } from 'react';

const skills = [
  {
    category: '设计能力',
    icon: '🎨',
    items: [
      { name: '视觉设计', level: 90 },
      { name: '品牌设计', level: 85 },
      { name: 'UI/UX 设计', level: 80 },
      { name: 'AI 设计工具', level: 95 },
    ],
  },
  {
    category: '数据分析',
    icon: '📊',
    items: [
      { name: 'SQL / MySQL', level: 90 },
      { name: 'Python 数据清洗', level: 85 },
      { name: 'Power BI / 可视化', level: 80 },
      { name: 'SPSS / 统计建模', level: 85 },
    ],
  },
  {
    category: '游戏理解',
    icon: '🎮',
    items: [
      { name: '商业化系统拆解', level: 95 },
      { name: '竞品分析方法论', level: 90 },
      { name: '玩家心理洞察', level: 85 },
      { name: '多品类游戏经历', level: 95 },
    ],
  },
  {
    category: '工具与技术',
    icon: '🛠️',
    items: [
      { name: 'Office / WPS', level: 95 },
      { name: 'OpenClaw / Skill 开发', level: 80 },
      { name: 'ArcGIS / 可视化', level: 70 },
      { name: 'AI 工具链搭建', level: 90 },
    ],
  },
];

function SkillBar({ name, level, visible, delay }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[var(--color-text-primary)]">{name}</span>
        <span className="text-xs text-[var(--color-accent)] font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-[var(--color-bg-primary)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-purple-500 transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${level}%` : '0%',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 bg-[var(--color-bg-secondary)]/50">
      <div className="content-wrapper">
        {/* Section Header */}
        <div className={`mb-20 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label mb-4">What I Do</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white mt-2">
            个人优势
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-4 max-w-xl">
            设计思维与数据能力的结合，让我能够从不同维度理解产品与用户。
          </p>
          <div className="divider mt-6" />
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, idx) => (
            <div
              key={skill.category}
              className={`skill-card p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="text-lg font-semibold text-white">{skill.category}</h3>
              </div>
              <div>
                {skill.items.map((item, i) => (
                  <SkillBar
                    key={item.name}
                    name={item.name}
                    level={item.level}
                    visible={visible}
                    delay={idx * 150 + i * 120 + 300}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Game Experience Tags */}
        <div className={`mt-20 transition-all duration-1000 delay-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-lg font-semibold text-white mb-6">游戏经历</h3>
          <div className="flex flex-wrap gap-3">
            {['LOL 大师', '王者荣耀 星耀', '金铲铲之战 超凡大师', '瓦洛兰特', '和平精英 铂金', '三角洲', '暗黑破坏神', '黑神话悟空', '蛋仔派对', '元梦之星'].map((game) => (
              <span
                key={game}
                className="px-4 py-2 text-sm rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-all duration-300 cursor-default"
              >
                {game}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
