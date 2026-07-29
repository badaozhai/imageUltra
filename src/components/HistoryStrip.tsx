import { Trash2 } from 'lucide-react';
import type { ArtworkView } from '../types';

type HistoryStripProps = {
  items: ArtworkView[];
  activeId: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

const MODE_LABELS: Record<string, string> = {
  text: '文生图',
  image: '实物图',
  edit: '修图',
  id: '证件照',
  three_view: '三视图',
  lookbook: '定妆照',
  prop: '道具'
};

/** 本地生成历史（IndexedDB 持久化），点击回看、可删除。 */
export function HistoryStrip({ items, activeId, onSelect, onDelete }: HistoryStripProps) {
  if (!items.length) return null;
  return (
    <div className="toolSection">
      <div className="sectionHeader">
        <h2>生成历史</h2>
        <span>保存在本机 · 共 {items.length} 张</span>
      </div>
      <div className="historyGrid">
        {items.map((item) => (
          <div key={item.id} className={activeId === item.id ? 'historyCell active' : 'historyCell'}>
            <button type="button" className="historyThumb" onClick={() => onSelect(item.id)} title={item.title}>
              <img src={item.url} alt={item.title} loading="lazy" />
            </button>
            <div className="historyMeta">
              <span>{MODE_LABELS[item.mode] ?? item.mode}</span>
              <button type="button" className="historyDelete" onClick={() => onDelete(item.id)} title="删除"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
