<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <div class="system-user-search mb15">
        <el-form ref="tableSearchRef" :model="searchState.form" :rules="searchState.rules">
          <el-row>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-form-item :label="t('message.namespace.name')" prop="name">
                <el-input v-model="searchState.form.name" size="default"
                          style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-button size="default" type="primary" class="ml10"
                         @click="onSearch(tableSearchRef)">
                <el-icon>
                  <ele-Search/>
                </el-icon>
                {{ $t('message.commonBtn.query') }}
              </el-button>
              <el-button size="default" type="primary" class="ml10"
                         @click="onReset()">
                <el-icon>
                  <ele-RefreshRight/>
                </el-icon>
                {{ $t('message.commonBtn.reset') }}
              </el-button>
              <el-button size="default" type="success" class="ml10" @click="onOpenAddRole('add')">
                <el-icon>
                  <ele-FolderAdd/>
                </el-icon>
                {{ $t('message.commonBtn.add') }}
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="state.tableData.data" v-loading="state.tableData.loading"
                style="width: 100%">
        <el-table-column prop="id" :label="t('message.namespace.id')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" :label="t('message.namespace.name')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="uniqueId" :label="t('message.namespace.uniqueId')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" :label="t('message.namespace.createTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column :label="t('message.commonMsg.operation')" width="300">
          <template #default="scope">
            <el-button type="primary" size="default" @click="onOpenEditRole('update',scope.row)">
              <el-icon>
                <ele-Edit/>
              </el-icon>
              {{ $t('message.commonBtn.update') }}
            </el-button>
            <el-button type="danger" size="default" :disabled="scope.row.id === 1" @click="onDel(scope.row)">
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
    <NsDialog ref="nsDialogRef" @refresh="getTableData()"/>
  </div>
</template>

<script setup lang="ts" name="systemRole">
import {defineAsyncComponent, reactive, onMounted, ref} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {useI18n} from 'vue-i18n';
import {useNamespaceApi} from "/@/api/namespace";
import {formatDateByTimestamp} from "/@/utils/formatTime";



// 定义变量内容
const {t} = useI18n();

// 定义接口
const nsApi = useNamespaceApi();

// 定义变量内容
const tableSearchRef = ref<FormInstance>();


// 引入组件
const NsDialog = defineAsyncComponent(() => import('/@/views/namespace/dialog.vue'));

// 定义变量内容
const nsDialogRef = ref();

const searchState = reactive({
  form: {
    name: ''
  },
  rules: {
  },
});

const state = reactive<NamespaceState>({
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 10,
    },
  },
});
// 初始化表格数据
const getTableData = async () => {

  state.tableData.loading = true;
  let data = await nsApi.getList({
    name: searchState.form.name,
    page: state.tableData.param.pageNum,
    size: state.tableData.param.pageSize,
  });

  // 清空列表数据
  state.tableData.data = [];
  data.list.forEach(function (item: Object) {
    state.tableData.data.push({
      id: item['id'],
      name: item['name'],
      uniqueId: item['uuid'],
      createTime: formatDateByTimestamp(item['createTime']),
    })
  });

  state.tableData.total = data.total;
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};

const onSearch = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      getTableData();
    } else {
      return false;
    }
  });
};

const onReset = () => {
  searchState.form.name = '';
  getTableData();
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
const onDel = (row: RowNamespaceType) => {
    ElMessageBox.confirm(t('message.namespace.deleteTitle') + `(${row.name})?`, t('message.commonMsg.tip'), {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await nsApi.delete({
        "id": row.id,
      });

      await getTableData();
      ElMessage.success(t('message.commonMsg.deleteSuccess'));
    })
    .catch(() => {
    });
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
