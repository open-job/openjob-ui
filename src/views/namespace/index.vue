<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<div class="system-user-search mb15">
				<el-input v-model="state.tableData.param.search" size="default" placeholder="" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
          {{ $t('message.commonBtn.query') }}
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddRole('add')">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
          {{ $t('message.commonBtn.add') }}
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column prop="nsId" :label="t('message.namespace.nsId')" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nsName" :label="t('message.namespace.nsName')" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nsUniqueId" :label="t('message.namespace.nsUniqueId')" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nsStatus" :label="t('message.namespace.nsStatus')" show-overflow-tooltip>
          <el-switch
            v-model="xxx"
            class="ml-2"
            size="default"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </el-table-column>
				<el-table-column prop="createTime" :label="t('message.namespace.nsCreateTime')" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="300">
					<template #default="scope">
            <el-button type="primary" size="default" @click="onOpenEditRole('update',scope.row)">
              <el-icon>
                <ele-Edit/>
              </el-icon>
              {{ $t('message.commonBtn.update') }}
            </el-button>
            <el-button type="danger" size="default" @click="onRowDel(scope.row)">
              <el-icon>
                <ele-Delete/>
              </el-icon>
              {{ $t('message.commonBtn.delete') }}
            </el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="state.tableData.param.pageNum"
				background
				v-model:page-size="state.tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"
			>
			</el-pagination>
		</div>
		<NsDialog ref="nsDialogRef" @refresh="getTableData()" />
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import {useI18n} from 'vue-i18n';
import {useNamespaceApi} from "/@/api/namespace";


// 定义变量内容
const {t} = useI18n();

const nsApi = useNamespaceApi();


// 引入组件
const NsDialog = defineAsyncComponent(() => import('/@/views/namespace/dialog.vue'));

// 定义变量内容
const nsDialogRef = ref();
const state = reactive<NamespaceState>({
	tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			search: '',
			pageNum: 1,
			pageSize: 10,
		},
	},
});
// 初始化表格数据
const getTableData = () => {
  // console.log(nsApi.getList({
  //   name: "",
  //   page: 1,
  //   size: 10,
  // }))
	state.tableData.loading = true;
	const data = [];
	for (let i = 0; i < 20; i++) {
		data.push({
      nsId: i+1,
      nsName: i === 0 ? 'admin' : 'common',
      nsUniqueId: 'uid',
      nsStatus: true,
      createTime: "2023-2-13",
		});
	}

	state.tableData.data = data;

	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.tableData.loading = false;
	}, 500);
};
// 打开新增角色弹窗
const onOpenAddRole = (type: string) => {
	nsDialogRef.value.openDialog(type);
};
// 打开修改角色弹窗
const onOpenEditRole = (type: string, row: Object) => {
	nsDialogRef.value.openDialog(type, row);
};
// 删除角色
const onRowDel = (row: RowRoleType) => {
	ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.roleName}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			getTableData();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};
// 分页改变
const onHandleSizeChange = (val: number) => {
	state.tableData.param.pageSize = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.tableData.param.pageNum = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;
		.el-table {
			flex: 1;
		}
	}
}
</style>
