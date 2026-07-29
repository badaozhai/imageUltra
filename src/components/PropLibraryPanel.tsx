import { useRef } from 'react';
import { ImageUp, Plus, Sword, X } from 'lucide-react';
import { aspectOptions, qualityOptions } from '../config';
import type { AssetView, QualityOption } from '../types';

const PROP_LABELS = ['道具', '武器', '法术'];

type PropLibraryPanelProps = {
  propAssets: AssetView[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onPatch: (id: string, patch: Partial<Pick<AssetView, 'name' | 'label' | 'owner' | 'desc' | 'usage'>>) => void;
  onUploadImage: (id: string, file: File) => void;
  dimensions: { canvas_width: number; canvas_height: number };
  qualityId: QualityOption['id'];
  aspectId: string;
  onQualityChange: (id: QualityOption['id']) => void;
  onAspectChange: (id: string) => void;
};

/**
 * 道具库（移植自 fenjingtest 方案B 资产库 prop 口径）：
 * 道具/武器/法术，可标归属角色与用法（防"筋斗云拿在手里"类歧义）；
 * 点"生成道具图"出纯净单体参考图，也可直接上传已有图。
 * 库存本机，三视图/定妆照里可直接挑选挂载。
 */
export function PropLibraryPanel(props: PropLibraryPanelProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const active = props.propAssets.find((item) => item.id === props.activeId) ?? null;

  return (
    <section className="stepCard">
      <header className="stepHeader">
        <i className="stepIconImg"><Sword size={15} /></i>
        <div>
          <h2>道具库</h2>
          <span>武器 / 法术 / 道具 · 单体参考图 · 存本机</span>
        </div>
        <button className="secondary miniButton headerAction" type="button" onClick={props.onCreate}>
          <Plus size={13} /> 新增
        </button>
      </header>

      {props.propAssets.length > 0 ? (
        <div className="propGrid">
          {props.propAssets.map((item) => (
            <div key={item.id} className={item.id === props.activeId ? 'propCell active' : 'propCell'}>
              <button type="button" className="propThumb" onClick={() => props.onSelect(item.id)} title={item.desc || item.name}>
                {item.url ? <img src={item.url} alt={item.name} /> : <Sword size={20} />}
              </button>
              <div className="propMeta">
                <span>{item.name || '未命名'}<small>{item.label || '道具'}</small></span>
                <button type="button" className="historyDelete" onClick={() => props.onDelete(item.id)} title="删除"><X size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="modeHint">道具库还是空的 · 点右上"新增"建第一件道具（如：如意金箍棒）</p>
      )}

      {active && (
        <>
          <div className="twoCol">
            <label>
              名称
              <input value={active.name} onChange={(e) => props.onPatch(active.id, { name: e.target.value })} placeholder="如：如意金箍棒" />
            </label>
            <label>
              类型
              <select value={active.label || '道具'} onChange={(e) => props.onPatch(active.id, { label: e.target.value })}>
                {PROP_LABELS.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <label>
            归属角色（可留空）
            <input value={active.owner} onChange={(e) => props.onPatch(active.id, { owner: e.target.value })} placeholder="如：孙悟空" />
          </label>
          <label>
            形制描述
            <textarea
              rows={2}
              value={active.desc}
              onChange={(e) => props.onPatch(active.id, { desc: e.target.value })}
              placeholder="如：两端金箍、中间乌铁棒身，刻'如意金箍棒'铭文，金光内敛"
            />
          </label>
          <label>
            用法说明（可留空，防歧义）
            <input
              value={active.usage}
              onChange={(e) => props.onPatch(active.id, { usage: e.target.value })}
              placeholder="如：握持挥舞；筋斗云则是踩在脚下、不是拿在手里"
            />
          </label>
          <button type="button" className="secondary" onClick={() => fileRef.current?.click()}>
            <ImageUp size={15} /> 上传已有道具图（替换）
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && active) props.onUploadImage(active.id, file);
              if (fileRef.current) fileRef.current.value = '';
            }}
          />

          <div className="canvasRow">
            <div className="qualitySwitch">
              {qualityOptions.map((item) => (
                <button key={item.id} className={item.id === props.qualityId ? 'active' : ''} onClick={() => props.onQualityChange(item.id)} type="button">{item.label}</button>
              ))}
            </div>
            <span className="dimensionTag">{props.dimensions.canvas_width} × {props.dimensions.canvas_height}</span>
          </div>
          <div className="aspectScroller">
            {aspectOptions.map((item) => (
              <button key={item.id} className={item.id === props.aspectId ? 'aspectPill active' : 'aspectPill'} onClick={() => props.onAspectChange(item.id)} type="button">
                <span className="aspectIcon" style={{ aspectRatio: `${item.width}/${item.height}` }} />
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
