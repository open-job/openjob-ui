<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="80%" @close="onDrawerClose()">
    <template #header>
      <el-descriptions style="margin-top: 10px;" :column="state.descriptions.column">
        <el-descriptions-item :label="t('message.job.instance.workerAddress')" width="260px" align="left">
          {{state.descriptions.workerAddress}}
        </el-descriptions-item>
        <el-descriptions-item :label="t('message.job.instance.createTime')" width="260px" align="left">
          {{state.descriptions.createTime}}
        </el-descriptions-item>
        <el-descriptions-item :label="t('message.job.instance.completeTime')" width="260px" align="left">
          {{state.descriptions.completeTime}}
        </el-descriptions-item>
        <el-descriptions-item :label="t('message.job.instance.status')" width="260px" align="left">
          <el-tag class="ml-2" :type="state.descriptions.statusTag" size="small">{{state.descriptions.statusLabel}}</el-tag>
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
import {getInstanceStatusInfo} from "/@/utils/data";
import {useDelayInstanceApi} from "/@/api/delay";

const MonacoEditor = defineAsyncComponent(() => import('/@/components/editor/monaco.vue'));

const {t} = useI18n();

// 定义接口
const delayInstanceApi = useDelayInstanceApi()

const state = reactive({
  editor: {
    editorStyle: 'width: 100%;height: 100%;',
    language: 'shell',
    value: '',
  },
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

const loadingState = reactive({
  timerId: 0,
  time: 0,
  counter: 0,
});

const openDrawer = async (row: RowDelayInstanceType) => {
  // Description
  state.descriptions.workerAddress = row.workerAddress;
  state.descriptions.createTime = row.createTime;
  state.descriptions.completeTime = row.completeTime;
  state.descriptions.statusTag = getInstanceStatusInfo(row.status)['tag'];
  state.descriptions.statusLabel = getInstanceStatusInfo(row.status)['label'];

  state.drawer.isShow = true;
  state.editor.value = '';
  loadingState.time = 0;
  await loadingLog(row, false, 2);
}

const loadingLog = async (row: RowDelayInstanceType, isTimer: boolean, loading :number) => {
  if (isTimer) {
    state.editor.value += '\n';
  }

  let size = 30;
  let data = await delayInstanceApi.getProcessorList({
    taskId: row.taskId,
    status: row.status,
    time: loadingState.time,
    loading: loading,
    size: size,
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
      await loadingLog(row, false, 2)
    }, 500);
    return;
  }

  loadingState.timerId = setInterval(() => {
    state.editor.value += '.';
    loadingState.counter += 1;
    if (loadingState.counter % 6 == 0) {
      clearInterval(loadingState.timerId);
      loadingLog(row, true, 1);
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
