import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { Session } from '/@/utils/storage';
import { TOKEN_NAME, USER_INFO } from '/@/consts';
import { treeEmits } from 'element-plus/es/components/tree-v2/src/virtual-tree';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
      isAdmin: false,
			authBtnList: [],
			perms: [],
		},
	}),
	actions: {
    isSupperAdmin(): boolean {
      return this.userInfos.isAdmin;
    },
    hasPermission(key: string): boolean {
      if (this.userInfos.isAdmin) {
        return true;
      }

      if (!this.userInfos.perms) {
        return false;
      }

      return this.userInfos.perms.indexOf(key) > -1;
    },
    // 登录后 存储用户信息到浏览器缓存
    saveToSession(username: string, token: string, data: object) {
      // 存储 token 到浏览器缓存
      Session.set(TOKEN_NAME, token);
      Cookies.set('username', username);
      Session.set(USER_INFO, data);
    },
    // 加载登录用户信息
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get(USER_INFO)) {
				this.userInfos = Session.get(USER_INFO);
			} else {
				const userInfos: any = await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},
		// 模拟接口数据
		// https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
		async getApiUserInfo() {
			return new Promise((resolve) => {
				setTimeout(() => {
					// TODO 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
					const userName = Cookies.get('userName');
					// 模拟数据
					let defaultRoles: Array<string> = [];
					let defaultAuthBtnList: Array<string> = [];
					// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					let adminRoles: Array<string> = ['admin'];
					// admin 按钮权限标识
					let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
					// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					let testRoles: Array<string> = ['common'];
					// test 按钮权限标识
					let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
					// 不同用户模拟不同的用户权限
					if (userName === 'admin') {
						defaultRoles = adminRoles;
						defaultAuthBtnList = adminAuthBtnList;
					} else {
						defaultRoles = testRoles;
						defaultAuthBtnList = testAuthBtnList;
					}

					// 用户信息模拟数据
					const userInfos = {
						userName: userName,
						photo:
							userName === 'admin'
								? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
								: 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						time: new Date().getTime(),
						roles: defaultRoles,
						authBtnList: defaultAuthBtnList,
					};
					resolve(userInfos);
				}, 0);
			});
		},
	},
});
