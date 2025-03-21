<template>
	<cl-crud ref="Crud">
		<cl-row>
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 条件搜索 -->
			<cl-search ref="Search" />
		</cl-row>

		<cl-row>
			<!-- 数据表格 -->
			<cl-table ref="Table" />
		</cl-row>

		<cl-row>
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</cl-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="Upsert" />
	</cl-crud>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

defineOptions({
	name: "product-category",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";

const { service } = useCool();
const { t } = useI18n();

const options = reactive({
	status: [
		{
			label: t('正常'),
			value: 0,
		},
		{
			label: t('禁用'),
			value: 1,
		}
	],
	type: [
		{
			label: t('目录'),
			value: 0,
		},
		{
			label: t('节点'),
			value: 1,
		}
	],
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("类型名称"),
			prop: "categoryName",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
			required: true,
		},
		{
			label: t("产品数量"),
			prop: "productNum",
			component: { name: "el-input-number", props: { clearable: true } },
			span: 24,
			required: true,
		},
		{
			label: t("图片"),
			prop: "picture",
			component: {
				name: 'cl-upload',
				props: {
					text: t('选择图片')
				}
			},
			span: 24,
		},
		{
			label: t("排序"),
			prop: "sort",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
			required: true,
		},
		{
			label: t("状态"),
			prop: "status",
			component: {
				name: 'el-radio-group',
				options: options.status
			},
			required: true,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: { name: "el-input", props: { clearable: true, type: 'textarea' } },
			span: 24,
			required: true,
		},
		{
			label: t("节点类型"),
			prop: "nodeType",
			component: {
				name: 'el-select',
				options: options.type,
			},
			span: 24,
			required: true,
		},
		{
			label: t("选择父节点"),
			prop: "parentNodeId",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("类型名称"), prop: "categoryName", minWidth: 120 },
		{ label: t("产品数量"), prop: "productNum", minWidth: 120 },
		{ label: t("图片"), prop: "picture", minWidth: 120, component: { name: 'cl-image' } },
		{ label: t("排序"), prop: "sort", minWidth: 120, sortable: "custom", },
		{
			label: t("状态"), prop: "status", minWidth: 120, dict: options.status, sortable: "custom", component: {
				name: 'cl-switch'
			}
		},
		{ label: t("备注"), prop: "remark", minWidth: 120 },
		{ label: t("节点类型"), prop: "nodeType", minWidth: 120 },
		{ label: t("父节点ID"), prop: "parentNodeId", minWidth: 120 },
		{
			label: t("创建时间"),
			prop: "createTime",
			minWidth: 170,
			sortable: "desc",
			component: { name: "cl-date-text" },
		},
		{
			label: t("更新时间"),
			prop: "updateTime",
			minWidth: 170,
			sortable: "custom",
			component: { name: "cl-date-text" },
		},
		{ type: "op", buttons: ["edit", "delete"] },
	],
});

// cl-search
const Search = useSearch();

// cl-crud
const Crud = useCrud(
	{
		service: service.product.category,
	},
	(app) => {
		app.refresh();
	},
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}
</script>
