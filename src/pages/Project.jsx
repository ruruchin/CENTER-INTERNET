import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import { projectsData } from '../utils/data';
import Navigation from '../components/Navigation';
import CreativeFooter from '../components/CreativeFooter';
import '../styles/Project.css';
gsap.registerPlugin(ScrollTrigger);
export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === id);
  const containerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0); 
    document.documentElement.scrollTop = 0;
    setTimeout(() => window.scrollTo(0, 0), 10);
    if (project) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".project-title-char", 
          { y: 150, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.03, ease: "power4.out", delay: 0.2 }
        );
        gsap.fromTo(".project-dark-hero-image-wrapper",
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.1 }
        );
        gsap.utils.toArray('.reveal-up').forEach(element => {
          gsap.fromTo(element, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 85%" }
            }
          );
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [project]);
  if (!project) {
    return (
      <div className="project-not-found">
        <h1 className="project-not-found-title">Проект не найден</h1>
        <button onClick={() => navigate('/')} className="project-not-found-back">Вернуться назад</button>
      </div>
    );
  }
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  return (
    <ReactLenis key={id} root options={{ lerp: 0.12, duration: 1.2, smoothWheel: true, syncTouch: true }}>
      <main className="project-dark-main" ref={containerRef}>
        <Navigation />
        <article className="project-dark-container">
          <header className="project-dark-hero">
            <Link to="/" state={{ scrollTo: 'partners' }} className="project-dark-back">
              <svg className="back-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span className="back-text">Назад к работам</span>
            </Link>
            <div className="project-dark-hero-image-wrapper">
               {project.image && (project.image.endsWith('.mp4') || project.image.endsWith('.webm')) ? (
                 <video
                   src={project.image}
                   autoPlay loop muted playsInline disablePictureInPicture disableRemotePlayback
                   className="project-dark-hero-image"
                 />
               ) : (
                 <div className="project-dark-hero-image" style={{ backgroundImage: `url("${project.image}")` }}></div>
               )}
               <div className="project-dark-hero-overlay"></div>
            </div>
            <h1 className="project-dark-hero-title" aria-label={project.title}>
               {project.title.split(' ').map((word, wordIndex) => (
                 <span key={wordIndex} className="project-title-word">
                   {word.split('').map((char, charIndex) => (
                     <span key={charIndex} className="project-title-char">
                       {char}
                     </span>
                   ))}
                 </span>
               ))}
            </h1>
            <div className="project-dark-hero-meta reveal-up">
              <div className="meta-item"><span>Клиент</span>{project.client}</div>
              <div className="meta-item"><span>Год</span>{project.year}</div>
              <div className="meta-item"><span>Роль</span>{project.role}</div>
            </div>
          </header>
          <section className="project-dark-overview">
            <div className="overview-container">
              <h2 className="overview-label reveal-up">Обзор</h2>
              <div className="overview-text reveal-up">
                {project.longread.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
          <section className="project-dark-details reveal-up">
            <div className="details-column">
              <h3 className="details-label">Стек технологий</h3>
              <ul className="details-list">
                {project.techStack.map((tech, i) => <li key={i}>{tech}</li>)}
              </ul>
            </div>
            <div className="details-column">
              <h3 className="details-label">Команда</h3>
              <ul className="details-list">
                {project.team.map((member, i) => <li key={i}><span>{member.role}</span> {member.name}</li>)}
              </ul>
            </div>
            <div className="details-column">
              <h3 className="details-label">Результат</h3>
              <ul className="details-list">
                {project.metrics.map((metric, i) => <li key={i}><span>{metric.label}</span> {metric.value}</li>)}
              </ul>
            </div>
          </section>
          <section className="project-dark-gallery">
            {project.gallery.slice(0, 1).map((img, i) => {
              const isVideo = img && (img.endsWith('.mp4') || img.endsWith('.webm'));
              const layoutType = i % 4; 
              return (
                <div key={i} className={`gallery-item layout-${layoutType} reveal-up`}>
                  <div className="gallery-image-wrapper">
                    {isVideo ? (
                      <video
                        src={img}
                        autoPlay loop muted playsInline disablePictureInPicture disableRemotePlayback
                        className="gallery-image"
                      />
                    ) : (
                      <div className="gallery-image" style={{ backgroundImage: `url("${img}")` }}></div>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
          <Link 
            to={`/work/${nextProject.id}`} 
            className="project-dark-next reveal-up"
            onClick={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
              }, 10);
            }}
          >
            <div className="next-bg-media">
               {nextProject.image && (nextProject.image.endsWith('.mp4') || nextProject.image.endsWith('.webm')) ? (
                 <video
                   src={nextProject.image}
                   autoPlay loop muted playsInline disablePictureInPicture disableRemotePlayback
                   className="next-bg-video"
                 />
               ) : (
                 <div className="next-bg-image" style={{ backgroundImage: `url("${nextProject.image}")` }}></div>
               )}
            </div>
            <div className="next-overlay"></div>
            <div className="next-content">
               <h4 className="next-label">Следующий проект</h4>
               <div className="next-title-wrapper">
                 <h2 className="next-title">{nextProject.title}</h2>
                 <svg className="next-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
               </div>
            </div>
          </Link>
        </article>
        <CreativeFooter />
      </main>
    </ReactLenis>
  );
}
