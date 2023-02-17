<template>
  <div class="system-role-container layout-padding">
    <div class="system-role-padding layout-padding-auto layout-padding-view">
      <el-table :data="state.tableData.data" v-loading="state.tableData.loading"
                style="width: 100%">
        <el-table-column prop="id" :label="t('message.server.slots.id')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="serverId" :label="t('message.server.slots.serverId')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="serverAddress" :label="t('message.server.slots.serverAddress')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="serverStatus" :label="t('message.server.slots.serverStatus')"
                         show-overflow-tooltip>
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.serverStatus">{{t('message.commonBtn.online')}}</el-tag>
            <el-tag type="info" v-else>{{t('message.commonBtn.offline')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="t('message.server.slots.createTime')"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" :label="t('message.server.slots.updateTime')"
                         show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        @size-change="onHandleSizeChange"
        @current-change="onHandleCurrentChange"
        class="mt15"
        :pager-count="5"
        :page-sizes="[50, 100, 200]"
        v-model:current-page="state.tableData.param.pageNum"
        background
        v-model:page-size="state.tableData.param.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.tableData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts" name="systemRole">
import {reactive, onMounted} from 'vue';
import {useI18n} from 'vue-i18n';
import {useServerApi} from "/@/api/server";


// 定义变量内容
const {t} = useI18n();

// 定义接口
const serverApi = useServerApi();

const state = reactive<ServerSlotsState>({
  tableData: {
    data: [],
    total: 0,
    loading: false,
    param: {
      pageNum: 1,
      pageSize: 20,
    },
  },
});
// 初始化表格数据
const getTableData = async () => {

  state.tableData.loading = true;
  let data = await serverApi.getSlotsList({
    page: state.tableData.param.pageNum,
    size: state.tableData.param.pageSize,
  });

  // 清空列表数据
  state.tableData.data = [];
  data.list.forEach(function (item: Object) {
    state.tableData.data.push({
      id: item['id'],
      serverId: item['serverId'],
      serverAddress: item['akkaAddress'],
      serverStatus: item['serverStatus'],
      createTime: item['createTime'],
      updateTime: item['updateTime']
    })
  });

  state.tableData.total = data.total;
  setTimeout(() => {
    state.tableData.loading = false;
  }, 500);
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
