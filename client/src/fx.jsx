import React from 'react';

// Ambient floating-shape field (v2 "neon particles" style).
// Pure CSS motion: transform/opacity only, GPU-friendly.
// Hidden entirely for reduced motion and print; fewer shapes on small screens.
const SHAPES = [
  { c: 'orb', x: '5%', y: '10%', s: 280, h: 190, d: 26, dl: 0 },
  { c: 'orb', x: '76%', y: '6%', s: 210, h: 315, d: 30, dl: -8 },
  { c: 'orb o3', x: '58%', y: '74%', s: 320, h: 28, d: 34, dl: -14 },
  { c: 'ring', x: '87%', y: '38%', s: 92, h: 265, d: 22, dl: -3 },
  { c: 'ring', x: '11%', y: '60%', s: 72, h: 150, d: 24, dl: -11 },
  { c: 'plus', x: '24%', y: '28%', s: 26, h: 190, d: 18, dl: -5 },
  { c: 'plus', x: '69%', y: '20%', s: 20, h: 45, d: 20, dl: -9 },
  { c: 'plus', x: '40%', y: '83%', s: 30, h: 320, d: 22, dl: -2 },
  { c: 'plus p4', x: '91%', y: '66%', s: 18, h: 160, d: 19, dl: -13 },
  { c: 'spark', x: '15%', y: '43%', s: 22, h: 55, d: 5, dl: -1 },
  { c: 'spark', x: '55%', y: '13%', s: 18, h: 200, d: 6, dl: -3 },
  { c: 'spark s4', x: '82%', y: '55%', s: 26, h: 280, d: 5.5, dl: -2 },
  { c: 'spark', x: '33%', y: '69%', s: 16, h: 120, d: 6.5, dl: -4 },
  { c: 'squig', x: '2%', y: '88%', s: 120, h: 0, d: 21, dl: -6 },
  { c: 'squig q2', x: '84%', y: '84%', s: 100, h: 0, d: 23, dl: -10 },
];

export default function FxField() {
  return (
    <div className="fx-field" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <i key={i} className={'fx ' + s.c} style={{ left: s.x, top: s.y, '--s': s.s + 'px', '--h': s.h, '--d': s.d + 's', animationDelay: s.dl + 's' }} />
      ))}
    </div>
  );
}
