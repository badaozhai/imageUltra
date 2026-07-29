import { FileText, RotateCcw } from 'lucide-react';

type PromptEditorCardProps = {
  value: string;
  dirty: boolean;
  onChange: (value: string) => void;
  onReset: () => void;
};

/** 最终提示词：按字段自动拼装，但完全可编辑——想怎么改就怎么改，改过后不再自动覆盖。 */
export function PromptEditorCard({ value, dirty, onChange, onReset }: PromptEditorCardProps) {
  return (
    <section className="stepCard">
      <header className="stepHeader">
        <i className="stepIconImg"><FileText size={15} /></i>
        <div>
          <h2>最终提示词（可编辑）</h2>
          <span>{dirty ? '已手动修改 · 不再自动覆盖' : '按上方字段自动拼装 · 可直接改'}</span>
        </div>
        <button className="secondary miniButton headerAction" type="button" onClick={onReset} title="按当前字段重新拼装提示词">
          <RotateCcw size={13} /> 重新拼装
        </button>
      </header>
      <textarea
        className="promptEditor"
        rows={7}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="填写上方字段后自动生成提示词，也可以整段自己写"
      />
    </section>
  );
}
