'use client';

import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  if (!product) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name || 'Product image'}
          className={styles.image}
        />
        {product.isNew && <span className={styles.badge}>New</span>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name || 'Unnamed Product'}</h3>
        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}
        {product.price && (
          <div className={styles.price}>${product.price}</div>
        )}
        <Link href={`/products/${product.id}`} className={styles.button}>
          View Product
        </Link>
      </div>
    </div>
  );
}
