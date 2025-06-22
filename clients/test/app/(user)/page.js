import { getAllProducts } from '@/lib/data_services';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';
import { config } from '@/lib/config';

// Mark the page as dynamic
export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const products = await getAllProducts();

    return (
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{config.marketName || 'Welcome to Our Store'}</h1>
            <p className={styles.heroTagline}>{config.brandDescription || 'Discover our best products and services.'}</p>
            <div className={styles.heroActions}>
              <button className={styles.ctaButton}>Shop Now</button>
              <input className={styles.searchInput} type="text" placeholder="Search products..." disabled />
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <div className={styles.filtersBar}>
            <select className={styles.filterSelect} disabled>
              <option>All Categories</option>
            </select>
            <input className={styles.searchInput} type="text" placeholder="Search products..." disabled />
          </div>
          {!products || products.length === 0 ? (
            <p className={styles.noProducts}>
              No products available at the moment.
            </p>
          ) : (
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.error}>
            An error occurred while loading products. Please try again later.
          </p>
        </div>
      </main>
    );
  }
}
