'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FBF9F5] z-50 shadow-2xl flex flex-col border-l border-[#EAE5DE]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#EAE5DE] flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl text-[#1C1A18]">Din Varukorg</h2>
                <p className="text-xs text-[#8C857B] font-light">Konstverk från Ida Södervalls Ateljé</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#8C857B] hover:text-[#1C1A18] transition-colors"
                aria-label="Stäng varukorg"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <p className="text-sm text-[#8C857B] font-light">Din varukorg är tom för tillfället.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="inline-block text-xs uppercase tracking-widest text-[#1C1A18] underline underline-offset-4 font-medium"
                  >
                    Utforska kollektionen
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex space-x-4 pb-6 border-b border-[#EAE5DE] last:border-0"
                  >
                    <div className="relative w-20 h-24 bg-[#F0EBE3] shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-base text-[#1C1A18] leading-tight">
                            {product.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[#8C857B] hover:text-red-700 transition-colors p-1"
                            aria-label="Ta bort"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        </div>
                        <span className="inline-block text-[10px] tracking-wider uppercase bg-[#EFEAE2] text-[#635E57] px-2 py-0.5 rounded-sm mt-1">
                          {product.type === 'original' ? 'Original' : 'Limited Print'}
                        </span>
                        <p className="text-xs text-[#8C857B] mt-1">{product.dimensions}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {product.type === 'original' ? (
                          <span className="text-xs text-[#8C857B]">Unikt original (1 ex)</span>
                        ) : (
                          <div className="flex items-center border border-[#DCD6CD] rounded-sm bg-white">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="px-2 py-0.5 text-xs text-[#524E4A] hover:bg-[#F5F2ED]"
                            >
                              -
                            </button>
                            <span className="px-3 text-xs font-medium text-[#1C1A18]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              disabled={quantity >= product.stock}
                              className="px-2 py-0.5 text-xs text-[#524E4A] hover:bg-[#F5F2ED] disabled:opacity-30"
                            >
                              +
                            </button>
                          </div>
                        )}
                        <span className="font-serif text-sm text-[#1C1A18] font-medium">
                          {(product.price * quantity).toLocaleString('sv-SE')} kr
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#F5F2ED] border-t border-[#EAE5DE] space-y-4">
                <div className="space-y-1 text-xs text-[#635E57] font-light">
                  <div className="flex justify-between items-center text-sm font-serif text-[#1C1A18] font-medium pt-1">
                    <span>Totalt (inkl. moms)</span>
                    <span className="text-base">{totalPrice.toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] text-[#8C857B]">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-3.5 h-3.5 text-[#2A2725]" />
                    <span>Fraktfritt inom Sverige · Skickas direkt från Åkarp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2A2725]" />
                    <span>Handsignerat äkthetsintyg medföljer</span>
                  </div>
                </div>

                <Link
                  href="/kassa"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 bg-[#1C1A18] hover:bg-[#33302C] text-[#FBF9F5] text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 rounded-sm"
                >
                  <span>Gå till Kassan med Swish</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
