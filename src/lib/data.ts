import { Product, Order } from '@/types';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Morgondagg över Skåneslätten',
    slug: 'morgondagg-over-skaneslatten',
    type: 'original',
    price: 18500,
    dimensions: '100 x 120 cm',
    technique: 'Olja och akryl på linneduk',
    description: 'Ett unikt originalverk målat med flödande lager och mjuka toner av ockra, disig blått och warm terracotta. Målningen är inramad i en skräddarsydd svävram av ugnstorkad ek.',
    story: 'Skapad under de tidiga vårmorgnarna i ateljén i Åkarp. Inspirerad av ljusets brytning over de öppna skånska fälten.',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 1,
    edition: 'Original (Unikat 1/1)',
    isLimitedEdition: false,
    signedByHand: true,
    shippedFromStudio: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    title: 'Skuggor i Ateljén No. 4',
    slug: 'skuggor-i-ateljen-no-4',
    type: 'print',
    price: 1850,
    dimensions: '50 x 70 cm',
    technique: 'Giclée Fine Art Print på 310g Hahnemühle-papper',
    description: 'Konstprint av högsta museumkvalitet med fantastisk färgåtergivning och struktur. Varje print stämplas, numreras och signeras personligen av Ida Södervall.',
    story: 'Säljs i en strikt begränsad upplaga om 50 exemplar. Levereras omsorgsfullt inrullad i silkespapper från ateljén i Åkarp.',
    images: [
      'https://images.unsplash.com/photo-1579783928621-6a13d66a22d5?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 18,
    edition: 'Begränsad upplaga (50 ex)',
    isLimitedEdition: true,
    signedByHand: true,
    shippedFromStudio: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-3',
    title: 'Stilla Vatten och Ockra',
    slug: 'stilla-vatten-och-ockra',
    type: 'original',
    price: 24000,
    dimensions: '120 x 140 cm',
    technique: 'Blandteknik och pigment på kraftig duk',
    description: 'Ett storslaget abstrakt verk som dominerar rummet med lugn och harmonisk elegans. Rika strukturer och råa naturliga färgtoner.',
    story: 'Handbyggd spänram. Direktutskick från ateljén i Åkarp med specialtransport.',
    images: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 1,
    edition: 'Original (Unikat 1/1)',
    isLimitedEdition: false,
    signedByHand: true,
    shippedFromStudio: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-4',
    title: 'Nordiskt Ljus I',
    slug: 'nordiskt-ljus-1',
    type: 'print',
    price: 1450,
    dimensions: '40 x 50 cm',
    technique: 'Giclée Fine Art Print på bomullspapper',
    description: 'Ett stilrent motiv med minimalistisk komposition och subtila övergångar.',
    story: 'Handsignerad och numrerad i ateljén. Tryckt med åldringsbeständigt pigmentbläck.',
    images: [
      'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 12,
    edition: 'Begränsad upplaga (30 ex)',
    isLimitedEdition: true,
    signedByHand: true,
    shippedFromStudio: true,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-5',
    title: 'Poesi i Betong & Siden',
    slug: 'poesi-i-betong-och-siden',
    type: 'original',
    price: 16000,
    dimensions: '80 x 100 cm',
    technique: 'Akryl, grafit och krita på duk',
    description: 'Subtil balans mellan det råa och det eleganta. Ett uttrycksfullt verk skapat med svepande rörelser och lager på lager.',
    story: 'Visades på Idas separatutställning hösten 2024.',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 0, // Solgt for demo
    edition: 'Original (Såld)',
    isLimitedEdition: false,
    signedByHand: true,
    shippedFromStudio: true,
    featured: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'prod-6',
    title: 'Åkarpsserien: Horisont',
    slug: 'akarpsserien-horisont',
    type: 'print',
    price: 2200,
    dimensions: '70 x 100 cm',
    technique: 'Giclée Fine Art Print',
    description: 'En maffig print i större format som ger ett modernt och konstnärligt intryck.',
    story: 'Signerad för hand med blyerts under motivet samt stämplad med studiostämpel.',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 5,
    edition: 'Begränsad upplaga (25 ex)',
    isLimitedEdition: true,
    signedByHand: true,
    shippedFromStudio: true,
    featured: true,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'IS-1001',
    customer: {
      fullName: 'Sofia Lindqvist',
      email: 'sofia.l@example.com',
      phone: '0701234567',
      street: 'Strandvägen 12',
      postalCode: '114 56',
      city: 'Stockholm',
      notes: 'Lämna vid dörren om ingen är hemma.'
    },
    items: [
      {
        productId: 'prod-2',
        productTitle: 'Skuggor i Ateljén No. 4',
        quantity: 1,
        price: 1850,
        type: 'print',
        image: 'https://images.unsplash.com/photo-1579783928621-6a13d66a22d5?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    totalAmount: 1850,
    paymentMethod: 'swish',
    paymentStatus: 'completed',
    shippingStatus: 'shipped',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    swishRef: 'SWISH-892301923'
  }
];

interface DBData {
  products: Product[];
  orders: Order[];
}

function ensureDbExists(): DBData {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData: DBData = {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    const initialData: DBData = {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

export function saveDb(data: DBData): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function getProducts(): Product[] {
  const db = ensureDbExists();
  return db.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}

export function saveProduct(productData: Partial<Product>): Product {
  const db = ensureDbExists();
  let existingIndex = -1;
  if (productData.id) {
    existingIndex = db.products.findIndex(p => p.id === productData.id);
  }

  const slug = productData.slug || productData.title?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-') || 'konstverk';

  if (existingIndex >= 0) {
    const updated = {
      ...db.products[existingIndex],
      ...productData,
      slug
    };
    db.products[existingIndex] = updated;
    saveDb(db);
    return updated;
  } else {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      title: productData.title || 'Utan titel',
      slug,
      type: productData.type || 'print',
      price: productData.price || 0,
      dimensions: productData.dimensions || '50x70 cm',
      technique: productData.technique || '',
      description: productData.description || '',
      story: productData.story || '',
      images: productData.images && productData.images.length > 0 ? productData.images : ['https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'],
      stock: productData.stock ?? (productData.type === 'original' ? 1 : 10),
      edition: productData.edition || (productData.type === 'original' ? 'Original 1/1' : 'Begränsad upplaga'),
      isLimitedEdition: productData.type === 'print',
      signedByHand: true,
      shippedFromStudio: true,
      featured: productData.featured || false,
      createdAt: new Date().toISOString()
    };
    db.products.unshift(newProduct);
    saveDb(db);
    return newProduct;
  }
}

export function deleteProduct(id: string): boolean {
  const db = ensureDbExists();
  const initialLength = db.products.length;
  db.products = db.products.filter(p => p.id !== id);
  if (db.products.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

export function getOrders(): Order[] {
  const db = ensureDbExists();
  return db.orders;
}

export function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
  const db = ensureDbExists();

  // Deduct stock
  orderData.items.forEach(item => {
    const prod = db.products.find(p => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  });

  const orderNumber = `IS-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder: Order = {
    ...orderData,
    id: `ord-${Date.now()}`,
    orderNumber,
    createdAt: new Date().toISOString()
  };

  db.orders.unshift(newOrder);
  saveDb(db);
  return newOrder;
}

export function updateOrderStatus(orderId: string, shippingStatus: Order['shippingStatus'], paymentStatus?: Order['paymentStatus']): Order | undefined {
  const db = ensureDbExists();
  const order = db.orders.find(o => o.id === orderId);
  if (order) {
    order.shippingStatus = shippingStatus;
    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }
    saveDb(db);
    return order;
  }
  return undefined;
}
