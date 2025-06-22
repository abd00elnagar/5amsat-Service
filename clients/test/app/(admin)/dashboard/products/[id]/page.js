'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProductById } from '@/lib/data_services';
import { formatPrice } from '@/lib/utils';
import Loading from '@/app/components/Loading';
import styles from './productDetails.module.css';

export default function ProductDetailsPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const prod = await getProductById(id);
        setProduct(prod);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className={styles.error}>⚠️ {error}</div>;
  if (!product) return <div className={styles.error}>⚠️ Product not found</div>;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img src={product.image || '/placeholder.png'} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.productPrice}>{formatPrice(product.price)}</div>
          <p className={styles.productDesc}>{product.description}</p>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Stock Status</span>
              <span className={styles.infoValue}>{product.quantity} units available</span>
            </div>
            {product.category && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Category</span>
                <span className={styles.category}>{product.category}</span>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.editButton}
              onClick={() => router.push(`/dashboard/edit/${product.id}`)}
            >
              ✏️ Edit Product
            </button>
            <button 
              className={styles.backButton}
              onClick={() => router.back()}
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 