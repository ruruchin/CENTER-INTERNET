import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './Navigation';
import '../styles/Partners.css';
export default function AtelierSection() {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const navigate = useNavigate();
  const devProjects = [
    {
      id: "project-1",
      title: "Redmine kanban",
      description: "Плагин Kanban-доска для Redmine позволяет эффективно управлять потоком проектов благодаря наглядной визуализации задач, сокращению объема незавершенной работы. Устраняйте узкие места!",
      tech_stack: "Ruby/Ruby on Rails × Vue",
      image_url: "/assets/0_Abstract_Blur_3840x21602-ezgif.com-optimize (1).gif"
    },
    {
      id: "project-2",
      title: "Банк Центр-инвест",
      description: "Новый ресурс отличается современным дизайном, усовершенствованной структурой и удобной системой навигации, что облегчает клиентам поиск нужной информации и упрощает коммуникации с банком.",
      tech_stack: "PHP/Symfony × Nuxt",
      image_url: "/assets/центр-инвест.png"
    },
    {
      id: "project-3",
      title: "CM Expert",
      description: "Построение прозрачных и эффективных систем управления бизнес-процессами. Отслеживание и анализ актуальных цен, рыночных позиций на основных сайтах-агрегаторах в заданном регионе.",
      tech_stack: "NodeJS/Strapi × Nuxt",
      image_url: "/assets/freepik_slow-360-rotation-of-the-subject-around-its-vertical-axis._0001-ezgif.com-optimize.gif"
    },
    {
      id: "project-4",
      title: "Аренда бань",
      description: "Сервис бронирования бани автоматизирует действия сотрудников. Контролировать как оформляются заявки и как на них реагирует персонал можно из любой точки мира.",
      tech_stack: "PHP/Symfony × Vue",
      image_url: "/assets/Банька.gif"
    }
  ];
  const progressBarRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(scrollWrapperRef.current, { willChange: "transform" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWrapperRef.current.scrollWidth}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
      tl.to(scrollWrapperRef.current, {
        x: () => -(scrollWrapperRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        duration: 1,
        force3D: true
      }, 0);
      tl.fromTo(progressBarRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: 1, transformOrigin: "left center", force3D: true },
        0
      );
      tl.to({}, { duration: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={containerRef} className="partners-section" id="partners">
      <div className="partners-progress-container">
        <div className="partners-progress-bar" ref={progressBarRef}></div>
      </div>
      <div ref={scrollWrapperRef} className="partners-scroll-wrapper">
        <div
          className="partners-card bg-1"
          onClick={() => {
            navigate(`/work/${devProjects[0].id}`);
            window.scrollTo(0, 0);
          }}
        >
          <div className="partners-card-action-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {devProjects[0].image_url.endsWith('.mp4') || devProjects[0].image_url.endsWith('.webm') ? (
            <video
              src={devProjects[0].image_url}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              className="partners-card-bg-img"
            />
          ) : (
            <img src={devProjects[0].image_url} alt={devProjects[0].title} className="partners-card-bg-img" />
          )}
          <div className="partners-card-top-tags">
            <span>CODE</span>
            <span>WITH</span>
            <span>PASSION</span>
          </div>
          <div className="partners-card-body">
          </div>
          <div className="partners-project-footer">
            <div className="partners-footer-content-left">
              <h3 className="partners-project-footer-title">{devProjects[0].title}</h3>
              <span className="partners-project-footer-stack">{devProjects[0].tech_stack}</span>
              <p className="partners-project-footer-desc">{devProjects[0].description}</p>
            </div>
          </div>
        </div>
        <div
          className="partners-card bg-2"
          onClick={() => {
            navigate(`/work/${devProjects[1].id}`);
            window.scrollTo(0, 0);
          }}
        >
          <div className="partners-card-action-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <img src={devProjects[1].image_url} alt={devProjects[1].title} className="partners-card-bg-img" />
          <div className="partners-card-body full-center">
          </div>
          <div className="partners-project-footer">
            <div className="partners-footer-content-left">
              <h3 className="partners-project-footer-title">{devProjects[1].title}</h3>
              <span className="partners-project-footer-stack">{devProjects[1].tech_stack}</span>
              <p className="partners-project-footer-desc">{devProjects[1].description}</p>
            </div>
          </div>
        </div>
        <div
          className="partners-card bg-3"
          onClick={() => {
            navigate(`/work/${devProjects[2].id}`);
            window.scrollTo(0, 0);
          }}
        >
          <div className="partners-card-action-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {devProjects[2].image_url.endsWith('.mp4') || devProjects[2].image_url.endsWith('.webm') ? (
            <video
              src={devProjects[2].image_url}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              className="partners-card-bg-img"
            />
          ) : (
            <img src={devProjects[2].image_url} alt={devProjects[2].title} className="partners-card-bg-img" />
          )}
          <div className="partners-card-top-tags">
            <span>THINK</span>
            <span>IN</span>
            <span>SYSTEMS</span>
          </div>
          <div className="partners-card-body">
          </div>
          <div className="partners-project-footer">
            <div className="partners-footer-content-left">
              <h3 className="partners-project-footer-title">{devProjects[2].title}</h3>
              <span className="partners-project-footer-stack">{devProjects[2].tech_stack}</span>
              <p className="partners-project-footer-desc">{devProjects[2].description}</p>
            </div>
          </div>
        </div>
        <div
          className="partners-card bg-4"
          onClick={() => {
            navigate(`/work/${devProjects[3].id}`);
            window.scrollTo(0, 0);
          }}
        >
          <div className="partners-card-action-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {devProjects[3].image_url.endsWith('.mp4') || devProjects[3].image_url.endsWith('.webm') ? (
            <video
              src={devProjects[3].image_url}
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              className="partners-card-bg-img"
            />
          ) : (
            <img src={devProjects[3].image_url} alt={devProjects[3].title} className="partners-card-bg-img" />
          )}
          <div className="partners-card-top-tags">
            <span>BUILD</span>
            <span>FOR</span>
            <span>SCALE</span>
          </div>
          <div className="partners-card-body">
          </div>
          <div className="partners-project-footer">
            <div className="partners-footer-content-left">
              <h3 className="partners-project-footer-title">{devProjects[3].title}</h3>
              <span className="partners-project-footer-stack">{devProjects[3].tech_stack}</span>
              <p className="partners-project-footer-desc">{devProjects[3].description}</p>
            </div>
          </div>
        </div>
        <div className="partners-cta-card">
          <video
            src="/assets/ready to.mp4"
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            className="partners-cta-video"
          />
          <div className="partners-cta-overlay"></div>
          <div className="partners-cta-content">
            <h2 className="partners-cta-title">
              Готовы стать<br />Лучше?
            </h2>
            <button
              onClick={() => {
                navigate('/contact');
                window.scrollTo(0, 0);
              }}
              className="partners-cta-btn"
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function FooterLine({ letter, text }) {
  return (
    <div className="partners-footer-line">
      <span className="partners-footer-char">{letter}</span>
      <div className="partners-footer-dash"></div>
      <span>{text}</span>
    </div>
  );
}
