import { useEffect, useRef, useState } from 'react';
import avatarImg from '../assets/avatar.jpg';

const stats = [
  { number: '10+', label: '头部游戏竞品监控' },
  { number: '82万+', label: '评论舆情数据处理' },
  { number: '90%', label: '数据分析效率提升' },
  { number: '5+', label: '专项研究报告' },
];

const experiences = [
  {
    period: '2026.02 - 至今',
    company: '腾讯 IEG 互动娱乐事业群',
    role: '数据运营',
    description: '从零构建竞品监控体系，AI驱动情感分析SOP，掌握商业化全链路拆解方法论。',
  },
  {
    period: '2025.11 - 2025.12',
    company: '个人研究',
    role: '《绝区零》版本运营拆解',
    description: '构建版本收益评估模型，深度拆解新角色活动运营策略，产出可复刻运营方法论。',
  },
  {
    period: '2025.09 - 2025.10',
    company: '个人研究',
    role: '《明日方舟》系统拆解',
    description: '系统梳理养成线与关卡设计逻辑，提出"EX技能"新增养成点设计方案。',
  },
  {
    period: '2024.02 - 2024.04',
    company: 'Bilibili（上海）',
    role: '数据分析实习生',
    description: '设计动漫区业务监控看板，通过SQL实现数据自动化，报表生成效率提升90%。',
  },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 bg-[var(--color-bg-secondary)]/50">
      <div className="content-wrapper">
        {/* Section Header */}
        <div className={`mb-20 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label mb-4">About Me</p>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-white mt-2">
            关于我
          </h2>
          <div className="divider mt-6" />
        </div>

        {/* Main Content: Avatar + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Avatar Area */}
          <div className={`lg:col-span-5 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 border border-[var(--color-accent)]/10 rounded-2xl" />
              <div className="absolute -inset-8 border border-[var(--color-accent)]/5 rounded-3xl" />
              {/* Avatar */}
              <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 bg-[var(--color-bg-card)] rounded-2xl overflow-hidden border border-[var(--color-border)]">
                <img
                  src={avatarImg}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-semibold text-white mb-4">
              刘弟楠
            </h3>
            <p className="text-[var(--color-accent)] text-sm tracking-wider uppercase mb-6">
              Visual Designer · AI Designer · Brand Designer
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
              东北师范大学（211/双一流）环境科学学士，现任职于腾讯IEG互动娱乐事业群从事数据运营工作。
              擅长竞品分析、商业化系统拆解、AI驱动的数据分析流程设计。同时具备视觉设计、
              AI设计工具开发（Skill开发）及品牌设计能力，致力于用数据驱动设计决策。
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
              10年+游戏经历，涵盖MOBA、策略、FPS、RPG等多品类，深度理解玩家心理与游戏机制设计。
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-accent)]">📧</span>
                <span>liudn_ldn@163.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-accent)]">📱</span>
                <span>193 8571 6160</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-accent)]">📍</span>
                <span>中国</span>
              </div>
            </div>

            {/* Resume Download */}
            <a
              href="#"
              className="btn-outline inline-block text-sm"
              onClick={(e) => e.preventDefault()}
            >
              ↓ 下载简历 PDF
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-300"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="text-[var(--color-text-secondary)] text-sm mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className={`mt-24 transition-all duration-1000 delay-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl font-semibold text-white mb-10">工作经历</h3>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="group relative pl-8 border-l-2 border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-colors duration-300" />
                <div className="text-[var(--color-accent)] text-sm font-mono mb-1">
                  {exp.period}
                </div>
                <h4 className="text-white font-medium mb-1">
                  {exp.company}
                  <span className="text-[var(--color-text-secondary)] font-normal ml-2 text-sm">
                    · {exp.role}
                  </span>
                </h4>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
