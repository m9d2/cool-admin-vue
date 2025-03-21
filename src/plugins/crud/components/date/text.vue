<template>
	<span class="cl-date-text">
		{{ date }}<br />
		{{ time }}
	</span>
</template>

<script lang="ts" setup>
defineOptions({
	name: 'cl-date-text'
});

import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
	modelValue: [String, Number],
	dateFormat: {
		type: String,
		default: 'YYYY-MM-DD'
	},
	timeFormat: {
		type: String,
		default: 'HH:mm:ss'
	}
});

const date = computed(() => {
	return props.modelValue ? dayjs(props.modelValue).format(props.dateFormat) : '';
});

const time = computed(() => {
	return props.modelValue ? dayjs(props.modelValue).format(props.timeFormat) : '';
});
</script>
