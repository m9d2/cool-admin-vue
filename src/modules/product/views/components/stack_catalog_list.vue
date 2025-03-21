<template>
	<div class="stack-catalog">
		<div class="stack-catalog__header">
			<el-text>{{ t('目录') }}</el-text>

			<div class="stack-catalog__op">
				<div class="item" @click="refresh()">
					<el-tooltip :content="t('刷新')">
						<cl-svg name="refresh" />
					</el-tooltip>
				</div>
			</div>
		</div>

		<ul class="stack-catalog__container">
			<li class="stack-catalog__node" v-for="(value, key) in list" @click="rowClick(value)" :key="key" :class="{
				'is-active': value.id == ViewGroup?.selected?.id
			}">
				<span class="stack-catalog__node-label" :key="key">{{ value.stackName }}</span>
				<span class="stack-catalog__node-icon">
					<el-icon><arrow-right /></el-icon>
				</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'dept-list'
});

import {
	ArrowRight,
} from '@element-plus/icons-vue'
import { nextTick, onMounted, ref } from 'vue';
import { useCool } from '/@/cool';
import { ContextMenu, useForm } from '@cool-vue/crud';
import { useViewGroup } from '/@/plugins/view';
import { useI18n } from 'vue-i18n';

const props = defineProps({
	drag: {
		type: Boolean,
		default: true
	},
	level: {
		type: Number,
		default: 99
	}
});

const emit = defineEmits(['clickRow']);

const { service, browser } = useCool();
const Form = useForm();
const { ViewGroup } = useViewGroup();
const { t } = useI18n();

// 树形列表
const list = ref<any[]>([]);

// 加载中
const loading = ref(false);


// 刷新
async function refresh() {
	loading.value = true;

	await service.product.stack.list({ type: 0 }).then(res => {
		const tempList = [{ stackName: '全部' }]
		res.forEach((item: any) => {
			tempList.push(item)
		});
		list.value = tempList
	});

	loading.value = false;
}

function rowClick(item?: Eps.ProductStackEntity) {
	if (item) {
		// 选择
		ViewGroup.value?.select(item);
		console.log(ViewGroup.value?.selected)
		emit('clickRow', item);
	}
}

onMounted(function () {
	refresh();
});
</script>

<style lang="scss" scoped>
.stack-catalog {
	height: 100%;
	width: 100%;

	:deep(.el-tree-node__label) {
		display: block;
		height: 100%;
		width: 100%;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		padding: 0 10px;
		border-bottom: 1px solid var(--el-border-color-extra-light);
	}

	&__op {
		display: flex;
		align-items: center;

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			margin-left: 5px;
			cursor: pointer;
			border-radius: 6px;
			font-size: 16px;
			height: 26px;
			width: 26px;
			color: var(--el-text-color-primary);

			.cl-svg {
				outline: none;
			}

			&:hover {
				background-color: var(--el-fill-color-light);
			}
		}

		.btns {
			display: flex;
			align-items: center;
			justify-content: center;

			.item {
				&:hover {
					&:first-child {
						color: var(--el-color-success);
					}

					&:last-child {
						color: var(--el-color-danger);
					}
				}
			}
		}
	}

	&__container {
		height: calc(100% - 40px);
		padding: 10px;

		:deep(.el-tree-node__content) {
			height: 38px;
			border-radius: 4px;

			.el-tree-node__expand-icon {
				margin-left: 5px;
			}
		}
	}

	&__node {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 32px;
		width: 100%;
		box-sizing: border-box;
		background-color: var(--el-fill-color-light);
		margin-bottom: 8px;
		border-radius: 4px;
		padding: 0 8px;
		cursor: pointer;

		&.is-active {
			background-color: var(--el-color-primary);
			color: var(--el-color-white);
		}

		&-label {
			display: flex;
			align-items: center;
			flex: 1;
			height: 100%;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&.is-active {
				color: var(--el-color-primary);
			}
		}

		&-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 32px;
			width: 32px;
			text-align: center;
			margin-right: 5px;
			border-radius: 6px;
		}
	}
}
</style>
