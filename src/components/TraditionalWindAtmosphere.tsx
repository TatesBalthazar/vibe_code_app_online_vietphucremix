import React, { useEffect, useRef, useState } from 'react';
import { Wind, Sparkles, Eye, EyeOff } from 'lucide-react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  colorType: 'peach' | 'apricot' | 'silk' | 'gold';
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
}

interface WindGust {
  startX: number;
  startY: number;
  controlX1: number;
  controlY1: number;
  controlX2: number;
  controlY2: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  opacity: number;
  width: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  pulseSpeed: number;
}

export const TraditionalWindAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isHoveredPill, setIsHoveredPill] = useState(false);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: 0, prevY: 0, vx: 0, vy: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isEnabled) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track mouse speed to create gentle wind eddies
    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      const vx = e.clientX - prevX;
      const vy = e.clientY - prevY;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        prevX,
        prevY,
        vx: Math.min(Math.max(vx * 0.1, -5), 5),
        vy: Math.min(Math.max(vy * 0.1, -5), 5)
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Petal color palettes inspired by Vietnamese Lunar New Year / Tet & Spring Festivals
    const PETAL_COLORS = {
      peach: { fill: 'rgba(235, 134, 150, ', stroke: 'rgba(215, 100, 120, ' }, // Cánh đào phai Hà Nội
      apricot: { fill: 'rgba(247, 196, 75, ', stroke: 'rgba(224, 165, 40, ' }, // Mai vàng phương Nam
      silk: { fill: 'rgba(255, 248, 238, ', stroke: 'rgba(238, 218, 195, ' }, // Bạch lụa ngà
      gold: { fill: 'rgba(218, 165, 32, ', stroke: 'rgba(184, 134, 11, ' } // Bụi hoàng kim cung đình
    };

    // Initialize 28 drifting petals
    const petalCount = 28;
    const petals: Petal[] = [];
    const colorTypes: Array<'peach' | 'apricot' | 'silk' | 'gold'> = [
      'peach', 'peach', 'peach', 'apricot', 'silk', 'gold'
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 7 + Math.random() * 9, // Organic petal length
        speedX: 0.8 + Math.random() * 1.4, // Gentle east-bound breeze
        speedY: 0.35 + Math.random() * 0.75, // Soft downward drift
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.03,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
        opacity: 0.45 + Math.random() * 0.45,
        swayAmplitude: 15 + Math.random() * 25,
        swayFrequency: 0.008 + Math.random() * 0.012,
        swayOffset: Math.random() * Math.PI * 2
      });
    }

    // 16 Golden festival sparkles in the breeze
    const sparkleCount = 16;
    const sparkles: SparkleParticle[] = [];
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.2,
        speedX: 0.5 + Math.random() * 1.0,
        speedY: 0.2 + Math.random() * 0.5,
        alpha: 0.2 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }

    // 3 Graceful flowing wind stream ribbons (họa tiết ngọn gió & vân mây)
    const gustCount = 3;
    const gusts: WindGust[] = [];
    for (let i = 0; i < gustCount; i++) {
      gusts.push(createRandomGust(width, height, i * (width / gustCount)));
    }

    function createRandomGust(w: number, h: number, initialX?: number): WindGust {
      const startY = Math.random() * h;
      const startX = initialX !== undefined ? initialX : -200;
      const waveLength = 250 + Math.random() * 250;
      return {
        startX,
        startY,
        controlX1: startX + waveLength * 0.3,
        controlY1: startY - (30 + Math.random() * 40),
        controlX2: startX + waveLength * 0.7,
        controlY2: startY + (30 + Math.random() * 40),
        endX: startX + waveLength,
        endY: startY + (Math.random() - 0.5) * 40,
        progress: 0,
        speed: 0.8 + Math.random() * 0.7,
        opacity: 0.12 + Math.random() * 0.16,
        width: 1.2 + Math.random() * 1.5
      };
    }

    // Draw single stylized traditional Vietnamese flower petal
    function drawPetal(p: Petal, time: number) {
      if (!ctx) return;
      ctx.save();

      // Organic wind sway calculation
      const sway = Math.sin(time * p.swayFrequency + p.swayOffset) * p.swayAmplitude;
      ctx.translate(p.x + sway, p.y);
      ctx.rotate(p.rotation);

      // 3D flip effect in wind
      const flipScale = Math.sin(p.flip);
      ctx.scale(1, flipScale);

      const colorData = PETAL_COLORS[p.colorType];
      ctx.fillStyle = `${colorData.fill}${p.opacity})`;
      ctx.strokeStyle = `${colorData.stroke}${p.opacity * 0.6})`;
      ctx.lineWidth = 0.5;

      // Draw graceful teardrop petal curve
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      // Left curve
      ctx.bezierCurveTo(
        -p.size * 0.65, -p.size * 0.4,
        -p.size * 0.6, p.size * 0.6,
        0, p.size
      );
      // Right curve
      ctx.bezierCurveTo(
        p.size * 0.6, p.size * 0.6,
        p.size * 0.65, -p.size * 0.4,
        0, -p.size
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Subtle petal spine / vein line
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.5);
      ctx.strokeStyle = `${colorData.stroke}${p.opacity * 0.45})`;
      ctx.lineWidth = 0.4;
      ctx.stroke();

      ctx.restore();
    }

    // Draw stylized flowing wind streak ribbon
    function drawWindGust(g: WindGust) {
      if (!ctx) return;
      ctx.save();

      const grad = ctx.createLinearGradient(g.startX, g.startY, g.endX, g.endY);
      grad.addColorStop(0, 'rgba(200, 151, 62, 0)');
      grad.addColorStop(0.4, `rgba(200, 151, 62, ${g.opacity})`);
      grad.addColorStop(0.7, `rgba(153, 27, 30, ${g.opacity * 0.6})`);
      grad.addColorStop(1, 'rgba(200, 151, 62, 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = g.width;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.moveTo(g.startX, g.startY);
      ctx.bezierCurveTo(g.controlX1, g.controlY1, g.controlX2, g.controlY2, g.endX, g.endY);
      ctx.stroke();

      ctx.restore();
    }

    let time = 0;

    // Main animation loop
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Render and update Wind Gusts
      for (let i = 0; i < gusts.length; i++) {
        const g = gusts[i];
        drawWindGust(g);

        // Move gust towards right with wave oscillation
        g.startX += g.speed * 2.2;
        g.endX += g.speed * 2.2;
        g.controlX1 += g.speed * 2.2;
        g.controlX2 += g.speed * 2.2;

        g.controlY1 += Math.sin(time * 0.02 + i) * 0.4;
        g.controlY2 += Math.cos(time * 0.02 + i) * 0.4;

        // Reset gust when offscreen
        if (g.startX > width + 100) {
          gusts[i] = createRandomGust(width, height, -250);
        }
      }

      // 2. Render and update Festival Sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.x += s.speedX;
        s.y += s.speedY;
        s.alpha += Math.sin(time * s.pulseSpeed) * 0.015;

        if (s.x > width) s.x = -10;
        if (s.y > height) s.y = -10;

        ctx.fillStyle = `rgba(225, 175, 55, ${Math.max(0.1, Math.min(0.85, s.alpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render and update Petals with cursor wind reaction
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mvx = mouseRef.current.vx;
      const mvy = mouseRef.current.vy;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Mouse breeze influence if cursor is near
        const dx = (p.x - mx);
        const dy = (p.y - my);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (1 - dist / 180) * 1.8;
          p.x += (dx / dist) * force * 2 + mvx * 0.3;
          p.y += (dy / dist) * force * 2 + mvy * 0.3;
          p.rotationSpeed += 0.01 * (dx > 0 ? 1 : -1);
        }

        // Standard gentle wind drift
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Wrap around seamlessly
        if (p.x > width + 40) {
          p.x = -30;
          p.y = Math.random() * height;
        }
        if (p.y > height + 40) {
          p.y = -30;
          p.x = Math.random() * width;
        }

        drawPetal(p, time);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isEnabled]);

  return (
    <>
      {/* Background Atmosphere Canvas */}
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-80"
          style={{ willChange: 'transform' }}
          aria-hidden="true"
        />
      )}

      {/* Discreet Atmospheric Toggle Control Button in bottom-left */}
      <div
        className="fixed bottom-5 left-5 z-40 select-none"
        onMouseEnter={() => setIsHoveredPill(true)}
        onMouseLeave={() => setIsHoveredPill(false)}
      >
        <button
          type="button"
          onClick={() => setIsEnabled(!isEnabled)}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md shadow-md transition-all duration-300 cursor-pointer ${
            isEnabled
              ? 'bg-[#FAF7F2]/90 border-[#C8973E]/50 text-[#991B1E] hover:border-[#991B1E] hover:shadow-lg'
              : 'bg-white/75 border-[#DACBB7] text-[#7A695B] hover:text-[#1C1917]'
          }`}
          title={isEnabled ? 'Tạm tắt hiệu ứng gió mùa lễ hội' : 'Bật hiệu ứng gió thổi & cánh hoa cổ truyền'}
          aria-label="Bật/Tắt hiệu ứng gió mùa lễ hội"
        >
          <span className="relative flex items-center justify-center">
            <Wind
              className={`w-3.5 h-3.5 transition-transform duration-500 ${
                isEnabled ? 'text-[#C8973E] group-hover:rotate-12 animate-pulse' : 'text-[#8C7662]'
              }`}
            />
            {isEnabled && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#991B1E] animate-ping" />
            )}
          </span>

          <span className="text-[11px] font-medium hidden sm:inline">
            {isEnabled ? 'Gió Lễ Hội: Bật' : 'Gió Lễ Hội: Tắt'}
          </span>

          <span className="sm:hidden text-[11px]">
            {isEnabled ? 'Gió: Bật' : 'Gió: Tắt'}
          </span>

          {isEnabled ? (
            <Eye className="w-3 h-3 text-[#7A695B] group-hover:text-[#991B1E] ml-0.5 transition-colors" />
          ) : (
            <EyeOff className="w-3 h-3 text-[#8C7662] ml-0.5" />
          )}
        </button>

        {/* Hover Explainer Tooltip */}
        {isHoveredPill && (
          <div className="absolute left-0 bottom-full mb-2 w-64 p-2.5 rounded-xl bg-[#1C1917]/90 text-white text-[11px] backdrop-blur-md border border-[#C8973E]/30 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-bold text-[#F5D587] mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Gió Mùa Lễ Hội Cổ Truyền</span>
            </div>
            <p className="text-[#D8C7B2] leading-tight text-[10.5px]">
              Hiệu ứng gió xuân thoảng nhẹ cuốn theo cánh đào phai, mai vàng và luồng gió ngũ sắc tạo không khí mùa trẩy hội dân gian.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
