<template>
  <div class="system-role-dialog-container">
    <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
      <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="120px"
               :rules="state.fromRules" size="default">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.app.namespace')" prop="namespaceName">
              <el-select v-model="state.ruleForm.namespaceId" class="m-2"
                         :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
                <el-option
                  v-for="ns in state.namespaceList"
                  :key="ns.id"
                  :label="ns.name"
                  :value="ns.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.delay.job.appName')" prop="appId">
              <el-select v-model="state.ruleForm.appId" class="m-2" filterable
                         :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
                <el-option
                  v-for="app in state.appList"
                  :key="app.id"
                  :label="app.label"
                  :value="app.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.delay.job.name')" prop="name">
              <el-input v-model="state.ruleForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
            <el-form-item :label="t('message.delay.job.description')" prop="description">
              <el-input v-model="state.ruleForm.description" type="textarea" rows="3"
                        clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
            <el-form-item :label="t('message.delay.job.topic')" prop="topic">
              <el-input v-model="state.ruleForm.topic" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
            <el-form-item :label="t('message.delay.job.processorInfo')" prop="processorInfo">
              <el-input v-model="state.ruleForm.processorInfo" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
            <el-form-item :label="t('message.delay.job.failTopicEnable')" prop="failTopicEnable">
              <el-switch
                v-model="state.ruleForm.failTopicEnable"
                inline-prompt
                active-text="on"
                inactive-text="off"
                @change="onSwitch($event)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="state.rowState.failConcurrency">
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="mb20">
            <el-form-item :label="t('message.delay.job.failTopicConcurrency')"
                          prop="failTopicConcurrency">
              <el-input-number v-model="state.ruleForm.failTopicConcurrency"
                               clearable></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.delay.job.failRetryTimes')" prop="failRetryTimes">
              <el-input-number v-model="state.ruleForm.failRetryTimes" clearable></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.delay.job.failRetryInterval')"
                          prop="failRetryInterval">
              <el-input-number v-model="state.ruleForm.failRetryInterval"
                               clearable></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.delay.job.concurrency')" prop="concurrency">
              <el-input-number v-model="state.ruleForm.concurrency" clearable></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.delay.job.blockingSize')" prop="blockingSize">
              <el-input-number v-model="state.ruleForm.blockingSize" clearable></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.delay.job.executeTimeout')" prop="executeTimeout">
              <el-input-number v-model="state.ruleForm.executeTimeout" clearable></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
          <el-button type="primary" @click="onSubmit(appDialogFormRef)" size="default">
            {{ t('message.commonBtn.confirm') }}
          </el-button>
					<el-button @click="onCancel"
                     size="default">{{ t('message.commonBtn.cancel') }}</el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemRoleDialog">
import {reactive, ref} from 'vue';
import {useI18n} from "vue-i18n";
import {useNamespaceApi} from "/@/api/namespace";
import {Local} from "/@/utils/storage";
import {useAppApi} from "/@/api/app";
import {FormInstance} from "element-plus";
import {useDelayApi} from "/@/api/delay";
import {getHeaderNamespaceId} from "/@/utils/header";

const {t} = useI18n();

// 定义接口
const nsApi = useNamespaceApi();
const appApi = useAppApi();
const delayApi = useDelayApi();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const appDialogFormRef = ref<FormInstance>();
const state = reactive({
  rowState: {
    failConcurrency: true,
  },
  fromRules: {
    topic: {
      required: false,
      message: t('message.app.validateName'),
      pattern: /^[0-9a-zA-Z_.-]*$/,
      trigger: 'blur'
    },
    desc: {
      required: true,
      message: t('message.app.desc'),
      trigger: 'blur'
    },
  },
  namespaceList: <any>[],
  appList: <any>[],
  ruleForm: {
    namespaceId: '',
    appId: '',
    id: 0,
    pid: 0,
    cid: 0,
    name: '',
    topic: '',
    description: '',
    processorInfo: '',
    failTopicEnable: true,
    failTopicConcurrency: 1,
    failRetryTimes: 3,
    failRetryInterval: 3,
    concurrency: 1,
    blockingSize: 8,
    executeTimeout: 60,
  },
  menuData: [] as TreeType[],
  menuProps: {
    children: 'children',
    label: 'label',
  },
  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
    submitTxt: '',
  },
});

