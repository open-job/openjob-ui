<template>
  <div class="system-config-container">
    <el-card shadow="never" header="配置信息">
      <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="150px"
               :rules="state.fromRules" size="default">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.version')" prop="description">
              <el-input v-model="state.ruleForm.version" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.maxSlot')" prop="name">
              <el-input v-model="state.ruleForm.maxSlot" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.clusterVersion')" prop="name">
              <el-input v-model="state.ruleForm.clusterVersion" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.clusterDelayVersion')" prop="name">
              <el-input v-model="state.ruleForm.clusterDelayVersion" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.clusterSupervisorSlot')" prop="name">
              <el-input v-model="state.ruleForm.clusterSupervisorSlot" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.workerSupervisorSlot')" prop="name">
              <el-input v-model="state.ruleForm.workerSupervisorSlot" disabled clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.delayZsetSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayZsetSlot" clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.delayAddListSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayAddListSlot" clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.delayStatusListSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayStatusListSlot" clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="24" class="mb20">
            <el-form-item :label="t('message.server.system.delayDeleteListSlot')" prop="name">
              <el-input v-model="state.ruleForm.delayDeleteListSlot" clearable
                        style="width: 96%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary" @click="onSubmit(appDialogFormRef)" size="default"
                       style="margin-left:150px;">
              更新配置
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
  ruleForm: {
    version: '',
    maxSlot: '256',
    clusterVersion: '',
    clusterDelayVersion: '',
    clusterSupervisorSlot: '',
    workerSupervisorSlot: '',
    delayZsetSlot: '',
    delayAddListSlot: '',
    delayStatusListSlot: '',
    delayDeleteListSlot: '',
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

  ElMessageBox.confirm(`是否确定修复系统参数`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      await useServerApi().updateSystem({
        delayZsetSlot: state.ruleForm.delayZsetSlot,
        delayAddListSlot: state.ruleForm.delayAddListSlot,
        delayStatusListSlot: state.ruleForm.delayStatusListSlot,
        delayDeleteListSlot: state.ruleForm.delayDeleteListSlot,
      });

      ElMessage.success('更新成功');
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
  state.ruleForm.clusterSupervisorSlot = data['clusterSupervisorSlot'];
  state.ruleForm.workerSupervisorSlot = data['workerSupervisorSlot'];
  state.ruleForm.delayZsetSlot = data['delayZsetSlot'];
  state.ruleForm.delayAddListSlot = data['delayAddListSlot'];
  state.ruleForm.delayStatusListSlot = data['delayStatusListSlot'];
  state.ruleForm.delayDeleteListSlot = data['delayDeleteListSlot'];
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
