'use client';

import { useState } from 'react';
import styles from './ColoringButtons.module.css';

const ColoringButtons = ({ 
  colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'],
  selectedColor,
  onColorSelect,
  className = '',
  showLabels = false
}) => {
  const [hoveredColor, setHoveredColor] = useState(null);

  const handleColorClick = (color) => {
    onColorSelect?.(color);
  };

  return (
    <div className={`${styles.coloringContainer} ${className}`}>
      {showLabels && (
        <label className={styles.label}>Select Color:</label>
      )}
      
      <div className={styles.colorButtons}>
        {colors.map((color, index) => (
          <button
            key={index}
            className={`${styles.colorButton} ${
              selectedColor === color ? styles.selected : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
            aria-label={`Select color ${color}`}
            title={color}
          >
            {selectedColor === color && (
              <svg
                className={styles.checkIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20,6 9,17 4,12" />
              </svg>
            )}
            
            {hoveredColor === color && selectedColor !== color && (
              <div className={styles.hoverIndicator}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {selectedColor && (
        <div className={styles.selectedColorInfo}>
          <span className={styles.selectedColorLabel}>Selected:</span>
          <div 
            className={styles.selectedColorPreview}
            style={{ backgroundColor: selectedColor }}
          />
          <span className={styles.selectedColorValue}>{selectedColor}</span>
        </div>
      )}
    </div>
  );
};

export default ColoringButtons; 