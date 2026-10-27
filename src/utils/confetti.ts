import confetti from 'canvas-confetti';

// Traditional celebratory Vietnamese festival colors:
// Crimson (#991B1E), Golden Ochre (#C8973E), Royal Yellow (#F5D587),
// Emerald Jade (#315643), Blossom Pink (#E8C5C8), Pure Silk (#FAF4EA),
// Scarlet (#DC2626), Amber Gold (#D97706)
export const HERITAGE_CONFETTI_COLORS = [
  '#991B1E',
  '#C8973E',
  '#F5D587',
  '#315643',
  '#E8C5C8',
  '#FAF4EA',
  '#DC2626',
  '#F59E0B'
];

/**
 * Triggers a grand celebratory confetti explosion with multiple festive bursts
 * to give users a strong feeling of achievement upon saving their remixed look.
 */
export function triggerCelebrationConfetti(options?: { originX?: number; originY?: number }) {
  const originX = options?.originX ?? 0.5;
  const originY = options?.originY ?? 0.6;

  // 1. Initial Center Burst
  confetti({
    particleCount: 70,
    spread: 80,
    startVelocity: 45,
    origin: { x: originX, y: originY },
    colors: HERITAGE_CONFETTI_COLORS,
    ticks: 250,
    gravity: 0.9,
    scalar: 1.1,
    shapes: ['circle', 'square']
  });

  // 2. Left Festival Cannon (fired slightly after)
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 65,
      origin: { x: 0.15, y: 0.75 },
      colors: HERITAGE_CONFETTI_COLORS,
      startVelocity: 55,
      ticks: 280,
      gravity: 0.85,
      scalar: 1.05
    });
  }, 120);

  // 3. Right Festival Cannon (fired slightly after)
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 65,
      origin: { x: 0.85, y: 0.75 },
      colors: HERITAGE_CONFETTI_COLORS,
      startVelocity: 55,
      ticks: 280,
      gravity: 0.85,
      scalar: 1.05
    });
  }, 240);

  // 4. Gentle Golden Shimmer Shower
  setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 120,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.35 },
      colors: ['#F5D587', '#C8973E', '#FDE68A', '#FEF3C7'],
      ticks: 320,
      gravity: 0.7,
      scalar: 0.9
    });
  }, 380);
}
