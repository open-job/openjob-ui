<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="60%">
    <template #header>
      <h4>{{ state.dialogTitle }}</h4>
    </template>
    <template #default>
      <div class="system-role-dialog-container" style="padding: 20px;">
        <el-form ref="jobFormRef" :model="state.ruleForm" label-width="120px" label-position="left"
                 :rules="state.fromRules" size="default">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.alert.name')" prop="name">
                <el-input v-model="state.ruleForm.name" clearable/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item :label="t('message.alert.nsAndApp')" prop="nsAndApp">
                <el-tabs v-model="state.activeTab" type="border-card" tab-position="top"
                         @tab-change="switchTabNamespace" class="demo-tabs"
                         style="width: 100%;height: 300px;">
                  <el-tab-pane v-for="ns in state.namespaceList" :key="ns.id"
                               :label="ns.name" :name="ns.id"
                               style="width: 100%;height: 300px;overflow: auto;">
                    <el-checkbox-group v-model="state.ruleForm.selectApps">
                      <el-checkbox v-for="app of state.selectNsAppList"
                                   :key="app.id" :label="app.id"
                                   style="width: 200px">
                        {{ app.label }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" class="mb20">
              <el-form-item :label="t('message.alert.events')" prop="status">
                <el-tree-select
                  v-model="state.ruleForm.events"
                  :data="state.events"
                  multiple
                  :render-after-expand="false"
                  show-checkbox
                  filterable
                  :default-expanded-keys="['cron', 'delay']"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.alert.status')" prop="status">
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
              <el-form-item :label="t('message.alert.method')" prop="processorType">
                <el-select v-model="state.ruleForm.method" class="m-2"
                           :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
                  <el-option
                    v-for="ns in state.methodTypes"
                    :key="ns.value"
                    :label="ns.label"
                    :value="ns.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18" class="mb20">
              <el-form-item :label="t('message.alert.url')" prop="url">
                <el-input v-model="state.ruleForm.url" clearable/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto;text-align: left;padding-left: 30px;padding-bottom: 10px;">
        <el-button type="primary" @click="confirmClick(jobFormRef)" size="default">
          {{ t('message.commonBtn.confirm') }}
        </el-button>
        <el-button @click="cancelClick" size="default">{{ t('message.commonBtn.cancel') }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="jobDrawerName">
import {onMounted, reactive, ref} from 'vue';
import {ElMessage, ElMessageBox, FormInstance} from 'element-plus'
import {useI18n} from "vue-i18n";
import {useNamespaceApi} from "/@/api/namespace";
import {useAppApi} from "/@/api/app";
import {useAlertRuleApi} from "/@/api/alert";
import {getHeaderNamespaceId} from "/@/utils/header";


const {t} = useI18n();

// 定义接口
const nsApi = useNamespaceApi();
const alertRuleApi = useAlertRuleApi();

// 定义变量内容
const jobFormRef = ref();

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const state = reactive({
  isUpdate: false,
  dialogTitle: '',
  rowState: {
    inputProcessor: true,
  },
  activeTab: 1,
  drawer: {
    type: '',
    isShow: false
  },
  events: [
    {
      value: 'job',
      label: '定时任务',
      children: [
        {
          value: 'job_001',
          label: '定时任务-执行失败',
        },
        {
          value: 'job_002',
          label: '定时任务-任务丢弃',
        },
        {
          value: 'job_003',
          label: '定时任务-执行超时',
        },
      ],
    },
    {
      value: 'delay',
      label: '延时任务',
      children: [
        {
          value: 'delay_001',
          label: '延时任务-执行失败',
        },
        {
          value: 'delay_002',
          label: '延时任务-执行超时',
        },
        {
          value: 'delay_003',
          label: '延时任务-任务丢弃',
        },
      ],
    },
  ],
  methodTypes: [
    {
      value: 'webhook',
      label: 'webhook',
    },
    {
      value: 'feishu',
      label: '飞书',
    },
    {
      value: 'dingding',
      label: '钉钉',
    },
    {
      value: 'wecom',
      label: '企微',
    }
  ],
  fromRules: {
    name: {
      required: true,
      message: t('message.alert.name'),
      trigger: 'blur'
    },
    url: {
      required: true,
      message: t('message.alert.url'),
      trigger: 'blur'
    },
    nsAndApp: {
      required: true,
      message: t('message.alert.url'),
      trigger: 'blur'
    }
  },
  namespaceList: <any>[],
  selectNsAppList: <any>[],
  ruleForm: {
    id: 0,
    name: "",
    method: "webhook",
    url: "",
    events: [],
    selectApps: [],
    status: true,
  },
})

onMounted(async () => {
  await initNamespaceList();
});

const switchTabNamespace = async (id: number) => {
  let data = await useAppApi().getList({
    namespaceId: id,
    page: 1,
    size: 1024,
  });

  // 重置
  state.selectNsAppList = [];
  let list: Object[] = [];
  data.list.forEach(function (item: Object) {
    // 列表数据
    list.push({
      id: item['id'],
      label: item['name']
    })
  });
  state.selectNsAppList = list;
}

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

const openDrawer = async (type: string, row: RowAlertRuleType) => {
  state.activeTab = 1;
  state.drawer.type = type;
  state.drawer.isShow = true;
  await switchTabNamespace(state.activeTab)

  if (type === 'add') {
    state.isUpdate = false;
    await resetJobContent();
    state.dialogTitle = t('message.job.job.addJobTitle')
    return;
  }

  state.isUpdate = true
  if (type == 'update') {
    state.dialogTitle = t('message.job.job.updateJobTitle')
  } else {
    state.dialogTitle = t('message.job.job.copyJobTitle')
  }

  // Init content.
  await initJobContent(row);
}

const resetJobContent = async () => {
  jobFormRef.value?.clearValidate();
  state.ruleForm.name = '';
  state.ruleForm.selectApps = []
  state.ruleForm.events = []
  state.ruleForm.method = "webhook";
  state.ruleForm.url = '';
  state.ruleForm.status = true;
};

const initJobContent = async (row: RowAlertRuleType) => {
  jobFormRef.value?.clearValidate();
  state.ruleForm.id = row.id;
  state.ruleForm.name = row.name;
  state.ruleForm.selectApps = row.namespaceAppIds
  state.ruleForm.events = row.events
  state.ruleForm.method = row.method;
  state.ruleForm.url = row.url;
  state.ruleForm.status = row.status;
};

const cancelClick = () => {
  state.drawer.isShow = false
}
const confirmClick = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  let validFields = ['name'];

  await formEl.validateField(validFields, (valid: boolean) => {
    if (valid) {
      onSubmitRequest();
    } else {
      return false;
    }
  });
}

const onSubmitRequest = async () => {
  let request = {
    name: state.ruleForm.name,
    namespaceAppIds: state.ruleForm.selectApps,
    events: state.ruleForm.events,
    metrics: [],
    method: state.ruleForm.method,
    url: state.ruleForm.url,
    status: (state.ruleForm.status ? 1 : 2),
  };

  if (state.drawer.type === 'add') {
    await alertRuleApi.add(request);
    ElMessage.success('新增成功');
    state.drawer.isShow = false;
    emit('refresh');
    return;
  }

  request['id'] = state.ruleForm.id;
  await alertRuleApi.update(request);
  ElMessage.success('更新成功');
  state.drawer.isShow = false;
  emit('refresh');
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>

<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
