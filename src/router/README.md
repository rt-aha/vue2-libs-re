# 與權限連接的路由


## 假設狀況
- 有一個返回權限的列表，即 @/utils/testAuthList
- 有權限的頁面放進 @/routes/viewRoutes

## 情境
- 登入後或者在有token的情況下，執行mixin中的writeDynamicRoutes
- 若沒有token，則僅設定 404 頁面路由(要放在路由列表最後一個)
- 若有token，進入 @/routes/genMenu.js 開始比對testAuthList和路由中的權限並寫入路由，並將具有權限的列表，除存在observable，再設定 404 頁面路由(要放在路由列表最後一個)

### ./baseRoutes

基本無權限的路由放這

### ./viewRoutes

需要權限的路由放這

### ./genMenu.js

動態產生有權限的路由，並加進vue router中

### ./index.js

傳遞給 Vue 使用的

### ./observable/route

**observable states說明**
- `menulist`: 為了跨組件存取使用，將 menulist 存起來給 menu使用
- `isWriteDynamicRoutes`: 一個flag，判斷是否已執行writeDynamicRoutes，因寫入404page 必須放到路由列表最後，為避免 App執行一次Login又執行一次(原在mixin直接寫閉包，但vue會將mixin分辨混入各個組件，所以閉包不成立)