// 打开弹窗
const openDialog = async (type: string, row: RowDelayType) => {
  // Clear
  appDialogFormRef.value?.clearValidate();

  // 初始化
  await initNamespace();
  await initAppList();

  if (type === 'update' || type == 'copy') {
    // state.ruleForm=row 这种方式会导致，弹窗状态切换，列表里面数据状态也切换了
    state.ruleForm.name = row.name;
    state.ruleForm.pid = row.pid;
    state.ruleForm.cid = row.cid;
    state.ruleForm.description = row.description;
    state.ruleForm.id = row.id;
    state.ruleForm.namespaceId = row.namespaceId
    state.ruleForm.appId = row.appId;
    state.ruleForm.processorInfo = row.processorInfo;
    state.ruleForm.topic = row.topic;
    state.ruleForm.failTopicEnable = row.failTopicEnable == 1;
    state.ruleForm.failTopicConcurrency = row.failTopicConcurrency;
    state.ruleForm.failRetryTimes = row.failRetryTimes;
    state.ruleForm.failRetryInterval = row.failRetryInterval;
    state.ruleForm.concurrency = row.concurrency;
    state.ruleForm.blockingSize = row.blockingSize;
    state.ruleForm.executeTimeout = row.executeTimeout;
    state.dialog.submitTxt = t("message.commonBtn.update");
    state.rowState.failConcurrency = state.ruleForm.failTopicEnable;

    if (type == 'update') {
      state.dialog.title = t("message.delay.job.updateJobTitle");
    } else {
      state.dialog.title = t("message.delay.job.copyJobTitle");
    }
  } else {
    state.ruleForm.name = '';
    state.ruleForm.description = '';
    state.ruleForm.namespaceId = ''
    state.ruleForm.appId = '';
    state.ruleForm.processorInfo = '';
    state.ruleForm.topic = '';
    state.ruleForm.failTopicEnable = true;
    state.ruleForm.failTopicConcurrency = 1;
    state.ruleForm.failRetryTimes = 3;
    state.ruleForm.failRetryInterval = 3;
    state.ruleForm.concurrency = 1;
    state.ruleForm.blockingSize = 8;
    state.ruleForm.executeTimeout = 60;
    state.ruleForm.namespaceId = Local.get("nid");
    state.dialog.title = t("message.delay.job.addJobTitle");
    state.dialog.submitTxt = t("message.commonBtn.add");
    state.rowState.failConcurrency = true;
  }
  state.dialog.type = type
  state.dialog.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
  state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};
// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: boolean) => {
    if (valid) {
      onSubmitApp();
    } else {
      return false;
    }
  });
};

const onSubmitApp = async () => {
  let statusValue = state.ruleForm.failTopicEnable ? 1 : 2;

  if (state.dialog.type === 'update') {
    await delayApi.update({
      "id": state.ruleForm.id,
      "pid": state.ruleForm.pid,
      "cid": state.ruleForm.cid,
      "namespaceId": state.ruleForm.namespaceId,
      "description": state.ruleForm.description,
      "appId": state.ruleForm.appId,
      "topic": state.ruleForm.topic,
      "processorInfo": state.ruleForm.processorInfo,
      "failRetryTimes": state.ruleForm.failRetryTimes,
      "failRetryInterval": state.ruleForm.failRetryTimes,
      "concurrency": state.ruleForm.concurrency,
      "blockingSize": state.ruleForm.blockingSize,
      "failTopicEnable": statusValue,
      "failTopicConcurrency":  state.ruleForm.failTopicConcurrency,
      "name": state.ruleForm.name,
      "executeTimeout": state.ruleForm.executeTimeout
    });
  } else {
    await delayApi.add({
      "namespaceId": state.ruleForm.namespaceId,
      "description": state.ruleForm.description,
      "appId": state.ruleForm.appId,
      "topic": state.ruleForm.topic,
      "processorInfo": state.ruleForm.processorInfo,
      "failRetryTimes": state.ruleForm.failRetryTimes,
      "failRetryInterval": state.ruleForm.failRetryTimes,
      "concurrency": state.ruleForm.concurrency,
      "blockingSize": state.ruleForm.blockingSize,
      "name": state.ruleForm.name,
      "failTopicEnable": statusValue,
      "failTopicConcurrency":  state.ruleForm.failTopicConcurrency,
      "executeTimeout": state.ruleForm.executeTimeout
    });
  }

  closeDialog();
  emit('refresh');
}

const onSwitch = async (event: boolean) => {
  state.rowState.failConcurrency = event;
};

const initNamespace = async () => {
  let data = await nsApi.getList({
    page: 1,
    size: 30,
  });

  // 清空列表数据
  state.namespaceList = [];
  data.list.forEach(function (item: Object) {
    state.namespaceList.push({
      id: item['id'],
      name: item['name'],
    })
  });
}

const initAppList = async () => {
  let data = await appApi.getList({
    namespaceId: getHeaderNamespaceId(),
    page: 1,
    size: 30,
  });

  state.appList = [];
  data.list.forEach(function (item: Object) {
    // 列表数据
    state.appList.push({
      id: item['id'],
      label: item['name']
    })
  });
};

// 暴露变量
defineExpose({
  openDialog,
});
</script>

<style scoped lang="scss">
.system-role-dialog-container {
  .menu-data-tree {
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    padding: 5px;
  }
}
</style>
