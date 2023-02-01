import request from '/@/utils/request';
import {USER_APIS} from '/@/api/serverApis';

/**
 * 登录api接口集合
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * @method login 用户登录
 * @method logout 用户退出登录
 */
export function useLoginApi() {
	return {
		login: (data: object) => {
			return request({
				url: USER_APIS.login,
				method: 'post',
				data,
			});
		},
		logout: (data?: object) => {
			return request({
				url: USER_APIS.logout,
				method: 'post',
				data,
			});
		},
	};
}
