'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isSoldOut = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/produkt/${product.slug}`} className="block relative aspect-[4/5] bg-[#F0EBE3] overflow-hidden rounded-xs">
        {/* Placeholder skeleton before loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#EAE5DE] animate-pulse" />
        )}

        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Secondary image on hover if available */}
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0'
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
          {product.type === 'original' ? (
            <span className="bg-[#1C1A18]/85 text-[#FBF9F5] text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 backdrop-blur-sm">
              Originalmålning
            </span>
          ) : (
            <span className="bg-[#524E4A]/85 text-[#FBF9F5] text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 backdrop-blur-sm">
              Limited Edition Print
            </span>
          )}

          {isSoldOut && (
            <span className="bg-[#8B0000]/85 text-white text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 backdrop-blur-sm">
              Såld
            </span>
          )}
        </div>

        {/* Hand signed indicator badge */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="bg-[#FBF9F5]/90 text-[#3D3A36] text-[9px] tracking-wider uppercase font-light px-2 py-0.5 rounded-sm backdrop-blur-md flex items-center space-x-1 shadow-sm">
            <CheckCircle className="w-2.5 h-2.5 text-[#D4AF37]" />
            <span>Handsignerad i Åkarp</span>
          </span>
        </div>
      </Link>

      {/* Info Section */}
      <div className="mt-4 flex flex-col flex-1 justify-between space-y-2">
        <div>
          <div className="flex justify-between items-baseline">
            <Link href={`/produkt/${product.slug}`}>
              <h3 className="font-serif text-lg text-[#1C1A18] group-hover:text-[#524E4A] transition-colors leading-snug">
                {product.title}
              </h3>
            </Link>
            <span className="font-serif text-base text-[#1C1A18] font-medium ml-2">
              {product.price.toLocaleString('sv-SE')} kr
            </span>
          </div>

          <p className="text-xs text-[#8C857B] font-light mt-0.5">
            {product.dimensions} · {product.edition || (product.type === 'original' ? '1/1 Unikat' : 'Limited Edition')}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {!isSoldOut ? (
            <button
              onClick={() => addToCart(product)}
              className="w-full py-2 px-4 border border-[#1C1A18] text-[#1C1A18] hover:bg-[#1C1A18] hover:text-[#FBF9F5] text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 rounded-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Lägg i varukorg</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full py-2 px-4 bg-[#EAE5DE] text-[#A39E98] text-xs uppercase tracking-widest cursor-not-allowed text-center rounded-xs"
            >
              Slutsåld
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
