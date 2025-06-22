'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/lib/data_services';
import ProductCard from '../components/ProductCard';
import FilterSection from '../components/FilterSection';
import styles from './page.module.css';
import { config } from '@/lib/config';

// Mark the page as dynamic
export const dynamic = 'force-dynamic';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ query: '', category: '' });

  const fetchProducts = async (currentPage, currentFilters = filters) => {
    try {
      setLoading(true);
      const { products: newProducts, hasMore: moreAvailable } = await getAllProducts({
        page: currentPage,
        limit: 20,
        random: true,
        search: currentFilters.query,
        category: currentFilters.category
      });

      if (currentPage === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      setHasMore(moreAvailable);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('An error occurred while loading products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    fetchProducts(1, newFilters);
  };

  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.error}>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{config.marketName || 'Welcome to Our Store'}</h1>
          <p className={styles.heroTagline}>{config.brandDescription || 'Discover our best products and services.'}</p>
          <div className={styles.heroActions}>
            <a href="#products" className={styles.ctaButton}>Explore Products</a>
          </div>
        </div>
      </section>
      <div id="products" className={styles.container}>
        <FilterSection onSearch={handleSearch} />
        {!products || products.length === 0 ? (
          <p className={styles.noProducts}>
            {loading ? 'Loading products...' : 'No products available at the moment.'}
          </p>
        ) : (
          <>
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {hasMore && (
              <div className={styles.viewMoreContainer}>
                <button 
                  onClick={handleViewMore} 
                  className={styles.viewMoreButton}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'View More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
