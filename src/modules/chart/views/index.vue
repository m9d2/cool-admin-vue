<template>
    <el-scrollbar>
        <div class="demo-home">
            <el-row>
                <el-col :lg="24" :xs="24">
                    <cl-select-button v-model="tab.active" :options="tab.list" @change="onChange" />
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :lg="12" :xs="24">
                    <bar-label-rotation :xAxis="data.options" />
                </el-col>
                <el-col :lg="12" :sm="24">
                    <dataset-link :xAxis="data.options" />
                </el-col>
            </el-row>
        </div>
        <el-card>
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column prop="id" label="ID" width="180" />
                <el-table-column prop="zls" label="总流水" width="180" />
                <el-table-column prop="zzc" label="总支出" width="180" />
                <el-table-column prop="zsr" label="总收入" />
                <el-table-column prop="zfz" label="总负债" />
                <el-table-column prop="zdx" label="总抵消" />
                <el-table-column prop="zdzclslx" label="最大支出流水类型" />
                <el-table-column prop="zdsrlslx" label="最大收入流水类型" />
                <el-table-column prop="zdzcr" label="最大支出人" />
                <el-table-column fixed="right" label="操作" min-width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">
                            账单
                        </el-button>
                        <el-button link type="primary" size="small">明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination size="small" background layout="prev, pager, next" :total="50" class="mt-4" />
            </div>
        </el-card>
    </el-scrollbar>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'home'
});
import { useI18n } from 'vue-i18n';
import { onMounted, reactive } from 'vue';
import BarLabelRotation from './components/bar-label-rotation.vue';
import DatasetLink from './components/dataset-link.vue';
import { useCrud, useTable } from '@cool-vue/crud';
const { t } = useI18n();
const handleClick = () => {
    console.log('click')
}

const tableData = [
    {
        id: 1,
        zls: 100,
        zzc: 100,
        zsr: 100,
        zfz: 100,
        zdx: 100,
        zdzclslx: 100,
        zdsrlslx: 100,
        zdzcr: 100
    },
    {
        id: 2,
        zls: 100,
        zzc: 100,
        zsr: 100,
        zfz: 100,
        zdx: 100,
        zdzclslx: 100,
        zdsrlslx: 100,
        zdzcr: 100
    },

]
const tab = reactive({
    active: 'month',
    list: [
        {
            label: t('年'),
            value: 'year'
        },
        {
            label: t('月'),
            value: 'month'
        }
    ]
});

const data = reactive({
    options: [] as any[]
});
const onChange = (value: string) => {
    console.log(value);
    if (value === 'month') {
        data.options = [
            '1月', '2月', '3月', '4月', '5月'
        ]
    }
    if (value === 'year') {
        data.options = [
            '2020', '2021', '2022', '2023', '2024', '2025'
        ]
    }
};

// cl-table
const Table = useTable({
    columns: [
        { type: "selection" },
        { label: t("来源名称"), prop: "sourceName", minWidth: 120 },
        { label: t("产品数量"), prop: "productNum", minWidth: 120 },
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

// Table.value.data = [
//     {
//         sourceName: "vue",
//         productNum: 100,
//         remark: "vue",
//         createTime: "2020-01-01 00:00:00",
//         updateTime: "2020-01-01 00:00:00",
//     },
//     {
//         sourceName: "vue",
//         productNum: 100,
//         remark: "vue",
//         createTime: "2020-01-01 00:00:00"
//     }
// ]

</script>

<style lang="scss">
.demo-home {
    overflow-x: hidden;

    .card {
        border-radius: 10px;
        margin-bottom: 10px;
        border: 1px solid var(--el-border-color-extra-light);
        background-color: var(--el-bg-color);
        color: var(--el-text-color-primary);
        user-select: none;

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            min-height: 50px;

            .label {
                font-size: 15px;
            }

            .icon {
                font-size: 30px;
                background-color: var(--el-fill-color-light);
                padding: 5px;
                border-radius: 6px;
            }
        }

        &__container {
            padding: 0 20px;
            min-height: 50px;

            .num {
                font-size: 32px;
            }
        }

        &__footer {
            display: flex;
            align-items: center;
            height: 50px;
            margin: 0 5px;
            padding: 0 15px;
            box-sizing: border-box;
            font-size: 12px;

            .label {
                margin-right: 10px;
            }
        }
    }
}

.pagination {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
</style>
