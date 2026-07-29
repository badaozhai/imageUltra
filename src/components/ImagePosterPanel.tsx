import { SlidersHorizontal } from 'lucide-react';
import { aspectOptions, qualityOptions } from '../config';
import type { QualityOption } from '../types';

type ImagePosterPanelProps = {
  industry: string;
  onIndustryChange: (value: string) => void;
  readImageText: boolean;
  onReadImageTextChange: (value: boolean) => void;
  dimensions: { canvas_width: number; canvas_height: number };
  qualityId: QualityOption['id'];
  aspectId: string;
  onQualityChange: (id: QualityOption['id']) => void;
  onAspectChange: (id: string) => void;
};

/**
 * 有实物图模式的轻量设置：行业/主题（自由文本，原样拼进提示词）+ 画布比例/清晰度。
 * 不含场景/风格/版式/文案，提示词由引擎自动补充“基于这个图片生成一张海报”。
 */
export function ImagePosterPanel({ industry, onIndustryChange, readImageText, onReadImageTextChange, dimensions, qualityId, aspectId, onQualityChange, onAspectChange }: ImagePosterPanelProps) {
  return (
    <section className="stepCard">
      <header className="stepHeader">
        <i className="stepIconImg"><SlidersHorizontal size={15} /></i>
        <div>
          <h2>海报设置（可选）</h2>
          <span>填行业/主题更聚焦 · 设比例适配投放</span>
        </div>
      </header>

      <label>
        行业 / 主题
        <input value={industry} onChange={(e) => onIndustryChange(e.target.value)} placeholder="如：减肥、母婴、火锅，可留空" />
      </label>

      <label className="checkRow">
        <input type="checkbox" checked={readImageText} onChange={(e) => onReadImageTextChange(e.target.checked)} />
        <span>读取图中的文字 / 介绍作为文案（识图自动填）</span>
      </label>

      <div className="canvasRow">
        <div className="qualitySwitch">
          {qualityOptions.map((item) => (
            <button key={item.id} className={item.id === qualityId ? 'active' : ''} onClick={() => onQualityChange(item.id)} type="button">{item.label}</button>
          ))}
        </div>
        <span className="dimensionTag">{dimensions.canvas_width} × {dimensions.canvas_height}</span>
      </div>
      <div className="aspectScroller">
        {aspectOptions.map((item) => (
          <button key={item.id} className={item.id === aspectId ? 'aspectPill active' : 'aspectPill'} onClick={() => onAspectChange(item.id)} type="button">
            <span className="aspectIcon" style={{ aspectRatio: `${item.width}/${item.height}` }} />
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
