<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="60%" @close="onDrawerClose()">
    <template #header>
      <div>
        <h4>任务实例详情</h4>
      </div>
    </template>
    <template #default>
      <el-tabs v-model="state.tabsValue"  type="border-card" style="border-top: none;height: 100%;" @tab-change="onTabChange">
        <el-tab-pane name="base" label="基本信息">User</el-tab-pane>
        <el-tab-pane name="list" label="任务列表">
          <el-table
            :data="tableData1"
            style="width: 100%"
            size="default"
            row-key="id"
            lazy
            :load="load"
            :show-header="false"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column prop="taskName" label="taskName" />
            <el-table-column prop="workerAddress" label="workerAddress" />
            <el-table-column prop="taskStatus" label="taskStatus"/>
            <el-table-column prop="createTIme" label="createTIme" />
            <el-table-column prop="completeTime" label="completeTime" />
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
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-left: 12px; padding-bottom: 12px"
      />
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="jobDrawerName">
import {useI18n} from "vue-i18n";
import {reactive} from "vue";
import {getInstanceStatusInfo} from "/@/utils/data";
const {t} = useI18n();

// 定义接口
const state = reactive({
  tabsValue: 'base',
  pageShow: false,
  drawer: {
    isShow: false
  },
  descriptions: {
    column: 6,
    workerAddress: '',
    createTime: '',
    completeTime: '',
    statusTag: '',
    statusLabel: 'Default',
  }
})

const openDrawer = async (row: RowJobInstanceType) => {
  // Description
  state.descriptions.workerAddress = row.workerAddress;
  state.descriptions.createTime = row.createTime;
  state.descriptions.completeTime = row.completeTime;
  state.descriptions.statusTag = getInstanceStatusInfo(row.status)['tag'];
  state.descriptions.statusLabel = getInstanceStatusInfo(row.status)['label'];

  state.tabsValue='base'
  state.pageShow = false;
  state.drawer.isShow = true;
}

const onTabChange = (name: string) => {
  if (name == 'list') {
    state.pageShow = true;
    return
  }
  state.pageShow = false;
}


interface User {
  id: number
  workerAddress: string
  taskName: string
  taskStatus: string
  createTIme: string
  completeTime: string
  hasChildren?: boolean
  children?: User[]
}

const tableData1: User[] = [
  {
    id: 3,
    workerAddress: '172.20.0.253:25588',
    taskName: 'wangxiaohu',
    taskStatus: 'waiting',
    createTIme: '2023-07-03 20:51:41',
    completeTime: '2023-07-03 20:51:41',
    hasChildren: true,
  },
  {
    id: 4,
    workerAddress: '172.20.0.253:25588',
    taskName: 'wangxiaohu',
    taskStatus: 'success',
    createTIme: '2023-07-03 20:51:41',
    completeTime: '2023-07-03 20:51:41',
    hasChildren: true
  },
];

const load = (
  row: User,
  treeNode: unknown,
  resolve: (date: User[]) => void
) => {
  if (row.id==3){
    resolve([
      {
        id: 31,
        workerAddress: '192.20.0.253:25588',
        taskName: 'wangxiaohu',
        taskStatus: '成功',
        createTIme: '2023-07-03 20:51:41',
        completeTime: '2023-07-03 20:51:41',
      }
    ])
    return
  }

  if (row.id==131){
    resolve([
      {
        id: 311,
        workerAddress: '192.20.0.253:25588',
        taskName: 'wangxiaohu',
        taskStatus: '成功',
        createTIme: '2023-07-03 20:51:41',
        completeTime: '2023-07-03 20:51:41',
      }
    ])
    return
  }

  resolve([
    {
      id: 131,
      workerAddress: '192.20.0.253:25588',
      taskName: 'wangxiaohu',
      taskStatus: '成功',
      createTIme: '2023-07-03 20:51:41',
      completeTime: '2023-07-03 20:51:41',
      hasChildren: true,
    }
  ])
}

const onDrawerClose = () => {
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
