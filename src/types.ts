export type SceneOption = { id: string; name: string };
export type AspectOption = { id: string; label: string; width: number; height: number };
export type QualityOption = { id: '1k' | '2k' | '4k'; label: string; base: number };
export type CameraOption = { id: string; name: string };

export type GenerationMode = 'text' | 'image' | 'edit' | 'id' | 'three_view' | 'lookbook' | 'prop';

export type GenerationForm = {
  scene_type: string;
  industry: string;
  style: string;
  camera_model: string;
  layout_type: string;
};

export type ContentFieldKey =
  | 'brand'
  | 'title'
  | 'subtitle'
  | 'sellingPoints'
  | 'price'
  | 'period'
  | 'benefit'
  | 'contact'
  | 'remark';

export type ContentFields = Record<ContentFieldKey, string>;

/** 生图任务的编排参数（对应 imagepro 服务端的 project 记录）。 */
export type ProjectSpec = {
  title: string;
  scene_type: string;
  industry: string;
  style: string;
  layout_type: string;
  camera_model: string;
  aspect_ratio: string;
  image_quality: QualityOption['id'];
  canvas_width: number;
  canvas_height: number;
};

/** 本地上传的参考图（实物图/待修照片/人像）。 */
export type ReferenceImage = {
  id: string;
  name: string;
  bytes: Uint8Array;
  width: number;
  height: number;
  previewUrl: string;
};

export type GenerationRequest = {
  mode: GenerationMode;
  project: ProjectSpec;
  /** 无实物图模式的结构化文案；其余模式为 null */
  content: Record<string, string> | null;
  references: ReferenceImage[];
  instruction: string;
  readImageText: boolean;
  idSize: string;
  idBg: string;
  /** 三视图/定妆照/道具等模式：界面上可编辑的最终提示词，直接下发（不走内置拼装） */
  promptOverride?: string;
};

export type GeneratedImage = {
  bytes: Uint8Array;
  promptUsed: string;
  route: 'images_edits' | 'images_generations' | 'responses_stream';
};

export type ArtworkRecord = {
  id: string;
  createdAt: number;
  mode: GenerationMode;
  title: string;
  prompt: string;
  aspectRatio: string;
  width: number;
  height: number;
  blob: Blob;
};

/** 内存中带 objectURL 的展示态作品。 */
export type ArtworkView = Omit<ArtworkRecord, 'blob'> & { url: string; blob: Blob };

/** 资产库条目：角色（定妆照/三视图沉淀）或道具（武器/法术/道具）。 */
export type AssetKind = 'char' | 'prop';

export type AssetRecord = {
  id: string;
  kind: AssetKind;
  name: string;
  /** 道具细分：道具 | 武器 | 法术（角色资产为空） */
  label: string;
  /** 道具归属角色名（如：孙悟空 的 金箍棒） */
  owner: string;
  desc: string;
  /** 用法说明，防歧义（如：筋斗云踩在脚下、不是拿在手里） */
  usage: string;
  createdAt: number;
  updatedAt: number;
  blob: Blob | null;
};

export type AssetView = Omit<AssetRecord, 'blob'> & { blob: Blob | null; url: string };
