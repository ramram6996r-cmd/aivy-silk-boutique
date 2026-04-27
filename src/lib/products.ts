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
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

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
  fabric: string;
  occasion: string;
  color?: string;
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
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<FirestoreProduct, 'id'>) }));
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
  const docRef = await addDoc(collection(db, COL), {
    ...data,
    slug: data.slug || slugify(data.name),
    images: [],
    createdAt: serverTimestamp(),
  });
  if (files.length) {
    const urls = await uploadProductImages(docRef.id, files);
    await updateDoc(doc(db, COL, docRef.id), { images: urls });
  }
  return docRef.id;
}

export async function updateProduct(
  id: string,
  data: Partial<FirestoreProduct>,
  newFiles?: File[],
): Promise<void> {
  const update: Record<string, unknown> = { ...data };
  if (newFiles && newFiles.length) {
    const urls = await uploadProductImages(id, newFiles);
    update.images = [...(data.images || []), ...urls];
  }
  await updateDoc(doc(db, COL, id), update);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

export async function uploadProductImages(productId: string, files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const path = `products/${productId}/${Date.now()}-${file.name}`;
    const r = ref(storage, path);
    await uploadBytes(r, file);
    urls.push(await getDownloadURL(r));
  }
  return urls;
}

export async function removeImageFromProduct(id: string, url: string, currentImages: string[]) {
  const next = currentImages.filter(u => u !== url);
  await updateDoc(doc(db, COL, id), { images: next });
  try {
    // best-effort storage delete
    const path = decodeURIComponent(new URL(url).pathname.split('/o/')[1]?.split('?')[0] || '');
    if (path) await deleteObject(ref(storage, path));
  } catch {
    /* ignore */
  }
}
