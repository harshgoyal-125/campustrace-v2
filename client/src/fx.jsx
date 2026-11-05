import React, { useEffect, useRef } from 'react';

// Small colored paper-like particles, following the supplied reference.
export default function FxField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf, w = 0, h = 0, last = 0, elapsed = 0, prevPaint=0;
    const colors = ['#69c9ec', '#edb9cb', '#d9bc68', '#85cbb5', '#a8b6e3'];
    const particles = Array.from({ length: 10 }, (_, i) => ({ phase: i * 2.399, spread: 22 + (i * 37 % 130), speed: .7 + (i % 5) * .08, color: colors[i % colors.length], size: 3 + i % 4 }));
    const resize = () => {
      w = innerWidth; h = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = time => {
      if(time-prevPaint<50){raf=requestAnimationFrame(draw);return;}prevPaint=time;
      const dt = Math.min((time - last) / 1000 || 0, .05); last = time;
      if (!document.hidden) elapsed += dt;
      ctx.clearRect(0, 0, w, h);
      const mobile = w < 720, t = elapsed;
      const cx = mobile ? w * .88 : w * .82;
      const cy = h * (.40 + .22 * Math.sin(t * .27));
      particles.forEach((p, i) => {
        const a = p.phase + t * p.speed * .5;
        // On phones the flock stays at the sides, clear of reading/input areas.
        let x = mobile ? w - 7 + Math.cos(a) * 3 : w*(.1+.8*((Math.sin(t*(.11+i*.017)+p.phase)+1)/2));
        let y = h*(.12+.76*((Math.cos(t*(.13+i*.023)+p.phase*.7)+1)/2));
        if (mobile && i > 13) { x = 5 + Math.cos(a) * 2; y = h * .65 + Math.sin(a) * 100; }
        const angle = a + Math.PI / 2;
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
        ctx.fillStyle = p.color; ctx.globalAlpha = .82;
        ctx.beginPath(); ctx.moveTo(p.size*1.5, 0); ctx.lineTo(-p.size, -p.size * .57); ctx.lineTo(-p.size * .35, 0); ctx.lineTo(-p.size, p.size * .57); ctx.closePath(); ctx.fill();
        ctx.restore();
      });
      if (!motion.matches) raf = requestAnimationFrame(draw);
    };
    const start = () => { cancelAnimationFrame(raf); last = 0; ctx.clearRect(0,0,w,h); if (!motion.matches) raf = requestAnimationFrame(draw); };
    resize(); start();
    addEventListener('resize', resize); motion.addEventListener('change', start);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); motion.removeEventListener('change', start); };
  }, []);
  return <canvas ref={ref} className="fx-field" aria-hidden="true" />;
}
