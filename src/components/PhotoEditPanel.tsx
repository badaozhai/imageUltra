import { Wand2 } from 'lucide-react';

type Preset = { label: string; text: string };

const PRESETS: Preset[] = [
  { label: '人物变瘦', text: '把图中人物自然地变瘦一些，脸型和身材协调、真实自然' },
  { label: '老照片修复', text: '修复这张老照片：去除划痕、污渍和褪色，补全破损，让画面清晰自然，保持原貌和人物身份不变' },
  { label: '变清晰', text: '把这张模糊的照片变清晰，增强细节和锐度，内容和人物保持不变' },
  { label: '自然美颜', text: '对人物做自然的美颜：均匀肤色、去瑕疵、提亮气色，五官和身份保持不变，不要过度磨皮' },
  { label: '换纯白底', text: '把背景换成干净的纯白色背景，主体（人物/产品）保持原样不变' },
  { label: '加产品', text: '把第二张图里的产品自然地摆放进第一张图的场景里，光影、比例协调真实' },
  { label: '人物合影', text: '把这两张照片里的人物自然地合到同一张照片里，光影、比例、风格统一协调' }
];

type PhotoEditPanelProps = {
  instruction: string;
  onInstructionChange: (value: string) => void;
  photoCount: number;
};

/** AI 修图：上传图 + 一句指令 → /images/edits 直接编辑（变瘦/修复/去模糊/合成…）。 */
export function PhotoEditPanel({ instruction, onInstructionChange, photoCount }: PhotoEditPanelProps) {
  return (
    <section className="stepCard">
      <header className="stepHeader">
        <i className="stepIconImg"><Wand2 size={15} /></i>
        <div>
          <h2>修图指令</h2>
          <span>一句话说清怎么改 · 合成/加产品请传 2 张</span>
        </div>
      </header>
      <div className="presetChips">
        {PRESETS.map((preset) => (
          <button key={preset.label} type="button" className="presetChip" onClick={() => onInstructionChange(preset.text)}>{preset.label}</button>
        ))}
      </div>
      <textarea
        className="editInstruction"
        rows={3}
        value={instruction}
        placeholder="例如：把人物变瘦一点 / 修复这张老照片 / 把照片变清晰 / 把这两张图的人物合到一起"
        onChange={(e) => onInstructionChange(e.target.value)}
      />
      {photoCount >= 2 && <p className="modeHint">已传 {photoCount} 张 · 可做合成/加产品（在指令里说清谁加到谁）</p>}
    </section>
  );
}
