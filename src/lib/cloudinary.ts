// Cloudinary unsigned upload helper. No SDK required.
const CLOUD_NAME = 'dob90k47o';
const UPLOAD_PRESET = 'saree_upload';
const ENDPOINT = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', UPLOAD_PRESET);
  const res = await fetch(ENDPOINT, { method: 'POST', body: fd });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Cloudinary upload failed (${res.status}): ${txt}`);
  }
  return res.json();
}

export async function uploadManyToCloudinary(files: File[]): Promise<string[]> {
  const results = await Promise.all(files.map(uploadToCloudinary));
  return results.map(r => r.secure_url);
}
