import { getProducts } from '@/lib/data';
import { HomeView } from '@/components/HomeView';

export default function HomePage() {
  const products = getProducts();

  return <HomeView initialProducts={products} />;
}
