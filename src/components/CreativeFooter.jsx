import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Spline from '@splinetool/react-spline';
import '../styles/CreativeFooter.css';
export default function CreativeFooter() {
  const footerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom", 
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);
  return (
    <footer ref={footerRef} className="creative-footer" id="contact">
      <div className="creative-footer-container">
        <div className="creative-footer-spline-wrapper">
          <Spline scene="https://prod.spline.design/UOuZM1d4Y8oJVawm/scene.splinecode" />
        </div>
        <div className="creative-footer-branding">
          <div className="creative-footer-logo-icon">
            <img src="/logo.svg" alt="O|N Logo" className="creative-footer-logo-img" />
          </div>
          <h2 className="creative-footer-main-text">
            CENTER-INTERNET<br />DIGITAL SPORT
          </h2>
        </div>
        <div className="creative-footer-details">
          <div className="creative-footer-col">
            <h4 className="creative-footer-col-title">НАВИГАЦИЯ</h4>
            <div className="creative-footer-nav-grid">
              <ul className="creative-footer-list">
                <li><Link to="/#work" className="creative-footer-link">Работы</Link></li>
                <li><Link to="/#studio" className="creative-footer-link">Студия</Link></li>
              </ul>
              <ul className="creative-footer-list">
                <li><Link to="/#stack" className="creative-footer-link">Стэк</Link></li>
                <li><Link to="/join" className="creative-footer-link">Хочу к вам</Link></li>
                <li><Link to="/contact" className="creative-footer-link">Связаться с нами</Link></li>
              </ul>
            </div>
          </div>
          <div className="creative-footer-col creative-footer-col-center">
            <h4 className="creative-footer-col-title">КОНТАКТЫ</h4>
            <ul className="creative-footer-list">
              <li><a href="mailto:info@cinet.ru" className="creative-footer-link">info@cinet.ru</a></li>
              <li><a href="tel:+78632678537" className="creative-footer-link">+7 (863) 267-85-37</a></li>
              <li className="creative-footer-text-muted">Rostov-on-Don, Sokolova St. 53, office 313</li>
            </ul>
          </div>
          <div className="creative-footer-col creative-footer-col-right">
            <h4 className="creative-footer-col-title">СОЦСЕТИ</h4>
            <ul className="creative-footer-list">
              <li><a href="https://t.me/tatyanaCI" className="creative-footer-link" target="_blank" rel="noopener noreferrer">Telegram</a></li>
              <li><a href="https://vk.com/c_inet" className="creative-footer-link" target="_blank" rel="noopener noreferrer">VKontakte</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
