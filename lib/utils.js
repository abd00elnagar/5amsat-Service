import { config } from './config';

export function formatPrice(price) {
  if (!price && price !== 0) return '';
  
  const currency = config.currency || 'USD';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  } catch (error) {
    console.error('Error formatting price:', error);
    return `${currency} ${price}`;
  }
} 