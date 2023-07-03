<template>
  <div class="system-config-container">
    <el-card shadow="never" header="配置信息">
      <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="150px"
               :rules="state.fromRules" size="default">
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.version')" prop="description">
              <el-input v-model="state.ruleForm.version" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.maxSlot')" prop="name">
              <el-input v-model="state.ruleForm.maxSlot" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.workerSupervisorSlot')" prop="name">
              <el-input v-model="state.ruleForm.workerSupervisorSlot" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.clusterVersion')" prop="name">
              <el-input v-model="state.ruleForm.clusterVersion" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.clusterDelayVersion')" prop="name">
              <el-input v-model="state.ruleForm.clusterDelayVersion" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.delayZsetSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayZsetSlot" clearable disabled
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.server.system.delayAddListSlot')" prop="name">
                <el-input v-model="state.ruleForm.delayAddListSlot" clearable disabled
                          style="width: 96%;"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.delayStatusListSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayStatusListSlot" clearable disabled
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.delayDeleteListSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayDeleteListSlot" clearable disabled
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.delayFailZsetSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayFailZsetSlot" clearable disabled
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.jobKeepDays')" prop="name">
              <el-select v-model="state.ruleForm.jobKeepDays" filterable class="m-2" style="width: 60%" placeholder="Select" size="default">
                <el-option
                  v-for="item in state.selectDays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.delayKeepDays')" prop="name">
              <el-select v-model="state.ruleForm.delayKeepDays" filterable class="m-2" style="width: 60%" placeholder="Select" size="default">
                <el-option
                  v-for="item in state.selectDays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.serverKeepDays')" prop="name">
              <el-select v-model="state.ruleForm.serverKeepDays" filterable class="m-2" style="width: 60%" placeholder="Select" size="default">
                <el-option
                  v-for="item in state.selectDays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.server.system.workerKeepDays')" prop="name">
              <el-select v-model="state.ruleForm.workerKeepDays" filterable class="m-2" style="width: 60%" placeholder="Select" size="default">
                <el-option
                  v-for="item in state.selectDays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary" @click="onSubmit(appDialogFormRef)" size="default"
                       style="margin-left:150px;">
              {{t('message.commonBtn.update')}}
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </el-card>
  </div>
</template>

<script setup lang="ts" name="systemRoleDialog">
import {onMounted, reactive, ref} from 'vue';
import {useI18n} from "vue-i18n";
import {useServerApi} from "/@/api/server";
import {ElMessage, ElMessageBox, FormInstance} from "element-plus";

const {t} = useI18n();

// 定义接口

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const appDialogFormRef = ref<FormInstance>();
const state = reactive({
  selectDays:[
    {
      value: 1,
      label: t('message.server.system.selectDays.oneDay')
    },
    {
      value: 7,
      label: t('message.server.system.selectDays.oneWeek')
    },
    {
      value: 30,
      label: t('message.server.system.selectDays.oneMonth')
    },
    {
      value: 90,
      label: t('message.server.system.selectDays.threeMonth')
    },
    {
      value: 180,
      label: t('message.server.system.selectDays.SixMonth')
    },
    {
      value: 365,
      label: t('message.server.system.selectDays.oneYear')
    },
    {
      value: 1095,
      label: t('message.server.system.selectDays.threeYear')
    },
  ],
  fromRules: {

  },
  ruleForm: {
    version: '',
    maxSlot: '256',
    clusterVersion: '',
    clusterDelayVersion: '',
    workerSupervisorSlot: '',
    delayZsetSlot: '',
    delayFailZsetSlot: '',
    delayAddListSlot: '',
    delayStatusListSlot: '',
    delayDeleteListSlot: '',
    jobKeepDays: '',
    delayKeepDays: '',
    serverKeepDays: '',
    workerKeepDays: '',
  },
});

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

  ElMessageBox.confirm(t('message.server.system.updateTitle'), t('message.commonMsg.tip'), {
    confirmButtonText: t('message.commonBtn.confirm'),
    cancelButtonText: t('message.commonBtn.cancel'),
    type: 'warning',
  })
    .then(async () => {
      await useServerApi().updateSystem({
        delayZsetSlot: state.ruleForm.delayZsetSlot,
        delayFailZsetSlot:state.ruleForm.delayFailZsetSlot,
        delayAddListSlot: state.ruleForm.delayAddListSlot,
        delayStatusListSlot: state.ruleForm.delayStatusListSlot,
        delayDeleteListSlot: state.ruleForm.delayDeleteListSlot,
        jobKeepDays:state.ruleForm.jobKeepDays,
        delayKeepDays:state.ruleForm.delayKeepDays,
        serverKeepDays:state.ruleForm.serverKeepDays,
        workerKeepDays:state.ruleForm.workerKeepDays,
        maxSlot: state.ruleForm.maxSlot,
      });

      ElMessage.success(t('message.commonMsg.updateSuccess'));
    })
    .catch(() => {
    });
}


const initSystem = async () => {
  let data = await useServerApi().getSystemInfo({});
  state.ruleForm.version = data['version'];
  state.ruleForm.maxSlot = data['maxSlot'];
  state.ruleForm.clusterVersion = data['clusterVersion'];
  state.ruleForm.clusterDelayVersion = data['clusterDelayVersion'];
  state.ruleForm.workerSupervisorSlot = data['workerSupervisorSlot'];
  state.ruleForm.delayZsetSlot = data['delayZsetSlot'];
  state.ruleForm.delayFailZsetSlot = data['delayFailZsetSlot'];
  state.ruleForm.delayAddListSlot = data['delayAddListSlot'];
  state.ruleForm.delayStatusListSlot = data['delayStatusListSlot'];
  state.ruleForm.delayDeleteListSlot = data['delayDeleteListSlot'];
  state.ruleForm.jobKeepDays = data['jobKeepDays'];
  state.ruleForm.delayKeepDays = data['delayKeepDays'];
  state.ruleForm.serverKeepDays = data['serverKeepDays'];
  state.ruleForm.workerKeepDays = data['workerKeepDays'];
}

onMounted(() => {
  initSystem();
});
</script>

<style scoped lang="scss">

.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
