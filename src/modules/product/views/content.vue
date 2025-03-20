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
	name: "product-content",
});

import { useCrud, useTable, useUpsert, useSearch } from "@cool-vue/crud";
import { useCool } from "/@/cool";
import { useI18n } from "vue-i18n";

const { service } = useCool();
const { t } = useI18n();

const options = reactive({
	direction: [
		{
			label: t('竖屏'),
			value: 1,
		},
		{
			label: t('横屏'),
			value: 2,
		}
	],
	supportTemplate: [
		{
			label: t('是'),
			value: 0,
		},
		{
			label: t('否'),
			value: 1,
		}
	],
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
	stack: [] as Array<{ label: string; value: number }>,
	category: [] as Array<{ label: string; value: number }>,
	source: [] as Array<{ label: string; value: number }>,

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
			component: {
				name: 'cl-upload',
				props: {
					text: t('选择图片')
				}
			},
			span: 12,
		},
		{
			label: t("长图"),
			prop: "longPicture",
			component: {
				name: 'cl-upload',
				props: {
					text: t('选择图片')
				}
			},
			span: 12,
		},
		{
			label: t("方向"),
			prop: "direction",
			component: {
				name: 'el-select',
				options: options.direction,
			},
			span: 12,
			required: true,
		},
		{
			label: t("是否支持模板开发"),
			prop: "supportTemplate",
			component: {
				name: 'el-radio-group',
				options: options.supportTemplate,
			},
			span: 12,
			required: true,
		},
		{
			label: t("版本号"),
			prop: "version",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("产品链接"),
			prop: "productUrl",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("APK包"),
			prop: "apkUrl",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("视频"),
			prop: "videoUrl",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("产品简介"),
			prop: "introduction",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("状态"),
			prop: "status",
			component: {
				name: 'el-radio-group',
				options: options.status
			},
			span: 12,
			required: true,
		},
		{
			label: t("备注"),
			prop: "remark",
			component: { name: "el-input", props: { clearable: true } },
			span: 12,
		},
		{
			label: t("技术栈"),
			prop: "productStack",
			component: {name: 'el-select',
				options: options.stack,
			},
			span: 12,
		},
		{
			label: t("分类"),
			prop: "productCategory",
			component: {name: 'el-select',
				options: options.category,
			},
			span: 12,
		},
		{
			label: t("来源"),
			prop: "productSource",
			component: {name: 'el-select',
				options: options.source,
			},
			span: 12,
		},
	],
});

// cl-table
const Table = useTable({
	columns: [
		{ type: "selection" },
		{ label: t("产品名称"), prop: "productName", minWidth: 120 },
		{ label: t("方图"), prop: "picture", minWidth: 120 },
		{ label: t("长图"), prop: "longPicture", minWidth: 120 },
		{ label: t("方向"), prop: "direction", minWidth: 120 },
		{
			label: t("是否支持模板开发"),
			prop: "supportTemplate",
			minWidth: 120,
		},
		{ label: t("版本号"), prop: "version", minWidth: 120 },
		{ label: t("产品链接"), prop: "productUrl", minWidth: 120 },
		{ label: t("APK包"), prop: "apkUrl", minWidth: 120 },
		{ label: t("视频"), prop: "videoUrl", minWidth: 120 },
		{ label: t("产品简介"), prop: "introduction", minWidth: 120 },
		{ label: t("最后修改人"), prop: "lastModifyUser", minWidth: 120 },
		{ label: t("状态"), prop: "status", minWidth: 120 },
		{ label: t("备注"), prop: "remark", minWidth: 120 },
		{ label: t("ID"), prop: "productStack", minWidth: 120 },
		{ label: t("ID"), prop: "productCategory", minWidth: 120 },
		{ label: t("ID"), prop: "productSource", minWidth: 120 },
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

onMounted(() => {

})

</script>
