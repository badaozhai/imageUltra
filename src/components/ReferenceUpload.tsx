import { useRef } from 'react';
import { ImageUp, Loader2, X } from 'lucide-react';
import type { GenerationMode, ReferenceImage } from '../types';

type ReferenceUploadProps = {
  mode: GenerationMode;
  references: ReferenceImage[];
  loading: boolean;
  onUpload: (files: File[]) => void;
  onRemove: (id: string) => void;
};

const MODE_COPY: Record<string, { title: string; hint: string }> = {
  image: { title: '实物图', hint: '单张=单品海报，多张=产品合集海报' },
  edit: { title: '照片', hint: '要修的照片 · 合成/加产品请传 2 张' },
  id: { title: '人像照片', hint: '一张清晰的正面人物照片' }
};

/** 本地图片选择：直接读文件字节，不经任何服务器。 */
export function ReferenceUpload({ mode, references, loading, onUpload, onRemove }: ReferenceUploadProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const copy = MODE_COPY[mode] ?? MODE_COPY.image;

  return (
    <section className="stepCard">
      <header className="stepHeader">
        <i className="stepIconImg"><ImageUp size={15} /></i>
        <div>
          <h2>{copy.title}</h2>
          <span>{copy.hint}</span>
        </div>
      </header>

      <div className="refThumbs">
        {references.map((item) => (
          <div className="refThumb" key={item.id}>
            <img src={item.previewUrl} alt={item.name} />
            <button type="button" className="refRemove" onClick={() => onRemove(item.id)} title="移除"><X size={12} /></button>
          </div>
        ))}
        <button type="button" className="refAdd" onClick={() => fileRef.current?.click()} disabled={loading}>
          {loading ? <Loader2 size={18} className="spin" /> : <ImageUp size={18} />}
          <span>{loading ? '读取中' : '选择图片'}</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) onUpload(files);
            if (fileRef.current) fileRef.current.value = '';
          }}
        />
      </div>
    </section>
  );
}
