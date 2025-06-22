import { getAllProducts } from '@/lib/data_services';
import ProductCard from '../components/ProductCard';
import styles from './page.module.css';

// Mark the page as dynamic
export const dynamic = 'force-dynamic';

export default async function Home() {
  try {
    const products = await getAllProducts();

    return (
      <main className={styles.main}>
        <div className={styles.container}>
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
