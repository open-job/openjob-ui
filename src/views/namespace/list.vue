<template>
  <div class="table-demo-container layout-padding">
    <div class="table-demo-padding layout-padding-view layout-padding-auto">
      <TableSearch :search="state.tableData.search" @search="onSearch" />
      <Table
        ref="tableRef"
        v-bind="state.tableData"
        class="table-demo"
        @delRow="onTableDelRow"
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

// 引入组件
const Table = defineAsyncComponent(() => import('/@/components/table/index.vue'));
const TableSearch = defineAsyncComponent(() => import('/@/views/namespace/search.vue'));

// 定义变量内容
const tableRef = ref<RefType>();
const state = reactive<TableDemoState>({
  tableData: {
    // 列表数据（必传）
    data: [],
    // 表头内容（必传，注意格式）
    header: [
      { key: 'namespaceId', colWidth: '100', title: t('message.namespace.nsId'), type: 'text', isCheck: true },
      { key: 'name', colWidth: '', title: t('message.namespace.nsName'), type: 'text', isCheck: true },
      { key: 'phone', colWidth: '200', title: t('message.namespace.nsUniqueId'), type: 'text', isCheck: true },
      { key: 'address', colWidth: '200', title: t('message.namespace.nsCreateTime'), type: 'text', isCheck: true },
    ],
    // 配置项（必传）
    config: {
      total: 0, // 列表总数
      loading: true, // loading 加载
      isBorder: false, // 是否显示表格边框
      isSerialNo: false, // 是否显示表格序号
      isSelection: true, // 是否显示表格多选
      isOperate: true, // 是否显示表格操作栏
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
      namespaceId: `${i + 1}`,
      name: `莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场莲塘别墅广场${i + 1}`,
      phone: `0592-6081259${i + 1}`,
      address: `中沧公寓中庭榕树下${i + 1}`,
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
  ElMessage.success(`删除${row.name}成功！`);
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
