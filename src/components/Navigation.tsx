'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Sparkles, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const pathname = usePathname();
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Galleriet' },
    { href: '/original', label: 'Originalmålningar' },
    { href: '/prints', label: 'Prints (Limited)' },
    { href: '/om', label: 'Om Ida & Ateljén' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#2A2725] text-[#E8E4DF] text-xs py-2 px-4 text-center tracking-widest font-light flex items-center justify-center space-x-2">
        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
        <span>LIMITED EDITIONS & ORIGINAL | HANDSIGNERADE OCH SKICKAS DIREKT FRÅN ATELJÉN I ÅKARP</span>
      </div>

      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE5DE]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo / Brand Name */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#1C1A18] group-hover:text-[#524E4A] transition-colors">
              IDA SÖDERVALL
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8C857B] uppercase font-light">
              Studio & Gallery · Åkarp
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-10 text-sm tracking-widest font-light uppercase text-[#3D3A36]">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 hover:text-[#000] transition-colors ${
                    isActive ? 'text-[#000] font-normal' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1C1A18]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center space-x-6">
            <Link
              href="/admin"
              className="hidden lg:flex items-center space-x-1 text-xs tracking-wider text-[#8C857B] hover:text-[#1C1A18] transition-colors"
              title="Ateljé Admin"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#1C1A18] hover:opacity-70 transition-opacity"
              aria-label="Varukorg"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2A2725] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1C1A18]"
              aria-label="Meny"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#FBF9F5] border-b border-[#EAE5DE] px-6 py-6"
            >
              <div className="flex flex-col space-y-4 text-sm uppercase tracking-widest text-[#1C1A18]">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 border-b border-[#F0EBE3]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#8C857B] text-xs flex items-center space-x-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Ateljé Admin CMS</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer />
    </>
  );
}
