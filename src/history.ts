import type { ArtworkRecord } from './types';

/** 本地作品历史：IndexedDB 持久化（随应用数据目录保存，完全离线）。 */

const DB_NAME = 'imageultra';
const DB_VERSION = 1;
const STORE = 'artworks';
const MAX_RECORDS = 200;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('无法打开本地历史库'));
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('本地历史写入失败'));
    tx.onabort = () => reject(tx.error ?? new Error('本地历史写入中断'));
  });
}

export async function listArtworks(): Promise<ArtworkRecord[]> {
  const db = await openDb();
  try {
    return await new Promise<ArtworkRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const request = tx.objectStore(STORE).getAll();
      request.onsuccess = () => {
        const rows = (request.result as ArtworkRecord[]) ?? [];
        rows.sort((a, b) => b.createdAt - a.createdAt);
        resolve(rows);
      };
      request.onerror = () => reject(request.error ?? new Error('读取历史失败'));
    });
  } finally {
    db.close();
  }
}

export async function addArtwork(record: ArtworkRecord): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(record);
    await txDone(tx);
    await pruneOld(db);
  } finally {
    db.close();
  }
}

export async function deleteArtwork(id: string): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    await txDone(tx);
  } finally {
    db.close();
  }
}

/** 超过上限时删除最老的记录，避免历史库无限膨胀。 */
async function pruneOld(db: IDBDatabase): Promise<void> {
  const ids: string[] = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const request = tx.objectStore(STORE).getAll();
    request.onsuccess = () => {
      const rows = (request.result as ArtworkRecord[]) ?? [];
      rows.sort((a, b) => b.createdAt - a.createdAt);
      resolve(rows.slice(MAX_RECORDS).map((row) => row.id));
    };
    request.onerror = () => reject(request.error ?? new Error('读取历史失败'));
  });
  if (!ids.length) return;
  const tx = db.transaction(STORE, 'readwrite');
  for (const id of ids) tx.objectStore(STORE).delete(id);
  await txDone(tx);
}
