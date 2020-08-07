import { defineConfig, Redirect } from 'dumi';

export default defineConfig({
  
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
 ],
  title: '面试之道',
  // favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://letter-app-zl.oss-cn-hangzhou.aliyuncs.com/EOIHF%5DE4P%5B2PC%24%7BOKD%40WO_2.png',
  // outputPath: 'docs-dist',
  mode: 'site',
  theme: {
    // '@c-primary': '#ff652f', // 按钮选项颜色
    // '@c-heading': '#454d64',
    // '@c-text': '#454d64',
    // @c-secondary: #717484;
    // @c-link: @c-primary;
    // @c-border: #ebedf1;
    // @c-light-bg: #f9fafb;

  }
  , 
  ssr: {},
  exportStatic: {},
});
