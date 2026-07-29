import type { AssetRecord } from './types';

/** 资产库（角色/道具）：IndexedDB 持久化，完全本机。 */

const DB_NAME = 'imageultra-assets';
const DB_VERSION = 1;
const STORE = 'assets';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('无法打开资产库'));
  });
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('资产库写入失败'));
    tx.onabort = () => reject(tx.error ?? new Error('资产库写入中断'));
  });
}

export async function listAssets(): Promise<AssetRecord[]> {
  const db = await openDb();
  try {
    return await new Promise<AssetRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const request = tx.objectStore(STORE).getAll();
      request.onsuccess = () => {
        const rows = (request.result as AssetRecord[]) ?? [];
        rows.sort((a, b) => b.updatedAt - a.updatedAt);
        resolve(rows);
      };
      request.onerror = () => reject(request.error ?? new Error('读取资产库失败'));
    });
  } finally {
    db.close();
  }
}

export async function putAsset(record: AssetRecord): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(record);
    await txDone(tx);
  } finally {
    db.close();
  }
}

export async function deleteAsset(id: string): Promise<void> {
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    await txDone(tx);
  } finally {
    db.close();
  }
}
