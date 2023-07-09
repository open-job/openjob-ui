<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="60%" @close="onDrawerClose()">
    <template #header>
      <div>
        <h4>任务实例详情</h4>
      </div>
    </template>
    <template #default>
      <el-tabs  type="border-card" style="border-top: none;height: 100%;">
        <el-tab-pane label="基本信息">User</el-tab-pane>
        <el-tab-pane label="任务列表">
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
            <el-table-column prop="date" label="Date" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template #footer>
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

  state.drawer.isShow = true;
}


interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}

const tableData1: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    hasChildren: true,
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
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
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])
    return
  }

  if (row.id==131){
    resolve([
      {
        id: 311,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 321,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])
    return
  }

  resolve([
    {
      id: 131,
      date: '2016-05-01',
      name: 'wangxiaoh1u',
      address: 'No. 189, Grove St, Los Angeles',
      hasChildren: true,
    },
    {
      id: 132,
      date: '2016-05-01',
      name: 'wangxiaoh1u',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ])
}

const onDrawerClose = () => {
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
