import { KeyRound, Settings, Sparkles } from 'lucide-react';

type TopBarProps = {
  hasApiKey: boolean;
  baseUrlHost: string;
  onOpenSettings: () => void;
};

export function TopBar({ hasApiKey, baseUrlHost, onOpenSettings }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="brandLockup">
        <i className="brandMark"><Sparkles size={20} /></i>
        <div>
          <strong>ImageUltra</strong>
          <span>单机版 AI 生图工作台 · 海报 / 修图 / 证件照 / 三视图 / 定妆照 / 道具库</span>
        </div>
      </div>
      <div className="statusCluster">
        <span className={hasApiKey ? 'planChip' : 'planChip warn'}>
          <KeyRound size={13} />
          {hasApiKey ? `已配置 Key · ${baseUrlHost}` : '未配置 API Key'}
        </span>
        <button type="button" className="secondary miniButton" onClick={onOpenSettings}>
          <Settings size={14} /> 设置
        </button>
      </div>
    </header>
  );
}
