import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface CircuitPath {
  points: Point[];
  layer: number; // 1 = far, 2 = middle, 3 = near
  color: string;
  glow: boolean;
  pulseSpeed: number;
  pulseProgress: number;
  activeNodes: { progress: number; speed: number; size: number }[];
  terminalNodeSize: number;
}

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let paths: CircuitPath[] = [];
    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    
    // Scale canvas for high-DPI (Retina) screens
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Set background gradient base colors matching #01143F & Vlyne Dark
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#03040b');
    bgGradient.addColorStop(0.5, '#080b11');
    bgGradient.addColorStop(1, '#020306');

    // Generate random circuit paths
    const generatePaths = () => {
      paths = [];
      const numPaths = Math.floor((width + height) / 45); // Scale density based on screen resolution
      
      for (let i = 0; i < numPaths; i++) {
        const layer = Math.random() < 0.4 ? 1 : Math.random() < 0.75 ? 2 : 3;
        
        // Randomly select seed directions
        let x = Math.random() * width;
        let y = Math.random() * height;
        
        // Let some paths originate from edges to represent clean data streams
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) x = 0;
        else if (edge === 1) x = width;
        else if (edge === 2) y = 0;
        else if (edge === 3) y = height;

        const points: Point[] = [{ x, y }];
        let curX = x;
        let curY = y;
        
        // Create 2-4 connected orthogonal/45-degree segments
        const segments = Math.floor(Math.random() * 3) + 2;
        let lastDir = Math.random() < 0.5 ? 'H' : 'V';
        
        for (let j = 0; j < segments; j++) {
          const len = (Math.random() * 120 + 40) / (4 - layer); // Layer 1 paths are shorter/quieter
          const randAngle = Math.random() < 0.35; // 45-degree turn
          
          if (randAngle) {
            const dirX = Math.random() < 0.5 ? 1 : -1;
            const dirY = Math.random() < 0.5 ? 1 : -1;
            curX += len * 0.7 * dirX;
            curY += len * 0.7 * dirY;
          } else {
            if (lastDir === 'H') {
              curX += (Math.random() < 0.5 ? 1 : -1) * len;
              lastDir = 'V';
            } else {
              curY += (Math.random() < 0.5 ? 1 : -1) * len;
              lastDir = 'H';
            }
          }
          
          // Clamp inside viewport
          curX = Math.max(10, Math.min(width - 10, curX));
          curY = Math.max(10, Math.min(height - 10, curY));
          points.push({ x: curX, y: curY });
        }

        // Color theme setup
        let color = '';
        let glow = false;
        if (layer === 1) {
          color = 'rgba(0, 114, 255, 0.08)';
        } else if (layer === 2) {
          color = Math.random() < 0.7 ? 'rgba(0, 114, 255, 0.25)' : 'rgba(0, 240, 255, 0.25)';
        } else {
          color = Math.random() < 0.5 ? '#00f0ff' : '#0072ff';
          glow = true;
        }

        // Initialize active light node trackers (pulses) moving along the paths
        const activeNodes = [];
        const pulseCount = Math.floor(Math.random() * 3) + 2; // More pulses
        for (let p = 0; p < pulseCount; p++) {
          activeNodes.push({
            progress: Math.random(),
            speed: (Math.random() * 0.004 + 0.001) * (layer === 3 ? 1.5 : 1.0),
            size: Math.random() * 3 + (layer === 3 ? 5 : 3) // Larger nodes
          });
        }

        paths.push({
          points,
          layer,
          color,
          glow,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseProgress: Math.random(),
          activeNodes,
          terminalNodeSize: layer === 3 ? 4 : layer === 2 ? 2.5 : 1.5
        });
      }
    };

    generatePaths();

    // Resize tracking
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      generatePaths();
    };
    window.addEventListener('resize', handleResize);

    // Mouse movement inside interactive system
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Calculate a point along complex line segments path (progress 0..1)
    const getPointOnPath = (points: Point[], progress: number): Point => {
      if (points.length < 2) return points[0] || { x: 0, y: 0 };
      
      const numSegments = points.length - 1;
      const segmentProgress = progress * numSegments;
      const index = Math.floor(segmentProgress);
      const subProgress = segmentProgress - index;
      
      if (index >= numSegments) return points[points.length - 1];
      
      const p1 = points[index];
      const p2 = points[index + 1];
      
      return {
        x: p1.x + (p2.x - p1.x) * subProgress,
        y: p1.y + (p2.y - p1.y) * subProgress
      };
    };

    // Draw circuits loop
    let tick = 0;
    const animate = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Render dark rich tech background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#03040b');
      gradient.addColorStop(0.5, '#080b11');
      gradient.addColorStop(1, '#020306');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render background grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.012)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Halo backdrop behind central logo area (around center X, 150-300px Y)
      const centerX = width < 1024 ? width / 2 : width / 3;
      const centerY = height / 3.5;
      
      ctx.save();
      const haloGlow = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 380);
      haloGlow.addColorStop(0, 'rgba(0, 240, 255, 0.12)');
      haloGlow.addColorStop(0.3, 'rgba(0, 114, 255, 0.05)');
      haloGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 380, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Convergence decorative orbits in Hero center
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(0, 114, 255, 0.02)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 220, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render pathways by layer
      [1, 2, 3].forEach((layer) => {
        paths.forEach((path) => {
          if (path.layer !== layer) return;

          const points = path.points;
          if (points.length < 2) return;

          // Draw baseline structural trail line
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let k = 1; k < points.length; k++) {
            ctx.lineTo(points[k].x, points[k].y);
          }

          // Evaluate interaction multiplier based on mouse proximity
          let lineOpacityMultiplier = 1.0;
          let nodeGlowMultiplier = 1.0;
          
          if (mouseRef.current.active) {
            // Check distance of mouse to path points
            let minDist = Infinity;
            points.forEach((p) => {
              const dx = p.x - mouseRef.current.x;
              const dy = p.y - mouseRef.current.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < minDist) minDist = dist;
            });

            if (minDist < 180) {
              const factor = (180 - minDist) / 180;
              lineOpacityMultiplier = 1.0 + factor * 1.5;
              nodeGlowMultiplier = 1.0 + factor * 2.0;
            }
          }

          // Apply path styling with high visibility
          ctx.save();
          if (path.layer === 3) {
            ctx.lineWidth = 2.5; // Thicker lines
            ctx.strokeStyle = '#00f0ff'; // Brighter color
            ctx.shadowBlur = 15 * nodeGlowMultiplier;
            ctx.shadowColor = '#00f0ff';
            ctx.globalAlpha = Math.min(1.0 * lineOpacityMultiplier, 1.0);
          } else if (path.layer === 2) {
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = path.color;
            ctx.globalAlpha = Math.min(0.8 * lineOpacityMultiplier, 1.0);
            ctx.shadowBlur = 10;
            ctx.shadowColor = path.color;
          } else {
            ctx.lineWidth = 1.0;
            ctx.strokeStyle = path.color;
            ctx.globalAlpha = Math.min(0.5 * lineOpacityMultiplier, 0.9);
          }
          ctx.stroke();
          ctx.restore();

          // Render active tech transmission nodes (moving along the paths)
          path.activeNodes.forEach((node) => {
            // Progress node position
            node.progress += node.speed;
            if (node.progress > 1.0) {
              node.progress = 0;
            }

            const pos = getPointOnPath(points, node.progress);
            ctx.save();
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, node.size * (nodeGlowMultiplier > 1 ? 1.3 : 1), 0, Math.PI * 2);
            ctx.fillStyle = path.layer === 3 ? '#ffffff' : '#00f0ff'; // Bright colors
            
            if (path.layer === 3 || path.layer === 2) {
              ctx.shadowBlur = (path.layer === 3 ? 25 : 15) * nodeGlowMultiplier; // Strong glow
              ctx.shadowColor = '#00f0ff';
            }
            ctx.globalAlpha = path.layer === 3 ? 1.0 : path.layer === 2 ? 0.9 : 0.6; // Higher opacity
            ctx.fill();
            ctx.restore();
          });

          // Draw the terminal node circle at the very end of the path
          const lastPoint = points[points.length - 1];
          const pulseAlpha = 0.3 + Math.abs(Math.sin(tick * 0.02 + path.pulseProgress * Math.PI)) * 0.7;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(lastPoint.x, lastPoint.y, path.terminalNodeSize * (nodeGlowMultiplier > 1 ? 1.4 : 1), 0, Math.PI * 2);
          
          if (path.layer === 3) {
            ctx.fillStyle = '#ffffff'; // White center for terminal node
            ctx.shadowBlur = 20 * nodeGlowMultiplier;
            ctx.shadowColor = '#00f0ff';
            ctx.globalAlpha = pulseAlpha * 1.5;
          } else if (path.layer === 2) {
            ctx.fillStyle = '#00f0ff';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00f0ff';
            ctx.globalAlpha = pulseAlpha;
          } else {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
            ctx.globalAlpha = pulseAlpha * 0.7;
          }
          ctx.fill();
          ctx.restore();
        });
      });

      // Ambient tiny slow-floating tech data particles
      ctx.save();
      for (let i = 0; i < 15; i++) {
        // Pseudo-random deterministic movement based on tick
        const px = (Math.sin(tick * 0.003 + i) * width * 0.1) + (i * width / 15);
        const py = ((tick * 0.25 + i * 100) % height);
        
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#0072ff';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#00f0ff';
        ctx.globalAlpha = 0.2 + Math.abs(Math.sin(tick * 0.01 + i)) * 0.4;
        ctx.fill();
      }
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="vlyne-tech-canvas"
      className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
