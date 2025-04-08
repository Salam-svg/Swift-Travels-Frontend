import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IsolatedSmoothScroll = ({ children, selector, enabled = true }) => {
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const [height, setHeight] = useState("100vh");
  const scrollY = useRef(0);
  const animationRef = useRef(null);

  // Initialize smooth scroll
  useEffect(() => {
    if (!enabled) return;
    
    const content = contentRef.current;
    const wrapper = wrapperRef.current;
    
    // Set initial styles
    content.style.position = "fixed";
    content.style.width = "100%";
    content.style.top = 0;
    content.style.left = 0;
    
    const updateHeight = () => {
      // Update container height to match content
      setHeight(`${content.scrollHeight}px`);
    };
    
    // Initial height calculation
    updateHeight();
    
    // Handle the animation
    const handleScroll = () => {
      scrollY.current = window.scrollY;
      
      // Only animate if we're not already doing so (for performance)
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(render);
      }
    };
    
    // Render function for smooth scrolling effect
    const render = () => {
      // Apply smooth scrolling with lerp (linear interpolation)
      const currentY = parseFloat(content.style.transform?.split("translateY(")[1]) || 0;
      const targetY = -scrollY.current;
      const lerp = 0.1; // Adjust for smoother/faster effect (0.05-0.15 is good)
      
      const newY = currentY + (targetY - currentY) * lerp;
      content.style.transform = `translateY(${newY}px)`;
      
      // If we're close enough to target, stop animating
      if (Math.abs(targetY - newY) < 0.1) {
        content.style.transform = `translateY(${targetY}px)`;
        animationRef.current = null;
      } else {
        animationRef.current = requestAnimationFrame(render);
      }
    };
    
    // Setup GSAP ScrollTrigger for selected elements
    if (selector) {
      const elements = content.querySelectorAll(selector);
      elements.forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            gsap.to(el, { 
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              ease: "power2.out" 
            });
          },
          onLeaveBack: () => {
            gsap.to(el, { 
              opacity: 0.5, 
              y: 50, 
              duration: 0.5 
            });
          }
        });
        
        // Initial state
        gsap.set(el, { opacity: 0.5, y: 50 });
      });
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateHeight);
    
    // Initial render
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeight);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [enabled, selector]);

  return (
    <div 
      ref={wrapperRef} 
      style={{ 
        height: height, 
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default IsolatedSmoothScroll;