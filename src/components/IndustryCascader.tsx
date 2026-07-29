import { childrenAt, extendToLeaf, industryNamesFromPath, nodesForPath } from '../industryTaxonomy';

const LEVEL_LABELS = ['行业', '品类', '细分'];

type IndustryCascaderProps = {
  path: string[];
  onChange: (path: string[]) => void;
};

/**
 * 多级行业联动选择：选中某一层后，更深层自动补全到该分支的第一个叶子，
 * 保证拼接出的行业字符串始终到达最细粒度。
 */
export function IndustryCascader({ path, onChange }: IndustryCascaderProps) {
  const nodes = nodesForPath(path);
  const levels = nodes.map((_, index) => childrenAt(path, index));

  const handleSelect = (level: number, id: string) => {
    onChange(extendToLeaf([...path.slice(0, level), id]));
  };

  return (
    <div className="cascader">
      <div className="cascaderSelects">
        {levels.map((options, level) => (
          <label key={LEVEL_LABELS[level] ?? `level-${level}`}>
            {LEVEL_LABELS[level] ?? `第${level + 1}级`}
            <select value={path[level]} onChange={(e) => handleSelect(level, e.target.value)}>
              {options.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <div className="cascaderTrail" aria-label="已选行业">
        {industryNamesFromPath(path).map((name, index) => (
          <span key={`${name}-${index}`} className="trailNode">
            {index > 0 && <i>›</i>}
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
