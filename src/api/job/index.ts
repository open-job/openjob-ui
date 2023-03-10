import request from '/@/utils/request';
import {JOB_APIS, JOB_INSTANCE_APIS} from "/@/api/serverApis";

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
export function useJobApi() {
  return {
    getList: (params?: object) => {
      return request({
        url: JOB_APIS.list,
        method: 'get',
        params,
      });
    },
    add: (data: object) => {
      return request({
        url: JOB_APIS.add,
        method: 'post',
        data,
      });
    },
    update: (data: object) => {
      return request({
        url: JOB_APIS.update,
        method: 'post',
        data,
      });
    },
    updateStatus: (data: object) => {
      return request({
        url: JOB_APIS.updateStatus,
        method: 'post',
        data,
      });
    },
    delete: (data: object) => {
      return request({
        url: JOB_APIS.delete,
        method: 'post',
        data,
      });
    },
    execute: (data: object) => {
      return request({
        url: JOB_APIS.execute,
        method: 'post',
        data,
      });
    },
    timeExpression: (data: object) => {
      return request({
        url: JOB_APIS.timeExpression,
        method: 'post',
        data,
      });
    },
  };
}

export function useJobInstanceApi() {
  return {
    getList: (params?: object) => {
      return request({
        url: JOB_INSTANCE_APIS.list,
        method: 'get',
        params,
      });
    }
  };
}
