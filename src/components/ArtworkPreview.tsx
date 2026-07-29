import { ImagePlus } from 'lucide-react';
import type { ArtworkView } from '../types';

export function ArtworkPreview({ artwork }: { artwork: ArtworkView | null }) {
  return (
    <div className="previewStage">
      {!artwork ? (
        <div className="emptyCanvas">
          <ImagePlus size={34} />
          <strong>还没有成品图</strong>
          <span>选择模式、填写内容后点击生成，成品图会显示在这里。</span>
        </div>
      ) : (
        <div
          className="canvasPreview"
          style={{ aspectRatio: `${artwork.width}/${artwork.height}` }}
        >
          <img className="modelPreviewImage" src={artwork.url} alt={artwork.title} />
        </div>
      )}
    </div>
  );
}
