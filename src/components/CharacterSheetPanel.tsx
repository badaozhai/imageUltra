import { useRef } from 'react';
import { PersonStanding, Swords, UserRound, X } from 'lucide-react';
import { aspectOptions, qualityOptions } from '../config';
import type { AssetView, QualityOption } from '../types';

type CharacterSheetPanelProps = {
  mode: 'three_view' | 'lookbook';
  name: string;
  onNameChange: (value: string) => void;
  desc: string;
  onDescChange: (value: string) => void;
  styleText: string;
  onStyleChange: (value: string) => void;
  weaponText: string;
  onWeaponChange: (value: string) => void;
  charAssets: AssetView[];
  propAssets: AssetView[];
  selectedCharId: string;
  onSelectChar: (id: string) => void;
  selectedPropId: string;
  onSelectProp: (id: string) => void;
  attachPropImage: boolean;
  onAttachPropImageChange: (value: boolean) => void;
  onDeleteAsset: (id: string) => void;
  onUploadCharAsset: (file: File) => void;
  dimensions: { canvas_width: number; canvas_height: number };
  qualityId: QualityOption['id'];
  aspectId: string;
  onQualityChange: (id: QualityOption['id']) => void;
  onAspectChange: (id: string) => void;
};

/**
 * 三视图 / 定妆照（移植自 fenjingtest 参考图库与资产库口径）：
 * 角色描述 + 画风 + 可选武器（自由填 或 从道具库挑）+ 可选角色参考图锁形象。
 */
export function CharacterSheetPanel(props: CharacterSheetPanelProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const isThreeView = props.mode === 'three_view';

  return (
    <section className="stepCard">
      <header className="stepHeader">
        <i className="stepIconImg"><PersonStanding size={15} /></i>
        <div>
          <h2>{isThreeView ? '三视图设定' : '定妆照设定'}</h2>
          <span>{isThreeView ? '正 / 侧 / 背 同一角色设定图' : '正面全身立绘 · 锁定形象用'}</span>
        </div>
      </header>

      <label>
        角色名
        <input value={props.name} onChange={(e) => props.onNameChange(e.target.value)} placeholder="如：孙悟空" />
      </label>
      <label>
        角色描述（长相 / 装束 / 配色 / 气质）
        <textarea
          rows={3}
          value={props.desc}
          onChange={(e) => props.onDescChange(e.target.value)}
          placeholder="如：金棕色毛发的灵猴，桃心脸雷公嘴，头戴紫金冠插双翎，身穿红袄金甲黄裙，腰束虎皮裙，足蹬黑靴"
        />
      </label>
      <label>
        画风（可留空）
        <input
          value={props.styleText}
          onChange={(e) => props.onStyleChange(e.target.value)}
          placeholder="如：1961年上海美术电影制片厂工笔重彩手绘动画风"
        />
      </label>

      <div className="idLabel"><Swords size={12} style={{ verticalAlign: '-2px' }} /> 武器 / 道具（可选，顺便画进{isThreeView ? '三视图' : '定妆照'}）</div>
      <input
        value={props.weaponText}
        onChange={(e) => { props.onWeaponChange(e.target.value); props.onSelectProp(''); }}
        placeholder="如：如意金箍棒，两端金箍中间乌铁；或从下方道具库直接选"
      />
      {props.propAssets.length > 0 && (
        <div className="presetChips">
          {props.propAssets.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === props.selectedPropId ? 'presetChip active' : 'presetChip'}
              onClick={() => props.onSelectProp(item.id === props.selectedPropId ? '' : item.id)}
              title={item.desc}
            >
              {item.url && <img className="chipThumb" src={item.url} alt="" />}
              {item.name}<small>{item.label || '道具'}</small>
            </button>
          ))}
        </div>
      )}
      {Boolean(props.selectedPropId) && props.propAssets.find((p) => p.id === props.selectedPropId)?.url && (
        <label className="checkRow">
          <input type="checkbox" checked={props.attachPropImage} onChange={(e) => props.onAttachPropImageChange(e.target.checked)} />
          <span>挂道具图作参考（锁定武器形制）</span>
        </label>
      )}

      <div className="idLabel"><UserRound size={12} style={{ verticalAlign: '-2px' }} /> 角色参考图（可选，锁长相装束）</div>
      <div className="refThumbs">
        {props.charAssets.map((item) => (
          <div className={item.id === props.selectedCharId ? 'refThumb assetPick active' : 'refThumb assetPick'} key={item.id}>
            <button
              type="button"
              className="assetPickButton"
              onClick={() => props.onSelectChar(item.id === props.selectedCharId ? '' : item.id)}
              title={`${item.name}（点击${item.id === props.selectedCharId ? '取消' : '选用'}）`}
            >
              {item.url ? <img src={item.url} alt={item.name} /> : <UserRound size={18} />}
            </button>
            <span className="assetName">{item.name}</span>
            <button type="button" className="refRemove" onClick={() => props.onDeleteAsset(item.id)} title="从角色库删除"><X size={12} /></button>
          </div>
        ))}
        <button type="button" className="refAdd" onClick={() => fileRef.current?.click()} title="把已有定妆照/三视图上传进角色库">
          <UserRound size={18} />
          <span>上传角色图</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) props.onUploadCharAsset(file);
            if (fileRef.current) fileRef.current.value = '';
          }}
        />
      </div>

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
    </section>
  );
}
