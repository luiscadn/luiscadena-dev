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

    // Mouse coordinates
    const mouse = {
      x: null,
      y: null,
      radius: 180
    };

    let scrollY = 0;

    // Tech Accent Palette for Cluster Beacons
    const ACCENT_COLORS = [
      { r: 163, g: 217, b: 0,   name: 'lime' },   // System Lime
      { r: 0,   g: 216, b: 246, name: 'cyan' },   // Electric Cyan
      { r: 139, g: 92,  b: 246, name: 'violet' }, // Tech Violet
    ];

    // Constellation Cluster Hubs (dynamic centroids)
    class ClusterHub {
      constructor(w, h, isMobile) {
        this.x = Math.random() * (w - 160) + 80;
        this.y = Math.random() * (h - 160) + 80;
        const speed = isMobile ? 0.12 : 0.18;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.radius = isMobile ? (Math.random() * 60 + 75) : (Math.random() * 85 + 110);
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 50 || this.x > w - 50) this.vx *= -1;
        if (this.y < 50 || this.y > h - 50) this.vy *= -1;
      }
    }

    class Node {
      constructor(w, h, isMobile, hub = null, isBeacon = false) {
        this.clusterHub = hub;
        this.isBeacon = isBeacon;
        this.reset(w, h, isMobile, true);
      }

      reset(w, h, isMobile, initial = false) {
        if (this.clusterHub && initial) {
          // Spawn tightly grouped around cluster centroid
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * this.clusterHub.radius;
          this.x = this.clusterHub.x + Math.cos(angle) * dist;
          this.y = this.clusterHub.y + Math.sin(angle) * dist;
        } else {
          this.x = Math.random() * w;
          this.y = initial ? Math.random() * h : (Math.random() < 0.5 ? -10 : h + 10);
        }

        // Slight organic drift
        const speed = isMobile ? 0.22 : 0.28;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;

        // Depth factor (0.3 to 1.0)
        this.depth = Math.random() * 0.7 + 0.3;

        // Higher visibility: radius 1.4px - 3.2px, beacons 3.6px - 4.6px
        if (this.isBeacon) {
          this.baseRadius = (Math.random() * 0.8 + 3.6);
          this.accentColor = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
          this.baseAlpha = 0.85;
        } else {
          this.baseRadius = (Math.random() * 1.5 + 1.3) * this.depth;
          this.accentColor = null;
          // High notoriety baseAlpha: 0.38 to 0.75 (no more faint invisible dots!)
          this.baseAlpha = (Math.random() * 0.35 + 0.38);
        }

        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.025 + 0.015;
      }

      update(w, h, isMobile) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        // Soft gravitational spring toward cluster centroid if clustered
        if (this.clusterHub) {
          const cdx = this.clusterHub.x - this.x;
          const cdy = this.clusterHub.y - this.y;
          const cdist = Math.hypot(cdx, cdy);
          if (cdist > this.clusterHub.radius * 0.85) {
            this.vx += (cdx / cdist) * 0.007;
            this.vy += (cdy / cdist) * 0.007;
          }
        }

        // Wrap around boundaries smoothly
        if (this.x < -30) this.x = w + 30;
        else if (this.x > w + 30) this.x = -30;
        if (this.y < -30) this.y = h + 30;
        else if (this.y > h + 30) this.y = -30;

        // Interactive mouse deflection / attraction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 0.85;
            this.x += (dx / dist) * force * this.depth;
            this.y += (dy / dist) * force * this.depth;
          }
        }
      }

      draw(context, sY) {
        // Parallax offset based on scroll and depth
        const renderY = this.y - (sY * (1 - this.depth) * 0.09) % height;
        const normalizedY = (renderY + height) % height;

        const currentAlpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.12;
        const finalAlpha = Math.max(0.18, Math.min(0.95, currentAlpha));

        context.beginPath();
        context.arc(this.x, normalizedY, this.baseRadius, 0, Math.PI * 2);

        if (this.isBeacon && this.accentColor) {
          const { r, g, b } = this.accentColor;
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
          context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.7)`;
          context.shadowBlur = 10;
          context.fill();
          context.shadowBlur = 0; // reset
        } else {
          // Rich System Charcoal Ink (#1C1B20)
          context.fillStyle = `rgba(28, 27, 32, ${finalAlpha})`;
          context.fill();
        }
      }
    }

    let hubs = [];
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
      const hubCount = isMobile ? 3 : 6;
      const totalNodes = isMobile ? 48 : 96;

      // 1. Initialize Cluster Hubs
      hubs = [];
      for (let h = 0; h < hubCount; h++) {
        hubs.push(new ClusterHub(width, height, isMobile));
      }

      // 2. Initialize Nodes (Grouped into clusters + bridge nodes)
      nodes = [];
      const nodesPerHub = Math.floor((totalNodes * 0.68) / hubCount);

      // Clustered nodes around each hub
      hubs.forEach((hub) => {
        // First node is the beacon star of this cluster
        nodes.push(new Node(width, height, isMobile, hub, true));
        for (let i = 1; i < nodesPerHub; i++) {
          nodes.push(new Node(width, height, isMobile, hub, false));
        }
      });

      // Remaining nodes act as free transit / synaptic bridges between clusters
      const remaining = totalNodes - nodes.length;
      for (let r = 0; r < remaining; r++) {
        nodes.push(new Node(width, height, isMobile, null, false));
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
    const maxConnectionDist = isMobile ? 115 : 155;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update Cluster Hubs
      for (let h = 0; h < hubs.length; h++) {
        hubs[h].update(width, height);
      }

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(width, height, isMobile);
        nodes[i].draw(ctx, scrollY);
      }

      // 2. Draw neural network constellation edges between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        const renderYA = (nodeA.y - (scrollY * (1 - nodeA.depth) * 0.09) % height + height) % height;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const renderYB = (nodeB.y - (scrollY * (1 - nodeB.depth) * 0.09) % height + height) % height;

          const dx = nodeA.x - nodeB.x;
          const dy = renderYA - renderYB;

          // Quick bounding box check before hypot
          if (Math.abs(dx) > maxConnectionDist || Math.abs(dy) > maxConnectionDist) continue;

          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDist) {
            const proximity = 1 - dist / maxConnectionDist;
            
            // Noticeably higher lineAlpha: up to 0.35!
            const lineAlpha = proximity * 0.32 * Math.min(nodeA.depth, nodeB.depth);

            ctx.beginPath();
            ctx.moveTo(nodeA.x, renderYA);
            ctx.lineTo(nodeB.x, renderYB);
            ctx.lineWidth = proximity * 0.65 + 0.45; // 0.45px to 1.1px dynamic thickness

            // If either node is a Beacon, line takes that vibrant accent tint
            if (nodeA.isBeacon && nodeA.accentColor) {
              const { r, g, b } = nodeA.accentColor;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha * 1.6})`;
            } else if (nodeB.isBeacon && nodeB.accentColor) {
              const { r, g, b } = nodeB.accentColor;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha * 1.6})`;
            } else {
              // Charcoal line (#1C1B20) with high contrast
              ctx.strokeStyle = `rgba(28, 27, 32, ${lineAlpha})`;
            }

            ctx.stroke();
          }
        }

        // 3. Connect nearby nodes to cursor with magnetic synapsis
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
              ctx.lineWidth = mProximity * 0.8 + 0.4;
              ctx.strokeStyle = `rgba(163, 217, 0, ${mProximity * 0.48})`; // Luminous lime link to cursor
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
