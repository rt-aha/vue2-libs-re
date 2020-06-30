# fe-vue-template-js

## 資料夾命名

- 一律小駝峰

## 檔案命名

- .vue 檔案大駝峰
- 其他一律小駝峰

## CSS

- 使用 BEM 命名

- .vue 檔根元素 class 命名

1. views 資料夾中的.vue，根元素 class 使用[資料夾名稱]-[組件名]-view
2. components 資料夾中的.vue，根元素 class 使用[資料夾名稱]-[組件名]-com
3. layout 資料夾中的.vue，根元素 class 使用[組件名]-layout
4. layoutComponent 資料夾中的.vue，根元素 class 使用[組件名]-layout-com

- 圖片一律多包一層<div>

## router

- router 設定檔，path、name、webpackChunkName 小駝峰，引入組件名稱大駝峰
