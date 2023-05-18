import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
import { TOKEN_NAME } from '/@/consts';
import qs from 'qs';
import {i18n} from "/@/i18n";


// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});

// 添加请求拦截器
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// add: 不验证状态，自己处理响应
		config.validateStatus = null;

		// 在发送请求之前做些什么 token
		if (Session.get(TOKEN_NAME)) {
			config.headers!['Session'] = `${Session.get(TOKEN_NAME)}`;
		}
		return config;
	},
	(error) => {
		ElMessageBox.alert(error, '错误', {})
					.then(() => {})
					.catch(() => {});

		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
    const {t} = i18n.global;

		// 对响应数据做点什么
		const resBody = response.data;
		const stCode = response.status;

		// 使用http status code 判断是否成功
		if (stCode === 200) {
      if (response.data.code !== 0) {
        ElMessageBox.alert(t('message.codeMsg.c' + response.data.code), t('message.commonMsg.tip'), {type: 'warning'});
        return Promise.reject(resBody);
      }
			return resBody.data;
		}

		// `token` 过期或者账号已在别处登录
		if (stCode === 401) {
			Session.clear(); // 清除浏览器全部临时缓存
			window.location.href = '/'; // 去登录页
			ElMessageBox.alert('你已被登出，请重新登录', '提 示', {type: 'error'});
		} else if (stCode === 403) {
			ElMessageBox.alert('请求或操作无权限', '出错了', {type: 'error'});
		} else {
			ElMessageBox.alert(resBody.message ? resBody.message : '请求响应错误', '错 误', {type: 'error'})
				.then(() => {})
				.catch(() => {});
		}

		// return Promise.reject(service.interceptors.response);
		return Promise.reject(resBody);
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;
