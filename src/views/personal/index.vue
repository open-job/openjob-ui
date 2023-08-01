<template>
	<div class="personal layout-pd">
		<el-row>
			<!-- 个人信息 -->
			<el-col :xs="24" :sm="24">
				<el-card shadow="hover" :header="t('message.adminUser.userPersonal')">
					<div class="personal-user">
						<div class="personal-user-left">
							<el-upload class="h100 personal-user-left-upload" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
                <img :src="defaultAvatar">
							</el-upload>
						</div>
						<div class="personal-user-right">
							<el-row>
								<el-col :span="24" class="personal-title mb18">{{state.personalForm.username}} {{ currentTime }} </el-col>
								<el-col :span="24">
									<el-row>
										<el-col :xs="24" :sm="12" class="personal-item mb6">
											<div class="personal-item-label">{{t('message.adminUser.username')}}：</div>
											<div class="personal-item-value">{{state.personalForm.username}}</div>
										</el-col>
										<el-col :xs="24" :sm="12" class="personal-item mb6">
											<div class="personal-item-label">{{t('message.adminUser.identity')}}：</div>
											<div class="personal-item-value">{{state.personalForm.type}}</div>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="24">
									<el-row>
										<el-col :xs="24" :sm="12" class="personal-item mb6">
											<div class="personal-item-label">{{t('message.adminUser.loginIp')}}：</div>
											<div class="personal-item-value">{{state.personalForm.loginIp}}</div>
										</el-col>
										<el-col :xs="24" :sm="12" class="personal-item mb6">
											<div class="personal-item-label">{{t('message.adminUser.loginTime')}}：</div>
											<div class="personal-item-value">{{state.personalForm.loginTime}}</div>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-card>
			</el-col>

			<!-- 更新信息 -->
			<el-col :span="24">
				<el-card shadow="hover" class="mt15 personal-edit" :header="t('message.adminUser.updateTitle')">
					<div class="personal-edit-title">{{t('message.adminUser.baseTitle')}}</div>
					<el-form ref="personalFormRef" :model="state.personalForm" :rules="state.fromRules"  size="default" label-width="150px" class="mt35 mb35">
						<el-row :gutter="35">
							<el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mb20">
								<el-form-item :label="t('message.adminUser.nickname')" prop="nickname">
									<el-input v-model="state.personalForm.nickname" clearable></el-input>
								</el-form-item>
							</el-col>
              <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mb20">
                <el-form-item :label="t('message.adminUser.token')" prop="token">
                  <el-input v-model="state.personalForm.token" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mb20">
                <el-form-item :label="t('message.adminUser.password')" prop="password">
                  <el-input v-model="state.personalForm.password" show-password clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="mb20">
                <el-form-item :label="t('message.adminUser.password2')" prop="password2">
                  <el-input v-model="state.personalForm.password2" show-password clearable></el-input>
                </el-form-item>
              </el-col>
							<el-col :xs="18" :sm="18" :md="24" :lg="24" :xl="24">
								<el-form-item>
									<el-button type="primary" @click="onSubmit(personalFormRef)">
										<el-icon>
											<ele-Position />
										</el-icon>
                    {{t('message.adminUser.updateBtn')}}
									</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="personal">
import {reactive, computed, onMounted, ref} from 'vue';
import {formatAxis, formatDateByTimestamp} from '/@/utils/formatTime';
import defaultAvatar from '/@/assets/default-avatar.jpg';
import {useUserApi} from "/@/api/user";
import {useI18n} from 'vue-i18n';
import {ElMessage, FormInstance} from "element-plus";

// 定义变量内容
const personalFormRef = ref<FormInstance>();

// 定义变量内容
const {t} = useI18n();

const userApi =useUserApi()

// 定义变量内容
const state = reactive({
  fromRules: {
    nickname: {
      required: true,
      message: t('message.adminUser.nickname'),
      trigger: 'blur'
    },
    token: {
      required: true,
      message: t('message.adminUser.token'),
      trigger: 'blur'
    },
    password: {
      required: true,
      message: t('message.adminUser.password'),
      trigger: 'blur'
    },
    password2: {
      required: true,
      message: t('message.adminUser.password2'),
      trigger: 'blur'
    },
  },
	personalForm: {
    id: 0,
    username: '',
    type:'admin',
    loginIp:'',
    loginTime:'',
		nickname: '',
		token: '',
		password: '',
		password2: '',
	},
});

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean) => {
    if (valid) {
      onSubmitApp()
    } else {
      return false;
    }
  });
};

