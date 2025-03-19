import Mitt, { type Emitter } from 'mitt';
import { hmr } from './hmr';

const mitt: Emitter<any> = hmr.getData('mitt', Mitt());

// 返回 mitt 实例，用于在应用中进行事件的发布和订阅
export function useMitt() {
	return mitt;
}
