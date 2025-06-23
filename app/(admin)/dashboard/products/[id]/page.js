'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { getProductById } from '@/lib/data_services';
import { formatPrice } from '@/lib/utils';
import Loading from '@/app/components/Loading';
import styles from './productDetails.module.css';

export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (status === 'loading') return;

      if (!session?.user?.role || session.user.role !== 'admin') {
        router.replace('/');
        return;
      }

      try {
        const data = await getProductById(params.id);
        setProduct(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [params.id, session, status]);

  if (status === 'loading' || loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12" y2="16"></line>
        </svg>
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.error}>
        Product not found
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => router.back()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Dashboard
        </button>
        <button 
          className={styles.editButton}
          onClick={() => router.push(`/dashboard/edit/${product.id}`)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Product
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img 
            src={product.image || '/placeholder.png'} 
            alt={product.name}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.basicInfo}>
            <h1>{product.name}</h1>
            <div className={styles.price}>{formatPrice(product.price)}</div>
          {product.category && (
              <span className={styles.category}>{product.category}</span>
            )}
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Stock Status</span>
              <div className={styles.stockStatus}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7" y2="7"></line>
                </svg>
                <span className={product.quantity > 0 ? styles.inStock : styles.outOfStock}>
                  {product.quantity} units in stock
                </span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>SKU</span>
              <span className={styles.value}>{product.sku || 'N/A'}</span>
            </div>
          </div>

          {product.description && (
            <div className={styles.description}>
              <h2>Description</h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 