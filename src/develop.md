# 开发改动记录

```bash
# 安装依赖
cnpm install
# 新增了md5包
cnpm install --save js-md5

# 运行项目
cnpm run dev

# 打包发布
cnpm run build
```

## 公共的

- src/api/serverApis.ts 后端路由URI列表

## 路由处理

- 读取 `/src/stores/themeConfig.ts` `isRequestRoutes=true` 是否开启后端控制路由配置
- src/router/index.ts

```text
/**
 * 1、前端控制路由时：isRequestRoutes 为 false，需要写 roles，需要走 setFilterRoute 方法。
 * 2、后端控制路由时：isRequestRoutes 为 true，不需要写 roles，不需要走 setFilterRoute 方法），
 * 相关方法已拆解到对应的 `backEnd.ts` 与 `frontEnd.ts`（他们互不影响，不需要同时改 2 个文件）。
 * 特别说明：
 * 1、前端控制：路由菜单由前端去写（无菜单管理界面，有角色管理界面），角色管理中有 roles 属性，需返回到 userInfo 中。
 * 2、后端控制：路由菜单由后端返回（有菜单管理界面、有角色管理界面）
 */
```



## 登录

- `src/router/index.ts` 检查是否登录
  - 未登录，跳转登录页面
    - `views/login/index.vue` 进行登录
    - 账号登录 `views/login/component/account.vue`
      - TODO 需要调整代码请求后端登录获取 token 和 基本信息 userInfo
      - 也会调用 `router/backEnd.ts -> initBackEndControlRoutes`
  - 用户已登录(本地有 Session.get('token') 信息)
    - 根据 themeConfig 的 `isRequestRoutes`
    - `isRequestRoutes=true` 后端控制路由
      - `router/backEnd.ts -> initBackEndControlRoutes` 后端控制路由初始化
      - call `stores/userInfo.ts -> useUserInfo().setUserInfos()` 获取并设置用户信息
        - 本地没有时，请求 `getApiUserInfo()` 获取登录用户信息
        - TODO `getApiUserInfo()` 需要调整请求后端数据
      - 获取路由菜单数据 `router/backEnd.ts -> getBackEndControlRoutes`

## 登录用户信息

- src/stores/userInfo.ts

```ts
{
    userName: '',
    photo: '',
    time: 0,
    roles: [],
    authBtnList: [],
}
```

## 退出

- src/layout/navBars/breadcrumb/user.vue
- TODO 调用后端API退出登录

## 菜单

参考 `src/router/reoute.ts`

```ts
{
  path: '/home',
  name: 'home',
  component: () => import('/@/views/home/index.vue'),
  meta: {
    title: 'message.router.home',
    isLink: '',
    isHide: false,
    isKeepAlive: true,
    isAffix: true,
    isIframe: false,
    roles: ['admin', 'common'],
    icon: 'iconfont icon-shouye',
  },
}
```
