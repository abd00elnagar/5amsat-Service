'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getAllProducts, deleteProduct } from '@/lib/data_services';
import { formatPrice } from '@/lib/utils';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    fetchProducts();
  }, [session]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (e, productId) => {
    e.stopPropagation(); // Prevent card click when clicking delete
    setProductToDelete(productId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete);
      setProducts(products.filter(p => p.id !== productToDelete));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleCardClick = (productId) => {
    router.push(`/dashboard/products/${productId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Product Dashboard</h1>
        <button 
          className={styles.addButton}
          onClick={() => router.push('/dashboard/add')}
        >
          Add Product
        </button>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className={styles.productCard}
            onClick={() => handleCardClick(product.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleCardClick(product.id)}
          >
            <img 
              src={product.image || '/placeholder.png'} 
              alt={product.name} 
              className={styles.productImage}
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <div className={styles.price}>{formatPrice(product.price)}</div>
              {product.category && (
                <span className={styles.category}>{product.category}</span>
              )}
              <div className={styles.stock}>Stock: {product.quantity}</div>
              <div className={styles.actions}>
                <button 
                  className={styles.updateButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/edit/${product.id}`);
                  }}
                >
                  Update
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={(e) => handleDelete(e, product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Delete Confirmation</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className={styles.modalActions}>
              <button 
                className={styles.confirmButton}
                onClick={confirmDelete}
              >
                Yes, delete
              </button>
              <button 
                className={styles.cancelButton}
                onClick={cancelDelete}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
