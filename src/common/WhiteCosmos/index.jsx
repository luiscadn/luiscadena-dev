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

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 190
    };

    let scrollY = 0;

    // Harmonious Architectural Palette (Refined Tech Tones)
    const PALETTE = [
      { r: 14,  g: 165, b: 233, name: 'cyan',     glow: 'rgba(14, 165, 233, 0.45)' }, // Electric Sky
      { r: 163, g: 217, b: 0,   name: 'lime',     glow: 'rgba(163, 217, 0, 0.40)' },   // System Lime
      { r: 71,  g: 85,  b: 105, name: 'slate',    glow: 'rgba(71, 85, 105, 0.25)' },   // Deep Slate
      { r: 100, g: 116, b: 139, name: 'graphite', glow: 'rgba(100, 116, 139, 0.20)' }, // Neutral Graphite
    ];

    // Synaptic Data Pulse class (signal packets traversing connections)
    class SynapsePulse {
      constructor(fromNode, toNode, color) {
        this.from = fromNode;
        this.to = toNode;
        this.color = color;
        this.progress = 0;
        this.speed = Math.random() * 0.008 + 0.006; // Smooth travel speed
        this.dead = false;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.dead = true;
        }
      }

      draw(context, sY, w, h) {
        const renderYA = (this.from.y - (sY * (1 - this.from.depth) * 0.06) % h + h) % h;
        const renderYB = (this.to.y - (sY * (1 - this.to.depth) * 0.06) % h + h) % h;

        const curX = this.from.x + (this.to.x - this.from.x) * this.progress;
        const curY = renderYA + (renderYB - renderYA) * this.progress;

        const alpha = Math.sin(this.progress * Math.PI) * 0.85;
        const { r, g, b } = this.color;

        // Draw glowing synaptic packet
        context.beginPath();
        context.arc(curX, curY, 2.2, 0, Math.PI * 2);
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        context.shadowBlur = 8;
        context.fill();
        context.shadowBlur = 0;
      }
    }

    // Node class with gentle organic floating, depth planes, and luminous halos
    class Node {
      constructor(w, h, isMobile, type = 'standard') {
        this.type = type; // 'beacon', 'standard', or 'dust'
        this.reset(w, h, isMobile, true);
      }

      reset(w, h, isMobile, initial = false) {
        // Natural distribution across entire viewport
        this.x = initial ? Math.random() * w : (Math.random() < 0.5 ? -10 : w + 10);
        this.y = initial ? Math.random() * h : Math.random() * h;

        // Subtle, serene drift
        const speedMultiplier = prefersReducedMotion ? 0.02 : (isMobile ? 0.12 : 0.16);
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.2 + 0.1) * speedMultiplier;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Organic wave oscillation
        this.phase = Math.random() * Math.PI * 2;
        this.phaseSpeed = Math.random() * 0.015 + 0.008;

        if (this.type === 'beacon') {
          // Prominent anchor star
          this.color = Math.random() > 0.5 ? PALETTE[0] : PALETTE[1];
          this.baseRadius = isMobile ? 3.0 : 3.6;
          this.baseAlpha = 0.85;
          this.depth = 0.95;
          this.ringPhase = Math.random() * Math.PI * 2;
        } else if (this.type === 'dust') {
          // Deep atmospheric particle
          this.color = PALETTE[2];
          this.baseRadius = Math.random() * 0.6 + 0.7;
          this.baseAlpha = Math.random() * 0.2 + 0.15;
          this.depth = Math.random() * 0.3 + 0.2;
        } else {
          // Standard neural graph node
          const colorRoll = Math.random();
          if (colorRoll < 0.35) this.color = PALETTE[0]; // Cyan
          else if (colorRoll < 0.65) this.color = PALETTE[1]; // Lime
          else this.color = PALETTE[2]; // Slate
          this.baseRadius = (Math.random() * 0.8 + 1.4);
          this.baseAlpha = Math.random() * 0.25 + 0.45;
          this.depth = Math.random() * 0.5 + 0.5;
        }
      }

      update(w, h) {
        this.phase += this.phaseSpeed;
        if (this.type === 'beacon') {
          this.ringPhase += 0.02;
        }

        // Add soft organic wave drift
        const waveX = Math.sin(this.phase) * 0.04;
        const waveY = Math.cos(this.phase) * 0.04;

        this.x += this.vx + waveX;
        this.y += this.vy + waveY;

        // Wrap around boundaries gently
        const pad = 40;
        if (this.x < -pad) this.x = w + pad;
        else if (this.x > w + pad) this.x = -pad;
        if (this.y < -pad) this.y = h + pad;
        else if (this.y > h + pad) this.y = -pad;

        // Fluid cursor deflection
        if (mouse.x !== null && mouse.y !== null && !prefersReducedMotion) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            // Soft repel / drift
            const factor = (1 - dist / mouse.radius);
            const force = factor * factor * 0.6 * this.depth;
            this.x -= (dx / dist) * force;
            this.y -= (dy / dist) * force;
          }
        }
      }

      draw(context, sY, h) {
        // Scroll parallax
        const renderY = (this.y - (sY * (1 - this.depth) * 0.06) % h + h) % h;
        const currentAlpha = Math.max(0.1, Math.min(0.95, this.baseAlpha + Math.sin(this.phase) * 0.12));
        const { r, g, b } = this.color;

        if (this.type === 'beacon') {
          // 1. Radiant luminous ambient halo
          const haloGrad = context.createRadialGradient(
            this.x, renderY, 0,
            this.x, renderY, this.baseRadius * 3.8
          );
          haloGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.5})`);
          haloGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.15})`);
          haloGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          context.beginPath();
          context.arc(this.x, renderY, this.baseRadius * 3.8, 0, Math.PI * 2);
          context.fillStyle = haloGrad;
          context.fill();

          // 2. Subtle orbital ring pulse
          const ringRadius = this.baseRadius * (1.8 + Math.sin(this.ringPhase) * 0.3);
          const ringAlpha = (0.35 + Math.sin(this.ringPhase) * 0.2) * currentAlpha;
          context.beginPath();
          context.arc(this.x, renderY, ringRadius, 0, Math.PI * 2);
          context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringAlpha})`;
          context.lineWidth = 0.75;
          context.stroke();

          // 3. Crisp white-hot core
          context.beginPath();
          context.arc(this.x, renderY, this.baseRadius, 0, Math.PI * 2);
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
          context.fill();

          context.beginPath();
          context.arc(this.x, renderY, this.baseRadius * 0.45, 0, Math.PI * 2);
          context.fillStyle = '#FFFFFF';
          context.fill();
        } else if (this.type === 'standard') {
          // Standard node with soft glow
          context.beginPath();
          context.arc(this.x, renderY, this.baseRadius, 0, Math.PI * 2);
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha})`;
          context.fill();
        } else {
          // Dust particle (very subtle)
          context.beginPath();
          context.arc(this.x, renderY, this.baseRadius, 0, Math.PI * 2);
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.6})`;
          context.fill();
        }
      }
    }

    let nodes = [];
    let pulses = [];
    let lastPulseTime = 0;
    let isMobile = false;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      isMobile = width <= 768;

      // Balanced density: generous breathing room, zero clutter
      const beaconCount = isMobile ? 3 : 5;
      const standardCount = isMobile ? 22 : 44;
      const dustCount = isMobile ? 12 : 24;

      nodes = [];
      pulses = [];

      for (let i = 0; i < beaconCount; i++) {
        nodes.push(new Node(width, height, isMobile, 'beacon'));
      }
      for (let i = 0; i < standardCount; i++) {
        nodes.push(new Node(width, height, isMobile, 'standard'));
      }
      for (let i = 0; i < dustCount; i++) {
        nodes.push(new Node(width, height, isMobile, 'dust'));
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
    const maxConnectionDist = isMobile ? 105 : 145;

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle ambient background glow reflecting page warmth
      if (mouse.x !== null && mouse.y !== null) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 220
        );
        mouseGlow.addColorStop(0, 'rgba(14, 165, 233, 0.035)');
        mouseGlow.addColorStop(1, 'rgba(14, 165, 233, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(width, height);
        nodes[i].draw(ctx, scrollY, height);
      }

      // 3. Connect nearby nodes with delicate, whisper-soft hairlines
      const connectedPairs = [];

      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.type === 'dust') continue; // Dust doesn't form structural edges

        const renderYA = (nodeA.y - (scrollY * (1 - nodeA.depth) * 0.06) % height + height) % height;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeB.type === 'dust') continue;

          const renderYB = (nodeB.y - (scrollY * (1 - nodeB.depth) * 0.06) % height + height) % height;

          const dx = nodeA.x - nodeB.x;
          const dy = renderYA - renderYB;

          if (Math.abs(dx) > maxConnectionDist || Math.abs(dy) > maxConnectionDist) continue;

          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDist) {
            // Quadratic falloff gives a much smoother, elegant fade without harsh cuts
            const proximity = 1 - dist / maxConnectionDist;
            const lineAlpha = (proximity * proximity) * 0.22 * Math.min(nodeA.depth, nodeB.depth);

            ctx.beginPath();
            ctx.moveTo(nodeA.x, renderYA);
            ctx.lineTo(nodeB.x, renderYB);
            ctx.lineWidth = proximity * 0.45 + 0.35; // 0.35px to 0.8px ultra-fine hairline

            const colA = nodeA.color;
            const colB = nodeB.color;

            if (colA.name === colB.name) {
              ctx.strokeStyle = `rgba(${colA.r}, ${colA.g}, ${colA.b}, ${lineAlpha})`;
            } else {
              const grad = ctx.createLinearGradient(nodeA.x, renderYA, nodeB.x, renderYB);
              grad.addColorStop(0, `rgba(${colA.r}, ${colA.g}, ${colA.b}, ${lineAlpha})`);
              grad.addColorStop(1, `rgba(${colB.r}, ${colB.g}, ${colB.b}, ${lineAlpha})`);
              ctx.strokeStyle = grad;
            }

            ctx.stroke();

            // Save pair candidate for synaptic data pulse
            if (proximity > 0.45) {
              connectedPairs.push([nodeA, nodeB]);
            }
          }
        }

        // 4. Connect nearby nodes to cursor with magnetic synapsis tether
        if (mouse.x !== null && mouse.y !== null && !prefersReducedMotion) {
          const mdx = nodeA.x - mouse.x;
          const mdy = renderYA - mouse.y;

          if (Math.abs(mdx) < mouse.radius && Math.abs(mdy) < mouse.radius) {
            const mDist = Math.hypot(mdx, mdy);
            if (mDist < mouse.radius) {
              const mProximity = 1 - mDist / mouse.radius;
              const { r, g, b } = nodeA.color;

              ctx.beginPath();
              ctx.moveTo(nodeA.x, renderYA);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.lineWidth = mProximity * 0.65 + 0.3;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${mProximity * 0.35})`;
              ctx.stroke();
            }
          }
        }
      }

      // 5. Spawn and update Synaptic Signal Pulses
      if (!prefersReducedMotion && connectedPairs.length > 0 && time - lastPulseTime > 1600 && pulses.length < 5) {
        lastPulseTime = time;
        const randomPair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        pulses.push(new SynapsePulse(randomPair[0], randomPair[1], randomPair[0].color));
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        pulses[p].update();
        pulses[p].draw(ctx, scrollY, width, height);
        if (pulses[p].dead) {
          pulses.splice(p, 1);
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
