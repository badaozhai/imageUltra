import { IdCard } from 'lucide-react';
import { ID_PHOTO_BG, ID_PHOTO_SIZES } from '../prompts';

const ID_SIZES = Object.entries(ID_PHOTO_SIZES).map(([id, spec]) => ({ id, label: spec.label, px: `${spec.w}×${spec.h}` }));
const ID_BGS = Object.entries(ID_PHOTO_BG).map(([id, spec]) => ({ id, label: spec.label, color: spec.color }));

type IdPhotoPanelProps = {
  idSize: string;
  idBg: string;
  onSizeChange: (id: string) => void;
  onBgChange: (id: string) => void;
};

/** 证件照：选尺寸 + 底色，上传人物照 → 换底、标准免冠构图，再裁切到精确像素。 */
export function IdPhotoPanel({ idSize, idBg, onSizeChange, onBgChange }: IdPhotoPanelProps) {
  return (
    <section className="stepCard">
      <header className="stepHeader">
        <i className="stepIconImg"><IdCard size={15} /></i>
        <div>
          <h2>证件照规格</h2>
          <span>选尺寸与底色 · 自动换底裁切到精确像素</span>
        </div>
      </header>

      <div className="idLabel">尺寸</div>
      <div className="presetChips">
        {ID_SIZES.map((s) => (
          <button key={s.id} type="button" className={s.id === idSize ? 'presetChip active' : 'presetChip'} onClick={() => onSizeChange(s.id)}>
            {s.label}<small>{s.px}</small>
          </button>
        ))}
      </div>

      <div className="idLabel">底色</div>
      <div className="bgSwatches">
        {ID_BGS.map((b) => (
          <button key={b.id} type="button" className={b.id === idBg ? 'bgSwatch active' : 'bgSwatch'} onClick={() => onBgChange(b.id)}>
            <span className="bgDot" style={{ background: b.color }} />
            {b.label}
          </button>
        ))}
      </div>
    </section>
  );
}
