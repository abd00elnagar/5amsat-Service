'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { config } from '@/lib/config';
import styles from './page.module.css';

export default function ProductDetailsPage() {
  const [selectedColor, setSelectedColor] = useState(null);
  const router = useRouter();

  // Get the current URL for sharing
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Sample product data
  const product = {
    name: "Modern Sofa",
    description: "Elegant and comfortable modern sofa with premium fabric",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    colors: {
      "#FFFFFF": {
        name: "White",
        imageUrl: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea"
      },
      "#000000": {
        name: "Black",
        imageUrl: "https://images.unsplash.com/photo-1540574163026-643ea20ade25"
      }
    }
  };

  const currentImage = selectedColor ? product.colors[selectedColor].imageUrl : product.image;

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img src={currentImage} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.infoSection}>
          <h1 className={styles.productName}>{product.name}</h1>
          <div className={styles.productPrice}>${product.price}</div>
          
          <div className={styles.colorSection}>
            <div className={styles.colorHeader}>
              <span className={styles.colorLabel}>Available Colors:</span>
              <button 
                className={`${styles.originalImageBtn} ${!selectedColor ? styles.active : ''}`}
                onClick={() => setSelectedColor(null)}
                title="View original image"
              >
                Original Image
              </button>
            </div>
            <div className={styles.colorButtons}>
              {Object.entries(product.colors).map(([color, data]) => (
                <button
                  key={color}
                  className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={`View ${data.name} variant`}
                />
              ))}
            </div>
          </div>

          <p className={styles.productDesc}>{product.description}</p>

          <div className={styles.actions}>
            <button 
              className={styles.backButton}
              onClick={() => router.back()}
            >
              ← Back to Products
            </button>
            <WhatsAppButton 
              phoneNumber={config.contactPhone1?.replace(/\D/g, '')}
              message={`Hello! I'm interested in ${product.name} (${product.price})${selectedColor ? ` in ${product.colors[selectedColor].name} color` : ''}.\n\nProduct Link: ${productUrl}`}
              className={styles.whatsappButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}