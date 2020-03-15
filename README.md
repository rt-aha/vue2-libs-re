# template

## 開發，開發環境

`yarn dev`

## 開發，mock 環境

`yarn dev_mock`

## 開發，test 環境

`yarn dev_test`

## 打包

`yarn build`

## 檢查語法

`yarn lint`

## 單獨啟動 mock server

`yarn mock_server`

---

### Dart-Scss 和 Node-Scss 的差異

[CSS 预处理器 SASS 的默认实现将迁移到 Dart Sass](https://www.dart-china.org/t/topic/146)

#### 以下重點

Q: 为什么重写 Sass？

A: Sass 的主要实现有 Ruby Sass 14 和 LibSass 31（node-sass 底层使用的是 LibSass），它们都有各自的优缺点。Ruby Sass 的实现语言是高级语言 Ruby，更容易迭代，但存在运行速度慢，不易安装的缺点。LibSass 虽然速度快，但它的开发语言是 C/C++，迭代速度慢，无法快速地添加各种功能。

Q: 为什么使用 Dart？

A: Dart 的运行速度是真的快，对于大型样式文件，Dart Sass 的处理速度是 Ruby Sass 的 5~10 倍，且只比 LibSass 慢 1.5 倍左右。同时，Dart 是一门具备静态类型的动态语言，对比 C/C++甚至是 Ruby，Dart 相对更容易上手且代码也更易于编写和维护。此外，Dart 具备编译输出为 JavaScript 的能力，使得 Dart Sass 可以兼容 NodeJS 平台。
