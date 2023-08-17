<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="76%" @close="onDrawerClose()">
    <template #header>
      <div>
        <h4>任务实例详情</h4>
      </div>
    </template>
    <template #default>
      <el-tabs v-model="state.tabsValue" type="border-card" style="border-top: none;height: 100%;"
               @tab-change="onTabChange">
        <el-tab-pane name="base" label="基本信息">
          <el-descriptions column="1" border>
            <el-descriptions-item label="任务名称">{{ state.descriptions.jobName }}
            </el-descriptions-item>
            <el-descriptions-item label="调度节点">{{ state.descriptions.workerAddress }}
            </el-descriptions-item>
            <el-descriptions-item label="任务状态">
              <el-tag class="ml-2" :type="state.descriptions.statusTag">
                {{ state.descriptions.statusLabel }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ state.descriptions.createTime }}
            </el-descriptions-item>
            <el-descriptions-item label="完成时间">{{ state.descriptions.completeTime }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane name="list" label="任务列表">
          <el-table
            :data="state.taskList"
            style="width: 100%"
            size="default"
            row-key="id"
            lazy
            :load="load"
            :show-header="true"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="taskName" label="taskName"/>
            <el-table-column prop="workerAddress" label="workerAddress" show-overflow-tooltip/>
            <el-table-column prop="taskStatus" label="taskStatus">
              <template #default="scope">
                <el-tag class="ml-2" :type="scope.row.statusTag">
                  {{ scope.row.statusLabel }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTIme" label="createTIme"/>
            <el-table-column prop="completeTime" label="completeTime"/>
            <el-table-column prop="result" label="result" show-overflow-tooltip/>
            <el-table-column fixed="right" label="操作" width="120">
              <template #default>
                <el-button link type="primary" size="small" @click="handleClick">
                  详情
                </el-button>
                <el-button link type="danger" size="small">
                  终止
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
</template>

<script setup lang="ts" name="jobDrawerName">
import {useI18n} from "vue-i18n";
import {reactive} from "vue";
import {getInstanceStatusInfo,getTaskStatusInfo} from "/@/utils/data";
import {useInstanceTaskApi} from "/@/api/task";
import {formatDateByTimestamp} from "/@/utils/formatTime";

const {t} = useI18n();

const instanceTaskApi = useInstanceTaskApi()

// 定义接口
const state = reactive({
  tabsValue: 'base',
  pageShow: false,
  drawer: {
    isShow: false
  },
  pagination: {
    page: 1,
    size: 20,
    total: 0,
  },
  descriptions: {
    column: 6,
    jobName: '',
    workerAddress: '',
    createTime: '',
    completeTime: '',
    statusTag: '',
    statusLabel: 'Default',
  },
  jobInstanceId: 0,
  taskList: <any>[]
})

const openDrawer = async (row: RowJobInstanceType) => {
  // Description
  state.descriptions.jobName = row.jobName;
  state.descriptions.workerAddress = row.workerAddress;
  state.descriptions.createTime = row.createTime;
  state.descriptions.completeTime = row.completeTime;
  state.descriptions.statusTag = getInstanceStatusInfo(row.status)['tag'];
  state.descriptions.statusLabel = getInstanceStatusInfo(row.status)['label'];

  state.jobInstanceId = row.id
  state.tabsValue = 'base'
  state.pageShow = false;
  state.drawer.isShow = true;
}

// 分页改变
const onHandleSizeChange = async (val: number) => {
  state.pagination.size = val;
  await getCircleData();
};
// 分页改变
const onHandleCurrentChange = async (val: number) => {
  state.pagination.page = val
  await getCircleData();
};

const onTabChange = async (name: string) => {
  if (name == 'list') {
    state.pagination.page = 1
    state.pagination.size = 20;
    await getCircleData();
    state.pageShow = true;
    return
  }
  state.pageShow = false;
}

const getCircleData = async () => {
  let data = await instanceTaskApi.getListSecondList({
    jobInstanceId: state.jobInstanceId,
    page: state.pagination.page,
    size: state.pagination.size,
  })

  state.taskList = [];
  state.pagination.page = data['page']
  state.pagination.size = data['size']
  state.pagination.total = data['total']
  data.list.forEach(function (item: Object) {
    state.taskList.push({
      id: item['id'],
      jobId: item['jobId'],
      jobInstanceId: item['jobInstanceId'],
      circleId: item['circleId'],
      taskId: item['taskId'],
      workerAddress: item['workerAddress'],
      taskName: "第" + item['circleId'] + "执行",
      taskStatus: item['status'],
      statusTag: getTaskStatusInfo(item['status'])['tag'],
      statusLabel: getTaskStatusInfo(item['status'])['label'],
      createTIme: formatDateByTimestamp(item['createTime']),
      completeTime: formatDateByTimestamp(item['updateTime']),
      result: item['result'],
      childCount: item['childCount'],
      hasChildren: item['childCount'] > 0,
    });
  })
}


interface InstanceTask {
  id: number
  jobId: number
  jobInstanceId: number
  circleId: number
  taskId: string
  workerAddress: string
  taskName: string
  taskStatus: string
  createTIme: string
  completeTime: string
  statusTag: string
  statusLabel: string
  // result: string
  // childCount: number
  hasChildren?: boolean
  children?: InstanceTask[]
}

const load = async (
  row: InstanceTask,
  treeNode: unknown,
  resolve: (date: any[]) => void
) => {
  let data = await instanceTaskApi.getListChildList({
    taskId: row.taskId,
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
      workerAddress: item['workerAddress'],
      taskName: taskName,
      taskStatus: item['status'],
      statusTag: getTaskStatusInfo(item['status'])['tag'],
      statusLabel: getTaskStatusInfo(item['status'])['label'],
      createTIme: formatDateByTimestamp(item['createTime']),
      completeTime: formatDateByTimestamp(item['updateTime']),
      result: item['result'],
      childCount: item['childCount'],
      hasChildren: item['childCount'] > 0,
    });
  })

  resolve(showData)
}

const onDrawerClose = () => {
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
