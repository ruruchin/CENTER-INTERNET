import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/Navigation.css';
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef(null);
  const shuttleRef = useRef([]);
  const linksRef = useRef([]);
  const isAnimating = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    const shutters = shuttleRef.current;
    const links = linksRef.current;

    // Очищаем предыдущие анимации на всякий случай
    gsap.killTweensOf(shutters);
    gsap.killTweensOf(links);

    if (isOpen) {
      isAnimating.current = true;
      const tl = gsap.timeline({ onComplete: () => isAnimating.current = false });

      shutters.forEach((shutter, i) => {
        gsap.set(shutter, { x: i % 2 === 0 ? "-100%" : "100%" });
      });
      tl.to(shutters, {
        x: "0%",
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.inOut",
        force3D: true
      });
      tl.fromTo(links, 
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.04, 
          ease: "back.out(1.5)",
          force3D: true
        },
        "-=0.4"
      );
    } else {
      if (!isMounted.current) {
        // На первой загрузке (mount) просто сразу прячем всё без анимации
        shutters.forEach((shutter, i) => {
          gsap.set(shutter, { x: i % 2 === 0 ? "-100%" : "100%" });
        });
        gsap.set(links, { y: 40, opacity: 0 });
        isMounted.current = true;
      } else {
        isAnimating.current = true;
        const tl = gsap.timeline({ onComplete: () => isAnimating.current = false });
        tl.to(links, {
          y: 40,
          opacity: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: "power2.in"
        });
        tl.to(shutters, {
          x: (i) => i % 2 === 0 ? "-100%" : "100%",
          duration: 0.6,
          stagger: {
            each: 0.03,
            from: "random"
          },
          ease: "power4.inOut",
          force3D: true
        }, "-=0.2");
      }
    }
  }, [isOpen]);
  
  const toggleMenu = () => {
    if (isAnimating.current) return;
    setIsOpen(!isOpen);
  };
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    } else {
      navigate('/', { state: { scrollTo: 'top' } });
      setTimeout(() => window.scrollTo(0, 0), 10);
    }
  };
  const handleMenuClick = (e, item) => {
    e.preventDefault();
    if (isAnimating.current) return;
    toggleMenu();
    if (item.route && item.route !== '/') {
      navigate(item.route);
      window.scrollTo(0, 0);
      return;
    }
    const hash = `#${item.id}`;
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: hash } });
    } else {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  const menuItems = [
    { label: 'Работы', id: 'work', route: '/' },
    { label: 'Студия', id: 'studio', route: '/' },
    { label: 'Стэк', id: 'stack', route: '/' },
    { label: 'Хочу к вам', id: 'join', route: '/join' },
    { label: 'Связаться с нами', id: 'contact', route: '/contact' }
  ];
  return (
    <>
      <nav className="navigation-nav">
        <div 
          onClick={handleLogoClick}
          className="navigation-logo"
        >
          <img src="/logo.svg" alt="CENTER-INTERNET" className="navigation-logo-img" />
          <span>CENTER-INTERNET</span>
        </div>
        <button 
          onClick={toggleMenu}
          className="navigation-toggle"
        >
          {isOpen ? 'Закрыть' : 'Меню'}
        </button>
      </nav>
      <div 
        ref={overlayRef}
        className={`navigation-overlay ${isOpen ? 'is-open' : ''}`}
      >
        <div className="navigation-shutters-container">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              ref={el => shuttleRef.current[i] = el}
              className="navigation-shutter"
            />
          ))}
        </div>
        <div className="navigation-menu">
          {menuItems.map((item, i) => (
            <div key={item.id} className="navigation-link-wrapper">
              <a 
                href={item.route === '/' ? `/#${item.id}` : item.route}
                onClick={(e) => handleMenuClick(e, item)}
                ref={el => linksRef.current[i] = el}
                className="navigation-link"
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
