import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SmoothScroll = ({ children }) => {
  const location = useLocation();
  const scrollContainerRef = useRef();
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const ease = 0.1;

  // Smooth scroll animation
  const smoothScroll = () => {
    currentRef.current += (targetRef.current - currentRef.current) * ease;
    scrollContainerRef.current.scrollTop = currentRef.current;
    requestAnimationFrame(smoothScroll);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    
    // Handle manual scroll
    const handleWheel = (e) => {
      e.preventDefault();
      targetRef.current += e.deltaY;
      targetRef.current = Math.max(0, 
        Math.min(targetRef.current, container.scrollHeight - container.clientHeight)
      );
    };

    // Handle anchor links
    const hash = location.hash;
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetRef.current = targetElement.offsetTop;
      }
    }

    container.addEventListener('wheel', handleWheel);
    requestAnimationFrame(smoothScroll);

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [location]);

  return (
    <div 
      ref={scrollContainerRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;