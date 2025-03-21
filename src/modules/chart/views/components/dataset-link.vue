<template>
    <div class="card">
        <div class="card__header">
            <el-select v-model="value" placeholder="选择月份" style="width: 100px">
                <el-option v-for="item in selectOps" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>

        <v-chart :option="chartOption" autoresize />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const value = ref('')

const props = defineProps<{
    xAxis: string[];
}>();


//根据传递的参数计算属性
const selectOps = computed(() => {
    return props.xAxis.map((item) => {
        return {
            value: item,
            label: item
        }
    })
})

const chartOption = reactive({
    legend: {},
    tooltip: {
        trigger: 'axis',
        showContent: false
    },
    dataset: {
        source: [
            ['product', '1月', '2月', '3月', '4月', '5月', '6月'],
            ['总流水', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
            ['总支出', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
            ['总收入', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
            ['总负责', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
            ['总抵消', 25.2, 37.1, 41.2, 18, 33.9, 49.1],
        ]
    },
    xAxis: { type: 'category', show: false },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
        {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '50%'],
            emphasis: {
                focus: 'self'
            },
            label: {
                formatter: '{b}: {@1} ({d}%)'
            },
            encode: {
                itemName: 'product',
                value: 1,
                tooltip: '1'
            }
        }
    ]
});


watch(() => props.xAxis, (newXAxis) => {
    value.value = newXAxis[0]; // 更新 xAxis
}, { immediate: true });

watch(() => value.value, (newValue) => {
    updateChartData(newValue);
}, { immediate: true });

function updateChartData(month: string) {
    const monthIndex = chartOption.dataset.source[0].indexOf(month); // 找到选择的月份在 dataset 中的位置
    if (monthIndex > 0) {
        // 更新饼图的数据，只显示选择月份的数据
        chartOption.series[0].data = chartOption.dataset.source.slice(1).map(row => ({
            name: row[0], // 图例名称
            value: row[monthIndex] // 选择月份的数据
        }));
    }
}

onMounted(() => {
    console.log('props.xAxis', props.xAxis)
    if (props.xAxis.length > 0) {
        console.log('props.xAxis', props.xAxis)
        value.value = props.xAxis[0];
    }
});
</script>

<style lang="scss" scoped>
.card {
    &__header {
        padding: 10px 20px 10px 10px !important;

        .year {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 1;
            color: var(--el-text-color-primary);

            &::before {
                content: '';
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: var(--el-color-info);
                margin-right: 6px;
            }
        }
    }

    .echarts {
        height: 500px;
        width: 100%;
    }
}
</style>
