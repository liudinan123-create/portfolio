import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: '《超自然行动组》商业化拆解报告',
    category: '腾讯星跃实战营 · 个人课题研究',
    description: '以商业化三要素（资源、功能、投放）为核心框架，通过付费分层逻辑量化各层转化路径，产出完整商业系统研究报告。',
    tags: ['商业化分析', '付费分层', '活动运营'],
    link: 'https://docs.qq.com/pdf/DVWhxS0xMQk1ud2FV',
    color: '#00d4ff',
    image: '/cszr-cover.jpg',
  },
  {
    id: 2,
    title: '《绝区零》2.5版本运营拆解与用户增长研究',
    category: '个人研究',
    description: '构建版本收益评估模型，收集整合B站/TapTap等多渠道用户评价，产出3类核心受众用户画像，提炼可复刻活动运营方法论。',
    tags: ['版本分析', '用户画像', '舆情监控'],
    link: 'https://docs.qq.com/pdf/DVVBwV3pKUVZmdXVI',
    color: '#a855f7',
    image: '/zzz-cover.jpg',
  },
  {
    id: 3,
    title: '《明日方舟》系统拆解 - 塔防游戏的养成与内容架构',
    category: '个人研究',
    description: '系统梳理"升级-精英化-技能"核心养成线，还原关卡难度递进逻辑，提出"EX技能"新增养成点设计方案。',
    tags: ['系统拆解', '关卡设计', '养成设计'],
    link: 'https://docs.qq.com/pdf/DVVptTFVKWWtMdnV5',
    color: '#10b981',
  },
  {
    id: 4,
    title: 'Bilibili 动漫区业务监控看板',
    category: 'Bilibili 数据分析实习',
    description: '设计动漫区业务监控看板（8项核心指标），通过SQL实现自动化数据管道，报表生成效率提升90%，相关番剧播放量环比提升15%。',
    tags: ['数据看板', 'SQL自动化', '用户增长'],
    color: '#f59e0b',
  },
];

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
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
    <section id="projects" ref={sectionRef} className="relative py-32 bg-[var(--color-bg-primary)]/60">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[var(--color-accent)]/3 blur-[120px] rounded-full" />

      <div className="content-wrapper relative">
        {/* Section Header */}
        <div className={`mb-20 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label mb-4">Selected Works</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white mt-2">
            精选项目
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-4 max-w-xl">
            从竞品分析到商业化拆解，从数据看板到用户研究——每一份报告都是深度思考的产物。
          </p>
          <div className="divider mt-6" />
        </div>

        {/* Project Grid - Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`project-card group relative overflow-hidden rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card Image */}
              <div
                className="relative h-64 overflow-hidden flex items-center justify-center"
                style={project.image
                  ? { backgroundImage: `url('${project.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)` }
                }
              >
                {/* Gradient overlay for image cards to ensure text readability */}
                {project.image && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                )}
                {/* Decorative elements for non-image cards */}
                {!project.image && (
                  <>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `radial-gradient(circle at 30% 50%, ${project.color}40 0%, transparent 60%)`,
                    }} />
                    <div className="relative z-10 text-6xl opacity-30">
                      {idx === 0 && '📊'}
                      {idx === 1 && '🎮'}
                      {idx === 2 && '🔍'}
                      {idx === 3 && '📈'}
                    </div>
                  </>
                )}
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-[var(--color-bg-primary)]/80 flex items-center justify-center gap-4 transition-all duration-500 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    查看报告 ↗
                  </a>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                  <span className="text-xs text-[var(--color-text-secondary)] tracking-wider uppercase">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>
                {/* Tags - each with unique color */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => {
                    const tagStyles = [
                      { bg: '#f97316', text: '#fff' },  // 橙色
                      { bg: '#eab308', text: '#222' },  // 黄色
                      { bg: '#10b981', text: '#fff' },  // 绿色
                      { bg: '#3b82f6', text: '#fff' },  // 蓝色
                      { bg: '#ec4899', text: '#fff' },  // 粉色
                      { bg: '#a855f7', text: '#fff' },  // 紫色
                      { bg: '#ef4444', text: '#fff' },  // 红色
                      { bg: '#06b6d4', text: '#fff' },  // 青色
                      { bg: '#84cc16', text: '#222' },  // 黄绿
                    ];
                    const ts = tagStyles[tIdx % tagStyles.length];
                    return (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-md font-medium"
                        style={{ backgroundColor: ts.bg, color: ts.text }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
