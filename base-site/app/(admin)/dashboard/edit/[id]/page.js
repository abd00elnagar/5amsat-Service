'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getProductById, updateProduct } from '@/lib/data_services';
import Loading from '@/app/components/Loading';
import styles from './edit.module.css';

export default function EditProductPage({ params }) {
  const { id } = params;
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [productImage, setProductImage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const product = await getProductById(id);
          if (product) {
            setFormData({
              name: product.name,
              description: product.description,
            });
            setProductImage(product.image || '/placeholder.png');
          } else {
            setError('Product not found');
          }
        } catch (err) {
          setError('Failed to load data');
          console.error('Fetch error:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (session) {
      fetchData();
    }
  }, [id, session]);

  if (status === 'loading' || isLoading) {
    return <Loading />;
  }

  if (!session) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const productData = {
        ...formData,
        image: productImage
      };

      await updateProduct(id, productData);
      router.replace('/dashboard');
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Update product error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1>Edit Product</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {productImage && (
            <div className={styles.inputGroup}>
              <label>Current Image</label>
              <div className={styles.imagePreview}>
                <img src={productImage} alt="Current product" />
              </div>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Product'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}