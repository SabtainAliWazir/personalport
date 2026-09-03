import React, { useRef, useEffect } from 'react';

export default function PipelineCanvas({ className = '', isDark = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let mouse = { x: width / 2, y: height / 2, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Packets traveling along network curves
    const packetCount = 10;
    const packets = Array.from({ length: packetCount }, () => ({
      pathIndex: Math.floor(Math.random() * 6),
      t: Math.random(),
      speed: 0.0012 + Math.random() * 0.0018,
      size: 2.5 + Math.random() * 2,
      color: '#e85a2d'
    }));

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const pathCount = 6;
      const paths = [];

      // Draw curved network lines
      for (let i = 0; i < pathCount; i++) {
        const offset = (i - pathCount / 2) * 26;
        const wave = Math.sin(time + i * 0.35) * 12;

        const startX = 0;
        const startY = height * 0.32 + offset + wave;

        const cp1X = width * 0.32;
        const cp1Y = height * 0.75 + offset * 0.5;

        const cp2X = width * 0.68;
        const cp2Y = height * 0.25 + offset * 0.5;

        const endX = width;
        const endY = height * 0.68 + offset + wave;

        const targetCp1Y = mouse.active ? cp1Y + (mouse.y - cp1Y) * 0.04 : cp1Y;
        const targetCp2Y = mouse.active ? cp2Y + (mouse.y - cp2Y) * 0.04 : cp2Y;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(cp1X, targetCp1Y, cp2X, targetCp2Y, endX, endY);

        ctx.strokeStyle = isDark
          ? (i % 2 === 0 ? 'rgba(248, 245, 238, 0.08)' : 'rgba(232, 90, 45, 0.15)')
          : (i % 2 === 0 ? 'rgba(16, 9, 4, 0.08)' : 'rgba(232, 90, 45, 0.18)');
        ctx.lineWidth = i === 2 ? 1.5 : 1;
        ctx.stroke();

        paths.push({ startX, startY, cp1X, cp1Y: targetCp1Y, cp2X, cp2Y: targetCp2Y, endX, endY });
      }

      // Draw moving packets
      packets.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const path = paths[p.pathIndex] || paths[0];
        const t = p.t;

        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;

        const x = uuu * path.startX + 3 * uu * t * path.cp1X + 3 * u * tt * path.cp2X + ttt * path.endX;
        const y = uuu * path.startY + 3 * uu * t * path.cp1Y + 3 * u * tt * path.cp2Y + ttt * path.endY;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-auto ${className}`}
    />
  );
}
