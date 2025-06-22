'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { createProduct, uploadFile, getCategories } from '@/lib/data_services';
import Loading from '@/app/components/Loading';
import styles from './add.module.css';

const MAX_FILE_SIZE = 7 * 1024 * 1024; // 7 MB

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
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

  const handleImageChange = (e) => {
    setError('');
    const file = e.target.files[0];
    if (file) {
      if (file.size > 7 * 1024 * 1024) {
        setError('File size exceeds 7MB');
        setImageFile(null);
        setImagePreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadFile(imageFile);
      }
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        quantity: parseInt(formData.quantity, 10),
        image: imageUrl,
      };
      await createProduct(productData);
      router.replace('/dashboard');
    } catch (error) {
      setError('Failed to add product. Please try again.');
      console.error('Add product error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modernContainer}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Add New Product</h1>
        {error && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.error}>{error}</div>
              <button className={styles.cancelButton} onClick={() => setError('')}>Close</button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
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
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              disabled={isLoading}
              className={styles.input}
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
              className={styles.input}
              rows={3}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              step="1"
              disabled={isLoading}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="image">Product Image</label>
            <div className={styles.imageUpload}>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                disabled={isLoading}
                className={styles.fileInput}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={styles.uploadButton}
                disabled={isLoading}
              >
                Choose Image
              </button>
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add Product'}
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