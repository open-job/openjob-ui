<template>
  <el-drawer v-model="state.drawer.isShow" direction="rtl" size="40%">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div class="system-role-dialog-container">
        <el-card shadow="hover">
          <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="90px" :rules="state.fromRules" size="default">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
                <el-form-item label="任务名称" prop="name">
                  <el-input clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                <el-form-item label="任务名称" prop="name">
                  <el-input clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                <el-form-item label="任务名称" prop="name">
                  <el-input clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                <el-form-item label="任务名称" prop="name">
                  <el-input clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
                <el-form-item label="任务名称" prop="name">
                  <el-input clearable/>
                </el-form-item>
              </el-col>
            </el-row>
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
import {reactive} from 'vue';
import { ElMessageBox } from 'element-plus'
import {useI18n} from "vue-i18n";

const {t} = useI18n();

const state = reactive({
  drawer:{
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
})

const openDrawer = async (type: string, row: RowJobType) => {
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
