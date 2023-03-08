<template>
  <div class="system-role-dialog-container">
    <el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
      <el-form ref="appDialogFormRef" :model="state.ruleForm" label-width="80px" :rules="state.fromRules" size="default">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item :label="t('message.app.namespace')" prop="namespaceName">
                <el-select v-model="state.ruleForm.namespaceId" class="m-2" :placeholder="t('message.commonMsg.emptySelect')">
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
            <el-form-item :label="t('message.app.name')" prop="name">
              <el-input v-model="state.ruleForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.app.desc')" prop="desc">
              <el-input v-model="state.ruleForm.desc" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item :label="t('message.app.status')" prop="status">
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
  fromRules: {
    name: {
      required: true,
      message: t('message.app.validateName'),
      pattern: /^[0-9a-zA-Z_.-]*$/,
      trigger: 'blur'
    },
    desc: {
      required: false,
      message: t('message.app.desc'),
      trigger: 'blur'
    },
  },
  namespaceList:<any>[],
  ruleForm: {
    namespaceId: 0,
    id: 0,
    name: '',
    status: true,
    desc: '',
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
.system-role-dialog-container {
  .menu-data-tree {
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    padding: 5px;
  }
}
</style>
