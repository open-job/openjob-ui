<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="roleDialogFormRef" :model="state.ruleForm" size="default" >
				<el-row>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item :label="t('message.namespace.name')" prop="name">
							<el-input  v-model="state.ruleForm.name" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20" v-if="state.dialog.type === 'update'">
            <el-form-item :label="t('message.namespace.uniqueId')" prop="uniqueId">
              <el-input v-model="state.ruleForm.uniqueId" clearable disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.namespace.status')" prop="status">
            <el-switch
              v-model="state.ruleForm.status"
              class="ml-2"
              name="status"
              size="default"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
            />
            </el-form-item>
          </el-col>
        </el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemRoleDialog">
import { reactive, ref } from 'vue';
import {useI18n} from "vue-i18n";
const { t } = useI18n();


// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const roleDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		name: '',
		status: true,
    uniqueId: '',
	},
	menuData: [] as TreeType[],
	menuProps: {
		children: 'children',
		label: 'label',
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: RowNamespaceType) => {
	if (type === 'update') {
    // state.ruleForm=row 这种方式会导致，弹窗状态切换，列表里面数据状态也切换了
		state.ruleForm.name = row.name;
		state.ruleForm.uniqueId = row.uniqueId;
		state.ruleForm.status = row.status;
		state.dialog.title = '修改角色2';
		state.dialog.submitTxt = t("message.commonBtn.update");
	} else {
    state.ruleForm.name = '';
    state.ruleForm.uniqueId = '';
    state.ruleForm.status = true;
		state.dialog.title = '新增角色2';
		state.dialog.submitTxt = t("message.commonBtn.add");
	}
  state.dialog.type = type
	state.dialog.isShowDialog = true;
	getMenuData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	closeDialog();
	emit('refresh');
	// if (state.dialog.type === 'add') { }
};
// 获取菜单结构数据
const getMenuData = () => {
	state.menuData = [
		{
			id: 1,
			label: '系统管理',
			children: [
				{
					id: 11,
					label: '菜单管理',
					children: [
						{
							id: 111,
							label: '菜单新增',
						},
						{
							id: 112,
							label: '菜单修改',
						},
						{
							id: 113,
							label: '菜单删除',
						},
						{
							id: 114,
							label: '菜单查询',
						},
					],
				},
				{
					id: 12,
					label: '角色管理',
					children: [
						{
							id: 121,
							label: '角色新增',
						},
						{
							id: 122,
							label: '角色修改',
						},
						{
							id: 123,
							label: '角色删除',
						},
						{
							id: 124,
							label: '角色查询',
						},
					],
				},
				{
					id: 13,
					label: '用户管理',
					children: [
						{
							id: 131,
							label: '用户新增',
						},
						{
							id: 132,
							label: '用户修改',
						},
						{
							id: 133,
							label: '用户删除',
						},
						{
							id: 134,
							label: '用户查询',
						},
					],
				},
			],
		},
		{
			id: 2,
			label: '权限管理',
			children: [
				{
					id: 21,
					label: '前端控制',
					children: [
						{
							id: 211,
							label: '页面权限',
						},
						{
							id: 212,
							label: '页面权限',
						},
					],
				},
				{
					id: 22,
					label: '后端控制',
					children: [
						{
							id: 221,
							label: '页面权限',
						},
					],
				},
			],
		},
	];
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss">
.system-role-dialog-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
