/**
 * Standardized Lowercase Serial Number Generator for Picture Slots
 * Format: [project_name]_img_[slot_number] (all lowercase)
 */
export function getProjectSlotId(projectId: string, index: number = 1): string {
  const normalized = projectId.toLowerCase();
  
  let prefix = 'project';
  if (normalized.includes('mystic')) {
    prefix = 'mystic';
  } else if (normalized.includes('aurum')) {
    prefix = 'aurum';
  } else if (normalized.includes('arbor') || normalized.includes('abv')) {
    prefix = 'abvarbor';
  } else if (normalized.includes('dotcom')) {
    prefix = 'dotcom';
  } else if (normalized.includes('uptown')) {
    prefix = 'uptown';
  } else {
    prefix = projectId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  const slotNum = String(index).padStart(2, '0');
  return `${prefix}_img_${slotNum}`;
}

/**
 * LocalStorage image slot manager so the user can easily upload/drag-drop
 * their real photos into any slot and see it instantly previewed across the site.
 */
export const CLIENT_IMAGES_STORAGE_KEY = 'soulspace_client_images';

export function getClientSavedImage(slotId: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CLIENT_IMAGES_STORAGE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    return map[slotId.toLowerCase().trim()] || null;
  } catch {
    return null;
  }
}

export function saveClientImage(slotId: string, dataUrl: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CLIENT_IMAGES_STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[slotId.toLowerCase().trim()] = dataUrl;
    localStorage.setItem(CLIENT_IMAGES_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('soulspace-image-updated', { detail: { slotId } }));
  } catch (err) {
    console.error('Failed to store image in localStorage', err);
  }
}

export function clearClientImage(slotId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(CLIENT_IMAGES_STORAGE_KEY);
    if (!raw) return;
    const map = JSON.parse(raw);
    delete map[slotId.toLowerCase().trim()];
    localStorage.setItem(CLIENT_IMAGES_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('soulspace-image-updated', { detail: { slotId } }));
  } catch (err) {
    console.error('Failed to clear image', err);
  }
}
