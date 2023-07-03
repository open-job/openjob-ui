<template>
  <div class="system-role-dialog-container">
    <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="800">
      <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="110px"
               :rules="state.fromRules" size="default">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.name')" prop="name">
              <el-input v-model="state.ruleForm.name" clearable disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.job.job.application')" prop="appId">
              <el-select v-model="state.ruleForm.appId" class="m-2" filterable
                         :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%"
                         disabled>
                <el-option
                  v-for="app in state.appList"
                  :key="app.id"
                  :label="app.label"
                  :value="app.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.job.job.processorType')" prop="processorType">
              <el-select v-model="state.ruleForm.processorType" class="m-2"
                         :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%" disabled>
                <el-option
                  v-for="ns in state.processorType"
                  :key="ns.value"
                  :label="ns.label"
                  :value="ns.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="state.rowState.inputProcessor">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.processorInfo')" prop="processorInfo">
              <el-input v-model="state.ruleForm.processorInfo" disabled/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-show="state.rowState.kettleProcessor">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.kettleCommand')" prop="kettleProcessorInfo">
              <el-input v-model="state.ruleForm.kettleProcessorInfo" disabled/>
            </el-form-item>
            <el-radio-group v-model="state.ruleForm.kettleProcessorType" style="margin-left: 110px;">
              <el-radio v-for="t in state.shellType" :key="t.value" :label="t.label" disabled>{{t.value}}</el-radio>
            </el-radio-group>
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
                :readOnly="true"
                @updateContent="onShellUpdateContent"
              />
            </el-form-item>
            <el-radio-group v-model="state.ruleForm.shellProcessorType" style="margin-left: 110px;">
              <el-radio v-for="t in state.shellType" :key="t.value" :label="t.label" disabled>{{t.value}}</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>

        <el-row v-show="state.rowState.paramsProcessor">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.paramsType')" prop="paramsType">
              <el-radio-group v-model="state.ruleForm.paramsType">
                <el-radio v-for="t in state.contentType" :key="t.value" :label="t.label"
                          @click="onChangePramsType(t.value)">{{t.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="state.rowState.paramsProcessor">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.params')" prop="params">
              <MonacoEditor
                ref="JobExecuteParamsMonacoEditor"
                :editorStyle="state.paramsEditor.editorStyle"
                :language="state.ruleForm.paramsType"
                :value="state.ruleForm.params"
                :syncValue="state.syncEditor"
                @updateContent="onParamsUpdateContent"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="state.rowState.paramsProcessor">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.extendParamsType')" prop="extendParamsType">
              <el-radio-group v-model="state.ruleForm.extendParamsType">
                <el-radio v-for="t in state.contentType" :key="t.value" :label="t.label"
                          @click="onChangeExtPramsType(t.value)">{{t.value}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="state.rowState.paramsProcessor">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.extendParams')" prop="extendParams">
              <MonacoEditor
                ref="JobExecuteExtParamsMonacoEditor"
                :editorStyle="state.paramsExtEditor.editorStyle"
                :language="state.ruleForm.extendParamsType"
                :value="state.ruleForm.extendParams"
                :syncValue="state.syncEditor"
                @updateContent="onExtParamsUpdateContent"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">{{t('message.commonBtn.cancel')}}</el-button>
					<el-button type="primary" @click="onSubmit(appDialogFormRef)" size="default">
            {{t('message.commonBtn.confirm')}}
          </el-button>
				</span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemRoleDialog">
import {defineAsyncComponent, reactive, ref} from 'vue';
import {useI18n} from "vue-i18n";
import {useAppApi} from "/@/api/app";
import {FormInstance} from "element-plus";
import {getAppSelectList} from "/@/utils/data";
import {useJobApi} from "/@/api/job";

const MonacoEditor = defineAsyncComponent(() => import('/@/components/editor/monaco.vue'));


const {t} = useI18n();

// 定义接口
const jobApi = useJobApi();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const appDialogFormRef = ref<FormInstance>();
const state = reactive({
  rowState:{
    inputProcessor: true,
    kettleProcessor: false,
    httpProcessor: false,
    shellProcessor: false,
    shardingParams: false,
    paramsProcessor: false,
  },
  syncEditor: false,
  shellEditor: {
    editorStyle: 'width: 95%;height: 260px;',
    language: 'shell',
  },
  paramsEditor: {
    editorStyle: 'width: 95%;height: 260px;',
  },
  paramsExtEditor: {
    editorStyle: 'width: 95%;height: 120px;',
  },
  shellType: [
    {
      value: 'unix',
      label: 'unix',
    },
    {
      value: 'windows',
      label: 'windows',
    }
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
      value: 'kettle',
      label: 'kettle',
    },
    {
      value: 'http',
      label: 'http',
    }
  ],
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
  fromRules: {
  },
  appList: <any>[],
  ruleForm: {
    id: 0,
    appId: 0,
    processorType: 'java',
    processorInfo: '',
    shellProcessorInfo: '',
    shellProcessorType: 'unix',
    kettleProcessorInfo: '',
    kettleProcessorType: 'unix',
    paramsType: 'text',
    params: '',
    extendParamsType:'text',
    extendParams: '',
    id: 0,
    name: '',
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
  },
});

// 打开弹窗
const openDialog = async (row: RowJobType) => {
  // Clear
  appDialogFormRef.value?.clearValidate();

  // Init application
  await initAppList(row);

  // Reset
  state.syncEditor = true;
  await initJob(row);
  state.syncEditor = false;

  if (row.processorType == 'shell'){
    state.paramsEditor.editorStyle = 'width: 95%;height: 60px;';
    state.paramsExtEditor.editorStyle = 'width: 95%;height: 60px;';
  }else {
    state.paramsEditor.editorStyle = 'width: 95%;height: 260px;';
    state.paramsExtEditor.editorStyle = 'width: 95%;height: 120px;';
  }

  state.dialog.title = t("message.job.job.executeJobTitle");
  state.dialog.isShowDialog = true;
};

const initAppList = async (row: RowJobType) => {
  state.appList = await getAppSelectList();

  state.ruleForm.appId = row.appId;
}

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
  await jobApi.execute({
    id: state.ruleForm.id,
    params: state.ruleForm.params,
    extendParams: state.ruleForm.extendParams
  });

  closeDialog();
  emit('refresh');
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

const initJob = async (row :RowJobType) => {
  state.ruleForm.id = row.id;
  state.ruleForm.appId = row.appId;
  state.ruleForm.name = row.name;
  state.ruleForm.processorType = row.processorType;
  state.ruleForm.processorInfo = row.processorInfo;
  const  type = row.processorType
  if (type == 'shell') {
    state.rowState.inputProcessor = false;
    state.rowState.shellProcessor = true;
    state.rowState.kettleProcessor = false;
    state.rowState.paramsProcessor = false;
    state.rowState.httpProcessor = false;

    state.ruleForm.shellProcessorInfo = row.shellProcessorInfo
    state.ruleForm.shellProcessorType = row.shellProcessorType
  } else if (type == 'kettle') {
    state.rowState.inputProcessor = false;
    state.rowState.shellProcessor = false;
    state.rowState.kettleProcessor = true;
    state.rowState.paramsProcessor = false;
    state.rowState.httpProcessor = false;

    state.ruleForm.kettleProcessorType = row.kettleProcessorType
    state.ruleForm.kettleProcessorInfo = row.kettleProcessorInfo
  } else if (type == 'http') {
    state.rowState.inputProcessor = false;
    state.rowState.shellProcessor = false;
    state.rowState.kettleProcessor = false;
    state.rowState.paramsProcessor = false;
    state.rowState.httpProcessor = true;
  } else {
    state.rowState.inputProcessor = true;
    state.rowState.shellProcessor = false;
    state.rowState.kettleProcessor = false;
    state.rowState.paramsProcessor = true;
    state.rowState.httpProcessor = false;

    state.ruleForm.paramsType = row.paramsType;
    state.ruleForm.params = row.params;
    state.ruleForm.extendParamsType = row.extendParamsType;
    state.ruleForm.extendParams = row.extendParams;
  }
}

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
