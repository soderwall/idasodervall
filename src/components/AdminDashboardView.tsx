'use client';

import React, { useState, useEffect } from 'react';
import { Product, Order, ProductType } from '@/types';
import Image from 'next/image';
import { Plus, Edit2, Trash2, PackageCheck, Truck, RefreshCw, Layers, CheckCircle, Lock, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Adding / Editing Products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ProductType>('print');
  const [price, setPrice] = useState<number>(1850);
  const [dimensions, setDimensions] = useState('50 x 70 cm');
  const [technique, setTechnique] = useState('');
  const [description, setDescription] = useState('');
  const [story, setStory] = useState('');
  const [stock, setStock] = useState<number>(10);
  const [edition, setEdition] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resOrd] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
      ]);
      if (resProd.ok) {
        const prodData = await resProd.json();
        setProducts(prodData);
      }
      if (resOrd.ok) {
        const ordData = await resOrd.json();
        setOrders(ordData);
      }
    } catch (err) {
      console.error('Kunde inte hämta admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setTitle(product.title);
      setType(product.type);
      setPrice(product.price);
      setDimensions(product.dimensions);
      setTechnique(product.technique || '');
      setDescription(product.description || '');
      setStory(product.story || '');
      setStock(product.stock);
      setEdition(product.edition || '');
      setImageUrl(product.images[0] || '');
    } else {
      setEditingProduct(null);
      setTitle('');
      setType('print');
      setPrice(1850);
      setDimensions('50 x 70 cm');
      setTechnique('Giclée Fine Art Print');
      setDescription('Tryckt på 310g Hahnemühle bomullspapper. Signerad och numrerad för hand i Åkarp.');
      setStory('Skapad i ateljén i Åkarp.');
      setStock(15);
      setEdition('Begränsad upplaga (30 ex)');
      setImageUrl('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80');
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      type,
      price: Number(price),
      dimensions,
      technique,
      description,
      story,
      stock: type === 'original' ? Number(stock) : Number(stock),
      edition: edition || (type === 'original' ? 'Original 1/1' : 'Begränsad upplaga'),
      images: [imageUrl || 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'],
    };

    try {
      let res;
      if (editingProduct && editingProduct.id) {
        res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        alert('Kunde inte spara produkten.');
      }
    } catch (err) {
      console.error(err);
      alert('Ett fel uppstod vid sparande.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Är du säker på att du vill radera detta konstverk från butiken?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleShippingStatus = async (order: Order) => {
    const newStatus = order.shippingStatus === 'shipped' ? 'pending' : 'shipped';
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingStatus: newStatus }),
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] pb-20">
      {/* Top Header */}
      <header className="bg-[#1C1A18] text-white py-6 px-6 border-b border-[#2A2725]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2A2725] rounded-xs border border-[#3D3A36]">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#A39E98] uppercase">Studio Management</span>
              <h1 className="font-serif text-2xl text-white">Ida Södervall Ateljé CMS</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={fetchData}
              className="px-3 py-1.5 bg-[#2A2725] hover:bg-[#383431] text-xs text-[#E8E4DF] flex items-center space-x-1.5 rounded-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Uppdatera</span>
            </button>

            <Link
              href="/"
              className="px-3 py-1.5 border border-[#524E4A] hover:bg-[#2A2725] text-xs text-[#E8E4DF] flex items-center space-x-1.5 rounded-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Gå till Butiken</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EAE5DE] space-x-8 text-sm">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 font-serif transition-colors relative ${
              activeTab === 'products'
                ? 'text-[#1C1A18] font-medium border-b-2 border-[#1C1A18]'
                : 'text-[#8C857B] hover:text-[#1C1A18]'
            }`}
          >
            <span>Konstverk & Lagersaldo ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 font-serif transition-colors relative ${
              activeTab === 'orders'
                ? 'text-[#1C1A18] font-medium border-b-2 border-[#1C1A18]'
                : 'text-[#8C857B] hover:text-[#1C1A18]'
            }`}
          >
            <span>Inkomna Ordrar ({orders.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xs text-[#8C857B]">Laddar ateljédata...</div>
        ) : (
          <>
            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white p-4 border border-[#EAE5DE] rounded-sm">
                  <div>
                    <h2 className="font-serif text-lg text-[#1C1A18]">Lager & Galleriprodukter</h2>
                    <p className="text-xs text-[#8C857B] font-light">
                      Lägg till nya original eller uppdatera lagersaldo för limited edition prints.
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal()}
                    className="py-2.5 px-5 bg-[#1C1A18] hover:bg-[#33302C] text-white text-xs font-medium uppercase tracking-widest rounded-xs flex items-center space-x-2 transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Lägg till nytt konstverk</span>
                  </button>
                </div>

                <div className="bg-white border border-[#EAE5DE] rounded-sm overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F5F2ED] text-[11px] uppercase tracking-wider text-[#635E57] border-b border-[#EAE5DE]">
                          <th className="py-3 px-4">Bild</th>
                          <th className="py-3 px-4">Titel</th>
                          <th className="py-3 px-4">Typ</th>
                          <th className="py-3 px-4">Pris</th>
                          <th className="py-3 px-4">Lagersaldo</th>
                          <th className="py-3 px-4">Upplaga</th>
                          <th className="py-3 px-4 text-right">Åtgärder</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE5DE] text-xs text-[#1C1A18]">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-[#FBF9F5]">
                            <td className="py-3 px-4">
                              <div className="relative w-12 h-14 bg-[#EAE5DE] rounded-xs overflow-hidden">
                                <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="48px" />
                              </div>
                            </td>
                            <td className="py-3 px-4 font-serif font-medium text-sm">
                              {p.title}
                              <span className="block text-[11px] text-[#8C857B] font-sans font-normal">{p.dimensions}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-xs text-[10px] uppercase font-medium tracking-wider ${
                                p.type === 'original' ? 'bg-[#1C1A18] text-white' : 'bg-[#EFEAE2] text-[#635E57]'
                              }`}>
                                {p.type === 'original' ? 'Original' : 'Print'}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-medium">{p.price.toLocaleString('sv-SE')} kr</td>
                            <td className="py-3 px-4">
                              <span className={`font-semibold ${p.stock === 0 ? 'text-red-700' : 'text-[#1C1A18]'}`}>
                                {p.stock} st {p.stock === 0 && '(Slutsåld)'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#635E57]">{p.edition || '-'}</td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={() => handleOpenModal(p)}
                                className="p-1.5 hover:bg-[#F0EBE3] text-[#524E4A] rounded-xs transition-colors"
                                title="Redigera"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 hover:bg-red-50 text-red-700 rounded-xs transition-colors"
                                title="Radera"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="bg-white p-4 border border-[#EAE5DE] rounded-sm">
                  <h2 className="font-serif text-lg text-[#1C1A18]">Kundordrar & Utskick</h2>
                  <p className="text-xs text-[#8C857B] font-light">
                    Se alla inkomna Swish-beställningar och markera dem när du skickat dem från ateljén i Åkarp.
                  </p>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white p-12 text-center text-xs text-[#8C857B] border border-[#EAE5DE]">
                    Inga ordrar registrerade ännu.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div key={ord.id} className="bg-white border border-[#EAE5DE] p-6 rounded-sm space-y-4 shadow-xs">
                        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#EAE5DE] gap-2">
                          <div>
                            <span className="text-[10px] tracking-widest uppercase text-[#8C857B]">Ordernummer</span>
                            <h3 className="font-serif text-xl text-[#1C1A18] font-medium">{ord.orderNumber}</h3>
                            <span className="text-[11px] text-[#8C857B]">Datum: {new Date(ord.createdAt).toLocaleString('sv-SE')}</span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-medium uppercase tracking-wider rounded-xs flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>Swish Betald ({ord.swishRef})</span>
                            </span>

                            <button
                              onClick={() => handleToggleShippingStatus(ord)}
                              className={`py-1.5 px-4 text-xs font-medium uppercase tracking-wider rounded-xs flex items-center space-x-2 transition-colors ${
                                ord.shippingStatus === 'shipped'
                                  ? 'bg-[#2A2725] text-white'
                                  : 'bg-[#EFEAE2] hover:bg-[#EAE5DE] text-[#1C1A18]'
                              }`}
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>{ord.shippingStatus === 'shipped' ? 'Status: Skickad' : 'Markera som Skickad'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#524E4A]">
                          <div>
                            <h4 className="font-medium text-[#1C1A18] mb-1">Mottagare & Leveransadress</h4>
                            <p className="font-semibold text-[#1C1A18]">{ord.customer.fullName}</p>
                            <p>{ord.customer.street}</p>
                            <p>{ord.customer.postalCode} {ord.customer.city}</p>
                            <p className="pt-1 text-[#8C857B]">E-post: {ord.customer.email} · Tel: {ord.customer.phone}</p>
                            {ord.customer.notes && (
                              <p className="mt-2 italic text-[#8C857B] bg-[#F5F2ED] p-2 rounded-xs">
                                "{ord.customer.notes}"
                              </p>
                            )}
                          </div>

                          <div>
                            <h4 className="font-medium text-[#1C1A18] mb-1">Beställda Verk</h4>
                            <div className="space-y-2">
                              {ord.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center bg-[#F5F2ED] p-2 rounded-xs">
                                  <span>{item.productTitle} ({item.quantity} st)</span>
                                  <span className="font-medium">{item.price.toLocaleString('sv-SE')} kr</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-2 text-right font-serif text-sm font-medium text-[#1C1A18]">
                              Totalt: {ord.totalAmount.toLocaleString('sv-SE')} kr
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-[#FBF9F5] border border-[#EAE5DE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-sm shadow-2xl space-y-6">
            <div className="border-b border-[#EAE5DE] pb-4 flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl text-[#1C1A18]">
                  {editingProduct ? 'Redigera Konstverk' : 'Lägg Till Nytt Konstverk'}
                </h2>
                <p className="text-xs text-[#8C857B]">Fyll i uppgifterna för ateljégalleriet</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8C857B] hover:text-[#1C1A18] text-sm font-medium"
              >
                Stäng [X]
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs text-[#524E4A]">
              <div>
                <label className="block text-[#1C1A18] font-medium mb-1">Titel / Verkets Namn *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Morgondagg över Skåneslätten"
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1A18] font-medium mb-1">Typ av Konstverk *</label>
                  <select
                    value={type}
                    onChange={(e) => {
                      const newType = e.target.value as ProductType;
                      setType(newType);
                      if (newType === 'original') {
                        setStock(1);
                        setEdition('Original (Unikat 1/1)');
                      } else {
                        setEdition('Begränsad upplaga (30 ex)');
                      }
                    }}
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                  >
                    <option value="print">Limited Edition Print</option>
                    <option value="original">Originalmålning (1/1)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#1C1A18] font-medium mb-1">Pris (SEK) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1A18] font-medium mb-1">Mått / Dimensioner *</label>
                  <input
                    type="text"
                    required
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="50 x 70 cm"
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1A18] font-medium mb-1">Lagersaldo *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1C1A18] font-medium mb-1">Upplaga Information</label>
                  <input
                    type="text"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    placeholder="Begränsad upplaga (50 ex)"
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>

                <div>
                  <label className="block text-[#1C1A18] font-medium mb-1">Teknik & Material</label>
                  <input
                    type="text"
                    value={technique}
                    onChange={(e) => setTechnique(e.target.value)}
                    placeholder="Giclée Fine Art Print på 310g Hahnemühle"
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1C1A18] font-medium mb-1">Bild-URL *</label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#1C1A18] font-medium mb-1">Beskrivning</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Beskriv verket, känsla och färger..."
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                />
              </div>

              <div>
                <label className="block text-[#1C1A18] font-medium mb-1">Bakgrundsstory / Citat från Ateljén</label>
                <input
                  type="text"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Inspirerad av morgonljuset i Åkarp..."
                  className="w-full px-3 py-2 bg-white border border-[#DCD6CD] rounded-xs focus:outline-none focus:border-[#1C1A18]"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-[#EAE5DE]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-5 border border-[#DCD6CD] hover:bg-[#F5F2ED] text-[#1C1A18] rounded-xs"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#1C1A18] hover:bg-[#33302C] text-white font-medium uppercase tracking-widest rounded-xs"
                >
                  Spara Konstverk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
