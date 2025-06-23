'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { getAllProducts, deleteProduct } from '@/lib/data_services';
import { formatPrice } from '@/lib/utils';
import FilterSection from '@/app/components/FilterSection';
import Loading from '@/app/components/Loading';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [currentFilters, setCurrentFilters] = useState({ query: '', category: '' });
  
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const handleFilter = async ({ query, category }) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentFilters({ query, category });
      setPage(1);
      
      const { products: fetchedProducts, totalCount: total, hasMore: more, error: fetchError } = await getAllProducts({
        page: 1,
        limit: 20,
        search: query || '',
        category: category || ''
      });

      if (fetchError) {
        throw new Error(fetchError.message || 'Failed to fetch products');
      }

      setProducts(fetchedProducts || []);
      setTotalCount(total);
      setHasMore(more);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products. Please try again.');
      setProducts([]);
      setTotalCount(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      
      const { products: moreProducts, hasMore: more, error: fetchError } = await getAllProducts({
        page: nextPage,
        limit: 20,
        search: currentFilters.query || '',
        category: currentFilters.category || ''
      });

      if (fetchError) {
        throw new Error(fetchError.message || 'Failed to fetch more products');
      }

      setProducts(prev => [...prev, ...moreProducts]);
      setHasMore(more);
      setPage(nextPage);
    } catch (err) {
      console.error('Error fetching more products:', err);
      setError(err.message || 'Failed to load more products. Please try again.');
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (status === 'loading') return;

      if (!session?.user?.role || session.user.role !== 'admin') {
        router.replace('/');
        return;
      }

      handleFilter({ query: '', category: '' });
    };

    checkAuth();
  }, [session, status]);

  const handleDelete = async (e, productId) => {
    e.stopPropagation();
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
      setError('Failed to delete product');
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const getProductColors = (product) => {
    if (!product.colors) return null;
    try {
      return typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors;
    } catch (err) {
      console.error('Error parsing colors:', err);
      return null;
    }
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
        <h1>Product Dashboard</h1>
          <span className={styles.productCount}>
            {totalCount} Product{totalCount !== 1 ? 's' : ''}
          </span>
        </div>
        <button 
          className={styles.addButton}
          onClick={() => router.push('/dashboard/add')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Product
        </button>
      </div>

      <FilterSection onSearch={handleFilter} />

      {products.length === 0 ? (
        <div className={styles.noProducts}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <p>No products found</p>
        </div>
      ) : (
        <>
      <div className={styles.productGrid}>
            {products.map((product) => {
              const colors = getProductColors(product);
              
              return (
                <Link 
                  key={product.id}
                  href={`/dashboard/products/${product.id}`}
                  className={styles.productCard}
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
                    <div className={styles.stock}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7" y2="7"></line>
                      </svg>
                      Stock: {product.quantity}
                    </div>
                    {colors && Object.keys(colors).length > 0 && (
                      <div className={styles.colorDots}>
                        {Object.keys(colors).map((color) => (
                          <div
                            key={color}
                            className={styles.colorDot}
                            style={{ backgroundColor: color }}
                            data-color={color}
                          />
                        ))}
                      </div>
                    )}
              <div className={styles.actions}>
                <button 
                  className={styles.updateButton}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/dashboard/edit/${product.id}`);
                        }}
                >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                  Update
                </button>
                <button 
                  className={styles.deleteButton}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(e, product.id);
                        }}
                >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                  Delete
                </button>
              </div>
            </div>
                </Link>
              );
            })}
          </div>
          {hasMore && (
            <div className={styles.viewMoreContainer}>
              <button 
                onClick={handleViewMore} 
                className={styles.viewMoreButton}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <svg className={styles.spinner} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="none" strokeWidth="2" />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                    View More
                  </>
                )}
              </button>
      </div>
          )}
        </>
      )}

      {showDeleteConfirm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className={styles.modalActions}>
              <button onClick={confirmDelete} className={styles.deleteButton + ' ' + styles.confirmButton}>
                Delete
              </button>
              <button onClick={cancelDelete} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
