
"use client";

import { useEffect, useRef } from 'react';

export default function Particles() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // 设置canvas尺寸
    canvas.width = width;
    canvas.height = height;
    
    // 粒子数组
    const particlesArray = [];
    const numberOfParticles = 50; // 粒子数量
    
    // 粒子类
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1; // 1-4px
        this.speedX = Math.random() * 0.5 - 0.25; // -0.25 to 0.25
        this.speedY = Math.random() * 0.5 - 0.25;
        // 使用主色调和辅助色的粒子
        this.color = Math.random() > 0.7 
          ? 'rgba(255, 125, 0, 0.6)' // 辅助色
          : 'rgba(22, 93, 255, 0.6)'; // 主色调
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // 边界检查
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // 初始化粒子
    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      requestAnimationFrame(animate);
    }
    
    // 窗口大小变化时重新设置canvas
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    
    // 初始化
    init();
    animate();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="particles-container" 
      aria-hidden="true"
    />
  );
}
