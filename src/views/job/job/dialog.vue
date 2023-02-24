<template>
  <div class="system-role-dialog-container">
    <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="800">
      <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="100px"
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
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.processorInfo')" prop="processorInfo">
              <el-input v-model="state.ruleForm.processorInfo" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.paramsType')" prop="paramsType">
              <el-radio-group v-model="state.ruleForm.paramsType">
                <el-radio label="text">text</el-radio>
                <el-radio label="json">json</el-radio>
                <el-radio label="yaml">yaml</el-radio>
                <el-radio label="properties">properties</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.params')" prop="params">
              <el-input v-model="state.ruleForm.params" type="textarea" rows="3"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.extendParamsType')" prop="extendParamsType">
              <el-radio-group v-model="state.ruleForm.extendParamsType">
                <el-radio label="text">text</el-radio>
                <el-radio label="json">json</el-radio>
                <el-radio label="yaml">yaml</el-radio>
                <el-radio label="properties">properties</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.job.job.extendParams')" prop="extendParams">
              <el-input v-model="state.ruleForm.extendParams" type="textarea" rows="3"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit(appDialogFormRef)" size="default">
            {{ state.dialog.submitTxt }}
          </el-button>
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

const {t} = useI18n();

// 定义接口
const nsApi = useNamespaceApi();
const appApi = useAppApi();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const appDialogFormRef = ref<FormInstance>();
const state = reactive({
  processorType: [
    {
      value: 'java',
      label: 'java',
    },
    {
      value: 'shell',
      label: 'shell',
    }
  ],
  executeType: [
    {
      value: 'standalone',
      label: '单机',
    },
    {
      value: 'broadcast',
      label: '广播',
    }
  ],
  fromRules: {
  },
  appList: <any>[],
  ruleForm: {
    appId: 0,
    processorType: 'java',
    processorInfo: '',
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
    submitTxt: '',
  },
});

// 打开弹窗
const openDialog = async (row: RowJobType) => {
  // Clear
  appDialogFormRef.value?.clearValidate();

  // Init application
  await initAppList(row);

  state.ruleForm.appId = row.appId;
  state.ruleForm.name = row.name;
  state.ruleForm.processorType = row.processorType;
  state.ruleForm.processorInfo = row.processorInfo;
  state.ruleForm.paramsType = row.paramsType;
  state.ruleForm.params = row.params;
  state.ruleForm.extendParamsType = row.extendParamsType;
  state.ruleForm.extendParams = row.extendParams;
  state.dialog.title = t("message.app.addTitle");
  state.dialog.submitTxt = t("message.commonBtn.add");
  state.dialog.isShowDialog = true;
};

const initAppList = async (row: RowJobType) => {
  let data = await appApi.getList({
    namespaceId: Local.get("nid"),
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
  const statusValue = state.ruleForm.status ? 1 : 2;
  await appApi.add({
    "namespaceId": state.ruleForm.namespaceId,
    "desc": state.ruleForm.desc,
    "name": state.ruleForm.name,
    "status": statusValue
  });

  closeDialog();
  emit('refresh');
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
