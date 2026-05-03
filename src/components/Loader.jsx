import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/Loader.css';
export default function Loader() {
  const [isVisible, setIsVisible] = useState(() => !sessionStorage.getItem('ci_loader_shown'));
  const [progressVal, setProgressVal] = useState(0);
  const loaderRef = useRef(null);
  const svgRef = useRef(null);
  const circleRef = useRef(null);
  const n1Ref = useRef(null);
  const n2Ref = useRef(null);
  const barRef = useRef(null);
  const progressObj = useRef({ value: 0 });
  useEffect(() => {
    if (sessionStorage.getItem('ci_loader_shown')) {
      setIsVisible(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    gsap.set([circleRef.current, n1Ref.current, n2Ref.current], { 
      transformOrigin: '50% 50%'
    });
    gsap.to(svgRef.current, {
      rotation: 360,
      duration: 10,
      ease: 'none',
      repeat: -1
    });
    const tlLogo = gsap.timeline({ repeat: -1 });
    tlLogo
      .to(circleRef.current, { y: -40, scale: 0.5, rotation: 180, duration: 0.8, ease: 'back.in(1.5)' }, 0)
      .to(n1Ref.current, { x: -40, y: 30, scale: 0.5, rotation: -90, duration: 0.8, ease: 'back.in(1.5)' }, 0.1)
      .to(n2Ref.current, { x: 40, y: 30, scale: 0.5, rotation: 90, duration: 0.8, ease: 'back.in(1.5)' }, 0.2)
      .to({}, { duration: 0.2 })
      .to(circleRef.current, { y: 0, scale: 1, rotation: 360, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, 1.2)
      .to(n1Ref.current, { x: 0, y: 0, scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, 1.3)
      .to(n2Ref.current, { x: 0, y: 0, scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, 1.4)
      .to({}, { duration: 0.5 });
    const updateProgress = () => {
      setProgressVal(Math.round(progressObj.current.value));
      gsap.set(barRef.current, { width: `${progressObj.current.value}%` });
    };
    let isLoaded = false;
    const finishLoading = () => {
      if (isLoaded) return;
      isLoaded = true;
      gsap.to(progressObj.current, {
        value: 100,
        duration: 0.8,
        ease: 'power2.inOut',
        onUpdate: updateProgress,
        onComplete: () => {
          gsap.to(loaderRef.current, {
            y: '-100%',
            opacity: 0,
            duration: 1.2,
            ease: 'expo.inOut',
            delay: 0.4, 
            onComplete: () => {
              sessionStorage.setItem('ci_loader_shown', 'true');
              document.body.style.overflow = '';
              setIsVisible(false);
            }
          });
        }
      });
    };
    const simTween = gsap.to(progressObj.current, {
      value: 90,
      duration: 3.8, 
      ease: 'power1.out',
      onUpdate: updateProgress,
    });
    let minTimePassed = false;
    let windowLoaded = document.readyState === 'complete';
    const minDelayTimer = setTimeout(() => {
      minTimePassed = true;
      if (windowLoaded) finishLoading();
    }, 4500);
    const tryFinish = () => {
      windowLoaded = true;
      if (minTimePassed) finishLoading();
    };
    if (document.readyState === 'complete') {
      tryFinish();
    } else {
      window.addEventListener('load', tryFinish);
    }
    return () => {
      clearTimeout(minDelayTimer);
      window.removeEventListener('load', tryFinish);
      document.body.style.overflow = '';
    };
  }, []);
  if (!isVisible) return null;
  return (
    <div ref={loaderRef} className="global-loader animated">
      <div className="loader-center">
        <div ref={svgRef} className="loader-logo-wrapper">
          <svg width="65" height="34" viewBox="0 0 65 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="loader-logo-svg">
            <path ref={circleRef} className="loader-path" d="M34.2432 17C34.2432 26.3888 26.5776 34 17.1216 34C7.66561 34 0 26.3888 0 17C0 7.61116 7.66561 7.43094e-07 17.1216 7.43094e-07C26.5776 7.43094e-07 34.2432 7.61116 34.2432 17Z" fill="#ffffff"/>
            <path ref={n1Ref} className="loader-path" d="M37.5884 0C42.1294 -1.97081e-07 46.4843 1.79107 49.6953 4.97918C52.9062 8.1673 54.7101 12.4913 54.7101 17C54.7101 21.5087 52.9062 25.8327 49.6953 29.0208C46.4843 32.2089 42.1294 34 37.5884 34L37.5884 0Z" fill="#ffffff"/>
            <path ref={n2Ref} className="loader-path" d="M65 0C60.4591 -1.97081e-07 56.1041 1.79107 52.8932 4.97918C49.6823 8.1673 47.8784 12.4913 47.8784 17C47.8784 21.5087 49.6823 25.8327 52.8932 29.0208C56.1041 32.2089 60.4591 34 65 34V0Z" fill="#ffffff"/>
          </svg>
        </div>
      </div>
      <div className="loader-bottom">
        <div className="loader-progress-text">{progressVal}%</div>
        <div className="loader-progress-track">
          <div ref={barRef} className="loader-progress-fill"></div>
        </div>
      </div>
    </div>
  );
}
