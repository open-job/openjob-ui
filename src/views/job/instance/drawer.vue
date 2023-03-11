<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="80%">
    <template #header>
      <h4>新增定时任务</h4>
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
    language: 'plaintext',
    value: '',
  },
  drawer: {
    isShow: false
  },
})

const openDrawer = async (row: RowJobInstanceType) => {
  state.drawer.isShow = true;
  state.editor.value = '';

  let data = await jobInstanceApi.getProcessorList({
    jobInstanceId: row.id,
    executeType: row.executeType,
    time: 0,
    page: 20,
  });

  data.list.forEach(function (line: string) {
    state.editor.value += line + '\n'
  });
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
