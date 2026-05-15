import React, { useState, useEffect, useRef } from 'react';
import './AnimatedCounter.css';

/**
 * AnimatedCounter Component 
 * Animates a number from 0 to target when scrolled into view or hovered.
 * Supports thousands separators (.), decimals (,), and suffixes (+, %, etc.)
 */
const AnimatedCounter = ({ target, duration = 2000, triggerOnHover = true }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef(null);
  
  // Parse target string (e.g., "12.000+")
  // Extracts the number part and the suffix
  const parseTarget = (str) => {
    // If str is a number, convert to string first
    const input = str !== undefined && str !== null ? str.toString() : "0";
    const match = input.match(/([\d.,]+)(.*)/);
    if (!match) return { val: 0, suffix: input, original: input };
    
    const numPart = match[1];
    const suffix = match[2];
    
    // Check if it uses dot for thousands and comma for decimal (Indonesian style)
    // or standard dot for decimal.
    const hasComma = numPart.includes(',');
    const hasDot = numPart.includes('.');
    
    let cleanNum;
    if (hasComma && hasDot) {
      // 12.000,50 -> 12000.50
      cleanNum = parseFloat(numPart.replace(/\./g, '').replace(',', '.'));
    } else if (hasDot && !hasComma) {
      // Could be 12.000 (thousands) or 12.5 (decimal)
      // For this app's context, dots are likely thousands given the screenshots (12.000+)
      // but let's be smart: if it's "98%" or small numbers, it might be decimal.
      // However, usually "12.000" is 12000.
      if (numPart.split('.').pop().length === 3) {
        cleanNum = parseFloat(numPart.replace(/\./g, ''));
      } else {
        cleanNum = parseFloat(numPart);
      }
    } else if (hasComma && !hasDot) {
      // 12,5 -> 12.5
      cleanNum = parseFloat(numPart.replace(',', '.'));
    } else {
      cleanNum = parseFloat(numPart);
    }

    return { 
      val: cleanNum || 0, 
      suffix, 
      original: numPart 
    };
  };

  const { val, suffix } = parseTarget(target);

  const formatNumber = (num) => {
    // Round to avoid float issues
    const rounded = Math.floor(num);
    // Format with Indonesian thousands separator (.)
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const startAnimation = () => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutExpo
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easing * val);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(val);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [val, hasAnimated]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startAnimation();
    }
  };

  return (
    <span 
      ref={countRef} 
      className="animated-counter" 
      onMouseEnter={handleMouseEnter}
    >
      {formatNumber(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
