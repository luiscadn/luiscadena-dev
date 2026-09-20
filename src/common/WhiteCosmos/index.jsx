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

    // Tech Accent Palette for Constellation Clusters
    const ACCENT_COLORS = [
      { r: 163, g: 217, b: 0,   hex: '#A3D900', name: 'lime' },   // Verde de Sistema
      { r: 0,   g: 216, b: 246, hex: '#00D8F6', name: 'cyan' },   // Cian Eléctrico
      { r: 139, g: 92,  b: 246, hex: '#8B5CF6', name: 'violet' }, // Violeta Tech
    ];

    // Constellation Cluster Hubs (dynamic centroids)
    class ClusterHub {
      constructor(w, h, isMobile, colorIndex) {
        this.x = Math.random() * (w - 160) + 80;
        this.y = Math.random() * (h - 160) + 80;
        const speed = isMobile ? 0.08 : 0.12;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.radius = isMobile ? (Math.random() * 50 + 75) : (Math.random() * 70 + 100);
        this.color = ACCENT_COLORS[colorIndex % ACCENT_COLORS.length];
      }

      update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 60 || this.x > w - 60) this.vx *= -1;
        if (this.y < 60 || this.y > h - 60) this.vy *= -1;
      }
    }

    class Node {
      constructor(w, h, isMobile, hub = null, isBeacon = false) {
        this.clusterHub = hub;
        this.isBeacon = isBeacon;
        this.color = hub ? hub.color : ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
        this.reset(w, h, isMobile, true);
      }

      reset(w, h, isMobile, initial = false) {
        if (this.clusterHub) {
          // Spawn tightly grouped around cluster centroid
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * this.clusterHub.radius * 0.85;
          this.x = this.clusterHub.x + Math.cos(angle) * dist;
          this.y = this.clusterHub.y + Math.sin(angle) * dist;
        } else {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
        }

        // Calm, serene organic drift (no runaway fast travel)
        const speed = isMobile ? 0.12 : 0.16;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;

        // Depth factor (0.3 to 1.0)
        this.depth = Math.random() * 0.7 + 0.3;

        // Fully Chromatic Tech Palette (System Lime, Electric Cyan, Tech Violet)
        if (this.isBeacon) {
          this.baseRadius = (Math.random() * 0.8 + 3.8);
          this.baseAlpha = 0.92;
        } else {
          this.baseRadius = (Math.random() * 1.2 + 1.4) * this.depth;
          // Luminous colored alpha: crisp and vibrant against white background
          this.baseAlpha = (Math.random() * 0.30 + 0.48);
        }

        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.025 + 0.015;
      }

      update(w, h, isMobile) {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += this.pulseSpeed;

        // Gentle spring toward cluster centroid if clustered (soft, strictly bounded)
        if (this.clusterHub) {
          let cdx = this.clusterHub.x - this.x;
          let cdy = this.clusterHub.y - this.y;

          // Shortest toroidal path to avoid slingshotting across screen wraps
          if (cdx > w / 2) cdx -= w;
          if (cdx < -w / 2) cdx += w;
          if (cdy > h / 2) cdy -= h;
          if (cdy < -h / 2) cdy += h;

          const cdist = Math.hypot(cdx, cdy);
          if (cdist > this.clusterHub.radius * 0.8) {
            const excess = (cdist - this.clusterHub.radius * 0.8) / this.clusterHub.radius;
            const pull = Math.min(excess * 0.003, 0.004);
            this.vx += (cdx / cdist) * pull;
            this.vy += (cdy / cdist) * pull;
          }
        }

        // Apply frictional damping to prevent any velocity accumulation
        this.vx *= 0.985;
        this.vy *= 0.985;

        // Strict speed clamp to eliminate fast traveling runaway nodes
        const maxSpeed = isMobile ? 0.20 : 0.26;
        const currentSpeed = Math.hypot(this.vx, this.vy);
        if (currentSpeed > maxSpeed) {
          this.vx = (this.vx / currentSpeed) * maxSpeed;
          this.vy = (this.vy / currentSpeed) * maxSpeed;
        } else if (currentSpeed < 0.04) {
          // Keep a micro-drift alive so nodes remain organic
          this.vx += (Math.random() - 0.5) * 0.02;
          this.vy += (Math.random() - 0.5) * 0.02;
        }

        // Wrap around boundaries smoothly
        if (this.x < -30) this.x = w + 30;
        else if (this.x > w + 30) this.x = -30;
        if (this.y < -30) this.y = h + 30;
        else if (this.y > h + 30) this.y = -30;

        // Interactive mouse deflection / attraction (gentle)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 0.45;
            this.x += (dx / dist) * force * this.depth;
            this.y += (dy / dist) * force * this.depth;
          }
        }
      }

      draw(context, sY) {
        // Parallax offset based on scroll and depth
        const renderY = this.y - (sY * (1 - this.depth) * 0.09) % height;
        const normalizedY = (renderY + height) % height;

        const currentAlpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.14;
        const finalAlpha = Math.max(0.22, Math.min(0.98, currentAlpha));

        const { r, g, b } = this.color;

        context.beginPath();
        context.arc(this.x, normalizedY, this.baseRadius, 0, Math.PI * 2);

        if (this.isBeacon) {
          // Primary Beacon Star with radiant chromatic glow
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
          context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.85)`;
          context.shadowBlur = 12;
          context.fill();
          context.shadowBlur = 0; // reset
        } else {
          // Fully Chromatic Constellation Node (No black ink!)
          context.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`;
          context.shadowColor = `rgba(${r}, ${g}, ${b}, 0.35)`;
          context.shadowBlur = 4;
          context.fill();
          context.shadowBlur = 0; // reset
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

      // 1. Initialize Cluster Hubs with alternating tech colors
      hubs = [];
      for (let h = 0; h < hubCount; h++) {
        hubs.push(new ClusterHub(width, height, isMobile, h));
      }

      // 2. Initialize Nodes (All anchored to cluster hubs and colored by cluster)
      nodes = [];
      const baseNodesPerHub = Math.floor(totalNodes / hubCount);
      const extraNodes = totalNodes % hubCount;

      hubs.forEach((hub, index) => {
        // Beacon star for this constellation cluster
        nodes.push(new Node(width, height, isMobile, hub, true));
        const count = baseNodesPerHub + (index < extraNodes ? 1 : 0);
        for (let i = 1; i < count; i++) {
          nodes.push(new Node(width, height, isMobile, hub, false));
        }
      });
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

      // 2. Draw neural network constellation edges in luminous tech colors
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
            
            // Clean chromatic lineAlpha: energetic yet ethereal
            const lineAlpha = proximity * 0.35 * Math.min(nodeA.depth, nodeB.depth);

            ctx.beginPath();
            ctx.moveTo(nodeA.x, renderYA);
            ctx.lineTo(nodeB.x, renderYB);
            ctx.lineWidth = proximity * 0.7 + 0.45; // 0.45px to 1.15px dynamic thickness

            const colA = nodeA.color;
            const colB = nodeB.color;

            if (colA.name === colB.name) {
              // Intra-cluster connection: luminous monochromatic hue
              ctx.strokeStyle = `rgba(${colA.r}, ${colA.g}, ${colA.b}, ${lineAlpha * 1.5})`;
            } else {
              // Inter-cluster bridge: smooth linear gradient between the two cluster accents
              const grad = ctx.createLinearGradient(nodeA.x, renderYA, nodeB.x, renderYB);
              grad.addColorStop(0, `rgba(${colA.r}, ${colA.g}, ${colA.b}, ${lineAlpha * 1.4})`);
              grad.addColorStop(1, `rgba(${colB.r}, ${colB.g}, ${colB.b}, ${lineAlpha * 1.4})`);
              ctx.strokeStyle = grad;
            }

            ctx.stroke();
          }
        }

        // 3. Connect nearby nodes to cursor with magnetic synapsis in the node's color
        if (mouse.x !== null && mouse.y !== null) {
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
              ctx.lineWidth = mProximity * 0.9 + 0.4;
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${mProximity * 0.55})`; // Dynamic color matching the node!
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
