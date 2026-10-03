import { useLayoutEffect, useRef, useState } from "react";

const DIGITS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
};

const PERCENT = ["11001", "11010", "00100", "01000", "10110", "00110", "00000"];
const ARROW_DOTS = [
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
  [4, 0], [5, 1], [6, 2], [7, 3], [8, 4], [4, 8], [5, 7], [6, 6], [7, 5],
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const smoothstep = (value: number) => value * value * (3 - 2 * value);
const easeOut = (value: number) => 1 - (1 - value) ** 3;

function progressAt(elapsed: number) {
  if (elapsed < 120) return 0;
  if (elapsed < 500) return 15 * easeOut((elapsed - 120) / 380);
  if (elapsed < 1600) return 15 + 55 * smoothstep((elapsed - 500) / 1100);
  if (elapsed < 2150) return 70 + 20 * smoothstep((elapsed - 1600) / 550);
  if (elapsed < 2540) return 90 + 9 * smoothstep((elapsed - 2150) / 390);
  if (elapsed < 2720) return 99;
  if (elapsed < 2800) return 99 + easeOut((elapsed - 2720) / 80);
  return 100;
}

function drawGlyph(
  context: CanvasRenderingContext2D,
  pattern: string[],
  x: number,
  y: number,
  step: number,
  radius: number,
  alpha: number,
  progress: number,
  time: number,
  seed: number,
) {
  pattern.forEach((row, rowIndex) => {
    [...row].forEach((pixel, columnIndex) => {
      if (pixel !== "1") return;
      const hash = (rowIndex * 37 + columnIndex * 19 + seed * 23) % 101;
      const accent = hash < 2 + progress * 0.055;
      const muted = !accent && hash % 6 === 0;
      const pulse = 0.88 + Math.sin(time * 0.0014 + hash) * 0.08;
      context.globalAlpha = alpha * pulse;
      context.fillStyle = accent ? "#00FFF5" : muted ? "#A6A6A6" : "#F2F2EE";
      context.beginPath();
      context.arc(x + columnIndex * step, y + rowIndex * step, radius, 0, Math.PI * 2);
      context.fill();
    });
  });
}

function drawNumber(
  context: CanvasRenderingContext2D,
  value: number,
  alpha: number,
  progress: number,
  width: number,
  height: number,
  time: number,
) {
  const digits = String(value);
  const cell = Math.min(18, Math.max(6, (width - 40) / (digits.length * 5 + (digits.length - 1) * 0.8 + 3.7)));
  const digitGap = cell * 0.8;
  const percentStep = cell * 0.58;
  const numberWidth = digits.length * cell * 5 + Math.max(0, digits.length - 1) * digitGap;
  const percentWidth = percentStep * 5;
  const totalWidth = numberWidth + cell * 0.8 + percentWidth;
  const centerY = height * 0.42;
  let x = (width - totalWidth) / 2;

  digits.split("").forEach((digit, index) => {
    const radius = Math.max(1.2, cell * 0.19);
    drawGlyph(
      context,
      DIGITS[digit],
      x + radius,
      centerY - cell * 3,
      cell,
      radius,
      alpha,
      progress,
      time,
      index + value,
    );
    x += cell * 5 + digitGap;
  });

  const percentRadius = Math.max(0.9, percentStep * 0.21);
  drawGlyph(
    context,
    PERCENT,
    x + percentRadius,
    centerY - percentStep * 3,
    percentStep,
    percentRadius,
    alpha * 0.68,
    progress,
    time,
    value + 17,
  );
  context.globalAlpha = 1;
}

export default function PortfolioIntro() {
  const introRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const arrowRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setVisible(false);
      return;
    }

    document.body.classList.add("portfolio-intro-active");
    const matrixCanvas = matrixRef.current;
    const arrowCanvas = arrowRef.current;
    const intro = introRef.current;
    const matrixContext = matrixCanvas?.getContext("2d");
    const arrowContext = arrowCanvas?.getContext("2d");
    if (!matrixCanvas || !arrowCanvas || !intro || !matrixContext || !arrowContext) {
      document.body.classList.remove("portfolio-intro-active");
      setVisible(false);
      return;
    }

    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const resize = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      [matrixCanvas, arrowCanvas].forEach((canvas) => {
        canvas.width = Math.round(viewport.width * pixelRatio);
        canvas.height = Math.round(viewport.height * pixelRatio);
      });
      matrixContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      arrowContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    const startedAt = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      const elapsed = now - startedAt;
      const progress = progressAt(elapsed);
      const sweep = clamp((elapsed - 3100) / 850, 0, 1);
      const sweepMotion = sweep * sweep;
      const { width, height } = viewport;

      matrixContext.clearRect(0, 0, width, height);
      const lower = Math.floor(progress);
      const fraction = progress - lower;
      const morph = lower < 100 ? smoothstep(clamp((fraction - 0.18) / 0.64, 0, 1)) : 0;
      drawNumber(matrixContext, lower, 1 - morph, progress, width, height, now);
      if (morph > 0) {
        drawNumber(matrixContext, Math.min(100, lower + 1), morph, progress, width, height, now);
      }

      arrowContext.clearRect(0, 0, width, height);
      const step = Math.min(7, Math.max(4.5, width * 0.005));
      const arrowWidth = step * 8;
      const startX = width * 0.085;
      const arrowX = startX + sweepMotion * (width + arrowWidth);
      const centerY = height * 0.56;
      const accentMix = Math.min(0.34, progress * 0.0024 + sweep * 0.1);
      ARROW_DOTS.forEach(([column, row], index) => {
        const hash = (index * 37) % 101;
        arrowContext.fillStyle = hash < accentMix * 100 ? "#00FFF5" : "#6F6F6F";
        arrowContext.globalAlpha = 0.78 + (hash % 4) * 0.04;
        arrowContext.beginPath();
        arrowContext.arc(
          arrowX + column * step,
          centerY + (row - 4) * step,
          Math.max(1.8, step * 0.27),
          0,
          Math.PI * 2,
        );
        arrowContext.fill();
      });
      arrowContext.globalAlpha = 1;

      const reveal = clamp(arrowX - startX - arrowWidth, 0, width);
      intro.style.setProperty("--intro-reveal", `${reveal}px`);

      if (elapsed >= 3950) {
        document.body.classList.remove("portfolio-intro-active");
        setVisible(false);
        return;
      }
      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.body.classList.remove("portfolio-intro-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="portfolio-intro" ref={introRef} aria-hidden="true">
      <div className="portfolio-intro-curtain">
        <canvas className="portfolio-intro-matrix" ref={matrixRef} />
      </div>
      <canvas className="portfolio-intro-arrow" ref={arrowRef} />
    </div>
  );
}
