<template>
  <div class="table-demo-container layout-padding">
    <div class="table-demo-padding layout-padding-view layout-padding-auto">
      <el-dialog v-model="dialogState.dialogTableVisible" title="编辑命名空间" width="600px">
        <el-form ref="roleDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
          <el-row :gutter="35">
            <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="mb20">
              <el-form-item label="空间名称">
                <el-input v-model="formState.ruleForm.nsName" placeholder="请输入角色名称" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="35" v-if="dialogState.isUpdate">
            <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="mb20">
              <el-form-item label="空间标识">
                <el-input v-model="formState.ruleForm.nsUniqueId" placeholder="请输入角色名称" clearable disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogState.dialogTableVisible = false">Cancel</el-button>
            <el-button type="primary" @click="onTableConfirmRow">
              Confirm
            </el-button>
          </div>
        </template>
      </el-dialog>
      <TableSearch :search="state.tableData.search"
                   @search="onSearch"
                   @add="onTableAddRow"
      />
      <Table
        ref="tableRef"
        v-bind="state.tableData"
        class="table-demo"
        @delRow="onTableDelRow"
        @updateRow="onTableUpRow"
        @pageChange="onTablePageChange"
        @sortHeader="onSortHeader"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="makeTableDemo">
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';

// 定义变量内容
const { t } = useI18n();

const dialogState = reactive({
  isUpdate: false,
  dialogTableVisible: false,
});


// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/views/namespace/search.vue'));


const formState = reactive({
  ruleForm: {
    nsName: '', // 角色名称
    nsUniqueId: '',
  }
});

// 定义变量内容
const tableRef = ref<RefType>();
const state = reactive<TableDemoState>({
  tableData: {
    // 列表数据（必传）
    data: [],
    // 表头内容（必传，注意格式）
    header: [
      { key: 'nsId', colWidth: '100', title: t('message.namespace.nsId'), type: 'text', isCheck: true },
      { key: 'nsName', colWidth: '', title: t('message.namespace.nsName'), type: 'text', isCheck: true },
      { key: 'nsUniqueId', colWidth: '200', title: t('message.namespace.nsUniqueId'), type: 'text', isCheck: true },
      { key: 'createTime', colWidth: '200', title: t('message.namespace.nsCreateTime'), type: 'text', isCheck: true },
    ],
    // 配置项（必传）
    config: {
      total: 0, // 列表总数
      loading: true, // loading 加载
      isBorder: false, // 是否显示表格边框
      isSerialNo: false, // 是否显示表格序号
      isSelection: true, // 是否显示表格多选
      isOperate: true, // 是否显示表格操作栏
      isOpView: false,
      isOpUpdate: true,
      isOpDelete: true,
      isOpMore: false,
    },
    // 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
    search: [
      { label: t('message.namespace.nsName'), prop: 'name', placeholder: '请输入空间名称', required: true, type: 'input' },
    ],
    // 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
    param: {
      pageNum: 1,
      pageSize: 10,
    },
  },
});

// 初始化列表数据
const getTableData = () => {
  state.tableData.config.loading = true;
  state.tableData.data = [];
  for (let i = 0; i < 20; i++) {
    state.tableData.data.push({
      nsId: `${i + 1}`,
      nsName: `莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场${i + 1}`,
      nsUniqueId: `0592-6081259${i + 1}`,
      createTime: `中沧公寓中庭榕树下${i + 1}`,
    });
  }
  // 数据总数（模拟，真实从接口取）
  state.tableData.config.total = state.tableData.data.length;
  setTimeout(() => {
    state.tableData.config.loading = false;
  }, 500);
};
// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
  state.tableData.param = Object.assign({}, state.tableData.param, { ...data });
  tableRef.value.pageReset();
};
// 删除当前项回调
const onTableDelRow = (row: EmptyObjectType) => {
  ElMessage.success(`删除${row.nsId}成功！`);
  getTableData();
};

const onTableUpRow = (row: EmptyObjectType) => {
  formState.ruleForm.nsName = row.nsName;
  formState.ruleForm.nsUniqueId = row.nsUniqueId;
  dialogState.dialogTableVisible = true;
  dialogState.isUpdate = true;
};

const onTableAddRow = () => {
  formState.ruleForm.nsName = '';
  dialogState.isUpdate = false;
  dialogState.dialogTableVisible = true;
};

const onTableConfirmRow = () => {
  if (dialogState.isUpdate){
    ElMessage.success(`更新${formState.ruleForm.nsName}成功！`);
  }else{
    ElMessage.success(`新增${formState.ruleForm.nsName}成功！`);
  }

  dialogState.dialogTableVisible = false;
  getTableData();
};

// 分页改变时回调
const onTablePageChange = (page: TableDemoPageType) => {
  state.tableData.param.pageNum = page.pageNum;
  state.tableData.param.pageSize = page.pageSize;
  getTableData();
};
// 拖动显示列排序回调
const onSortHeader = (data: TableHeaderType[]) => {
  state.tableData.header = data;
};
// 页面加载时
onMounted(() => {
  getTableData();
});
</script>

<style scoped lang="scss">
.table-demo-container {
  .table-demo-padding {
    padding: 15px;
    .table-demo {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
