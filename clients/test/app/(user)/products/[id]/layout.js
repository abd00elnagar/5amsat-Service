import { getProductById } from '@/lib/data_services';
import { config } from '@/lib/config';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    return {
      title: `${config.marketName} | ${product.name}`,
      description: product.description,
    };
  } catch (error) {
    return {
      title: `${config.marketName} | Product Not Found`,
    };
  }
}

export default function ProductLayout({ children }) {
  return children;
} 