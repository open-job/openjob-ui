<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <div class="system-user-search mb15">
        <el-form ref="tableSearchRef" :model="searchState.form" :rules="searchState.rules">
          <el-row>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-form-item :label="t('message.server.node.akkaAddress')" prop="address">
                <el-input v-model="searchState.form.address" size="default"
                          style="width: 95%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="12" :md="8" :lg="6" :xl="4" class="mb20">
              <el-button size="default" type="primary" class="ml10"
                         @click="onSearch(tableSearchRef)">
                <el-icon>
                  <ele-Search/>
                </el-icon>
                {{ $t('message.commonBtn.query') }}
              </el-button>
              <el-button size="default" type="primary" class="ml10"
                         @click="onReset()">
                <el-icon>
                  <ele-RefreshRight/>
                </el-icon>
                {{ $t('message.commonBtn.reset') }}
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="state.tableData.data" v-loading="state.tableData.loading"
                style="width: 100%">
        <el-table-column prop="id" :label="t('message.server.node.id')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="ip" :label="t('message.server.node.ip')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="akkaAddress" :label="t('message.server.node.akkaAddress')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" :label="t('message.server.node.status')" show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.status">{{t('message.commonBtn.online')}}</el-tag>
            <el-tag type="info" v-else>{{t('message.commonBtn.offline')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="t('message.server.node.createTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" :label="t('message.server.node.updateTime')"
                         show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        @size-change="onHandleSizeChange"
        @current-change="onHandleCurrentChange"
        class="mt15"
        :pager-count="5"
        :page-sizes="[10, 20, 30]"
        v-model:current-page="state.tableData.param.pageNum"
        background
        v-model:page-size="state.tableData.param.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.tableData.total"
      >
      </el-pagination>
    </div>
    <NsDialog ref="nsDialogRef" @refresh="getTableData()"/>
  </div>
</template>

<script setup lang="ts" name="systemRole">
import {defineAsyncComponent, onMounted, reactive, ref} from 'vue';
import {FormInstance} from 'element-plus';
import {useI18n} from 'vue-i18n';
import {useServerApi} from "/@/api/server";
import {formatDateByTimestamp} from "/@/utils/formatTime";


// 定义变量内容
const {t} = useI18n();

// 定义接口
const serverApi = useServerApi();

// 定义变量内容
const tableSearchRef = ref<FormInstance>();


// 引入组件
const NsDialog = defineAsyncComponent(() => import('/@/views/namespace/dialog.vue'));

// 定义变量内容
const nsDialogRef = ref();

const searchState = reactive({
  form: {
    address: ''
  },
  rules: {
    address: {
      required: true,
      message: t("message.commonMsg.emptyInput") + t('message.server.node.akkaAddress'),
      trigger: 'blur'
    },
  },
});

const state = reactive<ServerNodeState>({
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 10,
    },
  },
});
// 初始化表格数据
const getTableData = async () => {

  state.tableData.loading = true;
  let data = await serverApi.getServerList({
    address: searchState.form.address,
    page: state.tableData.param.pageNum,
    size: state.tableData.param.pageSize,
  });

  // 清空列表数据
  state.tableData.data = [];
  data.list.forEach(function (item: Object) {
    state.tableData.data.push({
      id: item['id'],
      ip: item['ip'],
      status: item['status'] === 1,
      akkaAddress: item['akkaAddress'],
      createTime: formatDateByTimestamp(item['createTime']),
      updateTime: item['updateTime'],
    })
  });

  state.tableData.total = data.total;
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
};

const onSearch = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid: boolean) => {
    if (valid) {
      getTableData();
    } else {
      return false;
    }
  });
};

const onReset = () => {
  searchState.form.address = '';
  getTableData();
};

// 分页改变
const onHandleSizeChange = (val: number) => {
  state.tableData.param.pageSize = val;
  getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
  state.tableData.param.pageNum = val;
  getTableData();
};
// 页面加载时
onMounted(() => {
  getTableData();
});
</script>

<style scoped lang="scss">
.system-role-container {
  .system-role-padding {
    padding: 15px;

    .el-table {
      flex: 1;
    }
  }
}
</style>
