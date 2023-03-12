<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="80%" @close="onDrawerClose()">
    <template #header>
      <el-descriptions style="margin-top: 10px;" column="6">
        <el-descriptions-item label="工作节点:" width="260px" align="left">192.168.31.136:25531
        </el-descriptions-item>
        <el-descriptions-item label="开始时间:" width="260px" align="left">2023-12-12 15:12:12
        </el-descriptions-item>
        <el-descriptions-item label="完成时间:" width="260px" align="left">2023-12-12 15:12:12
        </el-descriptions-item>
        <el-descriptions-item label="任务状态:" width="260px" align="left">成功
        </el-descriptions-item>
      </el-descriptions>
    </template>
    <template #default>
      <div class="system-role-dialog-container" style="padding: 10px;height: 100%">
        <MonacoEditor
          ref="JobParamsMonacoEditor"
          :editorStyle="state.editor.editorStyle"
          :language="state.editor.language"
          :value="state.editor.value"
          :readOnly="true"
          :scrollBottom="true"
          :syncValue="true"
        />
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
import {defineAsyncComponent, reactive} from "vue";
import {useJobInstanceApi} from "/@/api/job";

const MonacoEditor = defineAsyncComponent(() => import('/@/components/editor/monaco.vue'));

const {t} = useI18n();

// 定义接口
const jobInstanceApi = useJobInstanceApi();

const state = reactive({
  editor: {
    editorStyle: 'width: 100%;height: 100%;',
    language: 'shell',
    value: '',
  },
  drawer: {
    isShow: false
  },
})

const loadingState = reactive({
  timerId: 0,
  time: 0,
  counter: 0,
});

const openDrawer = async (row: RowJobInstanceType) => {
  state.drawer.isShow = true;
  state.editor.value = '';
  loadingState.time = 0;
  await loadingLog(row, false);
}

const loadingLog = async (row: RowJobInstanceType, isTimer: boolean) => {
  if (loadingState.counter > 0 && loadingState.counter % 60 == 0 && isTimer) {
    state.editor.value += '\n';
  }

  let size = 100;
  let data = await jobInstanceApi.getProcessorList({
    jobInstanceId: row.id,
    executeType: row.executeType,
    time: loadingState.time,
    page: size,
  });

  data.list.forEach(function (line: string) {
    state.editor.value += line + '\n'
  });

  if (data.time > 0) {
    loadingState.time = data.time;
  }

  if (data.complete == 1){
    return;
  }

  if (data.list.length > 0) {
    setTimeout(async () => {
      await loadingLog(row, false)
    }, 500);
    return;
  }

  loadingState.timerId = setInterval(() => {
    state.editor.value += '.';
    loadingState.counter += 1;
    if (loadingState.counter % 6 == 0) {
      clearInterval(loadingState.timerId);
      loadingLog(row, true);
    }
  }, 500);
}

const onDrawerClose = () => {
  clearInterval(loadingState.timerId);
}

const cancelClick = () => {
  state.drawer.isShow = false;
  clearInterval(loadingState.timerId);
}
const confirmClick = async () => {
  ElMessage.success('更新成功');
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
