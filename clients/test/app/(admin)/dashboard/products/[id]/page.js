'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProductById } from '@/lib/data_services';
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
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img src={product.image || '/placeholder.png'} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.productPrice}>${product.price}</div>
          <div className={styles.productDesc}>{product.description}</div>
          <div className={styles.productQty}><b>Quantity:</b> {product.quantity}</div>
          {product.category && (
            <div className={styles.productCat}><b>Category:</b> {product.category}</div>
          )}
        </div>
      </div>
      <button className={styles.backButton} onClick={() => router.back()}>Back</button>
    </div>
  );
} 