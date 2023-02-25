<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="50%">
    <template #header>
      <h4>新增定时任务</h4>
    </template>
    <template #default>
      <div class="system-role-dialog-container" style="padding: 10px;">
<!--        <el-card class="box-card" shadow="never" style="margin-top: 10px">-->
<!--          <template #header>-->
<!--            <div class="card-header">-->
<!--              <span>任务调度</span>-->
<!--            </div>-->
<!--          </template>-->
<!--          <div>-->
<!--            xxx-->
<!--          </div>-->
<!--        </el-card>-->
<!--        <el-card class="box-card" shadow="never" style="margin-top: 10px">-->
<!--          <template #header>-->
<!--            <div class="card-header">-->
<!--              <span>任务调度</span>-->
<!--            </div>-->
<!--          </template>-->
<!--          <div>-->
<!--            xxx-->
<!--          </div>-->
<!--        </el-card>-->
<!--        <el-card class="box-card" shadow="never" style="margin-top: 10px">-->
<!--          <template #header>-->
<!--            <div class="card-header">-->
<!--              <span>任务调度</span>-->
<!--            </div>-->
<!--          </template>-->
<!--          <div>-->
<!--            xxx-->
<!--          </div>-->
<!--        </el-card>-->
        <el-descriptions title="任务调度">
          <el-descriptions-item>
            xxxx
          </el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="任务执行">
          <el-descriptions-item>
            xxxx
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto;text-align: left;padding-left: 30px;padding-bottom: 10px;">
        <el-button type="primary" @click="confirmClick">confirm</el-button>
        <el-button @click="cancelClick">cancel</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="jobDrawerName">
import {ElMessage} from 'element-plus'
import {useI18n} from "vue-i18n";
import {useNamespaceApi} from "/@/api/namespace";
import {reactive} from "vue";


const {t} = useI18n();

// 定义接口
const nsApi = useNamespaceApi();

const state = reactive({
  drawer: {
    isShow: false
  },
})

const openDrawer = async (row: RowJobType) => {
  state.drawer.isShow = true;
}
const cancelClick = () => {
  state.drawer.isShow = false
}
const confirmClick = async () => {
  ElMessage.success('更新成功');
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
