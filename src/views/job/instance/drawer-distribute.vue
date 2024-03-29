<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="76%" @close="onDrawerClose()">
    <template #header>
      <div>
        <h4>{{t('message.job.task.title')}}</h4>
      </div>
    </template>
    <template #default>
      <el-tabs v-model="state.tabsValue" type="border-card" style="border-top: none;height: 100%;"
               @tab-change="onTabChange">
        <el-tab-pane name="base" :label="t('message.job.task.base')">
          <el-descriptions column="1" border>
            <el-descriptions-item :label="t('message.job.task.taskName')">{{ state.descriptions.jobName }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('message.job.task.workerAddress')">{{ state.descriptions.workerAddress }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('message.job.task.status')">
              <el-tag class="ml-2" :type="state.descriptions.statusTag">
                {{ state.descriptions.statusLabel }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="t('message.job.job.executeType')">{{ state.descriptions.executeType }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('message.job.job.timeExpressionType')">{{ state.descriptions.timeExpressionType }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('message.job.task.createTime')">{{ state.descriptions.createTime }}
            </el-descriptions-item>
            <el-descriptions-item :label="t('message.job.task.completeTime')">{{ state.descriptions.completeTime }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane name="list" :label="state.tabListTitle">
          <el-table
            :data="state.taskList"
            style="width: 100%"
            size="default"
            row-key="taskId"
            v-loading="state.table.loading"
            lazy
            :load="load"
            :show-header="true"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="taskName" :label="t('message.job.task.taskName')"/>
            <el-table-column prop="workerAddress" :label="t('message.job.task.workerAddress')" show-overflow-tooltip/>
            <el-table-column prop="taskStatus" :label="t('message.job.task.status')">
              <template #default="scope">
                <el-tag class="ml-2" :type="scope.row.statusTag">
                  {{ scope.row.statusLabel }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" :label="t('message.job.task.createTime')"/>
            <el-table-column prop="completeTime" :label="t('message.job.task.completeTime')"/>
            <el-table-column prop="result" :label="t('message.job.task.result')" show-overflow-tooltip/>
            <el-table-column fixed="right" :label="t('message.job.task.operation')" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleClick(scope.row)">
                  {{ t('message.job.task.detail') }}
                </el-button>
                <el-button v-show="scope.row.status === 15" @click="handleStop(scope.row)" link type="danger" size="small">
                  {{ t('message.job.task.stop') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template #footer>
      <el-pagination
        v-show="state.pageShow"
        v-model:current-page="state.pagination.page"
        v-model:page-size="state.pagination.size"
        :page-sizes="[20, 50, 100, 200]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.pagination.total"
        @size-change="onHandleSizeChange"
        @current-change="onHandleCurrentChange"
        style="margin-left: 12px; padding-bottom: 12px"
      />
    </template>
  </el-drawer>

  <DetailDrawer ref="DetailDrawerRef"/>
</template>

<script setup lang="ts" name="jobDrawerName">
import {useI18n} from "vue-i18n";
import {defineAsyncComponent, reactive, ref} from "vue";
import {getInstanceStatusInfo,getTaskStatusInfo} from "/@/utils/data";
import {useInstanceTaskApi} from "/@/api/task";
import {formatDateByTimestamp} from "/@/utils/formatTime";
import {ElMessage, ElMessageBox} from "element-plus";

const {t} = useI18n();

// Sharding
const DetailDrawer = defineAsyncComponent(() => import('/@/views/job/instance/drawer-detail.vue'));

const DetailDrawerRef = ref();
const instanceTaskApi = useInstanceTaskApi()
const loadMaps = ref(new Map())

// 定义接口
const state = reactive({
  tabsValue: 'base',
  pageShow: false,
  tabListTitle: '',
  drawer: {
    isShow: false
  },
  pagination: {
    page: 1,
    size: 20,
    total: 0,
  },
  descriptions: {
    column: 8,
    jobName: '',
    workerAddress: '',
    createTime: '',
    executeType: '',
    timeExpressionType: '',
    completeTime: '',
    statusTag: '',
    statusLabel: 'Default',
  },
  table:{
    loading: false,
  },
  jobInstanceId: 0,
  timeExpressionType: '',
  taskList: <any>[]
})

const openDrawer = async (row: RowJobInstanceType) => {
  // Description
  state.descriptions.jobName = row.jobName;
  state.descriptions.workerAddress = row.workerAddress;
  state.descriptions.createTime = row.createTime;
  state.descriptions.completeTime = row.completeTime;
  state.descriptions.executeType = row.executeType;
  state.descriptions.timeExpressionType = row.timeExpressionType
  state.descriptions.statusTag = getInstanceStatusInfo(row.status)['tag'];
  state.descriptions.statusLabel = getInstanceStatusInfo(row.status)['label'];

  state.jobInstanceId = row.id
  state.timeExpressionType = row.timeExpressionType
  state.tabsValue = 'base'
  state.pageShow = false;
  state.taskList = [];
  state.drawer.isShow = true;

  // Tab list title
  if (row.executeType == 'sharding') {
    state.tabListTitle = t('message.job.task.shardingTasks');
  } else if (row.executeType == 'broadcast') {
    state.tabListTitle = t('message.job.task.broadcastTasks');
  } else {
    state.tabListTitle = t('message.job.task.tasks');
  }
}

// 分页改变
const onHandleSizeChange = async (val: number) => {
  state.pagination.size = val;
  await getTaskData();
};
// 分页改变
const onHandleCurrentChange = async (val: number) => {
  state.pagination.page = val
  await getTaskData();
};

const onTabChange = async (name: string) => {
  if (name == 'list') {
    state.pagination.page = 1
    state.pagination.size = 20;
    await getTaskData();
    state.pageShow = true;
    return
  }
  state.pageShow = false;
}

const getTaskData = async () => {
  state.table.loading = true
  let data = await instanceTaskApi.getListTaskList({
    jobInstanceId: state.jobInstanceId,
    timeExpressionType: state.timeExpressionType,
    page: state.pagination.page,
    size: state.pagination.size,
  })

  state.taskList = [];
  state.pagination.page = data['page']
  state.pagination.size = data['size']
  state.pagination.total = data['total']
  data.list.forEach(function (item: Object) {

    let taskName = item['taskName']
    if (state.timeExpressionType == 'secondDelay') {
      taskName = t('message.job.task.name1') + item['circleId'] + t('message.job.task.name2')
    }

    state.taskList.push({
      id: item['id'],
      jobId: item['jobId'],
      jobInstanceId: item['jobInstanceId'],
      circleId: item['circleId'],
      taskId: item['taskId'],
      parentTaskId: item['parentTaskId'],
      dispatchVersion: item['dispatchVersion'],
      workerAddress: item['workerAddress'],
      taskName: taskName,
      status: item['status'],
      taskStatus: item['status'],
      statusTag: getTaskStatusInfo(item['status'])['tag'],
      statusLabel: getTaskStatusInfo(item['status'])['label'],
      createTime: formatDateByTimestamp(item['createTime']),
      completeTime: formatDateByTimestamp(item['updateTime']),
      result: item['result'],
      childCount: item['childCount'],
      pull: item['pull'],
      hasChildren: item['childCount'] > 0,
    });
  })

  state.table.loading = false

  // Refresh child list
  loadMaps.value.forEach((rowLoad, key) => {
    load(rowLoad.row, rowLoad.treeNode, rowLoad.resolve)
  });
}



const load = async (
  row: InstanceTask,
  treeNode: unknown,
  resolve: (date: any[]) => void
) => {
  loadMaps.value.set(row.taskId, {row, treeNode, resolve})

  let data = await instanceTaskApi.getListChildList({
    taskId: row.taskId,
    jobInstanceId: row.jobInstanceId,
    circleId: row.circleId,
    pull: row.pull,
    page: 1,
    size: 20,
  })

  let showData = <any>[];
  data.list.forEach(function (item: Object) {
    let taskName = item['taskName']
    if (item['childCount'] > 0) {
      taskName += " [" + item['childCount'] + "]"
    }

    showData.push({
      id: item['id'],
      jobId: item['jobId'],
      jobInstanceId: item['jobInstanceId'],
      circleId: item['circleId'],
      taskId: item['taskId'],
      parentTaskId: item['parentTaskId'],
      dispatchVersion: item['dispatchVersion'],
      workerAddress: item['workerAddress'],
      taskName: taskName,
      status: item['status'],
      taskStatus: item['status'],
      statusTag: getTaskStatusInfo(item['status'])['tag'],
      statusLabel: getTaskStatusInfo(item['status'])['label'],
      createTime: formatDateByTimestamp(item['createTime']),
      completeTime: formatDateByTimestamp(item['updateTime']),
      result: item['result'],
      childCount: item['childCount'],
      pull: item['pull'],
      hasChildren: item['childCount'] > 0,
    });
  })

  resolve(showData)
}

const handleClick = (row: InstanceTask) => {
  DetailDrawerRef.value.openDrawer(row);
}

const handleStop = (row: InstanceTask) => {
  ElMessageBox.confirm(t('message.job.instance.stopTitle') + `(${row.taskId})?`, t('message.commonMsg.tip'), {
    confirmButtonText: t('message.commonBtn.confirm'),
    cancelButtonText: t('message.commonBtn.cancel'),
    type: 'warning',
  })
    .then(async () => {
      await instanceTaskApi.stop({
        jobInstanceId: row.jobInstanceId,
        dispatchVersion: row.dispatchVersion,
        circleId: row.circleId,
        taskId: row.taskId,
      });

      setTimeout(async ()=>{
        // Refresh child list
        if (loadMaps.value.has(row.parentTaskId)){
          let rowLoad = loadMaps.value.get(row.parentTaskId);
          await load(rowLoad.row, rowLoad.treeNode, rowLoad.resolve)
        }

        await getTaskData();
      }, 1000)
      ElMessage.success(t('message.commonMsg.stopSuccess'));
    })
    .catch(() => {
    });
}

const onDrawerClose = () => {
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
