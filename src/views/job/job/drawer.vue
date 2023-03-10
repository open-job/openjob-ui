<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="50%">
    <template #header>
      <h4>{{state.dialogTitle}}</h4>
    </template>
    <template #default>
      <div class="system-role-dialog-container" style="padding: 10px;">
        <el-form ref="jobFormRef" :model="state.ruleForm" label-width="120px"
                 :rules="state.fromRules" size="default">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.app.namespace')" prop="namespaceId">
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
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.application')" prop="appId">
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
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.name')" prop="name">
                <el-input v-model="state.ruleForm.name" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.description')" prop="description">
                <el-input v-model="state.ruleForm.description" clearable type="textarea" rows="3"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.processorType')" prop="processorType">
                <el-select v-model="state.ruleForm.processorType" class="m-2"
                           :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
                  <el-option
                    v-for="ns in state.processorType"
                    :key="ns.value"
                    :label="ns.label"
                    :value="ns.value"
                    @click="onChangeProcessorType(ns.value)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="state.rowState.inputProcessor">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.processorInfo')" prop="processorInfo">
                <el-input v-model="state.ruleForm.processorInfo"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="state.rowState.shellProcessor">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.processorInfo')" prop="shellProcessorInfo">
                <MonacoEditor
                  ref="shellProcessorMonacoEditor"
                  :editorStyle="state.shellEditor.editorStyle"
                  :language="state.shellEditor.language"
                  :value="state.ruleForm.shellProcessorInfo"
                  :syncValue="state.syncEditor"
                  @updateContent="onShellUpdateContent"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.paramsType')" prop="paramsType">
                <el-radio-group v-model="state.ruleForm.paramsType">
                  <el-radio v-for="t in state.contentType" :key="t.value" :label="t.label"
                            @click="onChangePramsType(t.value)">{{t.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.params')" prop="params">
                <MonacoEditor
                  ref="JobParamsMonacoEditor"
                  :editorStyle="state.paramsEditor.editorStyle"
                  :language="state.ruleForm.paramsType"
                  :value="state.ruleForm.params"
                  :syncValue="state.syncEditor"
                  @updateContent="onParamsUpdateContent"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.extendParamsType')" prop="extendParamsType">
                <el-radio-group v-model="state.ruleForm.extendParamsType">
                  <el-radio v-for="t in state.contentType" :key="t.value" :label="t.label"
                  @click="onChangeExtPramsType(t.value)">{{t.value}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.job.job.extendParams')" prop="extendParams">
                <MonacoEditor
                  ref="JobExtParamsMonacoEditor"
                  :editorStyle="state.paramsExtEditor.editorStyle"
                  :language="state.ruleForm.extendParamsType"
                  :value="state.ruleForm.extendParams"
                  :syncValue="state.syncEditor"
                  @updateContent="onExtParamsUpdateContent"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.timeExpressionType')" prop="">
                <el-select v-model="state.ruleForm.timeExpressionType" class="m-2"
                           :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
                  <el-option
                    v-for="ns in state.timeExpressionType"
                    :key="ns.value"
                    :label="ns.label"
                    :value="ns.value"
                    @click="onChangeTimeType(ns.value)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="state.rowState.timeExpression">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.timeExpression')" prop="timeExpression">
                <el-input v-model="state.ruleForm.timeExpression"/>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-button type="success" plain size="default"
                         @click="onClickTimeExpression()"
                         style="margin-left: 10px;">
                执行时间
              </el-button>
            </el-col>
          </el-row>
          <el-row v-show="state.rowState.fixedDelay">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.timeExpressionTypeList.secondDelayTitle')" prop="fixedDelay">
                <el-input v-model="state.ruleForm.fixedDelay"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="state.rowState.fixedRate">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.timeExpressionTypeList.fixedRateTitle')" prop="fixedRate">
                <el-input v-model="state.ruleForm.fixedRate"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="state.rowState.executeTime">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.timeExpressionTypeList.oneTimeTitle')" prop="executeTime">
                <el-date-picker
                  v-model="state.ruleForm.executeTime"
                  type="datetime"
                  :placeholder="t('message.commonMsg.emptySelect')"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.status')" prop="status">
                <el-switch
                  v-model="state.ruleForm.status"
                  class="ml-2"
                  name="status"
                  size="default"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.executeType')" prop="">
                <el-select v-model="state.ruleForm.executeType" class="m-2"
                           :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
                  <el-option
                    v-for="ns in state.executeType"
                    :key="ns.value"
                    :label="ns.label"
                    :value="ns.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.executeStrategy')" prop="executeStrategy">
                <el-select v-model="state.ruleForm.executeStrategy" class="m-2"
                           :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
                  <el-option
                    v-for="ns in state.executeStrategy"
                    :key="ns.value"
                    :label="ns.label"
                    :value="ns.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.failRetryTimes')" prop="failRetryTimes">
                <el-input-number v-model="state.ruleForm.failRetryTimes" :min="1" :max="6"
                                 :step="state.ruleForm.timesStep" style="width: 100%"/>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.failRetryInterval')"
                            prop="failRetryInterval">
                <el-input-number v-model="state.ruleForm.failRetryInterval"
                                 :step="state.ruleForm.intervalStep" :min="1"
                                 style="width: 100%"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.job.job.concurrency')" prop="concurrency">
                <el-input-number v-model="state.ruleForm.concurrency" :min="1" :max="128"
                                 style="width: 100%"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto;text-align: left;padding-left: 30px;padding-bottom: 10px;">
        <el-button type="primary" @click="confirmClick(jobFormRef)">{{t('message.commonBtn.confirm')}}</el-button>
        <el-button @click="cancelClick">{{t('message.commonBtn.cancel')}}</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="jobDrawerName">
import {defineAsyncComponent, onMounted, reactive, ref} from 'vue';
import {ElMessage, ElMessageBox, FormInstance} from 'element-plus'
import {useI18n} from "vue-i18n";
import {useNamespaceApi} from "/@/api/namespace";
import {getHeaderNamespaceId} from "/@/utils/header";
import {useJobApi} from "/@/api/job";
import {formatDateByTimestamp, getTimestampByString} from "/@/utils/formatTime";
import {getAppSelectList} from "/@/utils/data";

const MonacoEditor = defineAsyncComponent(() => import('/@/components/editor/monaco.vue'));


const {t} = useI18n();

// 定义接口
const nsApi = useNamespaceApi();
const jobApi = useJobApi();

// 定义变量内容
const jobFormRef = ref();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const state = reactive({
  dialogTitle: '',
  rowState:{
    inputProcessor: true,
    shellProcessor: false,
    timeExpression: true,
    executeTime: false,
    fixedDelay: false,
    fixedRate: false,
  },
  syncEditor: false,
  shellEditor: {
    editorStyle: 'width: 95%;height: 220px;',
    language: 'shell',
  },
  paramsEditor: {
    editorStyle: 'width: 95%;height: 220px;',
  },
  paramsExtEditor: {
    editorStyle: 'width: 95%;height: 150px;',
  },
  drawer: {
    type: '',
    isShow: false
  },
  fromRules: {
    name: {
      required: true,
      message: t('message.job.job.name'),
      trigger: 'blur'
    },
    processorInfo: {
      required: true,
      message: t('message.job.job.processorInfo'),
      trigger: 'blur'
    },
    shellProcessorInfo: {
      required: true,
      message: t('message.job.job.processorInfo'),
      trigger: 'blur'
    },
    timeExpression: {
      required: true,
      message: t('message.job.job.timeExpression'),
      trigger: 'blur'
    },
    fixedDelay: {
      required: true,
      message: t('message.job.job.validateName.fixed'),
      pattern: /^[0-9]*$/,
      trigger: 'blur'
    },
    fixedRate: {
      required: true,
      message: t('message.job.job.validateName.fixed'),
      pattern: /^[0-9]*$/,
      trigger: 'blur'
    },
    executeTime: {
      required: true,
      message: t('message.job.job.timeExpressionTypeList.oneTimeTitle'),
      trigger: 'blur'
    },
  },
  contentType: [
    {
      value: 'plaintext',
      label: 'plaintext',
    },
    {
      value: 'json',
      label: 'json',
    },
    {
      value: 'yaml',
      label: 'yaml',
    },
    {
      value: 'properties',
      label: 'properties',
    },
  ],
  processorType: [
    {
      value: 'processor',
      label: 'processor',
    },
    {
      value: 'shell',
      label: 'shell',
    },
    {
      value: 'http',
      label: 'http',
    }
  ],
  executeType: [
    {
      value: 'standalone',
      label: t('message.job.job.executeTypeList.standalone'),
    },
    {
      value: 'broadcast',
      label: t('message.job.job.executeTypeList.broadcast'),
    },
    {
      value: 'mapReduce',
      label: t('message.job.job.executeTypeList.mapReduce'),
    },
    {
      value: 'sharding',
      label: t('message.job.job.executeTypeList.sharding'),
    }
  ],
  executeStrategy: [
    {
      value: 1,
      label: t('message.job.job.executeStrategyList.discard'),
    },
    {
      value: 2,
      label: t('message.job.job.executeStrategyList.overlay'),
    }
    ,
    {
      value: 3,
      label: t('message.job.job.executeStrategyList.concurrency'),
    }
  ],
  timeExpressionType: [
    {
      value: 'cron',
      label: t('message.job.job.timeExpressionTypeList.cron'),
    },
    {
      value: 'secondDelay',
      label: t('message.job.job.timeExpressionTypeList.secondDelay'),
    },
    {
      value: 'fixedRate',
      label: t('message.job.job.timeExpressionTypeList.fixedRate'),
    },
    {
      value: 'oneTime',
      label: t('message.job.job.timeExpressionTypeList.oneTime'),
    }
  ],
  namespaceList: <any>[],
  appList: <any>[],
  ruleForm: {
    timesStep: 1,
    intervalStep: 1000,
    description: '',
    paramsType: 'plaintext',
    params: '',
    extendParamsType: 'plaintext',
    extendParams: '',
    timeExpressionType: 'cron',
    timeExpression: '',
    executeTime: '',
    fixedDelay: '',
    fixedRate: '',
    Time: 0 ,
    executeType: 'standalone',
    processorType: 'processor',
    processorInfo: '',
    shellProcessorInfo: '',
    namespaceId: 0,
    appId: 1,
    id: 0,
    name: '',
    status: true,
    failRetryTimes: 1,
    failRetryInterval: 2000,
    concurrency: 1,
    executeStrategy: 1,
  },
})

onMounted(async () => {
  await initNamespaceList();
});

const initNamespaceList = async () => {
  // 初始化命名空间
  let data = await nsApi.getList({
    page: 1,
    size: 128,
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

const openDrawer = async (type: string, selectAppId: number, row: RowJobType) => {
  // Init app list.
  await initAppList();

  state.drawer.type = type;
  state.drawer.isShow = true;

  if (type === 'add') {
    state.dialogTitle = t('message.job.job.addJobTitle')

    state.syncEditor = true;
    await resetJobContent(selectAppId);
    state.syncEditor = false;
    return;
  }

  state.dialogTitle = t('message.job.job.updateJobTitle')

  // Init content.
  state.syncEditor = true;
  await initJobContent(row);
  state.syncEditor = false;
}

const resetJobContent = async (selectAppId: number) => {
  if (selectAppId == 0) {
    selectAppId = state.appList[0]['id'];
  }

  onChangeTimeType('cron');
  onChangeProcessorType('processor');

  state.ruleForm.namespaceId = getHeaderNamespaceId();
  state.ruleForm.appId = selectAppId;
  state.ruleForm.name = '';
  state.ruleForm.description = '';
  state.ruleForm.processorType = 'processor';
  state.ruleForm.processorInfo = '';
  state.ruleForm.shellProcessorInfo = '';
  state.ruleForm.params = '';
  state.ruleForm.paramsType = 'plaintext';
  state.ruleForm.extendParamsType = 'plaintext';
  state.ruleForm.extendParams = '';
  state.ruleForm.timeExpressionType = 'cron';
  state.ruleForm.timeExpression = '';
  state.ruleForm.executeTime = '';
  state.ruleForm.fixedDelay = '';
  state.ruleForm.fixedRate = '';
  state.ruleForm.status = true;
  state.ruleForm.executeType = 'standalone';
  state.ruleForm.executeStrategy = 1;
  state.ruleForm.failRetryTimes = 1;
  state.ruleForm.failRetryInterval = 3000;
  state.ruleForm.concurrency = 1;
};

const initJobContent = async (row: RowJobType) => {
  jobFormRef.value?.clearValidate();
  state.ruleForm.id = row.id;
  state.ruleForm.namespaceId = row.namespaceId;
  state.ruleForm.appId = row.appId;
  state.ruleForm.name = row.name;
  state.ruleForm.description = row.description;
  state.ruleForm.processorType = row.processorType;
  state.ruleForm.processorInfo = row.processorInfo;
  state.ruleForm.params = row.params;
  state.ruleForm.paramsType = row.paramsType;
  state.ruleForm.extendParamsType = row.extendParamsType;
  state.ruleForm.extendParams = row.extendParams;
  state.ruleForm.timeExpressionType = row.timeExpressionType;
  state.ruleForm.timeExpression = row.timeExpression;
  state.ruleForm.status = row.status;
  state.ruleForm.executeType = row.executeType;
  state.ruleForm.executeStrategy = row.executeStrategy;
  state.ruleForm.failRetryTimes = row.failRetryTimes;
  state.ruleForm.failRetryInterval = row.failRetryInterval;
  state.ruleForm.concurrency = row.concurrency;

  onChangeTimeType(row.timeExpressionType);

  onChangeProcessorType(row.processorType);

  if (row.processorType == 'shell') {
    state.ruleForm.shellProcessorInfo = row.processorInfo;
    state.ruleForm.processorInfo = '';
  } else {
    state.ruleForm.processorInfo = row.processorInfo;
    state.ruleForm.shellProcessorInfo = '';
  }


  if (row.timeExpressionType == 'secondDelay') {
    state.ruleForm.fixedDelay = row.timeExpressionValue.toString();
    state.ruleForm.fixedRate = '';
    state.ruleForm.timeExpression = '';
    state.ruleForm.executeTime = '';
  } else if (row.timeExpressionType == 'fixedRate') {
    state.ruleForm.fixedRate = row.timeExpressionValue.toString();
    state.ruleForm.fixedDelay = '';
    state.ruleForm.timeExpression = '';
    state.ruleForm.executeTime = '';
  } else if (row.timeExpressionType == 'oneTime') {
    state.ruleForm.executeTime = formatDateByTimestamp(row.timeExpressionValue);
    state.ruleForm.fixedRate = '';
    state.ruleForm.timeExpression = '';
    state.ruleForm.fixedDelay = '';
  } else {
    state.ruleForm.fixedRate = '';
    state.ruleForm.fixedRate = '';
    state.ruleForm.executeTime = '';
  }
};

const initAppList = async () => {
  state.appList = await getAppSelectList();
}

const cancelClick = () => {
  state.drawer.isShow = false
}
const confirmClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  let validFields = ['name'];

  if (state.ruleForm.processorType == 'shell') {
    validFields.push('shellProcessorInfo');
  } else {
    validFields.push('processorInfo');
  }

  if (state.ruleForm.timeExpressionType == 'secondDelay') {
    validFields.push('fixedDelay');
  } else if (state.ruleForm.timeExpressionType == 'fixedRate') {
    validFields.push('fixedRate');
  } else if (state.ruleForm.timeExpressionType == 'oneTime') {
    validFields.push('executeTime');
  } else {
    validFields.push('timeExpression');
  }

  await formEl.validateField(validFields,(valid: boolean) => {
    if (valid) {
     onSubmitRequest();
    } else {
      return false;
    }
  });
}

const onSubmitRequest = async ()=>{
  let timeExpressionValue;

  if (state.ruleForm.timeExpressionType == 'secondDelay') {
    timeExpressionValue = state.ruleForm.fixedDelay;
  } else if (state.ruleForm.timeExpressionType == 'fixedRate') {
    timeExpressionValue = state.ruleForm.fixedRate;
  } else if (state.ruleForm.timeExpressionType == 'oneTime') {
    timeExpressionValue = getTimestampByString(state.ruleForm.executeTime);
  }

  if (state.ruleForm.processorType == 'shell') {
    state.ruleForm.processorInfo = state.ruleForm.shellProcessorInfo;
  }

  let request = {
    id: state.ruleForm.id,
    namespaceId: state.ruleForm.namespaceId,
    appId: state.ruleForm.appId,
    name: state.ruleForm.name,
    description: state.ruleForm.description,
    processorType: state.ruleForm.processorType,
    processorInfo: state.ruleForm.processorInfo,
    executeType: state.ruleForm.executeType,
    paramsType: state.ruleForm.paramsType,
    params: state.ruleForm.params,
    extendParamsType: state.ruleForm.extendParamsType,
    extendParams: state.ruleForm.extendParams,
    timeExpressionType: state.ruleForm.timeExpressionType,
    timeExpression: state.ruleForm.timeExpression,
    timeExpressionValue: timeExpressionValue,
    executeStrategy: state.ruleForm.executeStrategy,
    failRetryTimes: state.ruleForm.failRetryTimes,
    failRetryInterval: state.ruleForm.failRetryInterval,
    concurrency: state.ruleForm.concurrency,
    status: (state.ruleForm.status ? 1 : 2)
  };

  if (state.drawer.type === 'add' || state.drawer.type === 'copy') {
    await jobApi.add(request);
    ElMessage.success('新增成功');
    state.drawer.isShow = false;
    emit('refresh');
    return;
  }

  await jobApi.update(request);
  ElMessage.success('更新成功');
  state.drawer.isShow = false;
  emit('refresh');
}

const onChangeProcessorType = (type :string)=>{
  if (type == 'shell'){
    state.rowState.inputProcessor = false;
    state.rowState.shellProcessor = true;
    return
  }

  state.rowState.inputProcessor = true;
  state.rowState.shellProcessor = false;
}

const onChangeTimeType = (type :string)=>{
  if (type == 'cron'){
    state.rowState.timeExpression = true;
    state.rowState.fixedDelay = false;
    state.rowState.fixedRate = false;
    state.rowState.executeTime = false;
    return
  }

  if (type == 'secondDelay'){
    state.rowState.timeExpression = false;
    state.rowState.fixedDelay = true;
    state.rowState.fixedRate = false;
    state.rowState.executeTime = false;
    return
  }

  if (type == 'fixedRate'){
    state.rowState.timeExpression = false;
    state.rowState.fixedDelay = false;
    state.rowState.fixedRate = true;
    state.rowState.executeTime = false;
    return
  }

  if (type == 'oneTime'){
    state.rowState.timeExpression = false;
    state.rowState.fixedDelay = false;
    state.rowState.fixedRate = false;
    state.rowState.executeTime = true;
    return
  }
}

const onClickTimeExpression = async () => {
  let data = await jobApi.timeExpression({
    timeExpression: state.ruleForm.timeExpression
  });

  if (data.valid  === 2){
    await ElMessageBox.alert(t('message.job.job.timeExpressionValidMsg'), t('message.commonMsg.tip'), {
      type: 'error',
    })
    return;
  }

  let message = '';
  data.list.forEach(function (time: number) {
    message += formatDateByTimestamp(time) + '<br>';
  });

  await ElMessageBox.alert(`<div style="text-align: center">${message}</div>`, t('message.job.job.timeExpressionTitle'), {
    dangerouslyUseHTMLString: true,
  })
}

const onChangePramsType = (type :string)=>{
  state.ruleForm.paramsType = type;
}

const onChangeExtPramsType = (type :string)=>{
  state.ruleForm.extendParamsType = type;
}

const onShellUpdateContent = (value :string)=>{
  state.ruleForm.shellProcessorInfo = value;
}

const onParamsUpdateContent = (value :string)=>{
  state.ruleForm.params = value;
}

const onExtParamsUpdateContent = (value :string)=>{
  state.ruleForm.extendParams = value;
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