const onSubmitApp = async () => {
  if (state.personalForm.password != state.personalForm.password2){
    ElMessage.error(t('message.adminUser.pwdNotMatch'));
    return
  }

  await userApi.updatePassword({
    id: state.personalForm.id,
    nickname: state.personalForm.nickname,
    token: state.personalForm.token,
    password: state.personalForm.password
  });

  ElMessage.success(t('message.commonMsg.updateSuccess'));
}

onMounted(async () => {
  let data = await userApi.getUserInfo({});
  state.personalForm.id = data['id']
  state.personalForm.username = data['username']
  state.personalForm.nickname = data['nickname']
  state.personalForm.loginIp = data['loginIp']
  state.personalForm.loginTime = formatDateByTimestamp(data['loginTime'])
  state.personalForm.token = data['token']
});

// 当前时间提示语
const currentTime = computed(() => {
	return formatAxis(new Date());
});
</script>

<style scoped lang="scss">
@import '../../theme/mixins/index.scss';
.personal {
	.personal-user {
		height: 130px;
		display: flex;
		align-items: center;
		.personal-user-left {
			width: 100px;
			height: 100px;
			border-radius: 3px;
			:deep(.el-upload) {
				height: 100%;
			}
			.personal-user-left-upload {
				img {
					width: 100%;
					height: 100%;
					border-radius: 3px;
				}
				&:hover {
					img {
						animation: logoAnimation 0.3s ease-in-out;
					}
				}
			}
		}
		.personal-user-right {
			flex: 1;
			padding: 0 15px;
			.personal-title {
				font-size: 18px;
				@include text-ellipsis(1);
			}
			.personal-item {
				display: flex;
				align-items: center;
				font-size: 13px;
				.personal-item-label {
					color: var(--el-text-color-secondary);
					@include text-ellipsis(1);
				}
				.personal-item-value {
					@include text-ellipsis(1);
				}
			}
		}
	}
	.personal-info {
		.personal-info-more {
			float: right;
			color: var(--el-text-color-secondary);
			font-size: 13px;
			&:hover {
				color: var(--el-color-primary);
				cursor: pointer;
			}
		}
		.personal-info-box {
			height: 130px;
			overflow: hidden;
			.personal-info-ul {
				list-style: none;
				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;
					.personal-info-li-title {
						display: inline-block;
						@include text-ellipsis(1);
						color: var(--el-text-color-secondary);
						text-decoration: none;
					}
					& a:hover {
						color: var(--el-color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}
	.personal-recommend-row {
		.personal-recommend-col {
			.personal-recommend {
				position: relative;
				height: 100px;
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;
				&:hover {
					i {
						right: 0px !important;
						bottom: 0px !important;
						transition: all ease 0.3s;
					}
				}
				i {
					position: absolute;
					right: -10px;
					bottom: -10px;
					font-size: 70px;
					transform: rotate(-30deg);
					transition: all ease 0.3s;
				}
				.personal-recommend-auto {
					padding: 15px;
					position: absolute;
					left: 0;
					top: 5%;
					color: var(--next-color-white);
					.personal-recommend-msg {
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
	.personal-edit {
		.personal-edit-title {
			position: relative;
			padding-left: 10px;
			color: var(--el-text-color-regular);
			&::after {
				content: '';
				width: 2px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background: var(--el-color-primary);
			}
		}
		.personal-edit-safe-box {
			border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
			padding: 15px 0;
			.personal-edit-safe-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.personal-edit-safe-item-left {
					flex: 1;
					overflow: hidden;
					.personal-edit-safe-item-left-label {
						color: var(--el-text-color-regular);
						margin-bottom: 5px;
					}
					.personal-edit-safe-item-left-value {
						color: var(--el-text-color-secondary);
						@include text-ellipsis(1);
						margin-right: 15px;
					}
				}
			}
			&:last-of-type {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}
}
</style>
