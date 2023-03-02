<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <div class="system-user-search mb15">
        <el-form ref="tableSearchRef" :label-width="80" :model="searchState.form" :rules="searchState.rules">
          <el-row>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-form-item :label="t('message.app.name')" prop="appName">
                <el-select v-model="searchState.form.appId" filterable placeholder="" size="default" style="width: 95%">
                  <el-option
                    v-for="item in appState.list"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                    @click="onSearch(tableSearchRef)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-form-item :label="t('message.delay.instance.topic')" prop="topic">
                <el-select v-model="searchState.form.topic" filterable placeholder="" size="default"
                           style="width: 90%">
                  <el-option
                    v-for="item in appState.list"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                    @click="onSearch(tableSearchRef)"
                  />
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-form-item :label="t('message.delay.instance.taskId')" prop="taskId">
                <el-input v-model="searchState.form.taskId" size="default" style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="8" :xl="6" class="mb20">
              <el-form-item :label="t('message.dateMsg.rangeMsg')" prop="taskId">
                <el-date-picker
                  v-model="searchState.form.dateSelect"
                  type="datetimerange"
                  :shortcuts="shortcuts"
                  range-separator="-"
                  :start-placeholder="t('message.dateMsg.startDate')"
                  :end-placeholder="t('message.dateMsg.endDate')"
                />
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
        <el-table-column prop="appName" :label="t('message.delay.instance.appName')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="taskId" :label="t('message.delay.instance.taskId')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="topic" :label="t('message.delay.instance.topic')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" :label="t('message.delay.instance.status')"
                         show-overflow-tooltip>
          <template #default="scope">
            {{ scope.row.status }}
          </template>
        </el-table-column>
        <el-table-column prop="executeTime" :label="t('message.delay.instance.executeTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" :label="t('message.delay.instance.createTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="default" @click="onOpenEditRole('update',scope.row)">
              <el-icon>
                <ele-Edit/>
              </el-icon>
              {{ $t('message.commonBtn.update') }}
            </el-button>
            <el-button type="danger" size="default" @click="onDel(scope.row)">
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
import {Local} from '/@/utils/storage';
import {useAppApi} from "/@/api/app";
import {getHeaderNamespaceId} from "/@/utils/header";
import {useDelayInstanceApi} from "/@/api/delay";
import {formatDateByTimestamp, getShortcuts} from "/@/utils/formatTime";


// 定义变量内容
const {t} = useI18n();

// 定义接口
const appApi = useAppApi();
const delayInstanceApi = useDelayInstanceApi();

// 定义变量内容
const tableSearchRef = ref<FormInstance>();


// 引入组件
const NsDialog = defineAsyncComponent(() => import('/@/views/delay/instance/dialog.vue'));

// 定义变量内容
const nsDialogRef = ref();

const appState = reactive<any>({
  list: [],
});

const searchState = reactive({
  form: {
    appId: '',
    topic: '',
    taskId: '',
    dateSelect: [
      null,
      null,
    ]
  },
  rules: {
    name: {
      required: true,
      message: t('message.app.validateName'),
      pattern: /^[0-9a-zA-Z_.-]*$/,
      trigger: 'blur'
    },
  },
});

const state = reactive<DelayInstanceState>({
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 20,
    },
  },
});
// 初始化表格数据
const getTableData = async () => {
  state.tableData.loading = true;
  let data = await delayInstanceApi.getList({
    namespaceId: getHeaderNamespaceId(),
    page: state.tableData.param.pageNum,
    size: state.tableData.param.pageSize,
  });

  // 清空列表数据
  state.tableData.data = [];
  data.list.forEach(function (item: Object) {
    state.tableData.data.push({
      id: item['id'],
      namespaceId: item['namespaceId'],
      appId: item['appId'],
      appName: item['appName'],
      status: item['status'],
      delayId: item['delayId'],
      taskId: item['taskId'],
      topic: item['topic'],
      delayParams: item['delayParams'],
      delayExtra: item['delayExtra'],
      createTime: formatDateByTimestamp(item['createTime']),
      executeTime: formatDateByTimestamp(item['executeTime']),
    })
  });

  state.tableData.total = data.total;
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};

const shortcuts = getShortcuts();

const onSwitch = async (event: object, row: EmptyObjectType) => {
  const statusValue = event ? 1 : 2;
  await appApi.updateStatus({
    "id": row.id,
    "status": statusValue,
  });
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
  ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.name}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await appApi.delete({
        "id": row.id,
      });

      await getTableData();
      ElMessage.success('删除成功');
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

const initAppList = async () => {
  let data = await appApi.getList({
    namespaceId: getHeaderNamespaceId(),
    page: 1,
    size: 30,
  });

  appState.list = [];
  data.list.forEach(function (item: Object) {
    // 列表数据
    appState.list.push({
      id: item['id'],
      label: item['name']
    })
  });
};

// 页面加载时
onMounted(() => {
  initAppList();
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
