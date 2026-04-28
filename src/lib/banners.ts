import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  discount?: string; // e.g. "FLAT 30% OFF"
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string; // tailwind/hex
  active: boolean;
  order: number;
  createdAt?: Timestamp;
}

const COL = 'banners';

export async function fetchBanners(): Promise<Banner[]> {
  try {
    const q = query(collection(db, COL), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Banner, 'id'>) }));
  } catch {
    return [];
  }
}

export async function createBanner(data: Omit<Banner, 'id' | 'createdAt'>) {
  await addDoc(collection(db, COL), { ...data, createdAt: serverTimestamp() });
}

export async function updateBanner(id: string, data: Partial<Banner>) {
  await updateDoc(doc(db, COL, id), data);
}

export async function deleteBanner(id: string) {
  await deleteDoc(doc(db, COL, id));
}
