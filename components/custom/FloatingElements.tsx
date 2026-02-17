"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

interface FloatingElementsProps {
  count: number;
  children: (index: number) => React.ReactNode;
  className?: string;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({
  count,
  children,
  className = "absolute inset-0 opacity-10",
}) => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    // Generate well-distributed positions using grid-based approach
    const newElements: FloatingElement[] = [];

    // Calculate grid dimensions
    const cols = Math.ceil(Math.sqrt(count * 1.5));
    const rows = Math.ceil(count / cols);
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    // Generate positions with grid-based distribution
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      // Position within cell with random offset
      const baseLft = col * cellWidth + cellWidth / 2;
      const baseTop = row * cellHeight + cellHeight / 2;

      // Add random offset within cell (but keep some margin)
      const offsetRange = Math.min(cellWidth, cellHeight) * 0.4;
      const left = baseLft + (Math.random() - 0.5) * offsetRange;
      const top = baseTop + (Math.random() - 0.5) * offsetRange;

      newElements.push({
        left: Math.max(5, Math.min(95, left)), // Keep within bounds
        top: Math.max(5, Math.min(95, top)),
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 2,
      });
    }

    setElements(newElements);
  }, [count]);

  // Don't render until client-side positions are generated
  if (elements.length === 0) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
          }}
        >
          {children(i)}
        </motion.div>
      ))}
    </div>
  );
};
