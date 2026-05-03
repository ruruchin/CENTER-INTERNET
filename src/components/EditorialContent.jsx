import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import {
  SiVuedotjs, SiNuxt, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiJquery, SiSvelte,
  SiPhp, SiLaravel, SiSymfony, SiRuby, SiRubyonrails, SiNodedotjs
} from 'react-icons/si';
import '../styles/EditorialContent.css';
export default function EditorialContent() {
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".unmarked-text",
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
      gsap.fromTo(".model-img",
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".models-container",
            start: "top 80%",
          }
        }
      );
      gsap.fromTo(".ai-ref-text",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".ai-section-new",
            start: "top 75%",
          }
        }
      );
      gsap.fromTo(".ai-ref-fade",
        { scale: 1.05, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".ai-section-new",
            start: "top 75%",
          }
        }
      );
      const aiSection = document.querySelector(".ai-section-new");
      const videoReveal = document.querySelector(".ai-video-reveal-container");
      if (aiSection && videoReveal) {
        const aiTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".ai-section-pinned-wrapper",
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: true,
          }
        });
        aiTl.fromTo(videoReveal,
          { y: "-100%", borderRadius: "0 0 10vw 10vw" },
          { y: "0%", borderRadius: "0px", ease: "none", duration: 1 }
        );
        aiTl.to({}, { duration: 0.5 });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const scrollToCenter = () => {
      const centerCard = scroller.querySelector('.editorial-stat-card-wrapper.center');
      if (centerCard && window.innerWidth < 768) {
        const prevBehavior = scroller.style.scrollBehavior;
        scroller.style.scrollBehavior = 'auto';
        const scrollLeft = centerCard.offsetLeft - (scroller.offsetWidth / 2) + (centerCard.offsetWidth / 2);
        scroller.scrollLeft = scrollLeft;
        setTimeout(() => {
          scroller.style.scrollBehavior = prevBehavior;
        }, 50);
      }
    };
    requestAnimationFrame(scrollToCenter);
    setTimeout(scrollToCenter, 300);
  }, []);
  const teamStats = [
    { count: "3", role: "Проектных\nменеджера", type: "side" },
    { count: "3", role: "Дизайнера", type: "side" },
    { count: "9", role: "Back-end\nразработчиков", type: "side" },
    { count: "6", role: "Front-end\nразработчика", type: "center" },
    { count: "2", role: "Dev-ops\nинженера", type: "side" },
    { count: "3", role: "QA\nтестировщика", type: "side" },
    { count: "2", role: "Аналитика", type: "side" }
  ];
  return (
    <section ref={sectionRef} className="editorial-section" id="studio">
      <div className="editorial-container">
        <header className="editorial-header">
          <div className="editorial-number-left">/04</div>
          <div className="editorial-number-right">05/</div>
          <div className="editorial-line editorial-line-large">
            <div className="editorial-word-container"><span className="unmarked-text editorial-pr">УНИКАЛЬНЫЙ ПОДХОД</span></div>
            <div className="editorial-word-container align-right"><span className="unmarked-text">К СОЗДАНИЮ</span></div>
          </div>
          <div className="editorial-line editorial-line-large editorial-line-2">
            <div className="editorial-word-container"><span className="unmarked-text editorial-pr">ПРЕМИАЛЬНЫХ</span></div>
            <div className="editorial-word-container align-right"><span className="unmarked-text">IT-ПРОДУКТОВ</span></div>
          </div>
          <div className="editorial-subtitle">
            <div className="editorial-word-container"><span className="unmarked-text">ОБЪЕДИНЯЯ ЭСТЕТИКУ И ФУНКЦИОНАЛЬНОСТЬ</span></div>
            <div className="editorial-word-container"><span className="unmarked-text editorial-subtitle-mt">В КАЖДОМ РЕШЕНИИ.</span></div>
          </div>
        </header>
      </div>
      <div className="editorial-stats-container models-container">
        <div ref={scrollerRef} className="editorial-stats-scroller">
          {teamStats.map((stat, i) => (
            <div
              key={i}
              className={`editorial-stat-card-wrapper ${stat.type}`}
            >
              <div className={`editorial-stat-card ${stat.type} model-img`}>
                <div className="editorial-stat-count">
                  {stat.count}
                </div>
                <div className="editorial-stat-role">
                  {stat.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="editorial-btn-container">
        <Link to="/join" className="editorial-join-btn">
          хочу к вам
        </Link>
      </div>
      <div className="editorial-container">
        <div className="editorial-tech" id="stack">
          <h2 className="editorial-tech-title">
            Стек технологий
          </h2>
          <div className="editorial-tech-grid">
            <div className="editorial-tech-col">
              <h3 className="editorial-tech-col-title">Front-end</h3>
              <div className="editorial-tech-items">
                <div className="editorial-tech-item">
                  <SiVuedotjs className="editorial-tech-icon" color="#4FC08D" />
                  <span className="editorial-tech-name">vue</span>
                </div>
                <div className="editorial-tech-item">
                  <SiNuxt className="editorial-tech-icon" color="#00DC82" />
                  <span className="editorial-tech-name">nuxt</span>
                </div>
                <div className="editorial-tech-item">
                  <SiJavascript className="editorial-tech-icon" color="#F7DF1E" />
                  <span className="editorial-tech-name">javascript</span>
                </div>
                <div className="editorial-tech-item">
                  <SiTypescript className="editorial-tech-icon" color="#3178C6" />
                  <span className="editorial-tech-name">typescript</span>
                </div>
                <div className="editorial-tech-item">
                  <SiReact className="editorial-tech-icon" color="#61DAFB" />
                  <span className="editorial-tech-name">react</span>
                </div>
                <div className="editorial-tech-item">
                  <SiNextdotjs className="editorial-tech-icon" color="#ffffff" />
                  <span className="editorial-tech-name">next.js</span>
                </div>
                <div className="editorial-tech-item">
                  <SiJquery className="editorial-tech-icon" color="#0769AD" />
                  <span className="editorial-tech-name">jquery</span>
                </div>
                <div className="editorial-tech-item">
                  <SiSvelte className="editorial-tech-icon" color="#FF3E00" />
                  <span className="editorial-tech-name">svelte</span>
                </div>
              </div>
            </div>
            <div className="editorial-tech-col">
              <h3 className="editorial-tech-col-title">Back-end</h3>
              <div className="editorial-tech-items">
                <div className="editorial-tech-item">
                  <SiPhp className="editorial-tech-icon" color="#777BB4" />
                  <span className="editorial-tech-name">php</span>
                </div>
                <div className="editorial-tech-item">
                  <SiLaravel className="editorial-tech-icon" color="#FF2D20" />
                  <span className="editorial-tech-name">laravel</span>
                </div>
                <div className="editorial-tech-item">
                  <SiSymfony className="editorial-tech-icon" color="#ffffff" />
                  <span className="editorial-tech-name">symfony</span>
                </div>
                <div className="editorial-tech-item">
                  <SiRuby className="editorial-tech-icon" color="#CC342D" />
                  <span className="editorial-tech-name">ruby</span>
                </div>
                <div className="editorial-tech-item">
                  <SiRubyonrails className="editorial-tech-icon ruby" color="#CC0000" />
                  <span className="editorial-tech-name">ruby on rails</span>
                </div>
                <div className="editorial-tech-item">
                  <SiNodedotjs className="editorial-tech-icon" color="#339933" />
                  <span className="editorial-tech-name">node.js</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ai-section-pinned-wrapper">
        <div className="ai-section-new">
          <div className="ai-header-group">
            <h2 className="ai-title-massive ai-ref-fade">
              <span className="ai-ref-text">ВНЕДРЯЕМ</span>
            </h2>
            <h2 className="ai-title-massive ai-ref-fade">
              <span className="ai-ref-text">ИСКУССТВЕННЫЙ</span>
            </h2>
            <h2 className="ai-title-massive ai-ref-fade">
              <span className="ai-ref-text">ИНТЕЛЛЕКТ</span>
            </h2>
          </div>
          <div className="ai-footer-group ai-ref-fade">
            <p className="ai-description-centered">
              <span className="ai-ref-text">
                В ваш бизнес. Создаем чат-ботов, системы аналитики, рекомендательные сервисы и умные алгоритмы.
                Автоматизируем рутину, повышаем продажи и находим скрытые закономерности в данных.
                Разработка AI-продуктов под ключ.
              </span>
            </p>
          </div>
          <div className="ai-video-reveal-container">
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              className="ai-video-reveal-element"
            >
              <source src="/assets/Интелект.mp4" type="video/mp4" />
            </video>
            <div className="ai-video-reveal-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
