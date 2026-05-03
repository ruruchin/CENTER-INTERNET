import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import Spline from '@splinetool/react-spline';
import Navigation from '../components/Navigation';
import AtelierSection from '../components/Partners';
import EditorialContent from '../components/EditorialContent';
import WorksSection from '../components/WorksSection';
import CreativeFooter from '../components/CreativeFooter';
import '../styles/Home.css';
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const location = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    const handleUnload = () => window.scrollTo(0, 0);
    window.addEventListener('beforeunload', handleUnload);
    if (location.state && location.state.scrollTo) {
      const id = location.state.scrollTo.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { lerp: 0.1, duration: 2 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      window.history.replaceState({}, document.title);
    } else {
      window.scrollTo(0, 0);
      if (lenis) lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        if (lenis) lenis.scrollTo(0, { immediate: true });
      });
      setTimeout(() => {
        window.scrollTo(0, 0);
        if (lenis) lenis.scrollTo(0, { immediate: true });
      }, 10);
    }
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [location, lenis]);
  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.2, smoothWheel: true, syncTouch: true }}>
      <main className="home-main">
        <Navigation />
        <article className="home-container">
          <HeroSection />
          <AtelierSection />
          <StickyVideoSection />
          <WorksSection />
          <ClientRibbon />
          <EditorialContent />
        </article>
        <CreativeFooter />
      </main>
    </ReactLenis>
  );
}
function ClientRibbon() {
  return (
    <aside className="home-client-ribbon">
      <div className="home-client-ribbon-inner">
        <div className="home-animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="home-client-logo-wrapper">
              <img
                src="/assets/clients-logos.png"
                alt="Client Logos"
                className="home-client-logo-img"
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
function HeroSection() {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-star",
        { rotate: -90, scale: 0, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1, duration: 2, ease: "power4.out" }
      );
      gsap.fromTo(".hero-title-line",
        { y: "150%" },
        { y: "0%", duration: 1.5, stagger: 0.1, ease: "power4.out", delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <header ref={containerRef} className="home-hero-section">
      <div className="home-hero-bg">
          <div className="home-hero-spline-container">
          </div>
        <div className="home-hero-vignette"></div>
      </div>
      <div className="home-hero-star-wrapper">
        <svg className="hero-star" viewBox="0 0 100 100">
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
          <line x1="18" y1="18" x2="82" y2="82" />
          <line x1="18" y1="82" x2="82" y2="18" />
        </svg>
      </div>
      <div className="home-hero-bottom-lockup">
        <div className="home-hero-paragraph">
          Разработка продуктов — это идея, которая звучит невероятно вдохновляюще в теории. Подобно синоптикам или дизайнерам одежды, мы берем на себя ответственность предсказывать будущее, твердо стоя в гуще непредсказуемого настоящего.
        </div>
        <div className="home-hero-title-right">
          <h1 className="home-hero-h1-1">
            <div className="home-hero-line-overflow-1"><span className="hero-title-line">ИСКУССТВО СОЗДАНИЯ</span></div>
          </h1>
          <h1 className="home-hero-h1-2">
            <div className="home-hero-line-overflow-2"><span className="hero-title-line">DIGITAL ПРОДУКТОВ</span></div>
          </h1>
        </div>
      </div>
    </header>
  );
}
function StickyVideoSection() {
  const sectionRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null); 
  const textRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(err => console.log("Autoplay prevented:", err));
    }
    
    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%", 
            pin: true,
            pinSpacing: true, 
            scrub: true,
          }
        });
        tl.to(videoWrapperRef.current, { width: "100%", height: "100%", borderRadius: "0px", ease: "none", duration: 0.6 }, 0);
        tl.to(textRef.current, { opacity: 0, y: -50, ease: "power2.out", duration: 0.3 }, 0);
        tl.to({}, { duration: 0.4 });
      }, sectionRef);
      return () => ctx.revert();
    });
    
    return () => mm.revert();
  }, []);
  return (
    <section ref={sectionRef} className="home-video-section">
      <div ref={textRef} className="home-video-text">
      </div>
      <div ref={videoWrapperRef} className="home-video-wrapper">
        <video
          ref={videoRef} 
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          className="home-video-element"
        >
          <source src="/assets/PocketFreaks02.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
