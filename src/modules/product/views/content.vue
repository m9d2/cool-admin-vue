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
defineOptions({
	name: "product-content",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";

const { service } = useCool();
const { t } = useI18n();

const options = reactive({
	direction: [
		{
			label: t('竖屏'),
			value: 1,
			type: 'warning'
		},
		{
			label: t('横屏'),
			value: 2,
			type: 'success'
		}
	]
});


// cl-upsert
const Upsert = useUpsert({
	items: [
		{
			label: t("产品名称"),
			prop: "productName",
			component: { name: "el-input", props: { clearable: true } },
			span: 24,
			required: true,
		},
		{
			label: t("方图"),
			prop: "picture",
			component: { name: "cl-upload", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("长图"),
			prop: "longPicture",
			component: { name: "cl-upload", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("技术栈"),
			prop: "stack",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("方向"),
			prop: "direction",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("选择分类"),
			prop: "categoryId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("是否支持模板开发"),
			prop: "suportTemplate",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("版本号"),
			prop: "version",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("产品链接"),
			prop: "productUrl",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("APK包"),
			prop: "apkUrl",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("视频"),
			prop: "vedioUrl",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("产品简介"),
			prop: "introduction",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("选择来源"),
			prop: "houseRelationId",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("最后修改人"),
			prop: "lastModifyUser",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("状态"),
			prop: "status",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
			required: true,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("产品名称"), prop: "productName", minWidth: 120 },
		{ label: t("方图"), prop: "picture", minWidth: 120, component: { name: "cl-image" } },
		{ label: t("长图"), prop: "longPicture", minWidth: 120, component: { name: "cl-image" } },
		{ label: t("技术栈"), prop: "stack", minWidth: 120 },
		{ label: t("方向"), prop: "direction", minWidth: 120, dict: options.direction },
		{ label: t("分类"), prop: "categoryId", minWidth: 120 },
		{ label: t("是否支持模板开发"), prop: "suportTemplate", minWidth: 120 },
		{ label: t("版本号"), prop: "version", minWidth: 120 },
		{ label: t("产品链接"), prop: "productUrl", minWidth: 120 },
		{ label: t("APK包"), prop: "apkUrl", minWidth: 120 },
		{ label: t("视频"), prop: "vedioUrl", minWidth: 120 },
		{ label: t("产品简介"), prop: "introduction", minWidth: 120 },
		{ label: t("来源"), prop: "houseRelationId", minWidth: 120 },
		{ label: t("最后修改人"), prop: "lastModifyUser", minWidth: 120 },
		{
			label: t("状态"), prop: "status", minWidth: 120, component: {
				name: 'cl-switch'
			}
		},
		{ label: t("备注"), prop: "remark", minWidth: 120 },
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
		service: service.product.content,
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
