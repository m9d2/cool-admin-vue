<template>
    <div class="card">
        <div class="card__header">
        </div>
        <v-chart :option="chartOption" autoresize />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
    xAxis: string[];
}>();
type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

const labelOption: BarLabelOption = {
    show: true,
    position: 'insideBottom',
    distance: 15,
    align: 'left',
    verticalAlign: 'middle',
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rotate: 90,
    rich: {
        name: {}
    }
};



const chartOption = reactive({

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['总流水', '总支出', '总收入', '总负责', '总抵消']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    xAxis: [
        {
            type: 'category',
            axisTick: { show: false },
            data: [] as string[]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '总流水',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
        },
        {
            name: '总支出',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
        },
        {
            name: '总收入',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
        },
        {
            name: '总负责',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
        },
        {
            name: '总抵消',
            type: 'bar',
            label: labelOption,
            emphasis: {
                focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
        }
    ]

});


watch(() => props.xAxis, (newXAxis) => {
    chartOption.xAxis[0].data = newXAxis; // 更新 xAxis
}, { immediate: true });
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
