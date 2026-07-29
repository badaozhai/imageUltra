import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, ImagePlus, Loader2, RotateCcw, UserPlus, Wand2 } from 'lucide-react';
import {
  aspectOptions,
  contentPayloadFromFields,
  copyTemplateCount,
  dimensionsForAspect,
  presetContentFields,
  qualityOptions,
  simulatedGenerationProgress
} from './config';
import { ArtworkPreview } from './components/ArtworkPreview';
import { CharacterSheetPanel } from './components/CharacterSheetPanel';
import { ContentFormPanel } from './components/ContentFormPanel';
import { HistoryStrip } from './components/HistoryStrip';
import { IdPhotoPanel } from './components/IdPhotoPanel';
import { ImagePosterPanel } from './components/ImagePosterPanel';
import { IndustryCascader } from './components/IndustryCascader';
import { PhotoEditPanel } from './components/PhotoEditPanel';
import { PromptEditorCard } from './components/PromptEditorCard';
import { PropLibraryPanel } from './components/PropLibraryPanel';
import { ReferenceUpload } from './components/ReferenceUpload';
import { SceneStylePanel } from './components/SceneStylePanel';
import { SettingsDialog } from './components/SettingsDialog';
import { TopBar } from './components/TopBar';
import { deleteAsset as deleteAssetRecord, listAssets, putAsset } from './assets';
import { generateImage } from './generator';
import { addArtwork, deleteArtwork, listArtworks } from './history';
import { bytesToBlob, imageDimsFromBytes, normalizeToPng } from './imageOps';
import { defaultIndustryPath, industryStringFromPath } from './industryTaxonomy';
import {
  assembleCharacterPrompt,
  assemblePropPrompt,
  loadPromptTemplates,
  savePromptTemplates,
  type PromptTemplates
} from './promptTemplates';
import { loadSettings, saveSettings, type AppSettings } from './settings';
import { saveImageToDevice } from './saveImage';
import type {
  ArtworkRecord,
  ArtworkView,
  AssetRecord,
  AssetView,
  ContentFieldKey,
  ContentFields,
  GenerationMode,
  GenerationRequest,
  ProjectSpec,
  QualityOption,
  ReferenceImage
} from './types';

const INITIAL_INDUSTRY_PATH = defaultIndustryPath();
const MAX_REFERENCES = 3;

/** 三视图横版、定妆照竖版、道具方图：切进模式时的默认画面比例。 */
const MODE_DEFAULT_ASPECT: Partial<Record<GenerationMode, string>> = {
  three_view: '3:2',
  lookbook: '3:4',
  prop: '1:1'
};

function toView(record: ArtworkRecord): ArtworkView {
  return { ...record, url: URL.createObjectURL(record.blob) };
}

function toAssetView(record: AssetRecord): AssetView {
  return { ...record, url: record.blob ? URL.createObjectURL(record.blob) : '' };
}

