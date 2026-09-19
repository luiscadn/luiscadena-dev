'use client';
import { useEffect, useRef } from 'react';
import styles from './style.module.scss';

export default function WhiteCosmos() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates (null when outside)
    const mouse = {
      x: null,
      y: null,
      radius: 160
    };

    let scrollY = 0;

    // Palette: mostly dark charcoal/ink nodes with occasional tech accent nodes
    const ACCENT_COLORS = [
      { r: 163, g: 217, b: 0 },   // System Lime
      { r: 0,   g: 216, b: 246 }, // Electric Cyan
      { r: 139, g: 92,  b: 246 }, // Tech Violet
    ];

    class Node {
      constructor(w, h, isMobile) {
        this.reset(w, h, isMobile, true);
      }

      reset(w, h, isMobile, initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : (Math.random() < 0.5 ? -10 : h + 10);
        
        // Slight organic drift
        const speed = isMobile ? 0.22 : 0.28;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;

        // Depth factor (0.2 to 1.0) determines parallax speed, radius, and opacity
        this.depth = Math.random() * 0.8 + 0.2;
        this.baseRadius = (Math.random() * 1.2 + 0.8) * this.depth;
        
        // 12% chance to be an accent star/node
        this.isAccent = Math.random() < 0.12;
        if (this.isAccent) {
          this.accentColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
          this.baseRadius *= 1.35;
        } else {
          this.accentColor = null;
        }

        this.baseAlpha = (Math.random() * 0.3 + 0.12) * this.depth;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update(w, h, isMobile) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        // Wrap around boundaries smoothly
        if (this.x < -20) this.x = w + 20;
        else if (this.x > w + 20) this.x = -20;
        if (this.y < -20) this.y = h + 20;
        else if (this.y > h + 20) this.y = -20;

        // Interactive mouse deflection / attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 0.6;
            this.x += (dx / dist) * force * this.depth;
            this.y += (dy / dist) * force * this.depth;
          }
        }
      }

      draw(context, sY) {
        // Parallax offset based on scroll and depth
        const renderY = this.y - (sY * (1 - this.depth) * 0.08) % height;
        const normalizedY = (renderY + height) % height;

        const currentAlpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.08;
        const finalAlpha = Math.max(0.05, Math.min(0.85, currentAlpha));

        context.beginPath();
        context.arc(this.x, normalizedY, this.baseRadius, 0, Math.PI * 2);

        if (this.isAccent && this.accentColor) {
          const { r, g, b } = this.accentColor;
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
          context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
          context.shadowBlur = 6;
          context.fill();
          context.shadowBlur = 0; // reset
        } else {
          // System charcoal ink node (#1C1B20)
          context.fillStyle = `rgba(28, 27, 32, ${finalAlpha})`;
          context.fill();
        }
      }
    }

    let nodes = [];
    let isMobile = false;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      isMobile = width <= 768;
      const count = isMobile ? 38 : 80;

      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push(new Node(width, height, isMobile));
      }
    };

    resize();

    // Event Listeners
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animation Loop
    const maxConnectionDist = isMobile ? 95 : 135;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(width, height, isMobile);
        nodes[i].draw(ctx, scrollY);
      }

      // 2. Draw neural network constellation edges between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const renderYA = (nodeA.y - (scrollY * (1 - nodeA.depth) * 0.08) % height + height) % height;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const renderYB = (nodeB.y - (scrollY * (1 - nodeB.depth) * 0.08) % height + height) % height;

          const dx = nodeA.x - nodeB.x;
          const dy = renderYA - renderYB;

          // Quick bounding box check before hypot
          if (Math.abs(dx) > maxConnectionDist || Math.abs(dy) > maxConnectionDist) continue;

          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDist) {
            const proximity = 1 - dist / maxConnectionDist;
            const lineAlpha = proximity * 0.14 * Math.min(nodeA.depth, nodeB.depth);

            ctx.beginPath();
            ctx.moveTo(nodeA.x, renderYA);
            ctx.lineTo(nodeB.x, renderYB);
            ctx.lineWidth = 0.55;

            // If either node is an accent, give a micro tint to the line
            if (nodeA.isAccent && nodeA.accentColor) {
              const { r, g, b } = nodeA.accentColor;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha * 1.5})`;
            } else if (nodeB.isAccent && nodeB.accentColor) {
              const { r, g, b } = nodeB.accentColor;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha * 1.5})`;
            } else {
              // Charcoal line
              ctx.strokeStyle = `rgba(28, 27, 32, ${lineAlpha})`;
            }

            ctx.stroke();
          }
        }

        // 3. Connect nearby nodes to cursor
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = nodeA.x - mouse.x;
          const mdy = renderYA - mouse.y;

          if (Math.abs(mdx) < mouse.radius && Math.abs(mdy) < mouse.radius) {
            const mDist = Math.hypot(mdx, mdy);
            if (mDist < mouse.radius) {
              const mProximity = 1 - mDist / mouse.radius;
              ctx.beginPath();
              ctx.moveTo(nodeA.x, renderYA);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.lineWidth = 0.65;
              ctx.strokeStyle = `rgba(163, 217, 0, ${mProximity * 0.25})`; // Subtle lime synaptic link to cursor
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={styles.cosmosContainer} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
