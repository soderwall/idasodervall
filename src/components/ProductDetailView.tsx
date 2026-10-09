'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, CheckCircle, ShieldCheck, Truck, MapPin, Feather, ArrowLeft } from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isSoldOut = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8C857B] hover:text-[#1C1A18] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Tillbaka till galleriet</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Gallery Images (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-[4/5] bg-[#F0EBE3] overflow-hidden rounded-xs border border-[#EAE5DE]"
          >
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>

          {/* Thumbnails if multiple images */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-24 bg-[#F0EBE3] rounded-xs overflow-hidden border transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#1C1A18] ring-1 ring-[#1C1A18]'
                      : 'border-[#EAE5DE] opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.title} vy ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Section (5 cols) */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8C857B] mb-2">
              <span className="px-2.5 py-0.5 bg-[#EFEAE2] text-[#635E57] font-medium rounded-xs">
                {product.type === 'original' ? 'Originalmålning' : 'Limited Edition Print'}
              </span>
              <span>·</span>
              <span>{product.dimensions}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A18] font-normal leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-baseline space-x-4">
              <span className="font-serif text-2xl text-[#1C1A18] font-medium">
                {product.price.toLocaleString('sv-SE')} kr
              </span>
              <span className="text-xs text-[#8C857B]">Inkl. moms & fri frakt i Sverige</span>
            </div>
          </div>

          {/* Special Craftsmanship Callout Box */}
          <div className="bg-[#F5F2ED] border border-[#EAE5DE] p-5 space-y-3 rounded-sm">
            <div className="flex items-center space-x-2 text-xs font-medium text-[#1C1A18] tracking-wider uppercase">
              <Feather className="w-4 h-4 text-[#D4AF37]" />
              <span>Hantverk & Äkthet</span>
            </div>
            <ul className="text-xs text-[#524E4A] space-y-2 font-light leading-relaxed">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#2A2725] shrink-0 mt-0.5" />
                <span>
                  <strong>Upplaga:</strong> {product.edition || (product.type === 'original' ? 'Unikt original 1/1' : 'Begränsad godkänd upplaga')}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#2A2725] shrink-0 mt-0.5" />
                <span>
                  <strong>Signering:</strong> Handsignerad & numrerad personligen av Ida Södervall.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#2A2725] shrink-0 mt-0.5" />
                <span>
                  <strong>Leverans:</strong> Paketeras omsorgsfullt och skickas direkt från ateljén i <strong>Åkarp</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1C1A18]">
              Om Konstverket
            </h2>
            <p className="text-sm text-[#524E4A] font-light leading-relaxed">
              {product.description}
            </p>
            {product.technique && (
              <p className="text-xs text-[#8C857B]">
                <strong>Teknik:</strong> {product.technique}
              </p>
            )}
          </div>

          {/* Story / Context */}
          {product.story && (
            <div className="space-y-2 border-l-2 border-[#D4AF37] pl-4 py-1 italic text-xs text-[#635E57] font-light">
              <p>"{product.story}"</p>
            </div>
          )}

          {/* Add to Cart Controls */}
          <div className="space-y-4 pt-4 border-t border-[#EAE5DE]">
            {!isSoldOut ? (
              <>
                {product.type === 'print' && product.stock > 1 && (
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-[#635E57] font-light uppercase tracking-wider">Antal:</span>
                    <div className="flex items-center border border-[#DCD6CD] rounded-xs bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-sm text-[#524E4A] hover:bg-[#F5F2ED]"
                      >
                        -
                      </button>
                      <span className="px-4 text-xs font-medium text-[#1C1A18]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3 py-1 text-sm text-[#524E4A] hover:bg-[#F5F2ED]"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-[#8C857B]">
                      ({product.stock} kvar i lager)
                    </span>
                  </div>
                )}

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="w-full py-4 bg-[#1C1A18] hover:bg-[#33302C] text-[#FBF9F5] text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 rounded-xs shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Lägg i varukorg — {(product.price * quantity).toLocaleString('sv-SE')} kr</span>
                </button>
              </>
            ) : (
              <div className="p-4 bg-[#F5F2ED] border border-[#EAE5DE] text-center space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-[#8B0000]">
                  Detta verk är tyvärr sålt
                </p>
                <p className="text-[11px] text-[#8C857B]">
                  Kontakta ateljén på kontakt@idasodervall.se för beställningsuppdrag.
                </p>
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-[11px] text-[#8C857B]">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#1C1A18] shrink-0" />
              <span>Säker, spårbar frakt från Åkarp</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#1C1A18] shrink-0" />
              <span>Äkthetsintyg medföljer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
