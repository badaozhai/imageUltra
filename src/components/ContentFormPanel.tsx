import type { ContentFieldKey, ContentFields } from '../types';

type ContentFormPanelProps = {
  contentFields: ContentFields;
  rawInput: string;
  onFieldChange: (key: ContentFieldKey, value: string) => void;
  onRawInputChange: (value: string) => void;
};

export function ContentFormPanel({ contentFields, rawInput, onFieldChange, onRawInputChange }: ContentFormPanelProps) {
  return (
    <div className="contentFields">
      <div className="twoCol">
        <input value={contentFields.brand} onChange={(e) => onFieldChange('brand', e.target.value)} placeholder="品牌 / 产品名称" />
        <input value={contentFields.title} onChange={(e) => onFieldChange('title', e.target.value)} placeholder="主标题" />
      </div>
      <input value={contentFields.subtitle} onChange={(e) => onFieldChange('subtitle', e.target.value)} placeholder="副标题" />
      <textarea rows={2} value={contentFields.sellingPoints} onChange={(e) => onFieldChange('sellingPoints', e.target.value)} placeholder="核心卖点" />
      <div className="twoCol">
        <input value={contentFields.price} onChange={(e) => onFieldChange('price', e.target.value)} placeholder="价格信息" />
        <input value={contentFields.period} onChange={(e) => onFieldChange('period', e.target.value)} placeholder="活动时间" />
      </div>
      <div className="twoCol">
        <input value={contentFields.benefit} onChange={(e) => onFieldChange('benefit', e.target.value)} placeholder="优惠福利" />
        <input value={contentFields.contact} onChange={(e) => onFieldChange('contact', e.target.value)} placeholder="联系方式 / CTA" />
      </div>
      <textarea rows={2} value={contentFields.remark} onChange={(e) => onFieldChange('remark', e.target.value)} placeholder="备注信息" />
      <textarea value={rawInput} onChange={(e) => onRawInputChange(e.target.value)} placeholder="补充要求：比如文字更醒目、突出到店福利、画面更清爽" rows={3} />
    </div>
  );
}
