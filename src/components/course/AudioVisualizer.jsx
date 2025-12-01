"use client";
import { useEffect, useRef } from 'react';

export default function AudioVisualizer({ isRecording }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isRecording) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Animation variables
    let bars = 5;
    let step = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#5E3891'; // Brand Purple

      for (let i = 0; i < bars; i++) {
        // Create a mock waveform effect using sine
        const height = 10 + Math.random() * 20 + Math.sin(step + i) * 10;
        const x = i * 12 + 6;
        const y = (canvas.height - height) / 2;
        
        ctx.beginPath();
        ctx.roundRect(x, y, 6, height, 3);
        ctx.fill();
      }

      step += 0.2;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRecording]);

  return <canvas ref={canvasRef} width={70} height={40} className="mx-auto" />;
}
