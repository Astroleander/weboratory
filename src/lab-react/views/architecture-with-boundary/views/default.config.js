// import DefaultFallback from './DefaultFallback';
import Loading from './SampleLoading';
import Pending from './SamplePending';
import Failed from './SampleFailed';

import StandardFallbacksBoundary from './StandardFallbacksBoundary';
import StandardErrorBoundary from './StandardErrorBoundary';
import React from 'react';

const location = '[Boundary][index.config.js][useConfig]';
const fallbacksConfiguration = {
  /** 目标组件 @see templateConfiguration */
  // template: Component
  /* fallbacks */
  Skeleton: Pending, // 骨架屏, 组件默认渲染
  Failed:   Failed,  // 失败屏, 组件异步函数加载失败时显示
  Loading:  Loading, // 等待屏, 组件处于 loading 状态时显示

  /**
   * 数据接口,
   * 接收一个 async 函数, 该函数执行时组件 @state 会进入 loading 状态
   * 如果接收 null 或同步函数, 则会跳过 loading 状态
   */
  fetchData: null,
  /* flags */
  forcePending: false, // 强制渲染目标组件, 不等待其出现在视野中;
  /* params */
  timeout: 10000, // 超时时间

  // TODO 要不要这个
  reloadTimes: 3, // 重新尝试的次数上限
};

const errorConfiguration = {
  /** null now */
};

const templateConfiguration = {
  templateCode: null, // [require] 可以用 require.context 来自动生成 WeakMap(templateCode, template)
  Template: null, // [require]
  ErrorBoundary: StandardErrorBoundary, // 错误处理高阶组件
  FallbacksBoundary: StandardFallbacksBoundary, // 懒加载高阶组件
};

const generalConfiguration = {
  insbff: 'com.alipay.insplatformbff',
};

// 防止修改默认配置
export default (() => {
  return {
    ...templateConfiguration,
    ...fallbacksConfiguration,
    ...errorConfiguration,
    ...generalConfiguration,
  };
})();

// 假装是个 hook
const useConfig = (modify) => {
  let config = Object.assign({
    ...templateConfiguration,
    ...fallbacksConfiguration,
    ...errorConfiguration,
    ...generalConfiguration,
  }, modify);
  /* check config completion */
  [
    [config.template === null, `${location} "template" must be setted`],
    [config.templateCode === null, `${location}  "templateCode" must be setted`],
  ].forEach(({ exception, error }) => {
    if (exception) throw (error);
  });
  return config;
};

/**
 * @description 使用指定配置的页面
 * @param {基于本文件的配置项} config
 * @param {Object} addons
 */
const useConfigPage = (config) => () => {
  const { FallbacksBoundary, ErrorBoundary, Template } = config;
  return (
    <ErrorBoundary>
      <FallbacksBoundary {...config}>
        <Template />
      </FallbacksBoundary>
    </ErrorBoundary>
  );
};

/**
 * @description 使用指定配置, 并插入自定义参数的页面
 * @param {基于本文件的配置项} config
 * @param {Object} addons
 */
const useAddonsPropsPage = (config, addons) => () => {
  const { FallbacksBoundary, ErrorBoundary, Template } = config;
  return (
    <ErrorBoundary>
      <FallbacksBoundary {...config}>
        <Template {...addons} />
      </FallbacksBoundary>
    </ErrorBoundary>
  );
};

export {
  useConfig, useConfigPage, useAddonsPropsPage,
  generalConfiguration,
};
