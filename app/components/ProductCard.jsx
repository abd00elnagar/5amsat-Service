'use client';

import styles from './ProductCard.module.css';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle both string and object formats for colors
  const colors = product.colors ? 
    (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) 
    : null;

  if (!product) return null;
  const isFeatured = product.isNew;

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return isExpanded ? text : `${text.slice(0, maxLength)}...`;
  };

  return (
    <div className={styles.card}>
      {isFeatured && <span className={styles.featuredBadge}>Featured</span>}
      <Link href={`/products/${product.id}`} className={styles.imageContainer}>
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name || 'Product image'}
          className={styles.image}
        />
        {colors && Object.keys(colors).length > 0 && (
          <div className={styles.colorDots}>
            {Object.keys(colors).map((color) => (
              <div
                key={color}
                className={styles.colorDot}
                style={{ backgroundColor: color }}
                title={`Available in ${color}`}
              />
            ))}
      </div>
        )}
      </Link>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name || 'Unnamed Product'}</h3>
        {product.description && (
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>
              {truncateText(product.description, 100)}
              {product.description.length > 100 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={styles.readMoreBtn}
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </p>
          </div>
        )}
        <div className={styles.row}>
          <div className={styles.price}>{formatPrice(product.price)}</div>
          {product.category && (
            <span className={styles.categoryBadge}>{product.category}</span>
        )}
        </div>
        <Link href={`/products/${product.id}`} className={styles.button}>
          View Details
          <svg 
            className={styles.arrow}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M5 12H19M19 12L12 5M19 12L12 19" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
