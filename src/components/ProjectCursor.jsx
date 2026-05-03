import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './ProjectCursor.css';
export default function ProjectCursor() {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState("перейти к проекту");
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.set(cursor, { 
      xPercent: -50, 
      yPercent: -50, 
      x: -200, 
      y: -200,
      force3D: true 
    });
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.3, ease: "power3.out" });
    let targetX = -200;
    let targetY = -200;
    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    const tick = () => {
      xTo(targetX);
      yTo(targetY);
    };
    const showCursor = (e) => {
      if (e.detail?.label) setLabel(e.detail.label);
      setIsVisible(true);
    };
    const hideCursor = () => setIsVisible(false);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('show-project-cursor', showCursor);
    window.addEventListener('hide-project-cursor', hideCursor);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('show-project-cursor', showCursor);
      window.removeEventListener('hide-project-cursor', hideCursor);
      gsap.ticker.remove(tick);
    };
  }, []);
  return (
    <div 
      ref={cursorRef} 
      className={`project-custom-cursor ${isVisible ? 'active' : ''}`}
    >
      <div className="cursor-dot"></div>
      <div className="cursor-label-wrapper">
        <span className="cursor-label-text">{label}</span>
      </div>
    </div>
  );
}
