'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { config } from '@/lib/config';
import ProductCard from '@/app/components/ProductCard';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import styles from './page.module.css';

export default function ProductDetailsClient({ product, relatedProducts }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showOriginalImage, setShowOriginalImage] = useState(false);
  const router = useRouter();

  // Get the current URL for sharing
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!product) return <div className={styles.error}>⚠️ Product not found</div>;

  const hasRelatedProducts = relatedProducts.products.length > 0;
  const hasOtherProducts = relatedProducts.otherProducts.length > 0;
  const colors = product.colors ? 
    (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) 
    : null;
  const currentImage = selectedColor && colors ? colors[selectedColor] : product.image;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img src={currentImage || '/placeholder.png'} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.productPrice}>{formatPrice(product.price)}</div>
          
          {colors && Object.keys(colors).length > 0 && (
            <div className={styles.colorSection}>
              <div className={styles.colorHeader}>
                <span className={styles.colorLabel}>Available Colors:</span>
                <button 
                  className={`${styles.originalImageBtn} ${showOriginalImage ? styles.active : ''}`}
                  onClick={() => setShowOriginalImage(!showOriginalImage)}
                  title={showOriginalImage ? "View colored variants" : "View original image"}
                >
                  {showOriginalImage ? "View Variants" : "Original Image"}
                </button>
              </div>
              <div className={styles.colorButtons}>
                {Object.entries(colors).map(([color, imageUrl]) => (
                  <button
                    key={color}
                    className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={`View ${color} variant`}
                  />
                ))}
              </div>
            </div>
          )}

          <p className={styles.productDesc}>{product.description}</p>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Availability</span>
              <span className={styles.infoValue}>
                {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
              </span>
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
              className={styles.backButton}
              onClick={() => router.back()}
            >
              ← Back to Products
            </button>
            <WhatsAppButton 
              phoneNumber={config.contactPhone1?.replace(/\D/g, '')}
              message={`Hello! I'm interested in ${product.name} (${formatPrice(product.price)})${selectedColor ? ` in ${selectedColor} color` : ''}.\n\nProduct Link: ${productUrl}`}
              className={styles.whatsappButton}
            />
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className={styles.relatedSection}>
        {hasRelatedProducts && (
          <>
            <h2 className={styles.relatedTitle}>More from {product.category}</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.products.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </>
        )}

        {!hasRelatedProducts && product.category && (
          <p className={styles.noRelated}>
            No more products available in {product.category}
          </p>
        )}

        {hasOtherProducts && (
          <>
            <h2 className={styles.relatedTitle}>You might also like</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.otherProducts.map((otherProduct) => (
                <ProductCard key={otherProduct.id} product={otherProduct} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 