import React, { useState, useRef, useEffect } from 'react';
import { projectsData } from '../utils/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import '../styles/WorksSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function WorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const navigate = useNavigate();
  const displayedProjects = projectsData.slice(0, 5);

  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {
          ScrollTrigger.create({
            trigger: desktopContainerRef.current,
            start: "top top",
            end: "+=50%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const container = desktopContainerRef.current;
    if (!container) return;
    const activeVideo = container.querySelector('.works-visual-item.active video');
    if (activeVideo) activeVideo.play().catch(() => {});
    
    const ctx = gsap.context(() => {
      gsap.fromTo(".meta-row", 
        { opacity: 0, x: -15, filter: "blur(8px)" },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)", 
          stagger: 0.06, 
          duration: 0.8, 
          ease: "power3.out" 
        }
      );
      gsap.fromTo(".tech-pill", 
        { opacity: 0, y: 10, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          stagger: 0.03, 
          duration: 0.6, 
          ease: "back.out(1.4)" 
        }
      );
    }, desktopContainerRef);
    
    return () => ctx.revert();
  }, [activeIndex]);

  const activeProject = displayedProjects[activeIndex];

  return (
    <section id="work" className="works-section-layout" ref={containerRef}>
      {/* DESKTOP VIEW */}
      <div ref={desktopContainerRef} className="works-section-inner works-desktop-view">
        <div className="works-visual-center">
          {displayedProjects.map((project, index) => {
            const isVideo = project.image && (project.image.endsWith('.mp4') || project.image.endsWith('.webm'));
            return (
              <div 
                key={project.id} 
                className={`works-visual-item ${activeIndex === index ? 'active' : ''}`}
              >
                {isVideo ? (
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="visual-media"
                  />
                ) : (
                  <img src={project.image} alt={project.title} className="visual-media" />
                )}
              </div>
            );
          })}
        </div>
        <div className="works-title-block">
          <h2 className="works-huge-title">
            <span className="works-title-part underlined">WO</span>
            <br />
            <span className="works-title-part">RK</span>
          </h2>
        </div>
        <div className="works-nav-list">
          {displayedProjects.map((project, index) => (
            <div 
              key={project.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                navigate(`/work/${project.id}`);
                window.scrollTo(0, 0);
              }}
              className={`works-nav-item ${activeIndex === index ? 'active' : ''}`}
            >
              <span className="nav-text">{project.title}</span>
            </div>
          ))}
        </div>
        <div className="works-meta-info">
          <div className="meta-row">
            <span className="meta-label">Клиент —</span>
            <span className="meta-value">{activeProject?.client}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Работа —</span>
            <span className="meta-value">{activeProject?.role}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Год —</span>
            <span className="meta-value">{activeProject?.year}</span>
          </div>
        </div>
        <div className="works-tech-pills">
          {activeProject?.techStack.map((tech, i) => (
            <div key={i} className="tech-pill">
              {tech}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="works-mobile-view">
        <h2 className="works-mobile-header">Работы</h2>
        <div className="works-mobile-cards">
          {displayedProjects.map(project => {
             const isVideo = project.image && (project.image.endsWith('.mp4') || project.image.endsWith('.webm'));
             return (
               <div key={project.id} className="works-mobile-card" onClick={() => {
                 navigate(`/work/${project.id}`);
                 window.scrollTo(0, 0);
               }}>
                 <div className="works-mobile-card-media">
                   {isVideo ? (
                     <video src={project.image} autoPlay loop muted playsInline className="mobile-media-element" />
                   ) : (
                     <img src={project.image} alt={project.title} className="mobile-media-element" />
                   )}
                   <div className="works-mobile-card-overlay"></div>
                 </div>
                 <div className="works-mobile-card-content">
                   <h3 className="works-mobile-card-title">{project.title}</h3>
                   <div className="works-mobile-card-meta">
                     <span>{project.client}</span>
                     <span>•</span>
                     <span>{project.year}</span>
                   </div>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </section>
  );
}
