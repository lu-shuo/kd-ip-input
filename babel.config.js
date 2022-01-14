module.exports = api => {
  const isTest = api.env('test');
  let presets,
      plugins = []
  // You can use isTest to determine what presets and plugins to use.
  if (isTest) {
    presets = [['@babel/preset-env', {targets: {node: 'current'}}]]
  } else {
    presets = [['@babel/preset-env', {
      modules: false  // 关闭 esm 转化，统一交由 rollup 处理，防止冲突
    }]]
    plugins = [
      [
        '@babel/plugin-transform-runtime', {
        corejs: 3,
        useESModules: true  // 关闭 esm 转化，交由 rollup 处理，同上防止冲突
      }
      ],
      [
        "module-resolver",
        {
          "root": ["src/"]
        }
      ]
    ]
  }
  return {
    presets,
    plugins
  };
};
