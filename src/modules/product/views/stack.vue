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
import { onMounted, reactive } from 'vue';

defineOptions({
	name: "product-stack",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";

const { service } = useCool();
const { t } = useI18n();

const options = reactive({
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
	parent: [

	] as Array<{ label: string; value: number }>,
});

// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("技术栈"),
			prop: "stackName",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
			required: true,
		},
		{
			label: t("节点类型"),
			prop: "type",
			component: {
				name: 'el-select',
				options: options.type,
			},
			span: 24,
			required: true,
		},
		{
			label: t("选择父节点"),
			prop: "parentId",
			component: {name: 'el-select',
				options: options.parent,
			},
			span: 24,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: { name: "el-input", props: { clearable: true, type: 'textarea' } },
			span: 24,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("技术栈"), prop: "stackName", minWidth: 120 },
		{ label: t("备注"), prop: "remark", minWidth: 120 },
		{ label: t("最后修改人"), prop: "lastModifyUser", minWidth: 120 },
		{ label: t("节点类型"), prop: "type", minWidth: 120, dict: options.type },
		{ label: t("父节点ID"), prop: "parentId", minWidth: 120 },
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
		service: service.product.stack,
	},
	(app) => {
		app.refresh();
	},
);

// 刷新
function refresh(params?: any) {
	Crud.value?.refresh(params);
}

onMounted(() => {
	service.product.stack.list().then((res: any) => {
		res.forEach((item: any) => {
			options.parent.push({label: item.stackName, value: item.id})
		});
	});



})
</script>
