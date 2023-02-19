<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>新增定时任务</span>
            <el-button type="primary">返回</el-button>
          </div>
        </template>
        <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="90px" :rules="state.fromRules" size="default">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="任务名称" prop="name">
                <el-input clearable/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="任务描述" prop="description">
                <el-input type="textarea" rows="3"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="执行器类型" prop="processorType">
                <el-select v-model="state.ruleForm.processorType" class="m-2" :placeholder="t('message.commonMsg.emptySelect')">
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
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="执行器名称" prop="processorInfo">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="任务类型" prop="">
                <el-select v-model="state.ruleForm.timeExpressionType" class="m-2" :placeholder="t('message.commonMsg.emptySelect')">
                  <el-option
                    v-for="ns in state.timeExpressionType"
                    :key="ns.value"
                    :label="ns.label"
                    :value="ns.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="时间表达式" prop="timeExpression">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="任务状态" prop="status">
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
              <el-form-item label="执行方式" prop="">
                <el-select v-model="state.ruleForm.executeType" class="m-2" :placeholder="t('message.commonMsg.emptySelect')">
                  <el-option
                    v-for="ns in state.executeType"
                    :key="ns.value"
                    :label="ns.label"
                    :value="ns.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="执行策略" prop="executeStrategy">
                <el-select v-model="state.ruleForm.executeStrategy" class="m-2" :placeholder="t('message.commonMsg.emptySelect')">
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
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="重试次数" prop="failRetryTimes">
                <el-input-number v-model="state.ruleForm.failRetryTimes" :min="1" :max="6"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="重试间隔" prop="failRetryInterval">
                <el-input-number v-model="state.ruleForm.failRetryInterval" :min="1" step="1000"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="执行并发" prop="concurrency">
                <el-input-number v-model="state.ruleForm.concurrency" :min="1" :max="128" step="1"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
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
  fromRules: {
  },
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
  executeType:[
    {
      value: 'standalone',
      label: '单机',
    },
    {
      value: 'broadcast',
      label: '广播',
    }
  ],
  executeStrategy:[
    {
      value: 1,
      label: '丢弃',
    },
    {
      value: 2,
      label: '覆盖',
    }
  ],
  timeExpressionType:[
    {
      value: 'cron',
      label: '定时任务',
    },
    {
      value: 'second',
      label: '秒级任务',
    },
  ],
  namespaceList:<any>[],
  ruleForm: {
    timeExpressionType: 'cron',
    executeType: 'standalone',
    processorType: 'java',
    namespaceId: 0,
    id: 0,
    name: '',
    status: true,
    desc: '',
    failRetryTimes: 1,
    failRetryInterval: 3000,
    concurrency: 1,
    executeStrategy: 1,
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
const openDialog = async (type: string, row: RowAppType) => {
  // Clear
  appDialogFormRef.value?.clearValidate();

  // 初始化命名空间
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

  if (type === 'update') {
    // state.ruleForm=row 这种方式会导致，弹窗状态切换，列表里面数据状态也切换了
    state.ruleForm.name = row.name;
    state.ruleForm.desc = row.desc;
    state.ruleForm.status = row.status;
    state.ruleForm.id = row.id;
    state.ruleForm.namespaceId = row.namespaceId
    state.dialog.title = t("message.app.editTitle");
    state.dialog.submitTxt = t("message.commonBtn.update");
  } else {
    state.ruleForm.name = '';
    state.ruleForm.desc = '';
    state.ruleForm.status = true;
    state.ruleForm.namespaceId = Local.get("nid");
    state.dialog.title = t("message.app.addTitle");
    state.dialog.submitTxt = t("message.commonBtn.add");
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

const onSubmitApp = async ()=>{
  const statusValue = state.ruleForm.status ? 1 : 2;
  if (state.dialog.type === 'update') {
    await appApi.update({
      "id": state.ruleForm.id,
      "namespaceId": state.ruleForm.namespaceId,
      "desc": state.ruleForm.desc,
      "name": state.ruleForm.name,
      "status": statusValue
    });
  } else {
    await appApi.add({
      "namespaceId": state.ruleForm.namespaceId,
      "desc": state.ruleForm.desc,
      "name": state.ruleForm.name,
      "status": statusValue
    });
  }

  closeDialog();
  emit('refresh');
}

// 暴露变量
defineExpose({
  openDialog,
});
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
