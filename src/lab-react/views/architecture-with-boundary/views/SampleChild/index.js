/**
 *  |- [new] index.js                                       // 执行模板
 *  |- [new] index.config.js <- default.config.js           // 配置个性化文件
 *  |
 *  |- [old] index.view.js (real component) (slot children) // 子组件
 *  |     [origin->] index.js
 *  |- [old] index.view.less                                // 子组件样式
 *        [origin->] index.less
 *
 */

import config from './index.config';
import { registerView } from '../index';
import { useAddonsPropsPage, useConfigPage } from '../default.config';

// const FamilyRecommend = useConfigPage(config);
// export default FamilyRecommend;

const Sample = useAddonsPropsPage(config, { templateCode: config.templateCode });
export default registerView(Sample, config.templateCode);
