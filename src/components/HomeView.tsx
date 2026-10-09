'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types';
import { ArrowRight, Sparkles, Feather, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HomeViewProps {
  initialProducts: Product[];
}

export function HomeView({ initialProducts }: HomeViewProps) {
  const [filter, setFilter] = useState<'all' | 'original' | 'print'>('all');

  const filteredProducts = initialProducts.filter((p) => {
    if (filter === 'original') return p.type === 'original';
    if (filter === 'print') return p.type === 'print';
    return true;
  });

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#F5F2ED] border-b border-[#EAE5DE] px-6 overflow-hidden">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-[#8C857B] border border-[#D3CBBF] px-4 py-1.5 rounded-full bg-[#FBF9F5]/80 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Digital Ateljé & Galleri · Åkarp</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#1C1A18] leading-[1.1]"
          >
            Svensk Samtida Konst & Limited Edition Prints
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#524E4A] font-light max-w-2xl mx-auto leading-relaxed"
          >
            Upptäck unika originalmålningar i olja och akryl samt handsignerade prints i begränsad upplaga. Skapade och paketerade personligen från Idas ateljé i skånska Åkarp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a
              href="#utstallning"
              className="w-full sm:w-auto px-8 py-4 bg-[#1C1A18] hover:bg-[#33302C] text-[#FBF9F5] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Utforska Galleriet</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </a>

            <Link
              href="/om"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#1C1A18] text-[#1C1A18] hover:bg-[#1C1A18] hover:text-[#FBF9F5] text-xs uppercase tracking-widest font-medium transition-colors rounded-xs"
            >
              Läs Om Ida & Hantverket
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Highlights Bar */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-[#F5F2ED] border border-[#EAE5DE] rounded-sm text-center">
          <div className="space-y-2 flex flex-col items-center">
            <Feather className="w-6 h-6 text-[#1C1A18] stroke-[1.2]" />
            <h3 className="font-serif text-lg text-[#1C1A18]">Begränsad Upplaga & Signerat</h3>
            <p className="text-xs text-[#8C857B] font-light max-w-xs leading-relaxed">
              Varje print säljs i en strikt numrerad och handsignerad upplaga med tillhörande äkthetsintyg.
            </p>
          </div>

          <div className="space-y-2 flex flex-col items-center border-t md:border-t-0 md:border-l border-[#EAE5DE] pt-6 md:pt-0">
            <HeartHandshake className="w-6 h-6 text-[#1C1A18] stroke-[1.2]" />
            <h3 className="font-serif text-lg text-[#1C1A18]">Skickas från Ateljén i Åkarp</h3>
            <p className="text-xs text-[#8C857B] font-light max-w-xs leading-relaxed">
              Inga mellanhänder. Varje beställning slås in omsorgsfullt och skickas personligen direkt från min ateljé.
            </p>
          </div>

          <div className="space-y-2 flex flex-col items-center border-t md:border-t-0 md:border-l border-[#EAE5DE] pt-6 md:pt-0">
            <ShieldCheck className="w-6 h-6 text-[#1C1A18] stroke-[1.2]" />
            <h3 className="font-serif text-lg text-[#1C1A18]">Museumkvalitet & Fine Art</h3>
            <p className="text-xs text-[#8C857B] font-light max-w-xs leading-relaxed">
              Tryckt med åldringsbeständigt pigmentbläck på 310g Hahnemühle bomullspapper för livslång hållbarhet.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="utstallning" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EAE5DE] pb-6 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C857B]">Kollektion</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1C1A18] mt-1">
              Aktuell Utställning & Butik
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-[#F5F2ED] p-1.5 rounded-full border border-[#EAE5DE] self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                filter === 'all'
                  ? 'bg-[#1C1A18] text-[#FBF9F5] shadow-xs'
                  : 'text-[#635E57] hover:text-[#1C1A18]'
              }`}
            >
              Alla verk ({initialProducts.length})
            </button>
            <button
              onClick={() => setFilter('original')}
              className={`px-5 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                filter === 'original'
                  ? 'bg-[#1C1A18] text-[#FBF9F5] shadow-xs'
                  : 'text-[#635E57] hover:text-[#1C1A18]'
              }`}
            >
              Original ({initialProducts.filter((p) => p.type === 'original').length})
            </button>
            <button
              onClick={() => setFilter('print')}
              className={`px-5 py-2 text-xs tracking-wider uppercase rounded-full transition-all ${
                filter === 'print'
                  ? 'bg-[#1C1A18] text-[#FBF9F5] shadow-xs'
                  : 'text-[#635E57] hover:text-[#1C1A18]'
              }`}
            >
              Prints ({initialProducts.filter((p) => p.type === 'print').length})
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F5F2ED] rounded-sm">
            <p className="text-sm text-[#8C857B]">Inga verk hittades i denna kategori.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        )}
      </section>

      {/* Artist Feature / Storyteaser */}
      <section className="bg-[#2A2725] text-[#E8E4DF] py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] bg-[#3D3A36] overflow-hidden rounded-xs">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
              alt="Ida Södervall i ateljén"
              className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-lg text-white">"Konst handlar för mig om att fånga stillheten mellan tankarna."</p>
              <span className="text-xs text-[#C2BCB3] mt-1 block font-light">— Ida Södervall, Ateljén i Åkarp</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Möt Konstnären</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight">
              Personlig beröring i varje enskilt verk
            </h2>
            <div className="space-y-4 text-sm text-[#C2BCB3] font-light leading-relaxed">
              <p>
                I min ateljé i Åkarp arbetar jag med lager av akryl, olja och grafit. Processen är långsam och intuitiv, där varje penseldrag söker en balans mellan det kraftfulla och det subtila.
              </p>
              <p>
                För mina prints väljer jag enbart Hahnemühle Fine Art 310g bomullspapper. Varje utskrift kontrolleras noggrant under ateljébelysningen innan jag numrerar och signerar den för hand med min blyerts.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/om"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37] pb-1"
              >
                <span>Läs hela berättelsen om ateljén</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
