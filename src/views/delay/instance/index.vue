<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <div class="system-user-search mb15">
        <el-form ref="tableSearchRef" :label-width="80" :model="searchState.form"
                 :rules="searchState.rules">
          <el-row>
            <el-col :xs="8" :sm="12" :md="8" :lg="4" :xl="4" class="mb20">
              <el-form-item :label="t('message.app.name')" prop="appName">
                <el-select v-model="searchState.form.appId" filterable
                           :placeholder="t('message.commonMsg.all')" size="default"
                           style="width: 95%">
                  <el-option
                    v-for="item in selectState.appList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                    @click="onAppChange(item.id, true)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="4" :xl="4" class="mb20">
              <el-form-item :label="t('message.delay.instance.topic')" prop="topic">
                <el-select v-model="searchState.form.delayId" filterable
                           :placeholder="t('message.commonMsg.all')" size="default"
                           style="width: 90%">
                  <el-option
                    v-for="item in selectState.topicList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                    @click="onSearch(tableSearchRef)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="4" :xl="4" class="mb20">
              <el-form-item :label="t('message.delay.instance.status')" prop="topic">
                <el-select v-model="searchState.form.status" filterable
                           :placeholder="t('message.commonMsg.all')" size="default"
                           style="width: 90%">
                  <el-option
                    v-for="item in selectState.statusList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                    @click="onSearch(tableSearchRef)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="4" :xl="4" class="mb20">
              <el-form-item :label="t('message.delay.instance.taskId')" prop="taskId">
                <el-input v-model="searchState.form.taskId" size="default"
                          style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="8" :xl="6" class="mb20">
              <el-form-item :label="t('message.dateMsg.rangeMsg')" prop="taskId">
                <el-date-picker
                  v-model="searchState.form.dateSelect"
                  type="datetimerange"
                  :shortcuts="shortcuts"
                  range-separator="-"
                  size="default"
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
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="state.tableData.data" v-loading="state.tableData.loading"
                style="width: 100%">
        <el-table-column prop="taskId" :label="t('message.delay.instance.taskId')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="topic" :label="t('message.delay.instance.topic')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" :label="t('message.delay.instance.status')"
                         show-overflow-tooltip>
          <template #default="scope">
            <el-tag class="ml-2" :type="getTaskStatusInfo(scope.row.status)['tag']">
              {{ getTaskStatusInfo(scope.row.status)['label'] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="executeTime" :label="t('message.delay.instance.executeTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="completeTime" :label="t('message.delay.instance.completeTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" :label="t('message.delay.instance.createTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="default" @click="onOpenLogDrawer(scope.row)">
              <el-icon>
                <ele-View/>
              </el-icon>
              {{ $t('message.commonBtn.log') }}
            </el-button>
            <el-button type="warning" size="default" v-if="scope.row.status === 15"
                       @click="onStop(scope.row)">
              <el-icon>
                <ele-Stopwatch/>
              </el-icon>
              {{ $t('message.commonBtn.stop') }}
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
    <JobDrawer ref="JobDrawerRef" @refresh="getTableData()"/>
  </div>
</template>

<script setup lang="ts" name="systemRole">
import {defineAsyncComponent, reactive, onMounted, ref} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
import {useI18n} from 'vue-i18n';
import {getHeaderNamespaceId} from "/@/utils/header";
import {useDelayApi, useDelayInstanceApi} from "/@/api/delay";
import {formatDateByTimestamp, getTimestampByString} from "/@/utils/formatTime";
import {getAppSelectList, getShortcuts, getTaskStatusSelectList, getTaskStatusInfo} from "/@/utils/data";
import router from "/@/router";

// 定义变量内容
const {t} = useI18n();

// 定义接口
const delayInstanceApi = useDelayInstanceApi();

// 定义变量内容
const tableSearchRef = ref<FormInstance>();


// 引入组件
const JobDrawer = defineAsyncComponent(() => import('/@/views/delay/instance/drawer.vue'));

// 定义变量内容
const JobDrawerRef = ref();

// 定义变量内容
const selectState = reactive<any>({
  appList: [],
  topicList: [],
  statusList: [],
});

const searchState = reactive({
  form: {
    appId: '',
    delayId: '',
    taskId: '',
    status: '',
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

// Init status list.
selectState.statusList = getTaskStatusSelectList();

// 初始化表格数据
const getTableData = async () => {
  state.tableData.loading = true;

  let request = {
    namespaceId: getHeaderNamespaceId(),
    appId: searchState.form.appId,
    delayId: searchState.form.delayId,
    status: searchState.form.status,
    taskId: searchState.form.taskId,
    beginTime: 0,
    endTime: 0,
    page: state.tableData.param.pageNum,
    size: state.tableData.param.pageSize,
  };

  if (searchState.form.dateSelect[0] !== null){
    request.beginTime = getTimestampByString(searchState.form.dateSelect[0]);
  }
  if (searchState.form.dateSelect[1] !== null){
    request.endTime = getTimestampByString(searchState.form.dateSelect[1]);
  }

  let data = await delayInstanceApi.getList(request);

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
      workerAddress: item['workerAddress'],
      createTime: formatDateByTimestamp(item['createTime']),
      executeTime: formatDateByTimestamp(item['executeTime']),
      completeTime: formatDateByTimestamp(item['completeTime']),
    })
  });

  state.tableData.total = data.total;
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};

const shortcuts = getShortcuts();

const onAppChange = async (appId: number, isLoading :boolean) => {
  searchState.form.delayId = '';

  let data = await useDelayApi().getList({
    namespaceId: getHeaderNamespaceId(),
    appId: appId,
    page: 1,
    size: 1024,
  });

  selectState.topicList = [];
  data.list.forEach(function (item: Object) {
    // 列表数据
    selectState.topicList.push({
      id: item['id'],
      label: item['topic']
    })
  });

  if (isLoading){
    await getTableData();
  }
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
  searchState.form.appId = '';
  searchState.form.delayId = '';
  searchState.form.status = '';
  searchState.form.taskId = '';
  searchState.form.dateSelect = [
    null,
    null
  ];
  getTableData();
};

const onOpenLogDrawer = (row: RowDelayInstanceType) => {
  JobDrawerRef.value.openDrawer(row);
};


// 删除角色
const onDel = (row: RowNamespaceType) => {
  ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.name}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await useDelayInstanceApi().delete({
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

// 页面加载时
onMounted(async () => {
  let delayId = router.currentRoute.value.query.delayId;
  let appId = router.currentRoute.value.query.appId;

  // Init app list
  selectState.appList = await getAppSelectList();
  if (delayId != undefined && appId != undefined) {
    await onAppChange(Number(appId), false);
    searchState.form.appId = Number(appId);
    searchState.form.delayId = Number(delayId);
  }

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
