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
        <div style="text-align: center;height: 30px;">
          <el-icon class="is-loading" size="30px" v-show="state.loadingShow" >
            <Loading />
          </el-icon>
        </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="jobDrawerName">
import {ElMessage} from 'element-plus'
import {useI18n} from "vue-i18n";
import {defineAsyncComponent, reactive} from "vue";
import {useJobInstanceApi} from "/@/api/job";
import {getInstanceStatusInfo} from "/@/utils/data";

const MonacoEditor = defineAsyncComponent(() => import('/@/components/editor/monaco.vue'));

const {t} = useI18n();

// 定义接口
const jobInstanceApi = useJobInstanceApi();

const state = reactive({
  loadingShow: false,
  closeStatus: false,
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

const openDrawer = async (row: RowJobInstanceType) => {
  // Description
  state.descriptions.workerAddress = row.workerAddress;
  state.descriptions.createTime = row.createTime;
  state.descriptions.completeTime = row.completeTime;
  state.descriptions.statusTag = getInstanceStatusInfo(row.status)['tag'];
  state.descriptions.statusLabel = getInstanceStatusInfo(row.status)['label'];

  state.drawer.isShow = true;
  state.editor.value = '';
  loadingState.time = 0;
  state.closeStatus = false;
  state.loadingShow = false
  await loadingLog(row, 2);
}

const loadingLog = async (row: RowJobInstanceType, loading :number) => {
  if (state.closeStatus){
    return
  }

  let size = 50;
  let data = await jobInstanceApi.getProcessorList({
    jobId: row.jobId,
    jobInstanceId: row.id,
    executeType: row.executeType,
    status: row.status,
    time: loadingState.time,
    loading: loading,
    size: size,
  });

  let loadingValue = ""
  data.list.forEach(function (line: string) {
    loadingValue += line + '\n'
  });
  state.editor.value += loadingValue

  state.loadingShow = false
  if (data.time > 0) {
    loadingState.time = data.time;
  }

  if (data.complete == 1){
    return;
  }

  if (data.list.length > 0) {
    state.loadingShow = true;
    setTimeout(async () => {
      await loadingLog(row, 2)
    }, 1000);
    return;
  }

  state.loadingShow = true;
  loadingState.timerId = setInterval(async () => {
    clearInterval(loadingState.timerId);
    await loadingLog(row, 1);
  }, 3000);
}

const onDrawerClose = () => {
  state.closeStatus = true
  clearInterval(loadingState.timerId);
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
