import React, { useRef, useEffect } from 'react';
import '../styles/PointCube.css';
export default function PointCube() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let animationFrameId;
    const initCanvas = () => {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    initCanvas();
    const points = [];
    const size = 80; 
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 12 : 8; 
    for (let x = -size; x <= size; x += step) {
      for (let y = -size; y <= size; y += step) {
        for (let z = -size; z <= size; z += step) {
          if (
            Math.abs(x) === size || 
            Math.abs(y) === size || 
            Math.abs(z) === size
          ) {
            points.push({ x, y, z });
          }
        }
      }
    }
    let angleX = Math.PI / 4;
    let angleY = Math.PI / 4;
    let angleZ = 0;
    const focalLength = 350; 
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height / 2;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);
      const projected = [];
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.y * sinX + p.z * cosX;
        let x1 = p.x;
        let x2 = x1 * cosY + z1 * sinY;
        let z2 = -x1 * sinY + z1 * cosY;
        let y2 = y1;
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;
        const tz = z3 + 220; 
        const scale = focalLength / tz;
        const px = cx + (x3 * scale * 1.5);
        const py = cy + (y3 * scale * 1.5);
        projected.push({
          x: px,
          y: py,
          z: z3,
          scale: scale
        });
      }
      if (projected.length > 0) {
        projected.sort((a, b) => b.z - a.z);
      }
      ctx.fillStyle = '#111111'; 
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const alpha = Math.max(0.15, Math.min(0.9, p.scale));
        const radius = Math.max(0.7, 1.4 * p.scale);
        ctx.globalAlpha = alpha;
        ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
      }
      angleX += 0.003;
      angleY += 0.005;
      angleZ += 0.002;
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    window.addEventListener('resize', initCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initCanvas);
    };
  }, []);
  return (
    <div className="pointcube-container">
      <canvas ref={canvasRef} className="pointcube-canvas" />
    </div>
  );
}