const newId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [templates, setTemplates] = useState<PromptTemplates>(() => loadPromptTemplates());
  const [settingsOpen, setSettingsOpen] = useState(() => !loadSettings().apiKey);
  const [genMode, setGenMode] = useState<GenerationMode>('text');
  const [industryPath, setIndustryPath] = useState<string[]>(INITIAL_INDUSTRY_PATH);
  const [form, setForm] = useState({
    scene_type: 'investment_poster',
    industry: industryStringFromPath(INITIAL_INDUSTRY_PATH),
    style: '高科技感',
    camera_model: 'iphone_17_pro',
    layout_type: '价格突出型'
  });
  const [copyVariant, setCopyVariant] = useState(0);
  const [contentFields, setContentFields] = useState<ContentFields>(() => presetContentFields('investment_poster', INITIAL_INDUSTRY_PATH, 0));
  const [rawInput, setRawInput] = useState('');
  const [references, setReferences] = useState<ReferenceImage[]>([]);
  const [loadingReference, setLoadingReference] = useState(false);
  const [imageIndustry, setImageIndustry] = useState('');
  const [instruction, setInstruction] = useState('');
  const [readImageText, setReadImageText] = useState(false);
  const [idSize, setIdSize] = useState('one_inch');
  const [idBg, setIdBg] = useState('white');
  const [aspectId, setAspectId] = useState('9:16');
  const [qualityId, setQualityId] = useState<QualityOption['id']>('2k');
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [events, setEvents] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<number | null>(null);
  const [history, setHistory] = useState<ArtworkView[]>([]);
  const [activeArtworkId, setActiveArtworkId] = useState('');
  const [refineText, setRefineText] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  // ---- 三视图 / 定妆照 / 道具库（移植自 fenjingtest）----
  const [assets, setAssets] = useState<AssetView[]>([]);
  const [charName, setCharName] = useState('');
  const [charDesc, setCharDesc] = useState('');
  const [charStyle, setCharStyle] = useState('');
  const [weaponText, setWeaponText] = useState('');
  const [selectedCharId, setSelectedCharId] = useState('');
  const [selectedPropId, setSelectedPropId] = useState('');
  const [attachPropImage, setAttachPropImage] = useState(true);
  const [activePropId, setActivePropId] = useState('');
  const [promptText, setPromptText] = useState('');
  const [promptDirty, setPromptDirty] = useState(false);
  const assetSaveTimers = useRef<Map<string, number>>(new Map());

  const selectedAspect = aspectOptions.find((item) => item.id === aspectId) ?? aspectOptions[6];
  const selectedQuality = qualityOptions.find((item) => item.id === qualityId) ?? qualityOptions[1];
  const selectedDimensions = dimensionsForAspect(selectedAspect, selectedQuality);
  const copyTemplateTotal = copyTemplateCount(industryPath);

  const charAssets = useMemo(() => assets.filter((item) => item.kind === 'char'), [assets]);
  const propAssets = useMemo(() => assets.filter((item) => item.kind === 'prop'), [assets]);
  const activeProp = propAssets.find((item) => item.id === activePropId) ?? null;
  const isCharMode = genMode === 'three_view' || genMode === 'lookbook';

  const activeArtwork = useMemo(
    () => history.find((item) => item.id === activeArtworkId) ?? history[0] ?? null,
    [history, activeArtworkId]
  );

  useEffect(() => {
    listArtworks()
      .then((records) => setHistory(records.map(toView)))
      .catch(() => undefined);
    listAssets()
      .then((records) => setAssets(records.map(toAssetView)))
      .catch(() => undefined);
  }, []);

  // 最终提示词：字段变化时自动重拼；用户手改过（dirty）后不再覆盖
  useEffect(() => {
    if (promptDirty) return;
    if (isCharMode) {
      const charAsset = charAssets.find((item) => item.id === selectedCharId && item.blob);
      const propAsset = propAssets.find((item) => item.id === selectedPropId);
      const refList: string[] = [];
      let n = 1;
      if (charAsset) refList.push(`第${n++}张=角色「${charAsset.name || '角色'}」（长相装束以此为准）`);
      if (propAsset?.blob && attachPropImage) refList.push(`第${n++}张=道具「${propAsset.name || '道具'}」（形制以此为准）`);
      const weapon = propAsset
        ? `${propAsset.name}${propAsset.desc ? `（${propAsset.desc}）` : ''}`
        : weaponText;
      setPromptText(assembleCharacterPrompt({
        mode: genMode as 'three_view' | 'lookbook',
        templates,
        name: charName,
        desc: charDesc,
        style: charStyle,
        aspectId,
        weapon,
        refList
      }));
    } else if (genMode === 'prop') {
      setPromptText(activeProp
        ? assemblePropPrompt({
          templates,
          name: activeProp.name,
          label: activeProp.label,
          owner: activeProp.owner,
          desc: activeProp.desc,
          usage: activeProp.usage,
          style: charStyle,
          aspectId
        })
        : '');
    }
  }, [genMode, promptDirty, isCharMode, charName, charDesc, charStyle, weaponText, selectedCharId, selectedPropId, attachPropImage, aspectId, templates, assets, activeProp, charAssets, propAssets]);

  const pushEvent = (message: string) => setEvents((items) => [message, ...items].slice(0, 6));

  const stopProgress = (finalValue?: number) => {
    if (progressTimer.current) {
      window.clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    if (typeof finalValue === 'number') setProgress(finalValue);
  };

  const startProgress = () => {
    stopProgress();
    const startedAt = Date.now();
    setProgress(2);
    progressTimer.current = window.setInterval(() => {
      setProgress((current) => Math.max(current, simulatedGenerationProgress(startedAt)));
    }, 1000);
  };

  useEffect(() => () => stopProgress(), []);

  const switchMode = (mode: GenerationMode) => {
    setGenMode(mode);
    setPromptDirty(false);
    const defaultAspect = MODE_DEFAULT_ASPECT[mode];
    if (defaultAspect) setAspectId(defaultAspect);
  };

  const applyIndustryPath = (path: string[]) => {
    setIndustryPath(path);
    setForm((current) => ({ ...current, industry: industryStringFromPath(path) }));
    setCopyVariant(0);
    setContentFields(presetContentFields(form.scene_type, path, 0));
  };

  const applySceneType = (sceneType: string) => {
    setForm((current) => ({ ...current, scene_type: sceneType }));
    setContentFields(presetContentFields(sceneType, industryPath, copyVariant));
  };

  const cycleCopyTemplate = () => {
    const next = copyVariant + 1;
    setCopyVariant(next);
    setContentFields(presetContentFields(form.scene_type, industryPath, next));
  };

  const updateContentField = (key: ContentFieldKey, value: string) => {
    setContentFields((current) => ({ ...current, [key]: value }));
  };

  const uploadReferences = async (files: File[]) => {
    setLoadingReference(true);
    setErrorMessage('');
    try {
      const next: ReferenceImage[] = [];
      for (const file of files) {
        const { bytes, width, height } = await normalizeToPng(file);
        next.push({
          id: newId('ref'),
          name: file.name,
          bytes,
          width,
          height,
          previewUrl: URL.createObjectURL(bytesToBlob(bytes))
        });
      }
      setReferences((items) => [...items, ...next].slice(0, MAX_REFERENCES));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '图片读取失败');
    } finally {
      setLoadingReference(false);
    }
  };

  const removeReference = (id: string) => {
    setReferences((items) => {
      const target = items.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return items.filter((item) => item.id !== id);
    });
  };

  // ---- 资产库操作 ----
  const persistAssetDebounced = (record: AssetView) => {
    const timers = assetSaveTimers.current;
    const existing = timers.get(record.id);
    if (existing) window.clearTimeout(existing);
    timers.set(record.id, window.setTimeout(() => {
      timers.delete(record.id);
      const { url: _url, ...rest } = record;
      void putAsset(rest).catch(() => undefined);
    }, 500));
  };

  const patchPropAsset = (id: string, patch: Partial<Pick<AssetView, 'name' | 'label' | 'owner' | 'desc' | 'usage'>>) => {
    setAssets((items) => items.map((item) => {
      if (item.id !== id) return item;
      const next = { ...item, ...patch, updatedAt: Date.now() };
      persistAssetDebounced(next);
      return next;
    }));
  };

  const createProp = () => {
    const record: AssetRecord = {
      id: newId('prop'),
      kind: 'prop',
      name: '',
      label: '武器',
      owner: '',
      desc: '',
      usage: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      blob: null
    };
    void putAsset(record).catch(() => undefined);
    setAssets((items) => [toAssetView(record), ...items]);
    setActivePropId(record.id);
  };

  const removeAsset = (id: string) => {
    setAssets((items) => {
      const target = items.find((item) => item.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return items.filter((item) => item.id !== id);
    });
    if (activePropId === id) setActivePropId('');
    if (selectedPropId === id) setSelectedPropId('');
    if (selectedCharId === id) setSelectedCharId('');
    void deleteAssetRecord(id).catch(() => undefined);
  };

  const attachAssetImage = async (id: string, blob: Blob) => {
    setAssets((items) => items.map((item) => {
      if (item.id !== id) return item;
      if (item.url) URL.revokeObjectURL(item.url);
      const next = { ...item, blob, url: URL.createObjectURL(blob), updatedAt: Date.now() };
      const { url: _url, ...rest } = next;
      void putAsset(rest).catch(() => undefined);
      return next;
    }));
  };

  const uploadPropImage = async (id: string, file: File) => {
    try {
      const { bytes } = await normalizeToPng(file);
      await attachAssetImage(id, bytesToBlob(bytes));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '道具图读取失败');
    }
  };

  const uploadCharAsset = async (file: File) => {
    try {
      const { bytes } = await normalizeToPng(file);
      const record: AssetRecord = {
        id: newId('char'),
        kind: 'char',
        name: file.name.replace(/\.[^.]+$/, '').slice(0, 16) || '角色',
        label: '',
        owner: '',
        desc: '',
        usage: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        blob: bytesToBlob(bytes)
      };
      await putAsset(record).catch(() => undefined);
      setAssets((items) => [toAssetView(record), ...items]);
      setSelectedCharId(record.id);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '角色图读取失败');
    }
  };

  const saveArtworkToCharLibrary = async () => {
    if (!activeArtwork) return;
    const name = (charName.trim() || activeArtwork.title.split(' · ')[0] || '角色').slice(0, 16);
    const record: AssetRecord = {
      id: newId('char'),
      kind: 'char',
      name,
      label: '',
      owner: '',
      desc: charDesc.trim(),
      usage: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      blob: activeArtwork.blob
    };
    await putAsset(record).catch(() => undefined);
    setAssets((items) => [toAssetView(record), ...items]);
    setSaveMessage(`已把「${name}」存入角色库，三视图/定妆照可挂它锁形象`);
  };

  const assetToReference = async (asset: AssetView): Promise<ReferenceImage> => {
    const blob = asset.blob as Blob;
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const dims = await imageDimsFromBytes(bytes).catch(() => ({ width: 1024, height: 1024 }));
    return { id: `asset_${asset.id}`, name: asset.name, bytes, width: dims.width, height: dims.height, previewUrl: '' };
  };

  const buildProject = (mode: GenerationMode): ProjectSpec => ({
    title:
      mode === 'edit' ? 'AI修图'
        : mode === 'id' ? '证件照'
          : mode === 'image' ? (imageIndustry || '实物图海报')
            : mode === 'three_view' ? (charName.trim() ? `${charName.trim()}三视图` : '三视图')
              : mode === 'lookbook' ? (charName.trim() ? `${charName.trim()}定妆照` : '定妆照')
                : mode === 'prop' ? (activeProp?.name.trim() ? `${activeProp.name.trim()}道具图` : '道具图')
                  : (contentFields.title || '营销海报'),
    scene_type: form.scene_type,
    industry: mode === 'image' ? imageIndustry : form.industry,
    style: form.style,
    layout_type: form.layout_type,
    camera_model: form.camera_model,
    aspect_ratio: selectedAspect.id,
    image_quality: selectedQuality.id,
    ...selectedDimensions
  });

  const runGeneration = async (req: GenerationRequest, onResult?: (record: ArtworkRecord) => Promise<void>) => {
    if (!settings.apiKey.trim()) {
      setSettingsOpen(true);
      setErrorMessage('请先在设置中配置 API Key');
      return;
    }
    setBusy(true);
    setErrorMessage('');
    setSaveMessage('');
    setEvents(['正在提交生成请求']);
    startProgress();
    try {
      const result = await generateImage(req, settings, pushEvent);
      const dims = await imageDimsFromBytes(result.bytes).catch(() => null);
      const record: ArtworkRecord = {
        id: newId('art'),
        createdAt: Date.now(),
        mode: req.mode,
        title: `${req.project.title} · ${new Date().toLocaleString()}`,
        prompt: result.promptUsed,
        aspectRatio: req.project.aspect_ratio,
        width: dims?.width ?? req.project.canvas_width,
        height: dims?.height ?? req.project.canvas_height,
        blob: bytesToBlob(result.bytes)
      };
      await addArtwork(record).catch(() => undefined);
      const view = toView(record);
      setHistory((items) => [view, ...items]);
      setActiveArtworkId(view.id);
      if (onResult) await onResult(record).catch(() => undefined);
      pushEvent('生成完成');
      stopProgress(100);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '生成失败，请稍后重试');
      pushEvent('生成失败，请查看错误信息');
      stopProgress(0);
    } finally {
      setBusy(false);
    }
  };

  const generate = async () => {
    if (isCharMode) {
      const refs: ReferenceImage[] = [];
      const charAsset = charAssets.find((item) => item.id === selectedCharId && item.blob);
      if (charAsset) refs.push(await assetToReference(charAsset));
      const propAsset = propAssets.find((item) => item.id === selectedPropId);
      if (propAsset?.blob && attachPropImage) refs.push(await assetToReference(propAsset));
      await runGeneration({
        mode: genMode,
        project: buildProject(genMode),
        content: null,
        references: refs,
        instruction: '',
        readImageText: false,
        idSize,
        idBg,
        promptOverride: promptText
      });
      return;
    }
    if (genMode === 'prop') {
      if (!activeProp) return;
      const propId = activeProp.id;
      await runGeneration({
        mode: 'prop',
        project: buildProject('prop'),
        content: null,
        references: [],
        instruction: '',
        readImageText: false,
        idSize,
        idBg,
        promptOverride: promptText
      }, async (record) => {
        // 生成成功 → 道具图自动挂回道具库（与 fenjingtest runAssetJob 同口径）
        await attachAssetImage(propId, record.blob);
      });
      return;
    }
    const req: GenerationRequest = {
      mode: genMode,
      project: buildProject(genMode),
      content: genMode === 'text' ? contentPayloadFromFields(contentFields, rawInput) : null,
      references: genMode === 'text' ? [] : references,
      instruction: genMode === 'edit' ? instruction : '',
      readImageText: genMode === 'image' ? readImageText : false,
      idSize,
      idBg
    };
    await runGeneration(req);
  };

  /** 对当前成品继续修改：把它作为参考图走一轮 AI 修图（对话修图的单机版）。 */
  const refineActive = async () => {
    if (!activeArtwork || !refineText.trim()) return;
    const bytes = new Uint8Array(await activeArtwork.blob.arrayBuffer());
    const req: GenerationRequest = {
      mode: 'edit',
      project: { ...buildProject('edit'), title: 'AI修图' },
      content: null,
      references: [{
        id: 'refine_source',
        name: 'current.png',
        bytes,
        width: activeArtwork.width,
        height: activeArtwork.height,
        previewUrl: ''
      }],
      instruction: refineText,
      readImageText: false,
      idSize,
      idBg
    };
    setRefineText('');
    await runGeneration(req);
  };

  const removeHistory = async (id: string) => {
    const target = history.find((item) => item.id === id);
    if (target) URL.revokeObjectURL(target.url);
    setHistory((items) => items.filter((item) => item.id !== id));
    if (activeArtworkId === id) setActiveArtworkId('');
    await deleteArtwork(id).catch(() => undefined);
  };

  const saveActive = async () => {
    if (!activeArtwork) return;
    try {
      const message = await saveImageToDevice(activeArtwork.blob, `${activeArtwork.title.split(' · ')[0]}-${activeArtwork.id.slice(-6)}.png`);
      setSaveMessage(message);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : '保存失败');
    }
  };

  const generateDisabled =
    busy
    || ((genMode === 'image' || genMode === 'id') && references.length === 0)
    || (genMode === 'edit' && (references.length === 0 || !instruction.trim()))
    || (isCharMode && (!promptText.trim() || (!promptDirty && !charName.trim() && !charDesc.trim())))
    || (genMode === 'prop' && (!activeProp || !promptText.trim()));

  const generateLabel =
    genMode === 'edit' ? 'AI 修图'
      : genMode === 'id' ? '做证件照'
        : genMode === 'image' ? '基于实物图生成'
          : genMode === 'three_view' ? '生成三视图'
            : genMode === 'lookbook' ? '生成定妆照'
              : genMode === 'prop' ? '生成道具图'
                : '生成营销图';

  const baseUrlHost = (() => {
    try {
      return new URL(settings.baseUrl).host;
    } catch {
      return settings.baseUrl;
    }
  })();

  return (
    <main className="studio">
      <TopBar hasApiKey={Boolean(settings.apiKey)} baseUrlHost={baseUrlHost} onOpenSettings={() => setSettingsOpen(true)} />
      <div className="studioBody">
        <aside className="composerRail">
          <section className="stepCard modeCard">
            <div className="modeTabs" role="tablist" aria-label="生图模式">
              <button type="button" role="tab" aria-selected={genMode === 'text'} className={genMode === 'text' ? 'active' : ''} onClick={() => switchMode('text')}>
                <b>无实物图</b>
                <small>按行业·场景·文案智能生成</small>
              </button>
              <button type="button" role="tab" aria-selected={genMode === 'image'} className={genMode === 'image' ? 'active' : ''} onClick={() => switchMode('image')}>
                <b>有实物图</b>
                <small>上传产品照片，基于图片生成海报</small>
              </button>
              <button type="button" role="tab" aria-selected={genMode === 'edit'} className={genMode === 'edit' ? 'active' : ''} onClick={() => switchMode('edit')}>
                <b>AI修图</b>
                <small>上传照片，一句话修图/修复/合成</small>
              </button>
              <button type="button" role="tab" aria-selected={genMode === 'id'} className={genMode === 'id' ? 'active' : ''} onClick={() => switchMode('id')}>
                <b>证件照</b>
                <small>上传人像，换底裁切到标准尺寸</small>
              </button>
              <button type="button" role="tab" aria-selected={genMode === 'three_view'} className={genMode === 'three_view' ? 'active' : ''} onClick={() => switchMode('three_view')}>
                <b>三视图</b>
                <small>角色正/侧/背设定图，可带武器</small>
              </button>
              <button type="button" role="tab" aria-selected={genMode === 'lookbook'} className={genMode === 'lookbook' ? 'active' : ''} onClick={() => switchMode('lookbook')}>
                <b>定妆照</b>
                <small>角色正面全身立绘，锁形象用</small>
              </button>
              <button type="button" role="tab" aria-selected={genMode === 'prop'} className={genMode === 'prop' ? 'active' : ''} onClick={() => switchMode('prop')}>
                <b>道具库</b>
                <small>武器/法术/道具单体参考图</small>
              </button>
            </div>
          </section>

          {genMode === 'text' && (
            <>
              <section className="stepCard">
                <header className="stepHeader">
                  <i>1</i>
                  <div>
                    <h2>行业定位</h2>
                    <span>逐级细化，画面更聚焦</span>
                  </div>
                </header>
                <IndustryCascader path={industryPath} onChange={applyIndustryPath} />
              </section>

              <section className="stepCard">
                <header className="stepHeader">
                  <i>2</i>
                  <div>
                    <h2>场景与画面</h2>
                    <span>场景 · 风格 · 版式 · 画布</span>
                  </div>
                </header>
                <SceneStylePanel
                  form={form}
                  dimensions={selectedDimensions}
                  qualityId={qualityId}
                  aspectId={aspectId}
                  onSceneChange={applySceneType}
                  onFormChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
                  onQualityChange={setQualityId}
                  onAspectChange={setAspectId}
                />
              </section>

              <section className="stepCard">
                <header className="stepHeader">
                  <i>3</i>
                  <div>
                    <h2>内容文案</h2>
                    <span>已按行业/场景自动生成 · 模板 {(copyVariant % copyTemplateTotal) + 1}/{copyTemplateTotal}</span>
                  </div>
                  <button className="secondary miniButton headerAction" type="button" onClick={cycleCopyTemplate} title="换一套文案模板">
                    <RotateCcw size={13} /> 换一套
                  </button>
                </header>
                <ContentFormPanel
                  contentFields={contentFields}
                  rawInput={rawInput}
                  onFieldChange={updateContentField}
                  onRawInputChange={setRawInput}
                />
              </section>
            </>
          )}
          {genMode === 'image' && (
            <>
              <ReferenceUpload mode="image" references={references} loading={loadingReference} onUpload={uploadReferences} onRemove={removeReference} />
              <ImagePosterPanel
                industry={imageIndustry}
                onIndustryChange={setImageIndustry}
                readImageText={readImageText}
                onReadImageTextChange={setReadImageText}
                dimensions={selectedDimensions}
                qualityId={qualityId}
                aspectId={aspectId}
                onQualityChange={setQualityId}
                onAspectChange={setAspectId}
              />
            </>
          )}
          {genMode === 'edit' && (
            <>
              <ReferenceUpload mode="edit" references={references} loading={loadingReference} onUpload={uploadReferences} onRemove={removeReference} />
              <PhotoEditPanel instruction={instruction} onInstructionChange={setInstruction} photoCount={references.length} />
            </>
          )}
          {genMode === 'id' && (
            <>
              <ReferenceUpload mode="id" references={references} loading={loadingReference} onUpload={uploadReferences} onRemove={removeReference} />
              <IdPhotoPanel idSize={idSize} idBg={idBg} onSizeChange={setIdSize} onBgChange={setIdBg} />
            </>
          )}
          {isCharMode && (
            <>
              <CharacterSheetPanel
                mode={genMode as 'three_view' | 'lookbook'}
                name={charName}
                onNameChange={setCharName}
                desc={charDesc}
                onDescChange={setCharDesc}
                styleText={charStyle}
                onStyleChange={setCharStyle}
                weaponText={weaponText}
                onWeaponChange={setWeaponText}
                charAssets={charAssets}
                propAssets={propAssets}
                selectedCharId={selectedCharId}
                onSelectChar={setSelectedCharId}
                selectedPropId={selectedPropId}
                onSelectProp={setSelectedPropId}
                attachPropImage={attachPropImage}
                onAttachPropImageChange={setAttachPropImage}
                onDeleteAsset={removeAsset}
                onUploadCharAsset={(file) => void uploadCharAsset(file)}
                dimensions={selectedDimensions}
                qualityId={qualityId}
                aspectId={aspectId}
                onQualityChange={setQualityId}
                onAspectChange={setAspectId}
              />
              <PromptEditorCard
                value={promptText}
                dirty={promptDirty}
                onChange={(value) => { setPromptText(value); setPromptDirty(true); }}
                onReset={() => setPromptDirty(false)}
              />
            </>
          )}
          {genMode === 'prop' && (
            <>
              <PropLibraryPanel
                propAssets={propAssets}
                activeId={activePropId}
                onSelect={(id) => { setActivePropId(id); setPromptDirty(false); }}
                onCreate={createProp}
                onDelete={removeAsset}
                onPatch={patchPropAsset}
                onUploadImage={(id, file) => void uploadPropImage(id, file)}
                dimensions={selectedDimensions}
                qualityId={qualityId}
                aspectId={aspectId}
                onQualityChange={setQualityId}
                onAspectChange={setAspectId}
              />
              {activeProp && (
                <PromptEditorCard
                  value={promptText}
                  dirty={promptDirty}
                  onChange={(value) => { setPromptText(value); setPromptDirty(true); }}
                  onReset={() => setPromptDirty(false)}
                />
              )}
            </>
          )}

          {genMode === 'image' && references.length === 0 && (
            <p className="modeHint">先上传实物图，再点击生成 · 单张做单品海报，多张做产品合集海报</p>
          )}
          {genMode === 'image' && references.length >= 2 && (
            <p className="modeHint">已上传 {references.length} 张 · 将合成一张产品合集海报</p>
          )}
          {genMode === 'edit' && references.length === 0 && (
            <p className="modeHint">先上传要修的照片，再写一句指令（合成/加产品请传 2 张）</p>
          )}
          {genMode === 'id' && references.length === 0 && (
            <p className="modeHint">先上传一张人物照片，再选尺寸/底色生成证件照</p>
          )}
          {isCharMode && !charName.trim() && !charDesc.trim() && (
            <p className="modeHint">填角色名或角色描述即可生成 · 选道具库里的武器可一并画进{genMode === 'three_view' ? '三视图' : '定妆照'}</p>
          )}
          {genMode === 'prop' && !activeProp && propAssets.length > 0 && (
            <p className="modeHint">点选上方一件道具开始编辑 / 生成参考图</p>
          )}

          <div className="generateDock">
            <button className="generateButton" onClick={() => void generate()} disabled={generateDisabled}>
              {busy ? <Loader2 size={18} className="spin" /> : <ImagePlus size={18} />}
              {generateLabel}
            </button>
          </div>
        </aside>

        <section className="stage">
          <ArtworkPreview artwork={activeArtwork} />

          {busy && (
            <div className="fakeProgress" aria-label="生成进度">
              <div className="fakeProgressHeader">
                <span>生成进度</span>
                <b>{progress}%</b>
              </div>
              <div className="fakeProgressTrack">
                <i style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
          {errorMessage && <div className="formError">{errorMessage}</div>}
          {saveMessage && <div className="saveOk">{saveMessage}</div>}

          {activeArtwork && (
            <>
              <div className="stageActions">
                <button className="secondary" onClick={saveActive} disabled={busy}>
                  <Download size={16} /> 保存 PNG
                </button>
                {(activeArtwork.mode === 'three_view' || activeArtwork.mode === 'lookbook') && (
                  <button className="secondary" onClick={() => void saveArtworkToCharLibrary()} disabled={busy} title="存入角色库，之后生成可挂它锁定形象">
                    <UserPlus size={16} /> 存入角色库
                  </button>
                )}
              </div>
              <div className="refineRow">
                <input
                  value={refineText}
                  onChange={(e) => setRefineText(e.target.value)}
                  placeholder="对这张图继续修改：例如 标题换成周年庆、背景亮一点"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !busy && refineText.trim()) void refineActive();
                  }}
                />
                <button type="button" onClick={() => void refineActive()} disabled={busy || !refineText.trim()}>
                  <Wand2 size={15} /> 继续修改
                </button>
              </div>
            </>
          )}

          {events.length > 0 && (
            <div className="toolSection">
              <div className="sectionHeader">
                <h2>任务状态</h2>
              </div>
              <div className="streamStatus">
                {events.map((message, index) => <span key={`${message}-${index}`}>{message}</span>)}
              </div>
            </div>
          )}

          <HistoryStrip items={history} activeId={activeArtwork?.id ?? ''} onSelect={setActiveArtworkId} onDelete={(id) => void removeHistory(id)} />
        </section>
      </div>

      {settingsOpen && (
        <SettingsDialog
          settings={settings}
          templates={templates}
          onClose={() => setSettingsOpen(false)}
          onSave={(next, nextTemplates) => {
            setSettings(next);
            saveSettings(next);
            setTemplates(nextTemplates);
            savePromptTemplates(nextTemplates);
            setSettingsOpen(false);
            setPromptDirty(false);
          }}
        />
      )}
    </main>
  );
}
