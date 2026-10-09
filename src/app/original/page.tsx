import { getProducts } from '@/lib/data';
import { HomeView } from '@/components/HomeView';

export default function OriginalPage() {
  const products = getProducts().filter((p) => p.type === 'original');

  return (
    <div>
      <div className="bg-[#F5F2ED] py-12 px-6 border-b border-[#EAE5DE] text-center mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C857B]">Unika konstverk</span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A18] mt-2">Originalmålningar</h1>
        <p className="text-xs sm:text-sm text-[#635E57] font-light max-w-lg mx-auto mt-2">
          Varje originalmålning är ett unikt unikat (1/1) skapat i akryl, olja eller blandteknik i Idas ateljé i Åkarp.
        </p>
      </div>
      <HomeView initialProducts={products} />
    </div>
  );
}
