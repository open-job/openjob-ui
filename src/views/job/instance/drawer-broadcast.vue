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
          <el-table :data="tableData" size="default" style="width: 100%">
            <el-table-column prop="taskId" label="任务ID" v-show="false"/>
            <el-table-column prop="workerAddress" label="执行机器" v-show="false"/>
            <el-table-column prop="taskStatus" label="任务状态" v-show="false"/>
            <el-table-column prop="createTIme" label="开始时间"  v-show="false" />
            <el-table-column prop="completeTime" label="完成时间"  v-show="false" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClick">
                详情{{scope.row.taskId}}
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
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="jobDrawerName">
import {useI18n} from "vue-i18n";
import {reactive} from "vue";
import {getInstanceStatusInfo} from "/@/utils/data";


const tableData = [
  {
    taskId: '2_4_0_0',
    workerAddress: '172.20.0.253:25588',
    taskStatus: '成功',
    createTIme: '2023-07-03 20:51:41',
    completeTime: '2023-07-03 20:51:41',
  }
]

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

const onDrawerClose = () => {
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
