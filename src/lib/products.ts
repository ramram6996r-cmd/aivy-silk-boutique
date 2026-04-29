import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { uploadManyToCloudinary } from './cloudinary';

export interface FirestoreProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  discountPrice?: number;
  description: string;
  details?: string;
  care?: string;
  fabric?: string;
  occasion?: string;
  color?: string;
  material?: string;
  weight?: string;
  stock: boolean;
  badge?: 'new' | 'bestseller' | null;
  images: string[];
  rating?: number;
  reviewCount?: number;
  createdAt?: Timestamp;
}

const COL = 'products';

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export async function fetchProducts(): Promise<FirestoreProduct[]> {
  try {
    const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<FirestoreProduct, 'id'>) }));
  } catch (e) {
    console.warn('[products] fetch failed:', e);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<FirestoreProduct | null> {
  const q = query(collection(db, COL), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  const d = snap.docs[0];
  return d ? ({ id: d.id, ...(d.data() as Omit<FirestoreProduct, 'id'>) }) : null;
}

export async function fetchProductById(id: string): Promise<FirestoreProduct | null> {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<FirestoreProduct, 'id'>) }) : null;
}

export async function createProduct(
  data: Omit<FirestoreProduct, 'id' | 'createdAt' | 'images'>,
  files: File[],
): Promise<string> {
  // Upload to Cloudinary FIRST (per requirements), then save product with image URLs.
  const images = files.length ? await uploadManyToCloudinary(files) : [];
  const docRef = await addDoc(collection(db, COL), {
    ...data,
    slug: data.slug || slugify(data.name),
    images,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProduct(
  id: string,
  data: Partial<FirestoreProduct>,
  newFiles?: File[],
): Promise<void> {
  const update: Record<string, unknown> = { ...data };
  if (newFiles && newFiles.length) {
    const urls = await uploadManyToCloudinary(newFiles);
    update.images = [...(data.images || []), ...urls];
  }
  await updateDoc(doc(db, COL, id), update);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

export async function removeImageFromProduct(id: string, url: string, currentImages: string[]) {
  const next = currentImages.filter(u => u !== url);
  await updateDoc(doc(db, COL, id), { images: next });
}
