'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowLeft, Smartphone, QrCode, Lock, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export function CheckoutView() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    postalCode: '',
    city: '',
    notes: '',
  });

  const [step, setStep] = useState<'details' | 'swish' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProceedToSwish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.postalCode || !formData.city) {
      alert('Vänligen fyll i alla obligatoriska fält.');
      return;
    }
    setStep('swish');
  };

  const handleConfirmSwishPayment = async () => {
    setLoading(true);
    try {
      const orderPayload = {
        customer: formData,
        items: cart.map((item) => ({
          productId: item.product.id,
          productTitle: item.product.title,
          quantity: item.quantity,
          price: item.product.price,
          type: item.product.type,
          image: item.product.images[0],
        })),
        totalAmount: totalPrice,
        paymentMethod: 'swish' as const,
        paymentStatus: 'completed' as const,
        shippingStatus: 'pending' as const,
        swishRef: `SWISH-${Math.floor(100000000 + Math.random() * 900000000)}`,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedOrderNumber(data.orderNumber);
        clearCart();
        setStep('success');
      } else {
        alert('Kunde inte genomföra beställningen. Försök igen.');
      }
    } catch (err) {
      console.error(err);
      alert('Ett fel uppstod vid Swish-betalningen.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-6">
        <h1 className="font-serif text-3xl text-[#1C1A18]">Din varukorg är tom</h1>
        <p className="text-sm text-[#8C857B] font-light">Du har inga produkter i varukorgen för att gå till kassan.</p>
        <Link
          href="/"
          className="inline-block py-3 px-8 bg-[#1C1A18] text-white text-xs font-medium uppercase tracking-widest rounded-xs"
        >
          Utforska Galleriet
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back button */}
      {step !== 'success' && (
        <button
          onClick={() => (step === 'swish' ? setStep('details') : router.push('/'))}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8C857B] hover:text-[#1C1A18] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{step === 'swish' ? 'Tillbaka till adressuppgifter' : 'Fortsätt handla'}</span>
        </button>
      )}

      {/* SUCCESS STEP */}
      {step === 'success' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto bg-[#FBF9F5] border border-[#EAE5DE] p-8 md:p-12 text-center space-y-6 rounded-sm shadow-sm">
          <div className="w-16 h-16 bg-[#2A2725] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8C857B]">Tack för din beställning!</span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#1C1A18]">Betalning Genomförd med Swish</h1>
            <p className="text-xs text-[#524E4A]">Ordernummer: <strong>{createdOrderNumber}</strong></p>
          </div>

          <div className="bg-[#F5F2ED] border border-[#EAE5DE] p-6 text-left space-y-3 rounded-xs text-xs text-[#524E4A] font-light leading-relaxed">
            <p className="font-medium text-[#1C1A18] font-serif text-sm">Vad händer nu?</p>
            <p>1. En orderbekräftelse har skickats till <strong>{formData.email}</strong>.</p>
            <p>2. Ida Södervall paketerar personligen din order i ateljén i Åkarp.</p>
            <p>3. Du får ett mejl med spårningslänk så fort ditt konstverk skickats.</p>
          </div>

          <div className="pt-4">
            <Link href="/" className="inline-block py-3.5 px-8 bg-[#1C1A18] text-[#FBF9F5] text-xs font-medium uppercase tracking-widest rounded-xs">
              Återvänd till Galleriet
            </Link>
          </div>
        </motion.div>
      )}

      {/* CHECKOUT FLOW */}
      {step !== 'success' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Form Area (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="border-b border-[#EAE5DE] pb-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C857B]">Friktionsfri Kassa</span>
              <h1 className="font-serif text-3xl text-[#1C1A18] mt-1">
                {step === 'details' ? 'Leveransuppgifter' : 'Betala tryggt med Swish'}
              </h1>
            </div>

            {/* STEP 1: Details Form */}
            {step === 'details' && (
              <form onSubmit={handleProceedToSwish} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1C1A18]">Kontaktinformation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#635E57] mb-1">Namn & Efternamn *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Anna Svensson"
                        className="w-full px-4 py-2.5 bg-white border border-[#DCD6CD] text-xs rounded-xs focus:outline-none focus:border-[#1C1A18]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#635E57] mb-1">E-postadress *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="anna@example.se"
                        className="w-full px-4 py-2.5 bg-white border border-[#DCD6CD] text-xs rounded-xs focus:outline-none focus:border-[#1C1A18]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#635E57] mb-1">Mobilnummer för Swish & Leverans-SMS *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="070 123 45 67"
                      className="w-full px-4 py-2.5 bg-white border border-[#DCD6CD] text-xs rounded-xs focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#EAE5DE]">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#1C1A18]">Leveransadress (Sverige)</h2>
                  <div>
                    <label className="block text-xs text-[#635E57] mb-1">Gatuadress *</label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Storgatan 14A"
                      className="w-full px-4 py-2.5 bg-white border border-[#DCD6CD] text-xs rounded-xs focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#635E57] mb-1">Postnummer *</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="114 56"
                        className="w-full px-4 py-2.5 bg-white border border-[#DCD6CD] text-xs rounded-xs focus:outline-none focus:border-[#1C1A18]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#635E57] mb-1">Ort *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Stockholm"
                        className="w-full px-4 py-2.5 bg-white border border-[#DCD6CD] text-xs rounded-xs focus:outline-none focus:border-[#1C1A18]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#635E57] mb-1">Meddelande till Ateljén (Valfritt)</label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Särskilda instruktioner till Ida inför paketering..."
                      className="w-full px-4 py-2.5 bg-white border border-[#DCD6CD] text-xs rounded-xs focus:outline-none focus:border-[#1C1A18]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1C1A18] hover:bg-[#33302C] text-[#FBF9F5] text-xs font-medium uppercase tracking-widest transition-colors rounded-xs shadow-sm flex items-center justify-center space-x-2"
                >
                  <Smartphone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Fortsätt till Swish-Betalning ({totalPrice.toLocaleString('sv-SE')} kr)</span>
                </button>
              </form>
            )}

            {/* STEP 2: Swish Simulation */}
            {step === 'swish' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-[#F5F2ED] border border-[#EAE5DE] p-6 rounded-sm text-center space-y-6">
                  <div className="inline-block bg-[#D32F2F] text-white p-3 rounded-full shadow-md">
                    <Smartphone className="w-8 h-8" />
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl text-[#1C1A18]">Öppna Swish-appen i din mobil</h2>
                    <p className="text-xs text-[#635E57] mt-1 font-light">
                      Mottagare: <strong>Ida Södervall Studio AB</strong> · Belopp: <strong>{totalPrice.toLocaleString('sv-SE')} kr</strong>
                    </p>
                  </div>

                  <div className="bg-white p-6 inline-block rounded-md border border-[#EAE5DE] shadow-sm">
                    <QrCode className="w-36 h-36 mx-auto text-[#1C1A18]" />
                    <p className="text-[10px] text-[#8C857B] mt-2">Skanna med Swish-kameran eller klicka nedan</p>
                  </div>

                  <div className="space-y-2 text-xs text-[#524E4A] max-w-sm mx-auto">
                    <p>Kopplat nummer: <strong>{formData.phone}</strong></p>
                    <p className="text-[11px] text-[#8C857B]">
                      Klicka på knappen nedan när du har godkänt betalningen med mobilt BankID.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmSwishPayment}
                    disabled={loading}
                    className="w-full py-4 bg-[#1C1A18] hover:bg-[#33302C] text-white text-xs uppercase tracking-widest font-medium transition-all rounded-xs shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Verifierar Swish-betalning...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Jag har godkänt i Swish — Slutför Köp</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 bg-[#F5F2ED] border border-[#EAE5DE] p-6 space-y-6 rounded-sm">
            <h2 className="font-serif text-lg text-[#1C1A18]">Orderöversikt</h2>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex space-x-3 text-xs pb-3 border-b border-[#EAE5DE]">
                  <div className="relative w-14 h-16 bg-[#EAE5DE] shrink-0 rounded-xs overflow-hidden">
                    <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm text-[#1C1A18]">{product.title}</h3>
                      <p className="text-[10px] text-[#8C857B]">{product.dimensions} · {quantity} st</p>
                    </div>
                    <span className="font-medium text-[#1C1A18]">
                      {(product.price * quantity).toLocaleString('sv-SE')} kr
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-[#EAE5DE] pt-4 text-[#524E4A]">
              <div className="flex justify-between">
                <span>Delsumma</span>
                <span>{totalPrice.toLocaleString('sv-SE')} kr</span>
              </div>
              <div className="flex justify-between text-[#2A2725]">
                <span>Frakt (Åkarp studio direct)</span>
                <span className="font-medium">GRATIS</span>
              </div>
              <div className="flex justify-between font-serif text-base text-[#1C1A18] font-medium pt-2 border-t border-[#EAE5DE]">
                <span>Totalt</span>
                <span>{totalPrice.toLocaleString('sv-SE')} kr</span>
              </div>
            </div>

            <div className="space-y-2 text-[11px] text-[#8C857B] pt-2">
              <div className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-[#1C1A18]" />
                <span>Skickas i tryggt specialemballage från Åkarp</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1C1A18]" />
                <span>Äkthetsintyg signerats av Ida Södervall</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-[#1C1A18]" />
                <span>Säker Swish-betalning med Mobilt BankID</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
