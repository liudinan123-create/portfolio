import { useEffect, useRef, useState } from 'react';

// ===== 官方 SVG 图标组件 =====
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-[var(--color-accent)]">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-[var(--color-accent)]">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WeChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="mx-auto text-[#07C160]">
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 0 1 .176-.553C23.138 18.358 24 16.672 24 14.783c0-3.149-2.969-5.749-7.062-5.925zm-2.89 2.86c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.983.97-.983zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.983.969-.983z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="mx-auto text-white">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const contactLinks = [
  {
    label: '电子邮件',
    value: 'liudn_ldn@163.com',
    href: 'mailto:liudn_ldn@163.com',
    icon: EmailIcon,
  },
  {
    label: '电话',
    value: '193 8571 6160',
    href: 'tel:+8619385716160',
    icon: PhoneIcon,
  },
  {
    label: '微信',
    value: 'liudn_ldn',
    href: '#',
    icon: WeChatIcon,
  },
  {
    label: 'GITHUB',
    value: 'github.com/liudinan',
    href: 'https://github.com',
    icon: GitHubIcon,
  },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('感谢您的留言！由于这是静态网站，表单提交功能需要后端支持。请直接发邮件至 liudn_ldn@163.com');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative contact-fullscreen bg-[var(--color-bg-primary)]/60"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 blur-[150px] rounded-full" />

      <div className="content-wrapper relative z-10 text-center">
        {/* Small label */}
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="section-label mb-4">Get in Touch</p>
        </div>

        {/* Main Headline */}
        <h2
          className={`text-[clamp(2.2rem,5vw,4.5rem)] font-bold text-white leading-tight mt-4 mb-6 transition-all duration-1000 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          让我们一起
          <br />
          <span className="glow-text" style={{ color: 'var(--color-accent)' }}>
            创造更好的游戏体验
          </span>
        </h2>

        <p
          className={`text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto mb-16 leading-relaxed transition-all duration-1000 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          无论是竞品分析、商业化设计，还是数据驱动的运营策略研究，
          <br className="hidden md:block" />
          我都期待与您交流。
        </p>

        {/* Contact Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group p-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent)]/40 transition-all duration-300 text-center block"
            >
              <div className="flex justify-center mb-3">{<link.icon />}</div>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1 uppercase tracking-wider">
                {link.label}
              </div>
              <div className="text-sm text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {link.value}
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 delay-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="mailto:liudn_ldn@163.com"
            className="btn-primary inline-block text-base px-10 py-4"
          >
            <EmailIcon />
            <span className="ml-2">发邮件联系我</span>
          </a>
        </div>

        {/* Footer */}
        <div
          className={`mt-24 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-secondary)]/60 transition-all duration-1000 delay-1000 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span>© 2026 刘弟楠. All rights reserved.</span>
          <span>Visual Designer · AI Designer · Brand Designer</span>
        </div>
      </div>
    </section>
  );
}
