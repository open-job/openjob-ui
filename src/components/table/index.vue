<template>
	<div class="table-container">
		<el-table
			:data="data"
			:border="setBorder"
			v-bind="$attrs"
			row-key="id"
			stripe
			style="width: 100%"
			v-loading="config.loading"
			@selection-change="onSelectionChange"
		>
			<el-table-column type="selection" :reserve-selection="true" width="30" v-if="config.isSelection" />
			<el-table-column type="index" label="ID" width="60" v-if="config.isSerialNo" />
			<el-table-column
				v-for="(item, index) in setHeader"
				:key="index"
				show-overflow-tooltip
				:prop="item.key"
				:width="item.colWidth"
				:label="item.title"
			>
				<template v-slot="scope">
					<template v-if="item.type === 'image'">
						<img :src="scope.row[item.key]" :width="item.width" :height="item.height" />
					</template>
          <template v-else-if="item.type === 'switch'">
            <el-switch
              v-model="scope.row[item.key]"
              class="ml-2"
              size="default"
              @change="onChangeRow($event, scope.row,item.key)"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
          </template>
					<template v-else>
						{{ scope.row[item.key] }}
					</template>
				</template>

			</el-table-column>
			<el-table-column label="操作" width="300" v-if="config.isOperate">
        <template v-slot="scope">
            <el-button type="info" size="default" v-if="config.isOpView" @click="onViewRow(scope.row)">{{ $t('message.commonBtn.view') }}</el-button>

          <el-button type="primary" size="default" v-if="config.isOpUpdate" @click="onUpdateRow(scope.row)">
            <el-icon>
              <ele-Edit/>
            </el-icon>
            {{ $t('message.commonBtn.update') }}
          </el-button>
            <el-button type="danger" size="default" v-if="config.isOpDelete" @click="onDelRow(scope.row)">
              <el-icon>
                <ele-Delete/>
              </el-icon>
              {{ $t('message.commonBtn.delete') }}
            </el-button>
        </template>
      </el-table-column>
			<template #empty>
				<el-empty description="暂无数据" />
			</template>
		</el-table>
		<div class="table-footer mt15">
			<el-pagination
				v-model:current-page="state.page.pageNum"
				v-model:page-size="state.page.pageSize"
				:total="config.total"
				layout="total, prev, pager, next, jumper"
				background
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script setup lang="ts" name="netxTable">
import { reactive, computed } from 'vue';

import '/@/theme/tableTool.scss';

// 定义父组件传过来的值
const props = defineProps({
	// 列表内容
	data: {
		default: () => [],
		type: Array<EmptyObjectType>
	},
	// 表头内容
	header: {
		default: () => [],
		type: Array<EmptyObjectType>
	},
	// 配置项
	config: {
		type: Object,
		default: () => {},
	},
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['delRow', 'updateRow', 'viewRow', 'switchCol','pageChange', 'sortHeader']);

// 定义变量内容
const state = reactive({
	page: {
		pageNum: 1,
		pageSize: 1,
	},
	selectlist: [] as EmptyObjectType[],
	checkListAll: true,
	checkListIndeterminate: false,
});

// 设置边框显示/隐藏
const setBorder = computed(() => {
	return props.config.isBorder ? true : false;
});

// 设置 tool header.ts 数据
const setHeader = computed(() => {
	return props.header.filter((v) => v.isCheck);
});

// 表格多选改变时，用于导出
const onSelectionChange = (val: EmptyObjectType[]) => {
	state.selectlist = val;
};
// 删除当前项
const onDelRow = (row: EmptyObjectType) => {
	emit('delRow', row);
};

const onUpdateRow = (row: EmptyObjectType) => {
  emit('updateRow', row);
};

const onChangeRow = (event: object, row: EmptyObjectType, colName: string) => {
  emit('switchCol',event, row, colName)
};

const onViewRow = (row: EmptyObjectType) => {
  emit('viewRow', row);
};

// 分页改变
const onHandleSizeChange = (val: number) => {
	state.page.pageSize = val;
	emit('pageChange', state.page);
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.page.pageNum = val;
	emit('pageChange', state.page);
};
// 搜索时，分页还原成默认
const pageReset = () => {
	state.page.pageNum = 1;
	state.page.pageSize = 10;
	emit('pageChange', state.page);
};

// 暴露变量
defineExpose({
	pageReset,
});
</script>

<style scoped lang="scss">
.table-container {
	display: flex;
	flex-direction: column;
	.el-table {
		flex: 1;
	}
	.table-footer {
		display: flex;
		.table-footer-tool {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			i {
				margin-right: 10px;
				cursor: pointer;
				color: var(--el-text-color-regular);
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
	}
}
</style>
