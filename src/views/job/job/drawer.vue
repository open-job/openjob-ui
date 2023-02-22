<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="40%">
    <template #header>
      <h4>新增定时任务</h4>
    </template>
    <template #default>
      <div class="system-role-dialog-container">
        <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="100px" :rules="state.fromRules" size="default" style="margin-top: 22px">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.app.namespace')" prop="namespaceId">
                <el-select v-model="state.ruleForm.namespaceId" class="m-2" :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
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
              <el-form-item :label="t('message.app.name')" prop="appId">
                <el-select v-model="state.ruleForm.appId" class="m-2" filterable :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
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
              <el-form-item label="任务名称" prop="name">
                <el-input clearable/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
              <el-form-item label="任务描述" prop="description">
                <el-input type="textarea" rows="3"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="执行器类型" prop="processorType">
                <el-select v-model="state.ruleForm.processorType" class="m-2" :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
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
              <el-form-item label="执行器名称" prop="processorInfo">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="参数类型" prop="paramsType">
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
              <el-form-item label="任务参数" prop="params">
                <el-input type="textarea" rows="3"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="扩展参数类型" prop="extendParamsType">
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
              <el-form-item label="扩展参数" prop="extendParams">
                <el-input type="textarea" rows="3"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="任务类型" prop="">
                <el-select v-model="state.ruleForm.timeExpressionType" class="m-2" :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
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
                <el-select v-model="state.ruleForm.executeType" class="m-2" :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
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
              <el-form-item label="执行策略" prop="executeStrategy">
                <el-select v-model="state.ruleForm.executeStrategy" class="m-2" :placeholder="t('message.commonMsg.emptySelect')" style="width: 100%">
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
              <el-form-item label="重试次数" prop="failRetryTimes">
                <el-input-number v-model="state.ruleForm.failRetryTimes" :min="1" :max="6" style="width: 100%"/>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="重试间隔" prop="failRetryInterval">
                <el-input-number v-model="state.ruleForm.failRetryInterval" :min="1" step="1000" style="width: 100%"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item label="执行并发" prop="concurrency">
                <el-input-number v-model="state.ruleForm.concurrency" :min="1" :max="128" step="1" style="width: 100%"/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto;text-align: left">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="jobDrawerName">
import {onMounted, reactive} from 'vue';
import { ElMessageBox } from 'element-plus'
import {useI18n} from "vue-i18n";
import {useNamespaceApi} from "/@/api/namespace";
import {useAppApi} from "/@/api/app";
import {Local} from "/@/utils/storage";


const {t} = useI18n();

// 定义接口
const nsApi = useNamespaceApi();
const appApi = useAppApi();

const state = reactive({
  drawer:{
    type: '',
    isShow: false
  },
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
  appList:<any>[],
  ruleForm: {
    paramsType: 'text',
    params: '',
    extendParamsType: 'text',
    extendParams: '',
    timeExpressionType: 'cron',
    executeType: 'standalone',
    processorType: 'java',
    namespaceId: '',
    appId: 1,
    id: 0,
    name: '',
    status: true,
    desc: '',
    failRetryTimes: 1,
    failRetryInterval: 3000,
    concurrency: 1,
    executeStrategy: 1,
  },
})

onMounted(async ()=>{
  await initNamespaceList();
});

const initNamespaceList = async () => {
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
}

const openDrawer = async (type: string, row: RowJobType) => {
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

  state.drawer.type = type;
  state.drawer.isShow = true;
}

const cancelClick =()=> {
  state.drawer.isShow = false
}
const  confirmClick =()=>{
  ElMessageBox.confirm(`Are you confirm to chose  ?`)
    .then(() => {
      state.drawer.isShow = false
    })
    .catch(() => {
      // catch error
    })
}

// 暴露变量
defineExpose({
  openDrawer,
});
</script>
