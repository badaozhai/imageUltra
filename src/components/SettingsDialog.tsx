import { useState } from 'react';
import { Eye, EyeOff, Loader2, PlugZap, RotateCcw, X } from 'lucide-react';
import { testConnection } from '../generator';
import {
  DEFAULT_PROMPT_TEMPLATES,
  PROMPT_TEMPLATE_META,
  type PromptTemplateKey,
  type PromptTemplates
} from '../promptTemplates';
import { DEFAULT_SETTINGS, type AppSettings } from '../settings';

const TEMPLATE_KEYS = Object.keys(PROMPT_TEMPLATE_META) as PromptTemplateKey[];

type SettingsDialogProps = {
  settings: AppSettings;
  templates: PromptTemplates;
  onSave: (settings: AppSettings, templates: PromptTemplates) => void;
  onClose: () => void;
};

/** 接口设置 + 提示词模板：全部界面可配，保存在本机。 */
export function SettingsDialog({ settings, templates, onSave, onClose }: SettingsDialogProps) {
  const [draft, setDraft] = useState<AppSettings>({ ...settings });
  const [tplDraft, setTplDraft] = useState<PromptTemplates>({ ...templates });
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState('');

  const patch = (partial: Partial<AppSettings>) => setDraft((current) => ({ ...current, ...partial }));
  const patchTpl = (key: PromptTemplateKey, value: string) => setTplDraft((current) => ({ ...current, [key]: value }));

  const runTest = async () => {
    setTesting(true);
    setTestResult('');
    try {
      const result = await testConnection(draft);
      setTestResult(`${result.ok ? '✅' : '⚠️'} ${result.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="dialogMask" onClick={onClose}>
      <div className="dialogCard" onClick={(e) => e.stopPropagation()}>
        <header className="dialogHeader">
          <h2>接口设置</h2>
          <button type="button" className="secondary miniButton" onClick={onClose}><X size={14} /></button>
        </header>

        <label>
          OpenAI 兼容接口地址
          <input
            value={draft.baseUrl}
            onChange={(e) => patch({ baseUrl: e.target.value })}
            placeholder={DEFAULT_SETTINGS.baseUrl}
            spellCheck={false}
          />
        </label>

        <label>
          API Key
          <div className="keyRow">
            <input
              type={showKey ? 'text' : 'password'}
              value={draft.apiKey}
              onChange={(e) => patch({ apiKey: e.target.value })}
              placeholder="sk-..."
              spellCheck={false}
              autoComplete="off"
            />
            <button type="button" className="secondary miniButton" onClick={() => setShowKey((v) => !v)} title={showKey ? '隐藏' : '显示'}>
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </label>

        <div className="twoCol">
          <label>
            文生图模型
            <input value={draft.imageModel} onChange={(e) => patch({ imageModel: e.target.value })} placeholder={DEFAULT_SETTINGS.imageModel} spellCheck={false} />
          </label>
          <label>
            图片编辑模型
            <input value={draft.editModel} onChange={(e) => patch({ editModel: e.target.value })} placeholder={DEFAULT_SETTINGS.editModel} spellCheck={false} />
          </label>
        </div>
        <div className="twoCol">
          <label>
            海报策划模型
            <input value={draft.briefModel} onChange={(e) => patch({ briefModel: e.target.value })} placeholder={DEFAULT_SETTINGS.briefModel} spellCheck={false} />
          </label>
          <label>
            识图视觉模型
            <input value={draft.visionModel} onChange={(e) => patch({ visionModel: e.target.value })} placeholder={DEFAULT_SETTINGS.visionModel} spellCheck={false} />
          </label>
        </div>
        <label>
          失败自动重试次数
          <select value={draft.maxRetries} onChange={(e) => patch({ maxRetries: Number(e.target.value) })}>
            {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n} 次</option>)}
          </select>
        </label>

        <p className="settingsHint">
          模型说明：gpt-image 系列走 /images 端点；策划模型填 gpt-5.x 可让 AI 先看图写文案再出图，
          填 gpt-image 系列则跳过策划直接出图。除该接口外，应用完全离线，Key 只保存在本机。
        </p>

        <details className="tplDetails">
          <summary>提示词模板（三视图 / 定妆照 / 道具库 · 可改可还原）</summary>
          <p className="settingsHint">
            用 <code>{'{变量}'}</code> 占位，生成时自动替换；改坏了点"还原默认"即可。
            每次生成前，拼装好的最终提示词还可以在主界面里再改一遍。
          </p>
          {TEMPLATE_KEYS.map((key) => (
            <label key={key} className="tplField">
              <span className="tplLabel">
                {PROMPT_TEMPLATE_META[key].title}
                <em>变量：{PROMPT_TEMPLATE_META[key].vars}</em>
                <button
                  type="button"
                  className="secondary miniButton"
                  onClick={() => patchTpl(key, DEFAULT_PROMPT_TEMPLATES[key])}
                  disabled={tplDraft[key] === DEFAULT_PROMPT_TEMPLATES[key]}
                >
                  <RotateCcw size={12} /> 还原默认
                </button>
              </span>
              <textarea rows={4} value={tplDraft[key]} onChange={(e) => patchTpl(key, e.target.value)} spellCheck={false} />
            </label>
          ))}
        </details>

        {testResult && <p className="settingsHint testResult">{testResult}</p>}

        <div className="dialogActions">
          <button type="button" className="secondary" onClick={runTest} disabled={testing}>
            {testing ? <Loader2 size={15} className="spin" /> : <PlugZap size={15} />} 测试连接
          </button>
          <button type="button" onClick={() => onSave(draft, tplDraft)}>保存设置</button>
        </div>
      </div>
    </div>
  );
}
