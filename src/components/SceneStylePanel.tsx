import { aspectOptions, cameraOptions, layouts, qualityOptions, scenes, styles } from '../config';
import type { GenerationForm, QualityOption } from '../types';

type SceneStylePanelProps = {
  form: GenerationForm;
  dimensions: { canvas_width: number; canvas_height: number };
  qualityId: QualityOption['id'];
  aspectId: string;
  onSceneChange: (sceneType: string) => void;
  onFormChange: (patch: Partial<GenerationForm>) => void;
  onQualityChange: (id: QualityOption['id']) => void;
  onAspectChange: (id: string) => void;
};

export function SceneStylePanel({ form, dimensions, qualityId, aspectId, onSceneChange, onFormChange, onQualityChange, onAspectChange }: SceneStylePanelProps) {
  return (
    <div className="sceneStyle">
      <div className="fieldGrid">
        <label>
          场景
          <select value={form.scene_type} onChange={(e) => onSceneChange(e.target.value)}>
            {scenes.map((scene) => <option key={scene.id} value={scene.id}>{scene.name}</option>)}
          </select>
        </label>
        <label>
          风格
          <select value={form.style} onChange={(e) => onFormChange({ style: e.target.value })}>
            {styles.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          版式
          <select value={form.layout_type} onChange={(e) => onFormChange({ layout_type: e.target.value })}>
            {layouts.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          相机质感
          <select value={form.camera_model} onChange={(e) => onFormChange({ camera_model: e.target.value })}>
            {cameraOptions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
      </div>
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
    </div>
  );
}
