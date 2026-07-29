/**
 * 内置文案模板库：key 为行业节点 id（一级/二级/三级均可）。
 * 命中顺序：路径自深向浅（三级细分 → 二级品类 → 一级行业）→ 通用兜底；
 * 场景预设（标题/CTA/用途）在 appConfig.presetContentFields 中再覆盖其上。
 * 覆盖要求（copyTemplates.test.ts 校验）：一级全覆盖、二级全覆盖且每个 ≥2 套变体。
 */
import { agricultureTemplates } from './agriculture';
import { autoTemplates } from './auto';
import { beautyTemplates } from './beauty';
import { bizServicesTemplates } from './bizServices';
import { educationTemplates } from './education';
import { entertainmentTemplates } from './entertainment';
import { financeTemplates } from './finance';
import { foodTemplates } from './food';
import { internetTemplates } from './internet';
import { localServicesTemplates } from './localServices';
import { manufacturingTemplates } from './manufacturing';
import { medicalTemplates } from './medical';
import { motherKidsTemplates } from './motherKids';
import { publicSectorTemplates } from './publicSector';
import { realestateTemplates } from './realestate';
import { retailTemplates } from './retail';
import { travelTemplates } from './travel';
import { fallbackCopyTemplate, type CopyTemplate } from './template';
import { franchiseTemplates } from './franchise';

export { fallbackCopyTemplate, type CopyTemplate } from './template';

export const copyTemplateLibrary: Record<string, CopyTemplate[]> = {
  ...foodTemplates,
  ...retailTemplates,
  ...beautyTemplates,
  ...educationTemplates,
  ...localServicesTemplates,
  ...medicalTemplates,
  ...financeTemplates,
  ...realestateTemplates,
  ...autoTemplates,
  ...travelTemplates,
  ...internetTemplates,
  ...bizServicesTemplates,
  ...franchiseTemplates,
  ...agricultureTemplates,
  ...manufacturingTemplates,
  ...motherKidsTemplates,
  ...entertainmentTemplates,
  ...publicSectorTemplates
};

/** 按行业路径取该品类的所有文案模板（路径自深向浅命中，最后通用兜底）。 */
export function copyTemplatesForPath(industryPath: string[]): CopyTemplate[] {
  for (let level = industryPath.length - 1; level >= 0; level -= 1) {
    const hit = copyTemplateLibrary[industryPath[level]];
    if (hit?.length) return hit;
  }
  return [fallbackCopyTemplate];
}
