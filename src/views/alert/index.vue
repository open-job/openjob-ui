<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <div class="system-user-search mb15">
        <el-form ref="tableSearchRef" :model="searchState.form" :rules="searchState.rules">
          <el-row>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-form-item :label="t('message.alert.name')" prop="name">
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
        <el-table-column prop="name" :label="t('message.alert.name')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="method" :label="t('message.alert.method')"
                         show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="url" :label="t('message.alert.url')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" :label="t('message.alert.status')"
                         show-overflow-tooltip>
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              class="ml-2"
              size="default"
              @change="onSwitch($event, scope.row)"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="t('message.alert.createTime')"
                         width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" :label="t('message.alert.updateTime')"
                         width="200" show-overflow-tooltip></el-table-column>
        <el-table-column :label="t('message.commonMsg.operation')" width="300">
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
    <AlertDrawer ref="AlertDrawerRef" @refresh="getTableData()"/>
  </div>
</template>

<script setup lang="ts" name="systemRole">
import {defineAsyncComponent, reactive, onMounted, ref} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {useI18n} from 'vue-i18n';
import {useDelayApi} from "/@/api/delay";
import {formatDateByTimestamp} from "/@/utils/formatTime";
import {getAppSelectList} from "/@/utils/data";
import router from "/@/router";
import {useAlertRuleApi} from "/@/api/alert";


// 定义变量内容
const {t} = useI18n();

// 定义接口
const delayApi = useDelayApi();
const alertRuleApi = useAlertRuleApi();

// 定义变量内容
const tableSearchRef = ref<FormInstance>();

const AlertDrawer = defineAsyncComponent(() => import('/@/views/alert/drawer.vue'));


const AlertDrawerRef = ref();

const appState = reactive<any>({
  list: [],
});

const searchState = reactive({
  form: {
    name: '',
  },
  rules: {
    topic: {
      required: false,
      message: t('message.app.validateName'),
      pattern: /^[0-9a-zA-Z_.-]*$/,
      trigger: 'blur'
    },
  },
});

const state = reactive<AlertRuleState>({
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
  let data = await alertRuleApi.getList({
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
      namespaceAppIds: item['namespaceAppIds'],
      events: item['events'],
      metrics: item['metrics'],
      locale: item['locale'],
      method: item['method'],
      url: item['url'],
      secret: item['secret'],
      status: item['status'] == 1,
      createTime: formatDateByTimestamp(item['createTime']),
      updateTime: formatDateByTimestamp(item['updateTime'])
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
  AlertDrawerRef.value.openDrawer(type, 1, null);
};
// 打开修改角色弹窗
const onOpenEditRole = (type: string, row: Object) => {
  AlertDrawerRef.value.openDrawer(type, row);
};

// 删除角色
const onDel = (row: RowAlertRuleType) => {
  ElMessageBox.confirm(t('message.delay.job.deleteTitle') + `(${row.name})?`, t('message.commonMsg.tip'), {
    confirmButtonText: t('message.commonBtn.confirm'),
    cancelButtonText: t('message.commonBtn.cancel'),
    type: 'warning',
  })
    .then(async () => {
      await alertRuleApi.delete({
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

const onSwitch = async (event: object, row: EmptyObjectType) => {
  const statusValue = event ? 1 : 2;
  await alertRuleApi.updateStatus({
    "id": row.id,
    "status": statusValue,
  });
};

// 页面加载时
onMounted(async () => {
  // Init app list
  appState.list = await getAppSelectList();

  // Init table data
  await getTableData();
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
