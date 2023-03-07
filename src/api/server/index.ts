import request from '/@/utils/request';
import {NAMESPACE_APIS, SERVER_APIS} from "/@/api/serverApis";

/**
 * 以下为模拟接口地址，gitee 的不通，就换自己的真实接口地址
 *
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 后端控制菜单模拟json，路径在 https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 * @method getAdminMenu 获取后端动态路由菜单(admin)
 * @method getTestMenu 获取后端动态路由菜单(test)
 */
export function useServerApi() {
  return {
    getServerList: (params?: object) => {
      return request({
        url: SERVER_APIS.serverList,
        method: 'get',
        params,
      });
    },
    getSlotsList: (params?: object) => {
      return request({
        url: SERVER_APIS.slotsList,
        method: 'get',
        params,
      });
    },
    getWorkerList: (params?: object) => {
      return request({
        url: SERVER_APIS.workerList,
        method: 'get',
        params,
      });
    },
    getSystemInfo: (params?: object) => {
      return request({
        url: SERVER_APIS.systemInfo,
        method: 'get',
        params,
      });
    },
    updateSystem: (data: object) => {
      return request({
        url: SERVER_APIS.systemUpdate,
        method: 'post',
        data,
      });
    },
  };
}
